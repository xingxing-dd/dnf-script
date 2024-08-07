importPackage(Packages["okhttp3"]); //导入包
var config = require("./config").config()
var socket = null
var client = null
var status = "closed"
var callback = {}
var generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
}

var createConnection = () => {
    client = new OkHttpClient.Builder().retryOnConnectionFailure(true).build()
    var request = new Request.Builder().url(config.wsServerUrl).build() //vscode  插件的ip地址，
    client.dispatcher().cancelAll();//清理一次
    listener = {
        onOpen: function (webSocket, response) {
            webSocket.send("客户端连接")
            ui.post(() => toast("客户端连接成功！"))
            status = "success"
        },
        onMessage: function (webSocket, msg) { //msg可能是字符串，也可能是byte数组，取决于服务器送的内容
            var obj = JSON.parse(msg)
            if (!obj) {
                return
            }
            if (callback[obj.requestId]) {
                callback[obj.requestId](obj.data, obj.status)
            }
            //console.info("是否需要执行返回ack:" + obj.requiredAck)
            if (obj.requiredAck) {
                var ack = {
                    "action": "client-ack",
                    "requestId": obj.requestId
                }
                sleep(200)
                webSocket.send(JSON.stringify(ack))
            }
            if (obj.status == "processing") {
                return
            }
            if (!callback[obj.requestId]) {
                return
            }
            delete callback[obj.requestId]
        },
        onClosing: function (webSocket, code, response) {
            print("正在关闭")
            status = "closed"
            socket == null
        },
        onClosed: function (webSocket, code, response) {
            print("已关闭")
            status = "closed"
            socket == null
        },
        onFailure: function (webSocket, t, response) {
            print(t)
            ui.post(() => toast("服务端连接断开!"))
            status = "closed"
            socket == null
        }
    }
    socket= client.newWebSocket(request, new WebSocketListener(listener))
    status = "pending"
}

exports.connect = () => {
    for (var retryTimes = 0; retryTimes < 5; retryTimes++) {
        if(status == 'success') {
            return
        }
        createConnection()
        while(status == 'pending') {
            sleep(500)
        }
        if(status == 'success') {
            return
        }
        console.info("连接失败，开始重试:" + retryTimes)
        sleep(2000)
    }
}

exports.close = () => {
    if (socket == null) {
        return
    }
    socket.close()
}

exports.send = (message, func) => {
    if (socket == null) {
        createConnection()
    }
    var requestId = generateUUID()
    message.requestId = requestId
    callback[requestId] = func
    console.info("发送消息:" + JSON.stringify(message))
    socket.send(JSON.stringify(message))
}