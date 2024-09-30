const bottomCenter = function(bounds) {
    return {
        x: bounds.x + bounds.w / 2,
        y: bounds.y + bounds.h
    }
}
const angleCalcul = function(source, target) {
    const dx = target.x - source.x    
    const dy = target.y - source.y    
    const radAngle = Math.atan2(dy, dx)  
    const degAngle = radAngle * (180 / Math.PI)
    return ((degAngle + 360) % 360) 
}
const distanceCalcul = function(source, targets) {
    let distances = []
    let sourceCenter = bottomCenter(source)
    for (let index = 0; index < targets.length; index++) {
        let target = targets[index]
        let targetCenter = bottomCenter(target)
        distances.push({
            target: target,
            sourceCenter: sourceCenter,
            targetCenter: targetCenter,
            distance: Math.sqrt(Math.pow(targetCenter.x - sourceCenter.x, 2) + Math.pow(targetCenter.y - sourceCenter.y, 2))
        })
    }
    return distances 
}
const suitableTarget = function(targets) {
    if (!targets || targets.length == 0) {
        return null
    }
    let maxProbItem = null;
    let maxProb = -Infinity; 

    for (let i = 0; i < targets.length; i++) {
        const target = targets[i];
        if (target.prob > maxProb) {
            maxProb = target.prob;
            maxProbItem = target;
        }
    }
    return maxProbItem;
}
const findClosest = function(source, targets) {
    if (!source || !targets || targets.length == 0) {
        return
    }
    let closestResult = {distance: 999999}
    let distances = distanceCalcul(source, targets)
    for (let d of distances) {
        if (closestResult["distance"] < d.distance) {
            continue
        }
        closestResult["distance"] = d.distance
        closestResult["angle"] = angleCalcul(d.sourceCenter, d.targetCenter); 
        closestResult["target"] = d.target
        closestResult["p1"] = d.sourceCenter
        closestResult["p2"] = d.targetCenter
    }
    return closestResult
}
const findFarthest = function(source, targets) {
    console.info("source:" + JSON.stringify(source) + ",target:" + JSON.stringify(targets))
    if (!source || !targets) {
        return
    }
    let farthestResult = {distance: 0}
    let distances = distanceCalcul(source, targets)
    console.log("计算距离:" + JSON.stringify(distances))
    for (let d of distances) {
        if (farthestResult["distance"] > d.distance) {
            continue
        }
        farthestResult["distance"] = d.distance
        farthestResult["angle"] = angleCalcul(d.sourceCenter, d.targetCenter); 
        farthestResult["target"] = d.target
        farthestResult["p1"] = d.sourceCenter
        farthestResult["p2"] = d.targetCenter
    }
    return farthestResult
}
const rockerCoordinate = function(rocker, angleInDegrees) {
    if (!angleInDegrees) {
        return null
    }
    let centerX = rocker.x + Math.round(rocker.w / 2)
    let centerY = rocker.y + Math.round(rocker.h / 2)
    let random = 155 - Math.floor(Math.random() * 10)
    if (angleInDegrees == 0 || angleInDegrees == 360) {
        return {x: random + centerX, y: centerY}
    } else if (angleInDegrees == 90) {
        return {x: centerX, y: random + centerY}
    } else if (angleInDegrees == 180) {
        return {x: -random + centerX, y: centerY}
    } else if (angleInDegrees == 270) {
        return {x: centerX, y: -random + centerY}
    }
    console.log("angleInDegrees:" + angleInDegrees)
    var angleInRadians = angleInDegrees * (Math.PI / 180);
    console.log("angleInRadians:" + angleInRadians)
    if ((angleInDegrees > 0 && angleInDegrees <= 45) || angleInDegrees >= 315) {
        return {x: random + centerX, y: random * Math.tan(angleInRadians) + centerY}
    } else if (angleInDegrees > 45 && angleInDegrees <= 135) {
        return {x: random / Math.tan(angleInRadians) + centerX, y: random + centerY}
    } else if (angleInDegrees > 135 && angleInDegrees <= 225) {
        return {x: -random + centerX, y: -random * Math.tan(angleInRadians) + centerY}
    } else {
        return {x: -random / Math.tan(angleInRadians) + centerX, y: -random + centerY}
    }
}

exports.suitableTarget = suitableTarget
exports.findClosest = findClosest
exports.findFarthest = findFarthest
exports.rockerCoordinate = rockerCoordinate
