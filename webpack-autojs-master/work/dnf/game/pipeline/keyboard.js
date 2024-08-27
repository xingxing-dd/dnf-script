const { remove, acquire, cache } = require("../../common/utils")
const { engine }   = require("../engine")
const { matcher } = require("../action/matcher")
var { ocr } = require("../action/ocr")
const { debuger } = require("../../common/debuger")
const { createCoward } = require("../object/coward")
const match = (context, base, template) => {
    return matcher.match(context, base + "/" + template, (context, data) => {
        let keyboard = acquire("keyboard")
        if (!keyboard) {
            keyboard = {}
        }
        keyboard[template] = data
        cache("keyboard", keyboard)
    })
}

const submit = () => {
    //engine.submit("111", "match17", (context) => ocr.detect(context, "111", "2009年玩红眼", (context, data) => { }), 1000)
    engine.submit("111", "match/berserker/rocker", (context) => match(context, "common", "rocker"), 500)
    engine.submit("111", "match/berserker/1", (context) => match(context, "role/berserker", "1"), 500)
    engine.submit("111", "match/berserker/2", (context) => match(context, "role/berserker", "2"), 500)
    engine.submit("111", "match/berserker/3", (context) => match(context, "role/berserker", "3"), 500)
    engine.submit("111", "match/berserker/4", (context) => match(context, "role/berserker", "4"), 500)
    engine.submit("111", "match/berserker/5", (context) => match(context, "role/berserker", "5"), 500)
    engine.submit("111", "match/berserker/6", (context) => match(context, "role/berserker", "6"), 500)
    engine.submit("111", "match/berserker/7", (context) => match(context, "role/berserker", "7"), 500)
    engine.submit("111", "match/berserker/8", (context) => match(context, "role/berserker", "8"), 500)
    engine.submit("111", "match/berserker/9", (context) => match(context, "role/berserker", "9"), 500)
    engine.submit("111", "match/berserker/10", (context) => match(context, "role/berserker", "10"), 500)
    engine.submit("111", "match/berserker/11", (context) => match(context, "role/berserker", "11"), 500)
    engine.submit("111", "match/berserker/12", (context) => match(context, "role/berserker", "12"), 500)
    engine.comfirm("111", () => debuger.title("正在初始化键位，请前往修炼场进行初始化！"), () => {
        let coward = createCoward({
            skill: {
                1: {
                    label: "普通攻击",
                    cooling: 0,
                    press: 200,
                    cast: 0
                },
                2: {
                    label: "十字斩",
                    cooling: 4000,
                    press: 50,
                    cast: 100
                },
                3: {
                    label: "崩山击",
                    cooling: 5000,
                    press: 0,  
                    cast: 300
                },
                4: {
                    label: "愤怒狂刃",
                    cooling: 20000,
                    press: 0,
                    cast: 1000
                },
                5: {
                    label: "捕梦之手",
                    cooling: 9100,
                    press: 0,
                    cast: 200
                },
                6: {
                    label: "怒气爆发",
                    cooling: 20000,
                    press: 0,
                    cast: 200
                },
                7: {
                    label: "绝念除尘击",
                    cooling: 20000,
                    press: 5000,
                    cast: 600
                },
                8: {
                    label: "爆发之刃",
                    cooling: 20000,
                    press: 0,
                    cast: 400
                },
                9: {
                    label: "暴走",
                    cooling: 5000,
                    press: 0,
                    cast: 50
                },
                10: {
                    label: "愤怒",
                    cooling: 60000,
                    press: 300,
                    cast: 50
                },
                11: {
                    label: "崩山裂地",
                    cooling: 40000,
                    press: 0,
                    cast: 600
                },
                12: {
                    label: "暗狱魔刹",
                    cooling: 145000,
                    press: 0,
                    cast: 200
                }
            }
        })
        console.info(JSON.stringify(coward))
        setTimeout(() => debuger.close(), 3000)
    })
    engine.start()
}
exports.init = () => {
    // let role_list = cache("role_list")
    // if (!role_list || role_list.length == 0) {
    //     confirm("请前往设置页面，添加搬砖角色列表！")
    //     return
    // }
    //remove()
    let keyboard = acquire("keyboard")
    if (keyboard && keyboard["rocker"]) {
        return true
    } 
    if(!confirm("当前键位未初始化，请前往【地下修炼场】")) {
        toast("未初始化键位，不可使用脚本！")
        return false
    }
    submit()
    return false
}