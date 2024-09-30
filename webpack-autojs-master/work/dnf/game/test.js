const {debuger} = require("../common/debuger")
const { plugin } = require("../common/utils")
const { findClosest, findFarthest, suitableTarget } = require("../common/compute")
const next = function(objects) {
    if (!objects || !objects["guidance"]) {
        console.info("未发现路标")
        return
    }
    let guidance = findFarthest(objects["coward"][0], objects["guidance"])
    if (objects["door"] && guidance) {
        let door = findClosest(guidance.target, objects["door"])
        console.info("箭头最近门:" + JSON.stringify(door))
        if (door.distance <= 300) {
            guidance = findClosest(objects["coward"][0], [door.target])
        } else {
            console.info("距离超过100")
        }
    }
    debuger.addLine({x1:guidance.p1.x,y1:guidance.p1.y,x2:guidance.p2.x,y2:guidance.p2.y})
}
exports.debug = function() {
    requestScreenCapture(true)
    for (let i = 0; i < 50; i++) {
        let capture = captureScreen()
        let bitmap = capture.getBitmap()
        let result = plugin.detect(bitmap, 0.8)
        console.info(JSON.stringify(result))
        debuger.refresh()
        for (let obj of result) {
            debuger.add(obj)
        }
        let objects = {}
        for (let obj of result) {
            if (objects[obj.label] == undefined) {
                objects[obj.label] = []
            }
            objects[obj.label].push(obj)
        }
        next(objects)
        sleep(200)
    }
}

exports.match = function() {
    requestScreenCapture(true)
    let capture = captureScreen()
    let bitmap = capture.getBitmap()
    debuger.refresh()
    for (let index = 1; index <= 9; index++) {
        let target = plugin.match(bitmap, "dungeons/buwanjia/" + index, [0.5, 1, 0, 0.5])
        console.info("识别到确认按钮:"+ index + "" + JSON.stringify(target))
        if (target != null) {
            debuger.add(target)
            break
        }
    }
}