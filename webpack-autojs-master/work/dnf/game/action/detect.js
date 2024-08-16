const socket = require("../common/socket")
const ScreenDetector = function(callback) {
    this.status = "pending",
    this.target = target,
    this.callback = callback,
    this.detect = function() {
        if (this.status != 'pending') {
            return
        }
        this.status = 'processing'
        socket.send({
            action: "screen-detect"  
        }, (data, status) => {
            if (status != "success") {
                return
            }
            if (data && data.targets) {
                this.callback(data.targets)
            }
            this.status = 'pending'
        })
    }
}
exports.detect = (callback) => {
    const detector = new ScreenDetector(
        callback
    )
    return detector.detect
}