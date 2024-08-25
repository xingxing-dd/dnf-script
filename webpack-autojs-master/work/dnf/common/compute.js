exports.compute = {
    bottomCenter: function(bounds) {
        return {
            x: bounds.x + bounds.w / 2,
            y: bounds.y + bounds.h
        }
    },
    angleCalcul: function(source, target) {
        const dx = target.x - source.x    
        const dy = target.y - source.y    
        const radAngle = Math.atan2(dy, dx)  
        const degAngle = radAngle * (180 / Math.PI)
        return ((degAngle + 360) % 360) 
    },
    distanceCalcul: function(source, targets) {
        let distances = []
        let sourceCenter = this.bottomCenter(source)
        for (let target of targets) {
            let targetCenter = this.bottomCenter(target)
            distances.push({
                target: target,
                sourceCenter: sourceCenter,
                targetCenter: targetCenter,
                distance: Math.sqrt(Math.pow(targetCenter.x - sourceCenter.x, 2) + Math.pow(targetCenter.y - sourceCenter.y, 2))
            })
        }
        return distances 
    },
    suitableTarget: function(targets) {
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
    findClosest: function(source, targets) {
        if (!source || !targets) {
            return
        }
        let closestResult = {distance: 999999}
        let distances = this.distanceCalcul(source, targets)
        for (let d of distances) {
            if (closestResult["distance"] < d.distance) {
                continue
            }
            closestResult["distance"] = d.distance
            closestResult["angle"] = this.angleCalcul(d.sourceCenter, d.targetCenter); 
            closestResult["target"] = d.target
            closestResult["p1"] = d.sourceCenter
            closestResult["p2"] = d.targetCenter
        }
        return closestResult
    },
    findFarthest: function(source, targets) {
        if (!source || !targets) {
            return
        }
        let farthestResult = {distance: 0}
        let distances = this.distanceCalcul(source, targets)
        for (let d of distances) {
            if (farthestResult["distance"] > d.distance) {
                continue
            }
            farthestResult["distance"] = d.distance
            farthestResult["angle"] = this.angleCalcul(d.sourceCenter, d.targetCenter); 
            farthestResult["target"] = d.target
            farthestResult["p1"] = d.sourceCenter
            farthestResult["p2"] = d.targetCenter
        }
        return farthestResult
    }
}