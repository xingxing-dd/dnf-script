var utils = require("./common/utils")
var { engine }   = require("./game/engine")
"ui";
auto();
utils.loadContent("boot")
//主循环，保持进程不会关闭
setInterval(() => engine.boot(), 100)

events.on('exit', () => {
    //java.lang.System.exit(0);
})
