const socket = require("../../common/socket")
const {debuger} = require("../../common/debug")
const Ocr = function() {
    this.matching = {},
    this.detect = function(context, id, label, callback) {
        let matchPorcessResult = this.matching[id]
        if (matchPorcessResult == "success") {
            delete this.matching[id]
            return true
        }
        if (matchPorcessResult == undefined) {
            this.matching[id] = "processing"
            socket.send({
                action: "gen-text-match",
                data: {label: label}
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
                    this.matching[id] = "success"
                } else {
                    delete this.matching[id]
                }
            })
        }
        return false
    }
}
exports.ocr = new Ocr()