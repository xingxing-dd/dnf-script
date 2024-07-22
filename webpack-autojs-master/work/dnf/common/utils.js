var config = require("./config").config()
exports.loadView = (view) => {
    console.info("加载页面：" + view)
    const module = require("../view/" + view)
    ui.setContentView(module.view())
    if (!module.action) {
        return
    }
    module.action()
}
exports.loadContent = (content, parent) => {
    console.log("加载页面：" + content)
    if (parent) {
        parent.close()
    }
    const compoment = require("../content/" + content)
    compoment.display()
    if (!compoment.action) {
        return
    }
    compoment.action()
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

exports.async = (before, task, after, delay) => {
    threads.start(() => {
        ui.post(before)
        task()
        console.info(delay)
        if (delay) {
            sleep(delay)
        }
        ui.post(after)
    });
}
exports.addTask = () => {
    
}
