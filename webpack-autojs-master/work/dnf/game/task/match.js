var socket = require("../common/socket")
exports.task = () => {
    socket.send({
        action: "screen-match"  
    }, (data, status) => {
        console.info(data)
        if (!data || !data.result) {
            return
        }
        //process(data.targets)
        processing=false
    })
}