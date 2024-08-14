var socket = require("../common/socket")
exports.task = () => {
    socket.send({
        action: "screen-detect"  
    }, (data, status) => {
        console.info(data)
        if (!data || !data.result) {
            return
        }
        //process(data.targets)
        processing=false
    })
}