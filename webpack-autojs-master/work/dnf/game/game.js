var socket = require("../common/socket")
var levelIndex = 0
var levelDirection = ["down", "right", "right", "above", "right", "right", "right"]

var directin = null;

var defaultPosition = {
    "whell": {topX: 170, topY: 705, bottomX: 475, bottomY: 1000},
    attachBox: {x: 1690, y: 960}
}

var processing = false
var intervalId

var findMaxProbItem = (items) =>  {
    if (!items || items.length == 0) {
        return null
    }
    let maxProbItem = null;
    let maxProb = -Infinity; // 初始化为负无穷大

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.prob > maxProb) {
            maxProb = item.prob;
            maxProbItem = item;
        }
    }
    return maxProbItem;
}
var process = (targets) => {
    var player = findMaxProbItem(targets["berserker"])
    console.info("player>>>>>" + JSON.stringify(player))
    if (!player) {
        randomDirectionMove()
        return
    }
    var directionGuidance = findMaxProbItem(targets["direction_guidance"])
    console.info("directionGuidance>>>>>" + JSON.stringify(directionGuidance))
    if (directionGuidance) {
        directin = directionGuidance
    }
    var unblockedPortal = targets["unblocked_portal"]
    var attachableMonsters = targets["attachable_monsters"]
    console.info("unblockedPortal>>>>>" + JSON.stringify(unblockedPortal))
    if ((!directin && !attachableMonsters) || (!directin && !unblockedPortal && !attachableMonsters)) {
        randomDirectionMove()
        return
    }
    if (directionGuidance != null || (unblockedPortal != null && unblockedPortal.length > 0)) {
        console.info("传送门解封，准备进入下一个关卡")
        //传送门解封，准备进入下一个关卡
        enterNext(player, unblockedPortal)
        console.info("进入关卡完毕")
        return
    }
    if (!attachableMonsters) {
        return
    }
    attachMonsters(player, attachableMonsters)
}

var randomDirectionMove = () => {
    console.info("未识别能找到移动参照物，随机朝一个方向移动，寻找参照物")
    var randomPosition = getRandomDirection()
    console.info("生成随机移动方向坐标:" + JSON.stringify(randomPosition))
    var whellX = (defaultPosition["whell"]["topX"] + defaultPosition["whell"]["bottomX"]) / 2
    var whellY = (defaultPosition["whell"]["topY"] + defaultPosition["whell"]["bottomY"]) / 2
    press(Math.round(whellX + randomPosition.x),Math.round(whellY + randomPosition.y), 300)
}

var getRandomDirection = () => {  
    // 生成1到8之间的随机数  
    const direction = Math.floor(Math.random() * 8) + 1;  
  
    // 映射数组，按照你的描述定义  
    const directions = [  
        { x: 120, y: 0 },  
        { x: 120, y: 120 },  
        { x: 0, y: 120 },  
        { x: -120, y: 120 },  
        { x: -120, y: 0 },  
        { x: -120, y: -120 },  
        { x: 0, y: -120 },  
        { x: 120, y: -120 }  
    ];  
  
    // 返回对应方向的坐标  
    return directions[direction - 1];  
}  
  
var enterNext = (player, unblockedPortal) => {
    console.info("传送门解封，准备进入下一个关卡:" + (directin == null || directin.x == null))
    if (directin == null || directin.x == null) {
        return
    }
    var result = null
    if (unblockedPortal == null || unblockedPortal.length == 0) {
        result = findClosestRect(player, [directin])
        console.info("当前无解封传送门，前往路标指示处" + JSON.stringify(result))
    } else {
        result = findClosestRect(directin, unblockedPortal)
        console.info("最近的传送门：" + JSON.stringify(result))
        if (result.distance < 100) {
            result = findClosestRect(player, unblockedPortal) 
        } else {
            result = findClosestRect(player, [directin])
            console.info("当前识别最近传送门位置距离过远，前往路标指示处" + JSON.stringify(result))
        }
    }
    var p = calculateYCoordinate(result.angle)
    console.info("传送门解封，准备进入下一个关卡:" + JSON.stringify(p))
    var whellX = (defaultPosition["whell"]["topX"] + defaultPosition["whell"]["bottomX"]) / 2
    var whellY = (defaultPosition["whell"]["topY"] + defaultPosition["whell"]["bottomY"]) / 2
    console.info("传送门解封，准备进入下一个关卡:" + Math.round(whellX + p.x) + "," + Math.round(whellY + p.y))
    press(Math.round(whellX + p.x),Math.round(whellY +p.y), Math.round(result.distance))
}
/**
 * 攻击怪物
 */
