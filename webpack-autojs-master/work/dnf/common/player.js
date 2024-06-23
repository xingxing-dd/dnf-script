var open = () => {
    desc("地下城与勇士：起源").findOne().click()
}
var enter = () => {
    sleep(5000)
    //右上角地图的位置
    click(1800, 120)
    sleep(500)
    //点击万年雪山
    click(880,88)
    sleep(10000)
    //选择等级
    click(200,300)
    sleep(200)
    //选择布万家
    click(1450, 850)
    sleep(200)
    //选择布万家
    click(1540, 910)
}
exports.play = () => {
    var server = require("../common/socket")
    open()
    //enter()
    sleep(5000)
    for (var i = 0; i <= 20; i++) {
        server.send({
            action: "detection"
        }, data => {
            console.info(data)
        })
        sleep(5000)
    }
}