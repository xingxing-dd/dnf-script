var socket = require("../common/socket")
var assistant = require("./assistant")
var enter = require("./action/enter")

/**
 * 标记当前状态
 */
var action = enter.create()
var processing = false
var waitTimes = 0


var process = (targets) => {
    let initializationResult = assistant.initialization(targets)
    if (!initializationResult) {
        return
    }
    let coward = assistant.suitableTarget(targets["berserker"])
    console.info("定位【软蛋】坐标:" + JSON.stringify(coward) + "," + !coward)
    if (!coward) {
        randomAdjustCoward()
        return
    }
    let monsters = targets["attachable_monsters"]
    if (monsters) {
        attachMonster(coward, monsters, targets["skill"])
        return
    }
    let rewards = targets["reward"]
    if (rewards) {
        pickupReward(coward, rewards)
        return
    }
    var directionGuidance = assistant.suitableTarget(targets["direction_guidance"])
    console.info("定位【路标】坐标:" + JSON.stringify(directionGuidance))
    if (!directionGuidance) {
        if (waitTimes > 5) {
            randomAdjustCoward()
        } else {
            waitTimes = waitTimes + 1
        }
        return
    } 
    waitTimes = 0
    enterNext(coward, directionGuidance, targets["unblocked_portal"])
}

var randomAdjustCoward = () => {
    let pressCoordinate = assistant.randomAdjust()
    console.info("当前未识别到软蛋，生成随机移动操作坐标:" + JSON.stringify(pressCoordinate))
    press(pressCoordinate.x, pressCoordinate.y, 600)
}

var attachMonster = (coward, monsters, skills) => {
    let monster = assistant.findClosestTarget(coward, monsters)
    console.info("定位到【软蛋与可攻击怪物】坐标等信息:" + JSON.stringify(monster))
    if (!monster) {
        return
    }
    let pressCoordinate = assistant.moveJudgment(monster)
    console.info("生成攻击移动操作坐标:" + JSON.stringify(pressCoordinate))
    press(pressCoordinate.x, pressCoordinate.y, Math.round(monster.distance * 0.5))
    var attackSequence = assistant.attachJudgment(skills)
    console.info("生成攻击序列:" + JSON.stringify(attackSequence))
    for (var i in attackSequence) {
        var action = attackSequence[i]
        if (action.p) {
            press(action.c.x, action.c.y, action.p)
        } else {
            click(action.c.x, action.c.y)
        }
        if (action.w) {
            sleep(action.w)
        }
    }
}
var pickupReward = (coward, rewards) => {
    let reward = assistant.findClosestTarget(coward, rewards)
    console.info("定位到【软蛋与掉落物品】坐标等信息:" + JSON.stringify(reward))
    if (!reward) {
        return
    }
    let pressCoordinate = assistant.moveJudgment(reward)
    console.info("生成拾取掉落物品移动操作坐标:" + JSON.stringify(pressCoordinate))
    press(pressCoordinate.x, pressCoordinate.y, Math.round(reward.distance))
}
var enterNext = (coward, directionGuidance, unblockedPortals) => {
    console.info("地图清理完毕，前往传送门进入下一张地图")
    let target = assistant.findClosestTarget(directionGuidance, unblockedPortals)
    console.info("定位距离路标最近传送门："  + JSON.stringify(target))
    if (!target || target.distance > 500) {
        target = assistant.findClosestTarget(coward, [directionGuidance])
        console.info("定位到【传送门】不存在或者偏离路标，直接前往路标指示处:" + JSON.stringify(target))
    } else {
        target = assistant.findClosestTarget(coward, [target.rect])
        console.info("定位到【传送门】，直接前往传送门:" + JSON.stringify(target))
    }
    let pressCoordinate = assistant.moveJudgment(target)
    console.info("生成传送门移动操作坐标:" + JSON.stringify(pressCoordinate))
    press(pressCoordinate.x, pressCoordinate.y, Math.round(target.distance) + 200)
    recentGuidance = null
}


//打开游戏
exports.open = () => {
    desc("地下城与勇士：起源").findOne().click()
}

//进入地图
exports.enter = () => {
    // sleep(5000)
    // var whellX = (defaultPosition["whell"]["topX"] + defaultPosition["whell"]["bottomX"]) / 2
    // var whellY = (defaultPosition["whell"]["topY"] + defaultPosition["whell"]["bottomY"]) / 2
    // //进入地图
    // press(whellX - 120, whellY, 1000)
    // sleep(500)
    // //选择冒险级
    // click(185, 310)
    // sleep(500)
    // click(1430, 840)
    // sleep(500)
    // click(1620, 920)
}

//开始玩游戏
exports.start = () => {
    global.addTask("screen-detect", (before, after) => {
        // if (!action || action.name != "playing") {
        //     return
        // }
        if (processing) {
            return
        }
        processing = true
        socket.send({
            action: "screen-detect"  
        }, data => {
            if (data && data.targets) {
                process(data.targets)
            }
            processing = false
        })
    }, 2000)
    // global.addTask("operate-detect", () => {
    //     console.info(processing)
    //     if (processing) {
    //         return
    //     }
    //     processing = true
    //     socket.send({
    //         action: "operate-detect",
    //         data: {
    //             "target": action.next(),
    //             "deviceId":"xingxingdd"
    //         }
    //     }, (data, status) => {
    //         console.info("识别结果:" + JSON.stringify(data))
    //         if (data && data.result) {
    //             action.process(data.result)
    //         }
    //         if (status == "success") {
    //             processing=false
    //         }
    //     })
    // }, 1000)
    // global.addTask("screen-ocr", (before, after) => {
    //     before()
    //     socket.send({
    //         action: "screen-ocr"
    //     }, data => {
    //         console.info(JSON.stringify(data))
    //         if (data) {
    //             for (var i = action.current; i < action.pipeline.length; i++) {
    //                 for (var j in action.pipeline[i]["labels"]) {
    //                     for (var k in data.textBlocks) {
    //                         if (data.textBlocks[k].text.includes(action.pipeline[i]["labels"][j])) {
    //                             console.info("发现label:" + data.textBlocks[k].text + ",执行步骤为:" + i)
    //                             sleep(1000)
    //                             action.pipeline[i].action(data.textBlocks[k].box)
    //                             action.current = i + 1
    //                             if (action.current >= action.pipeline.length) {
    //                                 action = {
    //                                     name: "playing",
    //                                     pipeline: []
    //                                 }
    //                             }
    //                             return
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //         after()
    //     })
    // }, 2000)

    // if(intervalId) {
    //     clearInterval(intervalId)
    // }
    // intervalId = setInterval(() => {
    //     if (processing) {
    //         return
    //     }
    //     processing = true
    //     socket.send({
    //         action: "screen-detect"
    //     }, data => {
    //         console.info(JSON.stringify(data))
    //         if (data && data.targets) {
    //             process(data.targets)
    //         }
    //         processing = false
    //     })
    // }, 100)
}

exports.stop = () => {
    global.removeTask("operate-detect")
    global.removeTask("screen-detect")
    action = enter.create()
}