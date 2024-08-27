const {plugin} = require("../../common/utils")
const {debuger} = require("../../common/debuger")
const Dungeons = function(properties) {
    Object.assign(this, properties || {
        name: undefined,
        map: {
            template: undefined, 
            bounds: undefined,
            region: undefined,
            row: undefined,
            col: undefined
        },
        routes: undefined
    }),
    this.init = function() {
        let capture = captureScreen()
        let bitmap = capture.getBitmap()
        this.map.bounds = plugin.match(bitmap, this.map.template, this.map.region)
        if (this.map.bounds == undefined || this.map.bounds.w <= 100) {
            toast("初始化地图失败")
        }
    }
    this.acquireLevel = function() {
        if (this.map.template == undefined) {
            return null
        }
        click(Math.max(device.height, device.width) - 100, 100)
        sleep(200)
        if (this.map.bounds == undefined) {
            this.init()
        }
        let capture = captureScreen()
        let bitmap = capture.getBitmap()
        let current = plugin.match(bitmap, "common/position", this.map.region)
        console.info(JSON.stringify(this.map.bounds))
        console.info(JSON.stringify(current))
        if (!current || current.x == undefined) {
            toast("初始化地图失败，请联系开发者进行处理")
            return
        }
        debuger.refresh()
        debuger.add(current)
        debuger.add(this.map.bounds)
        let row = Math.ceil((current.y - this.map.bounds.y) / (this.map.bounds.h / this.map.row))
        let col = Math.ceil((current.x - this.map.bounds.x) / (this.map.bounds.w / this.map.col))
        //click(Math.max(device.height, device.width) - 100, 100)
        return (row - 1) * this.map.col + col
    },
    this.defaultRoute = function(level, objects) {},
    this.specialRoute = function(level, objects) {}
}

exports.createDungeons = (properties) => {
    return new Dungeons(properties)
}