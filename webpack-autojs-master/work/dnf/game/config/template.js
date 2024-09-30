exports.dungeons = {
    "bwj": [
        // {type: "match_click", template: "common/mx", bounds: []},
        // {type: "match_click", template: "common/mx", bounds: []},
        // {type: "match_click", template: "common/mx", bounds: []},
        // {type: "match_click", template: "common/mx", bounds: []},
        // {type: "match_click", template: "common/mx", bounds: []},
        // {type: "match_click", template: "common/mx", bounds: []},
        // {type: "match_click", template: "common/mx", bounds: []},
        // {type: "match_click", template: "common/mx", bounds: []},
        {type: "game_detect"},
    ]
}
exports.rocker = {type: "match_cache", label: "操作杆", template: "common/rocker", bounds: [0, 0.4, 0.5, 1]}

exports.skills = {
    "berserker": 
    {
        1: {
            label: "普通攻击",
            cooling: 0,
            press: 800,
            cast: 50,
            scope: 50
        },
        2: {
            label: "十字斩",
            cooling: 4000,
            press: 50,
            cast: 200,
            scope: 50
        },
        3: {
            label: "崩山击",
            cooling: 5000,
            press: 0,  
            cast: 600,
            scope: 200
        },
        4: {
            label: "愤怒狂刃",
            cooling: 20000,
            press: 0,
            cast: 1000,
            scope: 50
        },
        5: {
            label: "捕梦之手",
            cooling: 9100,
            press: 0,
            cast: 300,
            scope: 50
        },
        6: {
            label: "怒气爆发",
            cooling: 20000,
            press: 0,
            cast: 200,
            scope: 0
        },
        7: {
            label: "绝念除尘击",
            cooling: 20000,
            press: 5000,
            cast: 600,
        },
        8: {
            label: "爆发之刃",
            cooling: 20000,
            press: 0,
            cast: 400,
            scope: 200
        },
        9: {
            label: "暴走",
            cooling: 5000,
            press: 0,
            cast: 50,
            scope: 0
        },
        10: {
            label: "愤怒",
            cooling: 60000,
            press: 300,
            cast: 50,
            scope: 0
        },
        11: {
            label: "崩山裂地",
            cooling: 40000,
            press: 0,
            cast: 600,
            scope: 200
        },
        12: {
            label: "暗狱魔刹",
            cooling: 145000,
            press: 0,
            cast: 200
        }
    },
    axl: {
        1: {
            label: "普通攻击",
            cooling: 0,
            press: 800,
            cast: 50,
            scope: 50
        },
        2: {
            label: "波动剑",
            cooling: 5000,
            press: 50,
            times: 2,
            cast: 100,
            scope: 50
        },
        3: {
            label: "邪光斩",
            cooling: 5000,
            press: 600,  
            cast: 400,
            scope: 200
        },
        4: {
            label: "波动爆发",
            cooling: 7000,
            press: 50,
            cast: 200,
            scope: 50
        },
        5: {
            label: "邪光波动阵",
            cooling: 20000,
            press: 50,
            cast: 500,
            scope: 50
        },
        6: {
            label: "冰刃波动剑",
            cooling: 10000,
            press: 50,
            cast: 200,
            scope: 0
        },
        7: {
            label: "爆炎波动剑",
            cooling: 20000,
            press: 50,
            cast: 200,
        },
        8: {
            label: "无双波",
            cooling: 20000,
            press: 3000,
            cast: 500,
            scope: 200
        },
        9: {
            label: "裂波",
            cooling: 10000,
            press: 50,
            cast: 600,
            scope: 0
        },
        10: {
            label: "无尽波动",
            cooling: 10000,
            press: 50,
            cast: 50,
            scope: 0
        },
        11: {
            label: "不动明王",
            cooling: 40000,
            press: 50,
            cast: 5000,
            scope: 200
        },
        12: {
            label: "暗天波动眼",
            cooling: 20000,
            press: 50,
            cast: 200
        }
    }
}
exports.template = {
    "common/rocker": {
        label: "操作杆",
        bounds: [0, 0.4, 0.5, 1]
    },
    "role/berserker/1": {
        label: "普通攻击",
        bounds: [0.5, 1, 0.6, 1]
    },
    "role/berserker/2": {
        label: "十字斩",
        bounds: [0.5, 1, 0.6, 1]
    },
    "role/berserker/3": {
        label: "崩山击",
        bounds: [0.5, 1, 0.6, 1]
    },
    "role/berserker/4": {
        label: "愤怒狂刃",
        bounds: [0.5, 1, 0.6, 1]
    },
    "role/berserker/5": {
        label: "捕梦之手",
        bounds: [0.5, 1, 0.6, 1]
    },
    "role/berserker/6": {
        label: "怒气爆发",
        bounds: [0.5, 1, 0.6, 1]
    },
    "role/berserker/7": {
        label: "绝念除尘击",
        bounds: [0.5, 1, 0.6, 1]
    },
    "role/berserker/8": {
        label: "爆发之刃",
        bounds: [0.5, 1, 0.6, 1]
    },
    "role/berserker/9": {
        label: "暴走",
        bounds: [0.6, 1, 0.4, 0.7]
    },
    "role/berserker/10": {
        label: "愤怒",
        bounds: [0.6, 1, 0.4, 0.7]
    },
    "role/berserker/11": {
        label: "崩山裂地",
        bounds: [0.6, 1, 0.4, 0.7]
    },
    "role/berserker/12": {
        label: "暗狱魔刹",
        bounds: [0.6, 1, 0.4, 0.7]
    } 
}