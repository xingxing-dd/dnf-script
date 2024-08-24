exports.display = () => {
    var utils = require("../common/utils")
    var socket = require("../common/socket")
    var game = require("../game/game")
    var { detector } = require("../game/action/detector")
    var { matcher } = require("../game/action/matcher")
    var { ocr } = require("../game/action/ocr")
    var { engine }   = require("../game/engine")
    var { cache } = require("../common/utils")
    const keyboard = require("../game/pipeline/keyboard")
    var autoCloseTimer = null
    var executionStatus = false
    var w = floaty.rawWindow(
        <horizontal h="50sp">
            <img id="action_bar" w="38sp" h="38sp" padding="5sp" bg="#CCCCCC" src="file://./img/分类.png" alpha="0.5" radius="15sp"/>
            <horizontal id="ext_menus" visibility="gone" bg="#CCCCCC" alpha="0.8">
                <img id="execution" w="38sp" h="38sp" padding="5sp"  src="file://./img/播放.png" radius="15sp"/>
                <img id="home" w="38sp" h="38sp" padding="5sp" src="file://./img/首页.png" radius="15sp"/>
                <img id="exit" w="38sp" h="38sp" padding="5sp" src="file://./img/退出.png" radius="15sp"/>
            </horizontal>
        </horizontal>
    );
    w.setSize(-2, -2);
    w.setPosition(0, 300)
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
                    // acquireEngine().submit("111", "test1", (context) => {
                    //     console.info("获取到结果:" + context["count"])
                    //     return context["count"] >= 5
                    // }, "test2", 1000)
                    // acquireEngine().submit("111", "test2", (context) => {
                    //     let count = context["count"]
                    //     if (!count) {
                    //         count = 1
                    //     } else {
                    //         count = count + 1
                    //     }
                    //     context["count"] = count
                    //     console.info("test2执行" + context["count"])
                    //     return count >= 5
                    // }, null, 5000)
                    // acquireEngine().submit("112", "test3", (context) => {
                    //     console.info("test3执行")
                    //     return true
                    // }, null, 1000)
                    //var detector = createDetector()
                    //acquireEngine().submit("111", "detect", (context) => detector.detect(context), null, 5000)
                    //engine.submit("111", "match1", (context) => matcher.match(context, "1"), null, 1000)
                    //engine.submit("111", "match2", (context) => matcher.match(context, "2"), "match1", 1000)
                    //engine.submit("111", "match3", (context) => matcher.match(context, "3"), "match2", 1000)
                    // engine.submit("111", "match4", (context) => matcher.match(context, "4", (data) => cache("skill_4", data)), null, 1000)
                    //engine.submit("111", "match5", (context) => matcher.match(context, "5"), "match4", 1000)
                    // engine.submit("111", "match6", (context) => matcher.match(context, "6", (data) => cache("skill_6", data)), "match4", 1000)
                    // engine.submit("111", "match7", (context) => matcher.match(context, "7", (data) => cache("skill_7", data)), "match6", 1000)
                    // engine.submit("111", "match8", (context) => matcher.match(context, "8", (data) => cache("skill_8", data)), "match7", 1000)
                    // engine.submit("111", "match9", (context) => matcher.match(context, "9", (data) => cache("skill_9", data)), "match8", 1000)
                    // engine.submit("111", "match10", (context) => matcher.match(context, "10", (data) => cache("skill_10", data)), "match9", 1000)
                    // engine.submit("111", "match11", (context) => matcher.match(context, "11", (data) => cache("skill_11", data)), "match10", 1000)
                    // engine.submit("111", "match12", (context) => matcher.match(context, "12", (data) => cache("skill_12", data)), "match11", 1000)
                    // engine.submit("111", "match13", (context) => matcher.match(context, "13", (data) => cache("skill_13", data)), "match12", 1000)
                    // engine.submit("111", "match14", (context) => matcher.match(context, "14", (data) => cache("skill_14", data)), "match13", 1000)
                    // engine.submit("111", "match15", (context) => matcher.match(context, "15", (data) => cache("skill_15", data)), "match14", 1000)
                    // engine.submit("111", "match16", (context) => matcher.match(context, "16", (data) => cache("skill_16", data)), "match15", 1000)
                    // engine.submit("111", "match17", (context) => matcher.match(context, "17", (data) => cache("skill_17", data)), "match15", 1000)
                    // engine.submit("111", "match19", (context) => matcher.match(context, "19", (context, data) => {
                    //     context["rect"] = {
                    //         x: data.x + data.w,
                    //         y: data.y,
                    //         w: data.w * 3,
                    //         h: data.h
                    //     }
                    // }), null, 1000)
                    // engine.submit("111", "match17", (context) => ocr.detect(context, "111", "2009年的秋天", (context, data) => { }), null, 1000)
                    // engine.submit("111", "match18", (context) => ocr.detect(context, "111", "2009年玩红眼", (context, data) => { }), "match17", 1000)
                    // engine.submit("111", "match19", (context) => ocr.detect(context, "111", "鸡哔伱呦", (context, data) => { }), "match18", 1000)
                    // engine.submit("111", "match20", (context) => ocr.detect(context, "111", "且吃我一脚", (context, data) => { }), "match19", 1000)
                    // engine.submit("111", "match21", (context) => ocr.detect(context, "111", "星仔的修罗", (context, data) => { }), "match20", 1000)
                    // engine.start()
                    requestScreenCapture(true)
                    keyboard.init()
                } else {
                    //game.stop()
                    engine.pause()
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
    w.home.click(() => {
        utils.loadContent("home")
    })
    w.exitOnClose()
    w.exit.click(() => {
        confirm("是否退出脚本?").then(value=>{
            if(value) {
                socket.close()
                w.close()
            }
        })
    })
}