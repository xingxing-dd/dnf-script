// var name = getAppName("info.xingxingdd.dnf"); 
// console.info("应用名称：" + name)
//  var result = app.launch("info.xingxingdd.dnf")
// console.info("启动结果" + result)
// var result = app.startActivity({
//     packageName: "info.xingxingdd.dnf",
//     className: "info.xingxingdd.dnf.component.DnfServerActivity"
// });
// // app.sendBroadcast({
// //     action: "info.xingxingdd.dnf.START_SERVER"
// // })
// importPackage(Packages["okhttp3"]); //导入包
// var client = new OkHttpClient.Builder().retryOnConnectionFailure(true).build();
// var request = new Request.Builder().url("ws://127.0.0.1:5005").build(); //vscode  插件的ip地址，
// client.dispatcher().cancelAll();//清理一次
// myListener = {
//     onOpen: function (webSocket, response) {
//         webSocket.send("客户端连接");
//     },
//     onMessage: function (webSocket, msg) { //msg可能是字符串，也可能是byte数组，取决于服务器送的内容
//         print("msg");
//         print(msg);
//     },
//     onClosing: function (webSocket, code, response) {
//         print("正在关闭");
//     },
//     onClosed: function (webSocket, code, response) {
//         print("已关闭");
//     },
//     onFailure: function (webSocket, t, response) {
//         print("错误");
//         print( t);
//     }
// }

// var webSocket= client.newWebSocket(request, new WebSocketListener(myListener)); //创建链接

// setInterval(() => { // 防止主线程退出
    
// }, 1000);
// "ui";
// ui.layout(
// <vertical padding="16">
// <text text="DNF自动搬砖脚本V1.0" gravity="center" textColor="red"/>
// </vertical>
// )
// const view = ui.inflate(
//     <vertical padding="16">
//     <text text="DNF自动搬砖脚本V1.0" gravity="center" textColor="red"/>
//     <horizontal >
//         <text textSize="16sp" h="*" layout_weight="1" gravity="center_vertical">角色职业</text>
//         <spinner id="sp1" entries="狂战士|鬼泣|漫游" spinnerMode="dialog" layout_weight="3" gravity="left"/>
//     </horizontal>
//     <horizontal >
//         <text textSize="16sp" h="*" layout_weight="1" gravity="center_vertical">角色时装</text>
//         <spinner id="sp1" entries="雪人套|天空套|导师套" spinnerMode="dialog" layout_weight="3" gravity="left"/>
//     </horizontal>
//     <horizontal>
//         <text textSize="16sp" h="*" layout_weight="1" gravity="center_vertical">搬砖地图</text>
//         <spinner id="sp2" entries="布万家|山脊|绿都" spinnerMode="dialog" layout_weight="3" gravity="left"/>
//     </horizontal>
//     <horizontal h="40sp">
//         <text textSize="16sp" h="*" layout_weight="1" gravity="center_vertical">自动分解</text>
//         <checkbox id="cb1" h="*" layout_weight="1" checked="true" text="白"/>
//         <checkbox id="cb2" h="*" layout_weight="1" checked="true" text="蓝"/>
//         <checkbox id="cb2" h="*" layout_weight="1" text="粉"/>
//     </horizontal>
//     <horizontal h="40sp">
//         <text textSize="16sp" h="*" layout_weight="1" gravity="center_vertical">自动出售</text>
//         <checkbox id="cb1" h="*" layout_weight="1" checked="true" text="白"/>
//         <checkbox id="cb2" h="*" layout_weight="1" checked="true" text="蓝"/>
//         <checkbox id="cb2" h="*" layout_weight="1" text="粉"/>
//     </horizontal>
//     <horizontal h="40sp">
//         <text textSize="16sp" h="*" layout_weight="1" gravity="center_vertical">启动日志</text>
//         <checkbox id="cb1" h="*" layout_weight="4" checked="true" text="是"/>
//     </horizontal>
//     <button id="ok">启动游戏</button>
//     </vertical>
// )
// ui.setContentView(view)
// ui.ok.click(function(){
//     ui.finish()
//     var w = floaty.window(
//         <frame gravity="center">
//             <text id="text">悬浮文字</text>
//         </frame>
//     );
//     setTimeout(()=>{
//         w.close();
//     }, 2000);
// })
var w = floaty.rawWindow(
    <canvas id="borad" w="*" h="*"></canvas>
);

w.setSize(-1, -1);
w.setTouchable(false);
setTimeout(()=>{
    w.close();
}, 10000);
var x = 0
var y = 0
var paint = new Paint();
//设置画笔颜色为红色
paint.setColor(colors.RED);
//绘制一个从坐标(0, 0)到坐标(100, 100)的正方形
w.borad.on("draw", function(canvas) {
    canvas.drawColor(colors.parseColor("#00ffffff"));
    canvas.drawRect(x, y, x+100, x+100, paint);
})
for (var i = 0; i < 10; i++) {
    sleep(500)
    x = x + 100
    y = y + 100
}