const Skill = function(properties) {
    Object.assign(this, properties || {
        label: undefined,
        bounds: undefined,
        press: undefined,
        cast: undefined,

    }),
    this.release = function() {

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
        
    },
    this.move = function(target) {
        if (this.bounds.x == undefined) {
            return
        }
        if (this.keyborad["rocker"] == undefined) {
            return
        }
    },
    this. attack = function(assignId) {
        if (assignId) {
            //指定攻击策略
        } else if (this.role) {
            //默认攻击策略
        } else {
            //如果没有配置，那么技能乱放，普攻为主
        }
    },
    this.refresh = function(bounds) {
        this.bounds = bounds
    }
}
exports.create = (properties) => {
    let coward = new Coward(properties)
    coward.init()
    return coward
}