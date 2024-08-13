const runtime = require("./runtime")

const ScriptEngine = function(model) {
    this.status = "running",
    this.runtime = runtime.instance(model),
    this.submit = function(name, execute, delay, sync) {
        console.info(this.runtime.tasks)
        this.runtime.tasks[name] = {
            status: "pending",
            execute: execute,
            sync: sync == undefined ? true : sync,
            delay: delay,
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
                this.execute(this.after)
                if (this.sync) {
                    this.after()
                }
                this.next = current + this.delay
            }
        }
    },
    this.remove = function(name) {
        if (!this.runtime.tasks[name]) {
            return
        }
        delete this.runtime.tasks[name]
    },
    this.boot = function() {
        if (this.status == "running") {
            for (let name in this.runtime.tasks) {
                const task = this.runtime.tasks[name]
                if (!task) {
                    return
                }
                task.run()
            }
        }  
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
    console.info("获取：" + JSON.stringify(scriptEngine.runtime.tasks))
    return scriptEngine
}

exports.acquireEngine = () => {
    return scriptEngine
}