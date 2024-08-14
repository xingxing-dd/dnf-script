const runtime = require("./runtime")

const ScriptExecutor = function(execute, depend, delay, sync) {
    this.execute = execute,
    this.depend = depend,
    this.delay = delay,
    this.sync = sync == undefined ? true : sync,
    this.next = Date.now(),
    this.run = function(context) {
        let current = Date.now()
        console.info(current)
        if (this.next > current) {
            return
        }
        let result = this.execute(this.after)
        if (!result) {
            this.next = current + this.delay
        } else {
            this.next = -1
        }
    },
    this.completed = function() {
        return !this || this.next == -1
    }
}

const ScriptEngine = function(model) {
    this.status = "running",
    this.pipelines = {}
    this.executors = {},
    this.runtime = runtime.instance(model),
    this.submit = function(flowId, name, execute, depend, delay, sync) {
        if (!this.pipelines[flowId]) {
            this.pipelines[flowId] = {
                _context: {}
            }
        }
        if (this.pipelines[flowId][name]) {
            return
        }
        this.pipelines[flowId][name] = new ScriptExecutor(
            execute, 
            delay, 
            delay, 
            sync
        )
        this.executors[name] = {
            flowId: flowId,
            status: "pending",
            execute: execute,
            depend: depend,
            delay: delay,
            sync: sync == undefined ? true : sync,
            next: Date.now(),
            before: function() {
                this.status = "processing"
            },
            after: function() {
                this.status = "pending"
            },
            run: function() {
                let current = Date.now()
                console.info(current)
                if (this.next > current) {
                    return
                }
                this.before()
                let result = this.execute(this.after)
                if (this.sync) {
                    this.after()
                }
                if (!result) {
                    this.next = current + this.delay
                } else {
                    this.next = -1
                }
            },
            completed: function() {
                return !this || this.next == -1
            }
        }
    },
    this.remove = function(flowId, name) {
        if (!this.pipelines[flowId] || !this.pipelines[flowId][name]) {
            return
        }
        delete this.pipelines[flowId][name]
    },
    this.boot = function() {
        if (this.status == "running") {
            for (let flowId in this.pipelines) {
                const pipeline = this.pipelines[flowId]
                if (!pipeline || pipeline.completed()) {
                    continue
                }
                const context = pipeline[_context]
                for(let name in pipeline[flowId]) {
                    const executor = pipeline[name]
                    if (executor.completed()) {
                        this.remove(flowId, name)
                    } else {
                        executor.run(context)
                    }
                }
            }
        }  
    },
    this.completed = function(flowId, name) {
        if (!this.pipelines[flowId] || !this.pipelines[flowId][name] || this.pipelines[flowId][name].completed()) {
            return true
        }
        for(let name in this.pipelines[flowId]) {
            const task = this.pipelines[flowId][name]
            if (!task.completed()) {
                return false
            }
        }
        return true
    },
    this.start = function() {
        this.status = "running"
    },
    this.pause = function() {
        this.status = "pause"
    }
}

//全局唯一，脚本引擎对象
var scriptEngine = undefined
  
exports.initEngine = (model) => {
    if (!scriptEngine) {
        console.info("初始化")
        scriptEngine = new ScriptEngine(model)
    }
    console.info("获取：" + JSON.stringify(scriptEngine.tasks))
    return scriptEngine
}

exports.acquireEngine = () => {
    return scriptEngine
}