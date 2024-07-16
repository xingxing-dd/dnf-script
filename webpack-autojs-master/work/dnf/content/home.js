exports.display = () => {
    var w = floaty.window(
        <vertical layout_gravity="center" w="auto" h="auto" bg="#FFFFFF" padding="20">
            <text text="DNF自动搬砖脚本V1.0" gravity="center" textColor="red"/>
            <horizontal >
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
            </horizontal>
            <button id="launch" text="启动"/>
            <button id="exit" text="退出"/>
        </vertical>
    );
    w.setSize(-1, -1);
    w.launch.click(() => {
        var utils = require("../common/utils")
        utils.async(
            () => w.launch.setText("启动服务中..."),
            () => utils.startServer(),
            () => utils.loadContent("operator", w),
            1500
        )
    })
    w.exit.click(() => {
        w.close()
    })
}