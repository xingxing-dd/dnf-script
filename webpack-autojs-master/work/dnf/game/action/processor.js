const { findClosest, findFarthest, suitableTarget } = require("../../common/compute")
const { debuger } = require("../../common/debuger")
const { plugin } = require("../../common/utils")
const Processor = function(properties) {
    Object.assign(this, properties || {}, {
        dungeons: undefined,
        coward: undefined,
        strategy: undefined
    }),
    this.status = "pending",//状态:pending,processing
    this.temp = {},//临时变量存储集合
    this.refresh = function(coward) {
        if (coward == undefined) {
            console.log("角色不存在")
        } else {
            this.coward.refresh(suitableTarget(coward))
        }
    },
    this.figth = function(level, monsters) {
        console.info(JSON.stringify(monsters))
        if (!monsters || monsters.length == 0) {
            return false
        }
        let closest = findClosest(this.coward.bounds, monsters)
        this.coward.move(closest)
        this.coward.fight([{code:"1"},{code:"2"}, {code:"1"}])
    },
    this.pickup = function(rewards) {
        if (!rewards || rewards.length == 0) {
            return false
        }
        let closest = findClosest(this.coward.bounds, rewards)
        console.info("最近的奖励：" + JSON.stringify(closest))
        this.coward.move(closest)
    },
    this.next = function(level, objects) {
        let guidance = this.dungeons.specialRoute(level)
        console.info("11" + JSON.stringify(guidance) + "," + JSON.stringify(this.coward))
        if (!guidance && objects && objects["guidance"]) {
            guidance = findFarthest(this.coward.bounds, objects["guidance"])
        }
        if (objects["door"] && guidance) {
            let door = findClosest(guidance.target, objects["door"])
            if (door.distance <= 100) {
                guidance = findClosest(this.coward.bounds, [door.target])
            }
        }
        // if (!guidance) {
        //     guidance = this.dungeons.defaultRoute(level)
        // }   
        this.coward.move(guidance)
        this.temp["corrected"] = false
    },
    this.correction = function() {
        if (this.temp["corrected"]) {
            return
        }
        this.temp["level"] = this.dungeons.acquireLevel()
        this.temp["corrected"] = true
    },
    this.process = function(context) {
        if (this.status == "pending") {
            try {
                this.status = "processing"
                let objects = context["objects"]
                console.log("处理器中获取到结果:" + JSON.stringify(objects))
                if (!objects || objects.length == 0) {
                    return fasle
                }
                this.refresh(objects["coward"])
                //如果出现怪物或者掉落材料，那么将矫正标识标记为需要矫正
                // if (objects["monster"] && !this.temp["corrected"]) {
                //     this.correction()
                // }
                let level = this.temp["level"] || 1
                //有怪物攻击怪物
                if(this.figth(level, objects["monster"])) {
                    return false
                }
                // //无怪物拾取掉落奖励
                if (this.pickup(objects["reward"])) {
                    return fasle
                }
                //检测矫正房间号等信息，防止误判
                console.info("当前关卡:" + level)
                this.next(level, objects)
                if (objects["repeat"]) {
                    
                    click(objects["repeat"][0].x + 10, objects["repeat"][0].y + 10)
                    sleep(500)
                    let target = plugin.match(bitmap, "common/confirm", [0.3, 0.7, 0.3, 0.7])
                    console.info("识别到确认按钮:" + JSON.stringify(target))
                    if (target == undefined) {
                        return false
                    }
                    click(target.x + 10, target.y + 10)
                }
            } catch (e) {
                console.error("执行异常" + e)
            } finally {
                this.status = "pending"
            }
        }
        return false
    }
}   

exports.createProcessor = function(properties) {
    return new Processor(properties)
}