var attachMonsters = (player, attachableMonsters) => {
    if (player == null || player.x == null || attachableMonsters == null) {
        return
    }
    console.log("开始寻怪进行攻击")
    var result = findClosestRect(player, attachableMonsters)
    console.info("最近的怪物：" + JSON.stringify(result))
    var p = calculateYCoordinate(result.angle)
    var whellX = (defaultPosition["whell"]["topX"] + defaultPosition["whell"]["bottomX"]) / 2
    var whellY = (defaultPosition["whell"]["topY"] + defaultPosition["whell"]["bottomY"]) / 2
    console.info("攻击最近的一个怪物:" + Math.round(whellX + p.x) + "," + Math.round(whellY + p.y - 30))
    press(Math.round(whellX + p.x),Math.round(whellY + p.y), Math.round(result.distance *0.5))
    press(defaultPosition.attachBox.x, defaultPosition.attachBox.y, 1000)
}
var calculateYCoordinate = (angleInDegrees) => {
    if (angleInDegrees == 0 || angleInDegrees == 360) {
        return {x: 100, y: 0}
    } else if (angleInDegrees == 90) {
        return {x: 0, y: 100}
    } else if (angleInDegrees == 180) {
        return {x: -100, y: 0}
    } else if (angleInDegrees == 270) {
        return {x: 0, y: -100}
    }
    // 将角度从度转换为弧度
    var angleInRadians = angleInDegrees * (Math.PI / 180);
    if ((angleInDegrees > 0 && angleInDegrees <= 45) || angleInDegrees >= 315) {
        return {x: 150, y: 150 * Math.tan(angleInRadians)}
    } else if (angleInDegrees > 45 && angleInDegrees <= 135) {
        return {x: 150 / Math.tan(angleInRadians), y: 150}
    } else if (angleInDegrees > 135 && angleInDegrees <= 225) {
        return {x: -150, y: -150 * Math.tan(angleInRadians)}
    } else {
        return {x: -150 / Math.tan(angleInRadians), y: -150}
    }
}

function distance(p1, p2) {       
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));  
}  

function angle(p1, p2) {    
    console.log("计算，p1:" + JSON.stringify(p1) + ",p2:" + JSON.stringify(p2))
    const dx = p2.x - p1.x;    
    const dy = p2.y - p1.y;    
    const radAngle = Math.atan2(dy, dx);  // 计算弧度角度  
    const degAngle = radAngle * (180 / Math.PI); // 转换为度  
    // 如果需要，确保角度为正数  
    return ((degAngle + 360) % 360); // 加360后取模，确保结果为正数  
}  

function calculateBottomCenter(rect) {  
    return {  
        x: rect.x + rect.w / 2,  
        y: rect.y + rect.h  
    };  
}  

function findClosestRect(target, rects) {  
    let minDistance = Infinity;  
    let closestRect = null;  
    let closestAngle = 0;  

    for (let rect of rects) {  
        const bottomCenter = calculateBottomCenter(rect);  
        const distanceToTarget = distance(target, bottomCenter);  

        if (distanceToTarget < minDistance) {  
            minDistance = distanceToTarget;  
            closestRect = rect;  
            const targetCenter = { x: target.x + target.w / 2, y: target.y + target.h - 20 };  
            closestAngle = angle(targetCenter, bottomCenter);  
        }   
    }  
    return {  
        rect: closestRect,  
        distance: minDistance,  
        angle: closestAngle  
    };  
}  
//打开游戏
exports.open = () => {
    desc("地下城与勇士：起源").findOne().click()
}

//进入地图
exports.enter = () => {
    sleep(5000)
    var whellX = (defaultPosition["whell"]["topX"] + defaultPosition["whell"]["bottomX"]) / 2
    var whellY = (defaultPosition["whell"]["topY"] + defaultPosition["whell"]["bottomY"]) / 2
    //进入地图
    press(whellX - 120, whellY, 1000)
    sleep(500)
    //选择冒险级
    click(185, 310)
    sleep(500)
    click(1430, 840)
    sleep(500)
    click(1620, 920)
}

//开始玩游戏
exports.start = () => {
    // socket.send({
    //     action: "detection"
    // }, data => {
    //     console.info(JSON.stringify(data))
    //     if (!data || processing) {
    //         return
    //     }
    //     processing = true
    //     process(data.targets)
    //     processing = false
    // })
    for(;;) {
        if (processing) {
            return
        }
        processing = true
        socket.send({
            action: "detection"
        }, data => {
            console.info(JSON.stringify(data))
            if (data && data.targets) {
                process(data.targets)
            }
            processing = false
        })
        sleep(500)
    }
}

exports.stop = () => {
    if(intervalId) {
        clearInterval(intervalId)
    }
}