importPackage(Packages["okhttp3"]); //导入包
var config = require("./config").config()
var socket = null

exports.connect = () => {
    var client = new OkHttpClient.Builder().retryOnConnectionFailure(true).build()
    var request = new Request.Builder().url(config.wsServerUrl).build() //vscode  插件的ip地址，
    client.dispatcher().cancelAll();//清理一次
    listener = {
        onOpen: function (webSocket, response) {
            webSocket.send("客户端连接")
        },
        onMessage: function (webSocket, msg) { //msg可能是字符串，也可能是byte数组，取决于服务器送的内容
            print("msg")
            print(msg)
        },
        onClosing: function (webSocket, code, response) {
            print("正在关闭")
        },
        onClosed: function (webSocket, code, response) {
            print("已关闭")
        },
        onFailure: function (webSocket, t, response) {
            print("错误")
            print( t)
        }
    }
    socket= client.newWebSocket(request, new WebSocketListener(listener))
    return socket
}

exports.close = () => {
    socket.close()
}

exports.send = (message) => {
    socket.send(message)
}