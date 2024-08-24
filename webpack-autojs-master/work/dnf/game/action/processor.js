const Decider = function() {
    this.status = "pending",//状态:pending,loading,processing
    this.snapshot = {},//当前快照
    this.process = function(context) {
        let objects = context["objects"]
        if (!objects || objects.length == 0) {
            return
        }
        let coward = objects["coward"]
        let rocker = objects["rocker"]
        if (!coward) {
            this.adjustCoward(rocker)
            return
        }
        let monster = objects["monster"]
        if (monster) {
            this.attackJudgment(coward, rocker, monster)
            return
        }
        let reward = objects["reward"]
        if (reward) {
            this.pickupJudgment(rocker, reward)
            return
        }
        
        let door = objects["door"]
        if (door) {
            this.enterNext(rocker, door)
            return
        }
        let guidance = objects["guidance"]
        if (!guidance) {
            //todo 朝着默认方向移动
            return
        }
        this.moveJudgment(rocker, guidance)
    }
}    