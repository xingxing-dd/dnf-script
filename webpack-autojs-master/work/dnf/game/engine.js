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
        return this && this.next == -1
    }
}

const ScriptEngine = function() {
    this.status = "init",
    this.pipelines = {}
    this.runtime = runtime.instance(),
    this.load = function(pipeline) {
        let id = Date.now()
        for(let name in pipeline) {
            if (pipeline[name][action] == "detect") {

            } else if (pipeline[name][action] == "match") {
                this.submit(id, name, (context) => matcher.match(context, pipeline[name].ext, pipeline[name].callback), null, 500)
            } 
        }
    },
    this.submit = function(flowId, name, execute, depend, delay, sync) {
        if (!this.pipelines[flowId]) {
            this.pipelines[flowId] = {completed: false,context: {},executors: {}}
        }
        if (this.pipelines[flowId]["executors"][name]) {
            return
        }
        this.pipelines[flowId]["executors"][name] = new ScriptExecutor(execute, depend, delay, sync)
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
            let executors = this.pipelines[flowIds[0]]["executors"]
            let context = this.pipelines[flowIds[0]]["context"]
            for(let name in executors) {
                let executor = executors[name]
                if (executor.completed() || (executor.depend && !executors[executor.depend].completed())) {
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
    this.start = function() {
        this.status = "running"
    },
    this.pause = function() {
        this.status = "pause"
    }
}

exports.engine = new ScriptEngine()
//全局唯一，脚本引擎对象
// var scriptEngine = new ScriptEngine()
  
// exports.initEngine = (model) => {
//     if (!scriptEngine) {
//         console.info("初始化")
//         scriptEngine = new ScriptEngine(model)
//     }
//     return scriptEngine
// }

// exports.acquireEngine = () => {
//     return scriptEngine
// }
