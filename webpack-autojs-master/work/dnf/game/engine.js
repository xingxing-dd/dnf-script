const runtime = require("./runtime")

const ScriptExecutor = function(execute, depend, delay, sync) {
    this.execute = execute,
    this.depend = depend,
    this.delay = delay,
    this.sync = sync == undefined ? true : sync,
    this.next = Date.now(),
    this.run = function(context) {
        let current = Date.now()
        if (this.next > current) {
            return
        }
        let result = this.execute(context)
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
    this.runtime = runtime.instance(model),
    this.submit = function(flowId, name, execute, depend, delay, sync) {
        if (!this.pipelines[flowId]) {
            this.pipelines[flowId] = {
                completed: false,
                context: {},
                executors: {}
            }
        }
        if (this.pipelines[flowId]["executors"][name]) {
            return
        }
        this.pipelines[flowId]["executors"][name] = new ScriptExecutor(
            execute, 
            depend, 
            delay, 
            sync
        )
    },
    this.remove = function(flowId, name) {
        if (!this.pipelines[flowId] || !this.pipelines[flowId]["executors"][name]) {
            return
        }
        delete this.pipelines[flowId]["executors"][name]
    },
    this.boot = function() {
        if (this.status == "running") {
            let flowIds = Object.keys(this.pipelines)
            if (!flowIds || flowIds.length == 0) {
                return
            }
            if (this.completed(flowIds[0])) {
                console.info("执行完毕，结束执行:" + flowIds[0])
                delete this.pipelines[flowIds[0]]
                return
            }
            const executors = this.pipelines[flowIds[0]]["executors"]
            const context = this.pipelines[flowIds[0]]["context"]
            for(let name in executors) {
                let executor = executors[name]
                //如果当前执行完成，或者或依赖任务未完成，则不执行该任务
                if (executor.completed() || (executor.depend && !executors[executor.depend]) || 
                    (executor.depend && !executors[executor.depend].completed())) {
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
            const task = this.pipelines[flowId]["executors"][name]
            if (task && !task.completed()) {
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
    return scriptEngine
}

exports.acquireEngine = () => {
    return scriptEngine
}