exports.view = () => {
    "ui";
    const view = ui.inflate(
        <vertical>
            <text text="DNF自动搬砖脚本V1.0" gravity="center" textColor="red"/>
            <horizontal >
                <text textSize="16sp" h="*" layout_weight="1" gravity="center_vertical">角色职业</text>
                <spinner id="sp1" entries="狂战士|鬼泣|漫游" spinnerMode="dialog" layout_weight="3" gravity="left"/>
            </horizontal>
            <horizontal>
                <text textSize="16sp" h="*" layout_weight="1" gravity="center_vertical">搬砖地图</text>
                <spinner id="sp2" entries="布万家|山脊|绿都" spinnerMode="dialog" layout_weight="3" gravity="left"/>
            </horizontal>
            <horizontal h="40sp">
                <text textSize="16sp" h="*" layout_weight="1" gravity="center_vertical">自动分解</text>
                <checkbox id="cb1" h="*" layout_weight="1" checked="true" text="白"/>
                <checkbox id="cb2" h="*" layout_weight="1" checked="true" text="蓝"/>
                <checkbox id="cb2" h="*" layout_weight="1" text="粉"/>
            </horizontal>
            <horizontal h="40sp">
                <text textSize="16sp" h="*" layout_weight="1" gravity="center_vertical">自动出售</text>
                <checkbox id="cb1" h="*" layout_weight="1" checked="true" text="白"/>
                <checkbox id="cb2" h="*" layout_weight="1" checked="true" text="蓝"/>
                <checkbox id="cb2" h="*" layout_weight="1" text="粉"/>
            </horizontal>
            <horizontal h="40sp">
                <text textSize="16sp" h="*" layout_weight="1" gravity="center_vertical">启动日志</text>
                <checkbox id="cb1" h="*" layout_weight="4" checked="true" text="是"/>
            </horizontal>
            <button id="launch" text="启动"/>
            <button id="debug" text="切换debug"/>
        </vertical>
    )
    return view
}
exports.action = () => {
    var server = require("../common/socket")
    var utils = require("../common/utils")
    var player = require("../common/player")
    utils.async(
        () => ui.launch.setText("连接服务中..."),
        () => server.connect(),
        () => ui.launch.setText("启动"),
        500
    )
    ui.launch.click(function(){
        home()
        threads.start(() => {
            sleep(2000)
            player.play()
        })
    });
    ui.debug.click(function(){
        utils.loadView("debug")
    });
}