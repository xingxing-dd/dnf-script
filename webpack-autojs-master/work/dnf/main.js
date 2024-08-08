var utils = require("./common/utils")
var global = require("./common/global")
auto();
//加载主页
// utils.async(
//     () => utils.loadView("loading"),
//     utils.startServer,
//     () => utils.loadView("home", true),
//     1000
// )
var paint = new Paint();
//设置画笔为填充，则绘制出来的图形都是实心的
paint.setStyle(Paint.STYLE.FILL);
//设置画笔颜色为红色
paint.setColor(colors.RED);
//绘制一个从坐标(0, 0)到坐标(100, 100)的正方形
canvas.drawRect(0, 0, 100, 100, paint);
utils.loadContent("home")
//主循环，保持进程不会关闭
setInterval(global.execTask, 200)

events.on('exit', () => {
    //java.lang.System.exit(0);
})
