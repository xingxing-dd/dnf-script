var utils = require("../common/utils")
exports.display = () => {
    var w = floaty.rawWindow(
        <vertical layout_gravity="center" w="*" h="auto" bg="#FFFFFF" padding="20">
            <text text="软蛋脚本V1.0" gravity="center" textColor="red"/>
            {/* <horizontal >
                <text textSize="16sp"  layout_weight="1" gravity="center_vertical">角色职业</text>
                <spinner id="sp1" entries="狂战士|鬼泣|漫游" layout_weight="3" gravity="left"/>
            </horizontal>
            <horizontal>
                <text textSize="16sp"  layout_weight="1" gravity="center_vertical">搬砖地图</text>
                <spinner id="sp2" entries="布万家|山脊|绿都" layout_weight="3" gravity="left"/>
            </horizontal>
            <horizontal h="40sp">
                <text textSize="16sp"  layout_weight="1" gravity="center_vertical">自动分解</text>
                <checkbox id="cb1"  layout_weight="1" checked="true" text="白"/>
                <checkbox id="cb2"  layout_weight="1" checked="true" text="蓝"/>
                <checkbox id="cb2"  layout_weight="1" text="粉"/>
            </horizontal>
            <horizontal h="40sp">
                <text textSize="16sp"  layout_weight="1" gravity="center_vertical">自动出售</text>
                <checkbox id="cb1"  layout_weight="1" checked="true" text="白"/>
                <checkbox id="cb2"  layout_weight="1" checked="true" text="蓝"/>
                <checkbox id="cb2"  layout_weight="1" text="粉"/>
            </horizontal>
            <horizontal h="40sp">
                <text textSize="16sp"  layout_weight="1" gravity="center_vertical">启动日志</text>
                <checkbox id="cb1"  layout_weight="3" checked="true" text="是"/>
            </horizontal> */}
            <button id="launch" text="启动"/>
            <button id="exit" text="退出"/>
            <button id="contact" text="联系我们"/>
        </vertical>
    );
    w.setSize(-1, -1);
    events.observeTouch();
//注册触摸监听器
events.onTouch(function(p){
    //触摸事件发生时, 打印出触摸的点的坐标
    log(p.x + ", " + p.y);
});
    w.launch.click(() => {
        utils.async(
            () => w.launch.setText("启动服务中..."),
            () => {
                if (!requestScreenCapture(true)) {
                    toast("未开启权限，不可使用脚本")
                    return
                }
            },//utils.startServer(),
            () => utils.loadContent("action", w),
            500
        )
    })
    w.exit.click(() => {
        w.exitOnClose()
    })
    //ui.run(()=>{ w.requestFocus(); })
}