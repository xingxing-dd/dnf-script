const { findClosest, suitableTarget } = require("../../common/compute")
const { debuger } = require("../../common/debuger")
const Processor = function(properties) {
    Object.assign(this, properties || {
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
    this.figth = function(monsters) {
        if (!monsters || monsters.length == 0) {
            return false
        }
        let closest = findClosest(this.coward.bounds, monsters)
        console.info("最近的怪物：" + JSON.stringify(closest))
        //this.coward.fight(closest)
    },
    this.pickup = function(rewards) {
        if (!rewards || rewards.length == 0) {
            return false
        }
        let closest = findClosest(this.coward.bounds, rewards)
        console.info("最近的奖励：" + JSON.stringify(closest))
        this.coward.move(closest)
    },
    this.next = function(level, guidances) {
        let guidance = this.dungeons.specialRoute(level)
        if (!guidance) {
            guidance = guidances[0]
        }
        if (!guidance) {
            guidance = this.dungeons.defaultRoute(level)
        }
        this.coward.move(guidance)
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
                if (objects["monster"] || objects["monster"]) {
                    this.temp["corrected"] = false
                }
                let level = this.temp["level"] || 1
                //有怪物攻击怪物
                if(this.figth(level, objects["monster"])) {
                    return false
                }
                // //无怪物拾取掉落奖励
                if (this.pickup(objects["reward"])) {
                    return fasle
                }
                // //检测矫正房间号等信息，防止误判
                // this.correction()
                // //移动到下一张地图
                // this.next(level, objects)
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