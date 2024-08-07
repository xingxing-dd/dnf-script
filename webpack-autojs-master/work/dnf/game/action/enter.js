function action(){
    this.name = "enter"
    this.current = 0
    this.pipeline = [
        {
            target: "1",
            desc: "世界地图图标"
        },  
        {
            target: "2",
            desc: "世界地图按钮"
        },    
        {
            target: "3",
            desc: "世界地图-阿拉德大陆"
        },   
        {
            target: "4",
            desc: "阿拉德大陆-贝尔玛尔公国北部"
        },   
        {
            target: "5",
            desc: "阿拉德大陆-贝尔玛尔北部",
        },   
        {
            target: "6",
            desc: "万年雪山",
            action: (box) => {}
        },   
        {
            target: "7",
            desc: "冒险级按钮"
        },  
        {
            target: "8",
            desc: "布万家修炼场"
        },  
        // {
        //     target: "9",
        //     desc: "开始战斗"
        // }
    ]
    this.process = (data) => {
        var result = JSON.parse(data)
        if (!result.position || result.position.x < 0 || result.position.y < 0) {
            return
        }
        if (!this.current) {
            this.current = 0
        }
        var action =this.pipeline[this.current].action
        if (!action) {
            click(result.position.x + result.position.width / 2, result.position.y + result.position.height / 2)
        } else {
            action(result.position)
        }
        this.current++
    }
    this.next = () => {
        return this.pipeline[this.current].target
    }
}
exports.create = () => {
    return new action()
}