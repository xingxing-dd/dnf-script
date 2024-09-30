const { debuger } = require("../../../common/debuger")
const { plugin } = require("../../../common/utils")
const { findClosest, findFarthest, suitableTarget } = require("../../../common/compute")
const GameDetectProcessor = function() {
    this.finish = false,
    this.level = 1,
    this.refresh = function(coward, objects) {
        coward.refresh(suitableTarget(objects) || {})
        if (objects == undefined) {
            console.log("角色未识别到")
        } 
        return coward
    },
    this.adjust = function(coward) {
        if (!coward || !coward.bounds) {
            return
        }
        let w = Math.max(device.width, device.height)
        let h = Math.min(device.width, device.height)
        if (coward.bounds.x <= w / 2 && coward.bounds.y <= h / 2) {
            coward.move({angle: 45, distance: 100})
        }
        if (coward.bounds.x <= w / 2 && coward.bounds.y > h / 2) {
            coward.move({angle: 315, distance: 100})
        }
        if (coward.bounds.x > w / 2 && coward.bounds.y <= h / 2) {
            coward.move({angle: 135, distance: 100})
        }
        if (coward.bounds.x > w / 2 && coward.bounds.y > h / 2) {
            coward.move({angle: 225, distance: 100})
        }
    }
    this.cont = function(conts) {
        let cont = suitableTarget(conts)
        console.info("识别到继续：" + (!cont || !cont.x))
        if (!cont || !cont.x) {
            return false
        }
        click(cont.x + cont.w / 2, cont.y + cont.h / 2)
        sleep(1000)
        let capture = captureScreen()
        let bitmap = capture.getBitmap()
        let target = plugin.match(bitmap, "common/confirm", [0.3, 0.7, 0.3, 0.7])
        console.info("识别到确认按钮:" + JSON.stringify(target))
        if (target == undefined) {
            return true
        }
        click(target.x + target.w / 2, target.y + target.h / 2)
        return true
    }
    this.figth = function(level, monsters, coward) {
        console.info(JSON.stringify(monsters))
        if (!monsters || monsters.length == 0) {
            return false
        }
        let closest = findClosest(coward.bounds, monsters)
        // debuger.refresh()
        // debuger.addLine({x1:closest.p1.x,y1:closest.p1.y,x2:closest.p2.x,y2:closest.p2.y})
        coward.move(closest)
        if (this.finish) {
            console.info("清图之后第一次遇到怪物,释放大技能")
            let skills = ["4", "7", "8", "11"]
            let random = Math.round(Math.random() * 5)
            coward.fight([{code:skills[random]}, {code:"1"}])
            this.finish = false
        } else {
            let skills = ["2", "5", "3", "6", "9"]
            let random = Math.round(Math.random() * 2)
            coward.fight([{code:skills[random]}, {code:"1"}])
        }
        return true
    },
    this.pickup = function(rewards, coward) {
        if (!rewards || rewards.length == 0) {
            return false
        }
        let closest = findClosest(coward.bounds, rewards)
        console.info("最近的奖励：" + JSON.stringify(closest))
        coward.move(closest)
        return true
        // debuger.refresh()
        // debuger.addLine({x1:closest.p1.x,y1:closest.p1.y,x2:closest.p2.x,y2:closest.p2.y})
    },
    this.next = function(level, objects, coward) {
        let guidance = undefined//this.dungeons.specialRoute(level)
        if (!guidance && objects && objects["guidance"]) {
            guidance = findFarthest(coward.bounds, objects["guidance"])
        }
        if (objects["door"] && guidance) {
            let door = findClosest(guidance.target, objects["door"])
            if (door.distance <= 100) {
                guidance = findClosest(coward.bounds, [door.target])
            }
        }
        if (!guidance) {
            this.adjust(coward)
        }
        //console.log("识别到路标指引：" + JSON.stringify(guidance))
        // if (!guidance) {
        //     guidance = this.dungeons.defaultRoute(level)
        // }   
        coward.move(guidance)
        this.finish = true
        // debuger.refresh()
        // debuger.addLine({x1:guidance.p1.x,y1:guidance.p1.y,x2:guidance.p2.x,y2:guidance.p2.y})
        // this.temp["corrected"] = false
    },
    this.correction = function() {
        if (this.temp["corrected"]) {
            return
        }
        this.temp["level"] = this.dungeons.acquireLevel()
        this.temp["corrected"] = true
    },
    this.process = function(objects, runtime) {
        let level = 1
        console.log("识别到结果:" + JSON.stringify(objects))
        let coward = this.refresh(runtime.coward, objects["coward"])
        if(this.figth(level, objects["monster"], coward)) {
            return false
        }
        // //无怪物拾取掉落奖励
        if (this.pickup(objects["reward"], coward)) {
            return false
        }
        if (this.cont(objects["continue"])) {
            return false
        }
        //检测矫正房间号等信息，防止误判
        console.info("当前关卡:" + level)
        this.next(level, objects, coward)
        return false
    }
}

exports.gameDetectProcessor = new GameDetectProcessor()