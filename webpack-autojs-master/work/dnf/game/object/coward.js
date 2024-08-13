exports.instanct = (n, r) =>{
    return new Object({
        name: n,
        role: r,
        fatigue: 100,
        speed: 0.5,
        bounds: {},
        skills:[],
        rocker: {},
        move: function(x, y) {
            if (!this.bounds.x || !this.bounds.y || !this.rocker.x || this.rocker.y) {
                return
            }
            //todo 移动代码处理逻辑
        },
        attack: function() {
            //todo 实现攻击逻辑
        },
        adjust: function() {
            //todo 随机调整位置，避免卡死
        }
    })
}
