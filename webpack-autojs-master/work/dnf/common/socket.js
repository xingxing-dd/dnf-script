importPackage(Packages["okhttp3"]); //导入包
var config = require("./config").config()
var socket = null
var callback = {}
var generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
}

exports.connect = () => {
    var client = new OkHttpClient.Builder().retryOnConnectionFailure(true).build()
    var request = new Request.Builder().url(config.wsServerUrl).build() //vscode  插件的ip地址，
    client.dispatcher().cancelAll();//清理一次
    listener = {
        onOpen: function (webSocket, response) {
            webSocket.send("客户端连接")
        },
        onMessage: function (webSocket, msg) { //msg可能是字符串，也可能是byte数组，取决于服务器送的内容
            var obj = JSON.parse(msg)
            if (!obj) {
                return
            }
            callback[obj.requestId](obj.data)
            if (obj.status == "pending") {
                return
            }
            delete callback[obj.requestId]
        },
        onClosing: function (webSocket, code, response) {
            print("正在关闭")
        },
        onClosed: function (webSocket, code, response) {
            print("已关闭")
        },
        onFailure: function (webSocket, t, response) {
            print("错误")
            print(response)
            print( t)
        }
    }
    socket= client.newWebSocket(request, new WebSocketListener(listener))
    return socket
}

exports.close = () => {
    socket.close()
}

exports.send = (message, func) => {
    var requestId = generateUUID()
    message.requestId = requestId
    callback[requestId] = func
    console.info(JSON.stringify(message))
    socket.send(JSON.stringify(message))
}