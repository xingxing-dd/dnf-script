const { acquireProcessor } = require("./factory")
const { engine } = require("../engine")
const { acquire } = require("../../common/utils")
const { plugin } = require("../../common/utils")
const { dungeons, skills } = require("../config/template")
const { createCoward } = require("../object/coward")

const Scheduler = function() {
    this.name = "全局脚本调度器",
    this.runtime = {current:undefined, subtask: []},
    this.tasks = [],
    this.config = {},
    this.status = "init",
    this.switch = function() {
        if (this.status != 'init') {
            return
        }
        this.status = "pending"
        let current = this.runtime.current + 1 || 0
        if (!this.tasks[current]) {
            return false
        }
        this.runtime.current = current
        console.log("任务装载开始")
        this.load(this.tasks[current])
        console.log("任务装在结束")
        return true
    },
    this.init = function() {
        this.tasks = acquire("setting::task") || [
            {
                name: "2009年玩红眼",
                career: "berserker",
                dungeons: "bwj",
                daily: []
            }
        ]
        if (!this.tasks || this.length == 0) {
            toast("初始化配置装配失败，请联系开发者!")
            return
        }
        console.log("加载系统任务:" + JSON.stringify(this.tasks))
        this.config = acquire("setting::config") || {}
    },
    this.dispatch = function(type, message) {
        if (message != undefined && this.status == "pending") {
            this.status = "processing"
            let processor = acquireProcessor(type)
            if (processor == undefined) {
                this.process = "pending"
                console.log("未找到合适的事件处理器:" + type)
                return true
            }
            let result = processor.process(message, this.runtime)
            if (!this.runtime.subtask) {
                this.runtime.subtask = []
            }
            this.status = "pending"
            return result
        }
        return false
    },
    this.load = function(task) {
        this.runtime.coward = createCoward({skills: skills[task.career]})
        console.log("初始化角色:" + this.runtime.coward)
        let template = dungeons[task.dungeons]
        console.log("初始化角色:" + template)
        if (!template) {
            return
        }
        let tasks = [] 
        for (let item of template) {  
            if (item.type == "match_click") {
                tasks.push({
                    name: "点击按钮",
                    type: task.type,
                    action: (context) => {
                        let capture = captureScreen()
                        if (capture == undefined) {
                            return false
                        }
                        let bitmap = capture.getBitmap()
                        let result = plugin.match(bitmap, item.template, item.bounds)
                        return result
                    },
                    interval: 500,
                    retry: 20
                })
            }
            if (item.type == "game_detect") {
                tasks.push({
                    name: "布万家搬砖检测",
                    type: "game_detect",
                    action: (context) => {
                        let capture = captureScreen()
                        if (capture == undefined) {
                            return 
                        }
                        let bitmap = capture.getBitmap()
                        let result = plugin.detect(bitmap, 0.8)
                        let objects = {}
                        for (let obj of result) {
                            if (objects[obj.label] == undefined) {
                                objects[obj.label] = []
                            }
                            objects[obj.label].push(obj)
                        }
                        return objects
                    },
                    interval: 400
                })
            }
        }
        engine.submit("_default", tasks)   
    }
}

const scheduler = new Scheduler()
scheduler.init()
engine.registerScheduler(scheduler)
exports.scheduler = scheduler