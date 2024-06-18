const serverHost = "192.168.0.102:8080"
const serverAppDir = "/data/local/tmp/"
exports.loadView = (view) => {
    ui.setContentView(require("../view/" + view).view())
}

exports.downloadServer = () => {
    log(serverHost + "/api/resource/download/v0.0.1")
    var response = http.get(serverHost + "/api/resource/download/v0.0.1")
    if (response.statusCode != 200) {
        toast("更新系统失败，请重新启动")
        return
    }
    toast("更新系统成功，马上开始安装更新")
    var app = response.body.bytes()
    files.writeBytes(files.getSdcardPath() + "/dnf-server.apk", app)
    var command = "pm install -g " + files.getSdcardPath() + "/dnf-server.apk"
    log(command)
    shell("pm install -g " + files.getSdcardPath() + "/dnf-server.apk" );
    toast("安装更新系统成功")
    log(shell("pm list features").result);
}