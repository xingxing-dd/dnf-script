const { remove, acquire, cache } = require("../../common/utils")
const { rockerCoordinate } = require("../../common/compute")
const Skill = function(properties) {
    Object.assign(this, properties || {
        label: undefined,
        bounds: undefined,
        cooling: undefined,
        press: undefined,
        cast: undefined,
        next: Date.now()
    }),
    this.release = function() {
        let current = Date.now()
        if (current < this.next) {
            return
        }
        console.info("释放技能:" + this.label + "," + this.press)
        this.next = current + this.cooling
        if (this.press == undefined || this.press == 0) {
            click(Math.floor(this.bounds.x + this.bounds.w / 2), Math.floor(this.bounds.y + this.bounds.h / 2))
        } else {
            press(Math.floor(this.bounds.x + this.bounds.w / 2), Math.floor(this.bounds.y + this.bounds.h / 2), this.press)
        }
        if (this.cast == undefined || this.cast == 0) {
            return
        }
        console.info("释放技能:" + this.label + "," + this.cast)
        sleep(this.cast)
    }
}
const Coward = function() {
    Object.assign(this, {
        start: Date.now(),
        bounds: {},
        rocker: {},
        skills: {},
        speed: 1,
    }),
    this.init = function(properties) {
        let keyboard = acquire("keyboard")
        if(!keyboard) {
            toast("未初始化键位，不可使用脚本，请退出脚本重新初始化！")
            return
        }
        for (let name in properties.skills) {
            if (keyboard[name] == undefined) {
                continue
            }
            let skill = new Skill(properties.skills[name])
            skill.bounds = keyboard[name]
            this.skills[name] = skill
        }
        this.rocker = keyboard["rocker"]
    },
    this.move = function(target) {
        if (this.rocker == undefined || target == null) {
            return
        }
        let o = rockerCoordinate(this.rocker, target.angle)
        //移动指令
        press(o.x, o.y, Math.round(target.distance / this.speed))
    },
    this.fight = function(fightQueue) {
        if (!fightQueue || fightQueue.length == 0) {
            return
        }
        for (let fight of fightQueue) {
            let skill = this.skills[fight["code"]]
            if (!skill) {
                continue
            }
            skill.release()
        }
    },
    this.refresh = function(bounds) {
        this.bounds = bounds
    },
    this.reset = function() {
        for (let skill of this.skills) {
            skill.next = Date.now()
        }
        this.bounds = null
    }
}
exports.createCoward = (properties) => {
    let coward = new Coward()
    coward.init(properties)
    return coward
}