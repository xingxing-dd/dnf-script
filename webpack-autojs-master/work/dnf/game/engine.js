const runtime = require("./runtime")

const ScriptExecutor = function(scheduler, properties) {
    Object.assign(this, properties || {}, {
        name: undefined,
        counter: 0,
        type: undefined,
        action: undefined,
        depend: undefined,
        interval: undefined,
        retry: undefined,
        next: Date.now(),
    });
    this.run = function(context) {
        let current = Date.now()
        //先置为一分钟后,卡住这个任务
        this.next = current + 60 * 1000
        let result = scheduler.dispatch(this.type, this.action(context), context)
        if (result || (this.retry && this.counter >= this.retry)) {
            this.next = -1
        } else {
            this.next = current + this.interval
        }
        this.counter = this.counter + 1
    },
    this.ready = function() {
        return this.next <= Date.now()
    },
    this.completed = function() {
        if (this.next == -1) {
            return true
        }
        if (this.depend && this.depend.next == -1) {
            return true
        }
        return false
    }
}

const ScriptEngine = function() {
    this.status = "init",
    this.scheduler = undefined,
    this.pipelines = {},
    this.runtime = runtime.instance(),
    this.comfirm = function(flowId, before, after) {
        if (!this.pipelines[flowId]) {
            return
        }
        this.pipelines[flowId]["before"] = before || (() => console.log("任务开始:" + flowId))
        this.pipelines[flowId]["after"] = after || (() => console.log("任务结束:" + flowId))
        this.pipelines[flowId]["status"] = "pending"
    },
    this.init = function(flowId) {
        if (!this.pipelines[flowId]) {
            this.pipelines[flowId] = {
                status: "init",
                context: {},
                executors: {},
                before: (() => console.log("任务开始:" + flowId)),
                after: (() => console.log("任务结束:" + flowId))
            }
        }
        return this.pipelines[flowId]
    },
    this.submit = function(flowId, properties) {
        let pipeline = this.init(flowId)
        for (let prop of properties) {
            if (pipeline.executors[prop.name]) {
                return
            }
            let executor = new ScriptExecutor(this.scheduler, prop)
            if (executor.depend == undefined) {
                let executorKeys = Object.keys(pipeline.executors) || [undefined]
                executor.depend = executorKeys[executorKeys.length - 1]
            }
            pipeline.executors[prop.name] = executor
        }
        pipeline.status = "pending"
        console.info(JSON.stringify(pipeline.executors))
    },
    this.registerScheduler = function(scheduler) {
        this.scheduler = scheduler
    },
    // this.submit = function(flowId, name, execute, delay, depend, sync) {
    //     if (!this.pipelines[flowId]) {
    //         this.pipelines[flowId] = {
    //             status: "init",
    //             context: {},
    //             executors: {},
    //             before: () => console.log("任务开始:" + flowId),
    //             after: () => console.log("任务结束:" + flowId)
    //         }
    //     }
    //     if (this.pipelines[flowId]["executors"][name]) {
    //         return
    //     }
    //     // if (depend == undefined) {
    //     //     let executorKeys = Object.keys(this.pipelines[flowId]["executors"])
    //     //     depend= !executorKeys || executorKeys.length == 0 ? undefined : executorKeys[executorKeys.length - 1]
    //     // }
    //     this.pipelines[flowId]["executors"][name] = new ScriptExecutor(execute, delay, depend, sync)
    // },
    this.remove = function(flowId, name) {
        if (!this.pipelines[flowId] || !this.pipelines[flowId]["executors"][name]) {
            return
        }
        delete this.pipelines[flowId]["executors"][name]
    },
    this.boot = function() {
        if (this.status == "running") {
            let flowIds = this.pipelines["_subtask"] ? ["_subtask"] : Object.keys(this.pipelines)
            if (!flowIds || flowIds.length == 0 || !flowIds[0]) {
                return
            }
            let status = this.pipelines[flowIds[0]]["status"]
            if (status == "init") {
                return
            }
            if (this.completed(flowIds[0])) {
                //this.pipelines[flowIds[0]]["after"]()
                delete this.pipelines[flowIds[0]]
                return
            }
            if (status == 'pending') {
                this.pipelines[flowIds[0]]["status"] = "processing"
                //this.pipelines[flowIds[0]]["before"]()
            }
            let executors = this.pipelines[flowIds[0]]["executors"]
            let context = this.pipelines[flowIds[0]]["context"]
            for(let name in executors) {
                let executor = executors[name]
                if (!executor.ready() || executor.completed()) {
                    continue
                }
                threads.start(() => executor.run(context))
            }
        }  
    },
    this.completed = function(flowId) {
        if (!this.pipelines[flowId]) {
            return true
        }
        for(let name in this.pipelines[flowId]["executors"]) {
            let task = this.pipelines[flowId]["executors"][name]
            if (task && !task.completed()) {
                return false
            }
        }
        return true
    },
    this.switch = function() {
        if (this.status == "running") {
            this.status = "pause"
        } else {
            this.status = "running"
        }
        return this.status == "running"
    }
    this.start = function() {
        this.status = "running"
    },
    this.pause = function() {
        this.status = "pause"
    }
}

//全局唯一，脚本引擎对象
exports.engine = new ScriptEngine()