const pipeline = [
    {
        labels:["冒险"],
        action: (box) => click(box.left + 5, box.bottom - 5)
    },  
    {
        labels:["奖励"],
        action: (box) => click(box.left + 5, box.bottom - 5)
    },    
    {
        labels:["冒险圾"],
        action: (box) => click(box.left + 50, box.bottom - 50)
    },   
    {
        labels:["万年","雪山", "万午"],
        action: (box) => click(box.left + 10, box.bottom - 10)
    },   
    {
        labels:["区域移动"],
        action: (box) => {
            console.info((box.left + 5) + "," + (box.bottom - 5))
            click(box.left + 5, box.bottom - 5)
        }
    },   
    {
        labels:["布万加"],
        action: (box) => {}
    },   
    {
        labels:["冒险"],
        action: (box) => click(box.left + 5, box.bottom - 5)
    },  
    {
        labels:["布万加"],
        action: (box) => click(box.left + 20, box.bottom - 10)
    },  
    {
        labels:["战斗开始"],
        action: (box) => click(box.left + 20, box.bottom - 10)
    }
]
exports.start = () => {
    return {
        name: "enter",
        current: 0,
        pipeline: pipeline
    }
}