var utils = require("./common/utils")
var global = require("./common/global")
auto();
//加载主页
// utils.async(
//     () => utils.loadView("loading"),
//     utils.startServer,
//     () => utils.loadView("home", true),
//     1000
// )
utils.loadContent("home")
//主循环，保持进程不会关闭
setInterval(global.execTask, 200)

events.on('exit', () => {
    //java.lang.System.exit(0);
})
