var globalVariable = {
    rocker: null,
    attack: null
}
var acquireRockerRandom = () => {
    return 155 - Math.floor(random() * 10)    
}

var acquireCoordinateRandom = (coordinate) => {
    return {
        x: coordinate.x + 5 - Math.floor(random() * 10),
        y: coordinate.y + 5 - Math.floor(random() * 10)  
    }
}

var acquirePressRectRandom = (rect) => {
    return {
        x: Math.floor(rect.x + rect.w / 2 + 5 - random() * 10),
        y: Math.floor(rect.y + rect.h / 2 + 5 - random() * 10)  
    }
}

var randomDirection = () => {
    const direction = Math.floor(Math.random() * 8) + 1;  
    const random = acquireRockerRandom()
    const directions = [  
        { x: random, y: 0 },  
        { x: random, y: random },  
        { x: 0, y: random },  
        { x: -random, y: random },  
        { x: -random, y: 0 },  
        { x: -random, y: -random },  
        { x: 0, y: -120 },  
        { x: random, y: -random }  
    ];  
    return directions[direction - 1];  
}
var randomRockerCoordinate  = (angleInDegrees) => {
    const random = acquireRockerRandom()
    if (angleInDegrees == 0 || angleInDegrees == 360) {
        return {x: random, y: 0}
    } else if (angleInDegrees == 90) {
        return {x: 0, y: random}
    } else if (angleInDegrees == 180) {
        return {x: -random, y: 0}
    } else if (angleInDegrees == 270) {
        return {x: 0, y: -random}
    }
    var angleInRadians = angleInDegrees * (Math.PI / 180);
    if ((angleInDegrees > 0 && angleInDegrees <= 45) || angleInDegrees >= 315) {
        return {x: random, y: random * Math.tan(angleInRadians)}
    } else if (angleInDegrees > 45 && angleInDegrees <= 135) {
        return {x: random / Math.tan(angleInRadians), y: random}
    } else if (angleInDegrees > 135 && angleInDegrees <= 225) {
        return {x: -random, y: -random * Math.tan(angleInRadians)}
    } else {
        return {x: -random / Math.tan(angleInRadians), y: -random}
    }
}
var angle = (p1, p2) => {    
    const dx = p2.x - p1.x;    
    const dy = p2.y - p1.y;    
    const radAngle = Math.atan2(dy, dx);  
    const degAngle = radAngle * (180 / Math.PI);
    return ((degAngle + 360) % 360); 
}  

var bottomCenter = (rect, c) => {  
    return {  
        x: rect.x + rect.w / 2,  
        y: c ? rect.y + rect.h /2 : rect.y + rect.h - 20 
    };  
} 
var maximalTarget = (items) => {
    if (!items || items.length == 0) {
        return null
    }
    let maxProbItem = null;
    let maxProb = -Infinity; 

    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        console.info("当前元素：" + JSON.stringify(item) + "，当前最大宽度:" + maxProb)
        if (item.w > maxProb) {
            maxProb = item.w;
            maxProbItem = item;
        }
    }
    return maxProbItem;
}
/**
 * 
 * @param {目标列表} items 
 * @returns 返回最适合的目标
 */
var suitableTarget = (items) => {
    if (!items || items.length == 0) {
        return null
    }
    let maxProbItem = null;
    let maxProb = -Infinity; 

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.prob > maxProb) {
            maxProb = item.prob;
            maxProbItem = item;
        }
    }
    return maxProbItem;
}
var initialization = (targets) => {
    if (!globalVariable.rocker) {
        let rocker = suitableTarget(targets["rocker"])
        if (rocker) {
            console.info("初始化【操作杆】坐标信息:" + JSON.stringify(rocker))
            globalVariable.rocker = {
                x: Math.round(rocker.x + rocker.w / 2),
                y: Math.round(rocker.y + rocker.h / 2)
            }   
            console.info("初始化【操作杆】坐标信息:" + JSON.stringify(globalVariable.rocker))
        }
    }
    if (!globalVariable.attack) {
        let attack = this.maximalTarget(targets["skill"])
        if (attack) {
            console.info("初始化【攻击键】坐标信息:" + JSON.stringify(attack))
            globalVariable.attack = {
                x: Math.round(attack.x + attack.w / 2),
                y: Math.round(attack.y + attack.h / 2)
            }   
            console.info("初始化【攻击键】坐标信息:" + JSON.stringify(globalVariable.attack))
        }
    }
    return globalVariable.rocker && globalVariable.attack
}
var distance = (p1, p2) => {       
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));  
}  
var findClosestTarget = (target, rects, c) => {  
    if (!target || !rects || rects.length == 0) {
        return null
    }
    let minDistance = Infinity;  
    let closestRect = null;  
    let closestAngle = 0;  

    for (let rect of rects) {  
        const rectBottomCenter = bottomCenter(rect, c);  
        const targetCenter = { x: target.x + target.w / 2, y: target.y + target.h };  
        const distanceToTarget = distance(targetCenter, rectBottomCenter);  

        if (distanceToTarget < minDistance) {  
            minDistance = distanceToTarget;  
            closestRect = rect;  
            closestAngle = angle(targetCenter, rectBottomCenter);  
        }   
    }  
    return {  
        rect: closestRect,  
        distance: minDistance,  
        angle: closestAngle  
    };  
} 
var moveJudgment = (p1) => {
    let coordinate = randomRockerCoordinate(p1.angle)
    console.info("根据角度:" + p1.angle + "生成随机坐标:" + JSON.stringify(coordinate))
    let pressCoordinate = {
        x: Math.round(globalVariable.rocker.x + coordinate.x),
        y: Math.round(globalVariable.rocker.y + coordinate.y)
    }
    return pressCoordinate
}
var attachJudgment = (skills) => {
    var attachQueue = [{
        c: acquireCoordinateRandom(globalVariable.attack),
        p: 500,
        w: 300
    }]
    if (skills && skills.length > 0) {
        attachQueue.push({
            c: acquirePressRectRandom(skills[Math.floor(random() * skills.length)]),
            w: 300
        })
    }
    attachQueue.push({
        c: acquireCoordinateRandom(globalVariable.attack),
        p: 300
    })
    return attachQueue
}
var randomAdjust = () => {
    let randomPosition = randomDirection()
    console.info("生成随机坐标:" + JSON.stringify(randomPosition))
    let pressCoordinate = {
        x: Math.round(globalVariable.rocker.x + randomPosition.x),
        y: Math.round(globalVariable.rocker.y + randomPosition.y)
    }
    return pressCoordinate
}

exports.maximalTarget = maximalTarget

exports.suitableTarget = suitableTarget

exports.initialization = initialization

exports.distance = distance

exports.findClosestTarget = findClosestTarget

exports.moveJudgment = moveJudgment

exports.attachJudgment = attachJudgment

exports.randomAdjust = randomAdjust