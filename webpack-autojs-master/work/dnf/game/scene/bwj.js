const Buwajia = {
    _start_matcher: {},
    enter_map: [   
        {
            name: "djsjdt",
            executor: "matcher",
            ext: {target: "1"},
            desc: "世界地图"
        },  
        {
            name: "djsjdttb",
            executor: "matcher",
            ext: {target: "2"},
            desc: "世界地图按钮",
            depend: "djsjdt"
        },    
        {
            name: "djsalddal",
            executor: "matcher",
            ext: {target: "3"},
            desc: "阿拉德大陆",
            depend: "djsjdttb"
        },   
        {
            name: "djbemeggbb",
            executor: "matcher",
            ext: {target: "4"},
            desc: "贝尔玛尔公国北部",
            depend: "djsalddal"
        },   
        {
            name: "djbemebb",
            executor: "matcher",
            ext: {target: "5"},
            desc: "贝尔玛尔北部",
            depend: "djbemeggbb"
        },   
        {
            name: "djwnxs",
            executor: "matcher",
            ext: {target: "6"},
            desc: "万年雪山",
            depend: "djbemebb"
        },   
        {
            name: "djmxj",
            executor: "matcher",
            ext: {target: "7"},
            desc: "冒险级",
            depend: "djwnxs"
        },  
        {
            name: "djbwjxlc",
            executor: "matcher",
            ext: {target: "8"},
            desc: "布万家修炼场",
            depend: "djmxj"
        },  
        {
            name: "djkszd",
            executor: "matcher",
            ext: {target: "9"},
            desc: "开始战斗",
            depend: "djbwjxlc"
        }
    ],
    _start_detector: {},
    play_game: [
        {
            name: "sbyx",
            executor: "detector",
            desc: "识别游戏"
        },  
        {
            name: "zdznt",
            executor: "agent",
            desc: "战斗智能体"
        }
    ]
}