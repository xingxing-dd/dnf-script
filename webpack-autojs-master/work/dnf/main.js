var utils = require("./common/utils")
var { acquireEngine }   = require("./game/engine")
auto();
utils.loadContent("home")
//主循环，保持进程不会关闭
setInterval(() => {
    const engine = acquireEngine()
    if (!engine) {
        return
    }
    engine.boot()
}, 100)

events.on('exit', () => {
    //java.lang.System.exit(0);
})
