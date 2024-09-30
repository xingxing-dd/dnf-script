exports.display = () => {
    var utils = require("../common/utils")
    var socket = require("../common/socket")
    var game = require("../game/game")
    var { detector } = require("../game/action/detector")
    var { matcher } = require("../game/action/matcher")
    var { createProcessor } = require("../game/action/processor")
    var { ocr } = require("../game/action/ocr")
    var { engine }   = require("../game/engine")
    var { cache } = require("../common/utils")
    const { plugin } = require("../common/utils")
    const keyboard = require("../game/pipeline/keyboard")
    const { createCoward } = require("../game/object/coward")
    const { debuger } = require("../common/debuger")
    const { createDungeons } = require("../game/scene/dungeons")
    const { match, debug } = require("../game/test")
    const { scheduler } = require("../game/core/scheduler")
    var autoCloseTimer = null
    var executionStatus = false
    var w = floaty.rawWindow(
        <horizontal h="50sp">
            <img id="action_bar" w="38sp" h="38sp" padding="5sp" bg="#CCCCCC" src="file://./img/分类.png" alpha="0.5" radius="15sp"/>
            <horizontal id="ext_menus" visibility="gone" bg="#CCCCCC" alpha="0.8">
                <img id="execution" w="38sp" h="38sp" padding="5sp"  src="file://./img/播放.png" radius="15sp"/>
                <img id="setting" w="38sp" h="38sp" padding="5sp"  src="file://./img/设置.png" radius="15sp"/>
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
    let bwj = createDungeons({
        name: "布万家修炼场",
        map: {
            template: "dungeons/buwanjia/map",
            region: [0.3, 0.7, 0.3, 0.7],
            row: 3,
            col: 6
        },
        routes: {












        }
    })
    
    let coward = createCoward({
        skills: {
            "1": {
                label: "普通攻击",
                cooling: 0,
                press: 600,
                cast: 50
            },
            "2": {
                label: "十字斩",
                cooling: 4000,
                press: 50,
                cast: 200
            },
            "3": {
                label: "崩山击",
                cooling: 5000,
                press: 0,  
                cast: 500
            },
            "4": {
                label: "愤怒狂刃",
                cooling: 20000,
                press: 0,
                cast: 1000
            },
            "5": {
                label: "捕梦之手",
                cooling: 9100,
                press: 0,
                cast: 200
            },
            "6": {
                label: "怒气爆发",
                cooling: 20000,
                press: 0,
                cast: 200
            },
            "7": {
                label: "绝念除尘击",
                cooling: 20000,
                press: 5000,
                cast: 600
            },
            "8": {
                label: "爆发之刃",
                cooling: 20000,
                press: 0,
                cast: 400
            },
            "9": {
                label: "暴走",
                cooling: 5000,
                press: 0,
                cast: 50
            },
            "10": {
                label: "愤怒",
                cooling: 60000,
                press: 300,
                cast: 50
            },
            "11": {
                label: "崩山裂地",
                cooling: 40000,
                press: 0,
                cast: 600
            },
            "12": {
                label: "暗狱魔刹",
                cooling: 145000,
                press: 0,
                cast: 200
            }
        }
    })
    w.execution.click(() => { 
        utils.async(
            () => {},
            () => {
                scheduler.switch()
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
                    // let index = bwj.acquireLevel()
                    // console.info("得到房间号：" + index)
                    // let capture = captureScreen()
                    // let bitmap = capture.getBitmap()
                    // let result = plugin.match(bitmap, "dungeons/buwanjia/map", [0.4, 0.8, 0.3, 0.7])
                    // debuger.add(result)
                    // console.info(JSON.stringify(result))
                    // result = plugin.match(bitmap, "common/position", [0.3, 0.7, 0.3, 0.7])
                    // console.info(JSON.stringify(result))
                    // debuger.add(result)
                    // engine.submit("111", "detect", (context) => detector.detect(context), 200)
                    // let processor = createProcessor({
                    //     coward: coward,
                    //     dungeons: bwj
                    // })
                    // engine.submit("111", "process", (context) => processor.process(context), 300, null)
                    // engine.comfirm("111")
                    // engine.start()
                    // engine.submit("test11", [
                    //     {
                    //         name: "测试任务1",
                    //         execute: () => console.info("执行"),
                    //         interval: 1000,
                    //         retry: 10,
                    //         before: () => console.info("前置动作"),
                    //         after: () => console.info("后置动作")
                    //     }
                    // ])
                    // engine.start()
                    //coward.fight([{code:"1"}, {code:"1"}])
                    
                } else {
                    //game.stop()
                    // engine.pause()
                    // executionStatus = false
                }
            },
            () => {
                if (engine.switch()) {
                    w.execution.attr("src", "file://./img/播放中.png")
                } else {
                    w.execution.attr("src", "file://./img/播放.png")
                }},
            200
        )
    })
    w.setting.click(() => {
        utils.async(
            () => {},
            () => {
                // requestScreenCapture(true)
                //keyboard.init()
                //debug()
                match()
            },
            () => {}
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