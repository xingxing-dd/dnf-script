const socket = require("../../common/socket")
const ScreenDetector = function() {
    this.status = "pending",
    this.bottomCenter = function(box) {
        return {
            x: box.x + box.w / 2,
            y: box.y + box.h / 2
        }
    },
    this.angleCalcul = function(source, target) {
        const dx = target.x - source.x    
        const dy = target.y - source.y    
        const radAngle = Math.atan2(dy, dx)  
        const degAngle = radAngle * (180 / Math.PI)
        return ((degAngle + 360) % 360) 
    },
    this.distanceCalcul = function(source, target) {
        return Math.sqrt(Math.pow(target.x - source.x, 2) + Math.pow(target.y - source.y, 2))  
    },
    this.suitableTarget = function(targets) {
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
    },
    this.findClosest = function(source, targets) {
        if (!source || !targets) {
            return
        }
        const sourceCenter = bottomCenter(source);  
        let minDistance = 999999;  
        let closestTarget = null;  
        let closestAngle = null;  
        for (let target of targets) {  
            const targetCenter = bottomCenter(target);  
            const distance = distance(sourceCenter, targetCenter);  

            if (distance < minDistance) {  
                minDistance = distance;  
                closestTarget = target;  
                closestAngle = angleCalcul(sourceCenter, targetCenter);  
            }   
        }  
        return {  
            target: closestTarget,  
            distance: minDistance,  
            angle: closestAngle  
        }; 
    },
    this.findFarthest = function(source, targets) {
        if (!source || !targets) {
            return
        }
        const sourceCenter = bottomCenter(source);  
        let maxDistance = 0;  
        let farthestTarget = null;  
        let farthestAngle = null;  
        for (let target of targets) {  
            const targetCenter = bottomCenter(target);  
            const distance = distance(sourceCenter, targetCenter);  
            if (distance < minDistance) {  
                maxDistance = distance;  
                farthestTarget = target;  
                farthestAngle = angleCalcul(sourceCenter, targetCenter);  
            }   
        }  
        return {  
            target: farthestTarget,  
            distance: maxDistance,  
            angle: farthestAngle  
        }; 
    },
    this.suitableDoor = function(coward, guidance, doors) {
        if (!coward || !guidance) {
            return null
        }
        let result = this.findClosest(guidance, doors)
        if (!result || result.distance > 100) {
            return null
        }
        return this.findClosest(coward, [result.target])
    },
    this.process = function(context, result) {
        context["objects"] = {}
        let coward = this.suitableTarget(result["coward"])
        let rocker = {}
        let monster = this.findClosest(coward, result["monster"])
        let reward = this.findClosest(coward, result["reward"])
        let guidance = this.findFarthest(coward, result["guidance"])
        let door = this.suitableDoor(coward, guidance, result["door"])
        context["objects"] = {
            coward: coward,
            rocker: rocker,
            monster: monster,
            reward: reward,
            door: door,
            guidance: guidance
        }
    },
    this.detect = function(context, callback) {
        if (this.status == 'pending') {
            this.status = 'processing'
            socket.send({
                action: "screen-detect"  
            }, (data, status) => {
                if (status != "success") {
                    return
                }
                console.info("识别结果：" + JSON.stringify(data))
                this.process(context, data)
                if (callback) {
                    callback(context, data)
                }
                this.status = 'pending'
            })
        }
    }
}
exports.detector = new ScreenDetector()