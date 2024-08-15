exports.display = () => {
    var utils = require("../common/utils")
    var socket = require("../common/socket")
    var global = require("../common/global")
    var game = require("../game/game")
    var { acquireEngine }   = require("../game/engine")
    var autoCloseTimer = null
    var executionStatus = false
    var w = floaty.window(
        <horizontal h="50sp">
            <img id="action_bar" w="38sp" h="38sp" padding="5sp" bg="#CCCCCC" src="file://./img/分类.png" alpha="0.5" radius="15sp"/>
            <horizontal id="ext_menus" visibility="gone" bg="#CCCCCC" alpha="0.8">
                <img id="execution" w="38sp" h="38sp" padding="5sp"  src="file://./img/播放.png" radius="15sp"/>
                <img id="setting" w="38sp" h="38sp" padding="5sp" src="file://./img/首页.png" radius="15sp"/>
                <img id="exit" w="38sp" h="38sp" padding="5sp" src="file://./img/退出.png" radius="15sp"/>
            </horizontal>
        </horizontal>
    );
    w.setSize(-2, -2);
    w.setPosition(0, 100)
    var ext_menus_show = () => {
        if (autoCloseTimer) {
            clearTimeout(autoCloseTimer)
        }
        w.ext_menus.attr("visibility", "visible")
        w.action_bar.attr("alpha", "0.8")
        w.action_bar.attr("src", "file://./img/失败.png")
        autoCloseTimer = setTimeout(() => ui.post(ext_menus_hide), 5000)
    }
    var ext_menus_hide = () => {
        w.ext_menus.attr("visibility", "gone")
        w.action_bar.attr("rotation", "0")
        w.action_bar.attr("alpha", "0.5")
        w.action_bar.attr("src", "file://./img/分类.png")
    }
    w.action_bar.click(() => {
        var visibility = w.ext_menus.attr("visibility")
        if (visibility == "gone") {
            ext_menus_show()
        } else {
            ext_menus_hide()
        }
    })
    w.execution.click(() => {
        utils.async(
            () => {},
            () => {
                if (!executionStatus) {
                    //socket.connect()
                    executionStatus = true
                    // game.open()
                    //game.enter()
                    //game.start()
                    acquireEngine().submit("111", "test1", (context) => {
                        console.info("获取到结果:" + context["count"])
                        return context["count"] >= 5
                    }, "test2", 1000)
                    acquireEngine().submit("111", "test2", (context) => {
                        let count = context["count"]
                        if (!count) {
                            count = 1
                        } else {
                            count = count + 1
                        }
                        context["count"] = count
                        console.info("test2执行" + context["count"])
                        return count >= 5
                    }, null, 5000)
                    acquireEngine().submit("112", "test3", (context) => {
                        console.info("test3执行")
                        return true
                    }, null, 1000)
                } else {
                    //game.stop()
                    executionStatus = false
                }
            },
            () => {
                if (executionStatus) {
                    w.execution.attr("src", "file://./img/播放中.png")
                } else {
                    w.execution.attr("src", "file://./img/播放.png")
                }},
            200
        )
    })
    w.setting.click(() => {
        // utils.async(
        //     () => {},
        //     () => {
        //         console.info(device.height)
        //         click(device.height - 50, 50)
        //         socket.connect()
        //         socket.send({
        //             action: "screen-ocr"
        //         }, data => {
        //             console.info(JSON.stringify(data))
        //         })
        //     },
        //     () => {}
        // )
    })
    w.exitOnClose()
    w.exit.click(() => {
        confirm("是否退出脚本?").then(value=>{
            if(value) {
                w.close()
            }
        })
    })
}