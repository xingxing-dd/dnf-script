const { debuger } = require("../../common/debuger")
const { template } = require("../config/template")
const { plugin } = require("../../common/utils")

const ScreenMatcher = function() {
    this.matching = {},
    this.status = "pending",
    this.process = function(data) {
        if (!data || data.x == undefined || data.x < 0 || data.y < 0) {
            return
        }
        let randomX = data.x + 2 + Math.floor(random() * (data.w - 2))
        let randomY = data.y + 2 + Math.floor(random() * (data.h - 2))
        click(randomX, randomY)
    },
    this.match = function(context, target, callback) {
        if (this.status != "pending") {
            return false
        }
        this.status = "processing"
        let templateConfig = template[target]
        if (templateConfig == undefined) {
            return true
        }
        let capture = captureScreen()
        if (!capture) {
            return false
        }
        let bitmap = capture.getBitmap()
        if (!bitmap) {
            return false
        }
        console.info("开始识别：" + JSON.stringify(templateConfig) + "," + target)
        let result = plugin.match(bitmap, target, templateConfig["bounds"])
        console.info("识别结果：" + JSON.stringify(result))
        if (result != null) {
            debuger.refresh()
            debuger.add(result)
        }
        if(callback) {  
            callback(context, result)
        }
        this.status = "pending"
        return result != null
    }
}

exports.matcher = new ScreenMatcher()