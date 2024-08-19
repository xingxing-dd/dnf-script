const socket = require("../../common/socket")
const Ocr = function() {
    this.matching = {},
    this.detect = function(context, id, rect, callback) {
        let matchPorcessResult = this.matching[id]
        if (matchPorcessResult == "success") {
            delete this.matching[id]
            return true
        }
        if (matchPorcessResult == undefined) {
            this.matching[id] = "processing"
            socket.send({
                action: "screen-text",
                data: rect
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
                this.matching[id] = "success"
            })
        }
        return false
    }
}
exports.ocr = new Ocr()