const { remove, acquire, cache } = require("../../common/utils")
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
        this.next = current + this.cooling
        if (this.press == undefined || this.press == 0) {
            click(this.bounds.x + this.bounds.w / 2, this.bounds.y + this.bounds.h / 2)
        } else {
            press(this.bounds.x + this.bounds.w / 2, this.bounds.y + this.bounds.h / 2, press)
        }
        if (this.cast == undefined || this.cast == 0) {
            return
        }
        sleep(this.cast)
    }
}
const Coward = function(properties) {
    Object.assign(this, properties || {
        start: Date.now(),
        bounds: {},
        rocker: {},
        skills: {},
        speed: 0.5,
    }),
    this.init = function() {
        let keyboard = acquire("keyboard")
        if(!keyboard) {
            toast("未初始化键位，不可使用脚本！")
            return
        }
        for (let name in this.skills) {
            if (keyboard[name] == undefined) {
                continue
            }
            this.skills[name].bounds = keyboard[name]
        }
        this.rocker = keyboard["rocker"]
    },
    this.move = function(target) {
        if (this.bounds.x == undefined || this.rocker == undefined || target == null) {
            return
        }
        //移动指令
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
    let coward = new Coward(properties)
    coward.init()
    return coward
}