var config = require("./config").config()
exports.loadView = (view) => {
    ui.setContentView(require("../view/" + view).view())
}

exports.downloadServer = () => {
    log(config)
    log(config.httpServerUrl + "/api/resource/download/v0.0.1")
    var response = http.get(config.httpServerUrl + "/api/resource/download/v0.0.1")
    if (response.statusCode != 200) {
        toast("更新系统失败，请重新启动")
        return
    }
    toast("更新系统成功，马上开始安装更新")
    var app = response.body.bytes()
    files.writeBytes(files.getSdcardPath() + "/dnf-server.apk", app)
    var command = "install -g " + files.getSdcardPath() + "/dnf-server.apk"
    log(command)
    shell("install -g " + files.getSdcardPath() + "/dnf-server.apk" )
    toast("安装更新系统成功")
    log(shell("pm list features").result)
}

exports.startServer = () => {
    var result = app.startActivity({
        packageName: "info.xingxingdd.dnf",
        className: "info.xingxingdd.dnf.component.DnfServerActivity"
    })
    console.info("启动服务结果：", result)
    return result
}

exports.connectServer = () => {

}