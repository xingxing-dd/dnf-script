//决策智能体，目前通过硬编码实现,后续考虑接入ai帮助决策
const GameAgent = function(config) {
    this.config = config,
    this.level = 1,
    this.randomNumber = function(scope) {
        return scope - Math.floor(random() * scope * 2)
    },
    this.randomPoint = function() {
        return {
            x: this.randomNumber(150),
            y: this.randomNumber(150)
        }
    },
    this.boxCenter = function(box) {
        return {
            x: box.x + box.w / 2,
            y: box.y + box.h
        }
    },
    this.adjustCoward = function(rocker) {
        let random = this.randomPoint()
        console.info("当前未识别到软蛋，生成随机移动操作坐标:" + JSON.stringify(pressCoordinate))
        let center = this.boxCenter(rocker)
        press(center.x + random.x, center.y + random.y, 600)
    },
    this.moveJudgment = function(rocker, target) {
        
    },
    this.attackJudgment = function(coward, rocker, monster) {
        console.info("攻击指令")
        this.moveJudgment(rocker, monster)
    },
        console.info("拾取指令")
        this.moveJudgment(rocker, reward)
    },
    this.enterNext = function(rocker, door) {
        this.moveJudgment(rocker, door)
    },
    this.decision = function(context) {
        const objects = context["objects"]
        if (!objects) {
            return
        }
        const coward = objects["coward"]
        const rocker = objects["rocker"]
        if (!coward) {
            this.adjustCoward(rocker)
            return
        }
        const monster = objects["monster"]
        if (monster) {
            this.attackJudgment(coward, rocker, monster)
            return
        }
        const reward = objects["reward"]
        if (reward) {
            this.pickupJudgment(rocker, reward)
            return
        }
        
        const door = objects["door"]
        if (door) {
            this.enterNext(rocker, door)
            return
        }
        const guidance = objects["guidance"]
        if (!guidance) {
            //todo 朝着默认方向移动
            return
        }
        this.moveJudgment(rocker, guidance)
    }
}