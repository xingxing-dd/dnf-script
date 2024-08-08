var pipeline = [
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
        desc: "万年雪山"
    },   
    {
        target: "7",
        desc: "冒险级按钮"
    },  
    {
        target: "8",
        desc: "布万家修炼场"
    },  
    {
        target: "9",
        desc: "开始战斗"
    }
]
function action(){
    this.name = "enter"
    this.current = 0
    this.process = (rect) => {
        if (!rect) {
            return
        }
        if (!this.current) {
            this.current = 0
        }
        var action = pipeline[this.current].action
        if (!action) {
            console.info("开始点击【" + pipeline[this.current].desc + "】")
            click(rect.x + rect.width / 2, rect.y + rect.height / 2)
        } else {
            action(rect)
        }
        sleep(200)
        this.current++
    }
    this.next = () => {
        if (pipeline.length == this.current) {
            return null
        }
        return pipeline[this.current].target
    }
}
exports.create = () => {
    return new action()
}