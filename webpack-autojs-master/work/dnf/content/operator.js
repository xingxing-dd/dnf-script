var utils = require("../common/utils")
var server = require("../common/socket")
var game = require("../game/game")
var autoCloseTimer = null
var executionStatus = false

exports.display = () => {
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
                    server.connect()
                    executionStatus = true
                    game.open()
                    game.enter()
                    game.start()
                } else {
                    server.close()
                    executionStatus = false
                }
            },
            () => {
                if (executionStatus) {
                    w.execution.attr("src", "file://./img/播放中.png")
                } else {
                    w.execution.attr("src", "file://./img/播放.png")
                }},
            1500
        )
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