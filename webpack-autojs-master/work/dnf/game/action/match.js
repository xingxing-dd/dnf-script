const socket = require("../../common/socket")
const { debuger } = require("../../common/debug")
const { template } = require("../config/template")

const ScreenMatcher = function() {
    this.matching = {},
    this.process = function(data) {
        if (!data || data.x == undefined || data.x < 0 || data.y < 0) {
            return
        }
        let randomX = data.x + 2 + Math.floor(random() * (data.w - 2))
        let randomY = data.y + 2 + Math.floor(random() * (data.h - 2))
        click(randomX, randomY)
    },
    this.match = function(context, target, callback) {
        let matchPorcessResult = this.matching[target]
        if (matchPorcessResult == "success") {
            delete this.matching[target]
            return true
        }
        let templateConfig = template[target]
        if (templateConfig == undefined) {
            delete this.matching[target]
            return true
        }
        if (matchPorcessResult == undefined) {
            this.matching[target] = "processing"
            socket.send({
                action: "screen-match",
                data: {
                    template: target,
                    bounds: templateConfig["bounds"],
                    label: templateConfig["label"]
                }  
            }, (data, status) => {
                if (status != "success") {
                    return
                }
                console.info("识别结果：" + JSON.stringify(data))
                if (callback) {
                    callback(context, data)
                } else {
                    this.process(data)
                }
                if (data && data.x != undefined) {
                    debuger.add(data)
                    this.matching[target] = "success"
                } else {
                    delete this.matching[target]
                }
            })
        }
        return false
    }
}

exports.matcher = new ScreenMatcher()