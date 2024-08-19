var utils = require("../common/utils")
exports.display = () => {
    var w = floaty.rawWindow(
        <vertical layout_gravity="center" w="{{Math.floor(device.width * 0.9)}}px" h="*" bg="#FFFFFF">
            <text text="软蛋脚本V1.0" gravity="center" textColor="red"/>
            <horizontal layout_gravity="center" w="*" textSize="14sp" padding="20px">
                <text id="role_setting" layout_weight="1">角色列表</text>
                <text id="game_setting" layout_weight="1" gravity="center">刷图设置</text>
                <text id="system_setting" layout_weight="1" gravity="right">系统设置</text>
            </horizontal>
            
            <relative id="content" gravity="center">
                <list id="role_list" w="*" layout_alignParentTop="true" layout_centerHorizontal="true" layout_above="@+id/operation">
                    <horizontal>
                        <checkbox id="selected" text="{{roleName}}" checked="false"/>
                        <horizontal w="auto" gravity="right">
                            <text text="职业:{{roleType}}"/>
                            <text text="删除"/>
                            <text text="重新识别"/>
                        </horizontal>
                    </horizontal>
                </list>
                {/* <text textSize="10sp" padding="20px">{{text}}</text> */}
                <horizontal id="operation" w="*" textSize="12sp" layout_alignParentBottom="true" layout_centerHorizontal="true">
                    <button id="launch" layout_weight="1" text="保存"/>
                    <button id="exit" layout_weight="1" text="重新识别"/>
                </horizontal>
            </relative>
        </vertical>
    )
    w.setSize(-1, -1)
    //w.setTouchable(false)
    w.role_setting.setTextColor(colors.BLACK)
    let text = "测试"
    let list = [
        {roleType:"狂战士",roleName:"测试1"},
        {roleType:"鬼泣",roleName:"测试2"},
        {roleType:"鬼泣",roleName:"测试3"},
        {roleType:"鬼泣",roleName:"测试3"},
        {roleType:"鬼泣",roleName:"测试3"},
        {roleType:"鬼泣",roleName:"测试3"},
        {roleType:"鬼泣",roleName:"测试3"},
        {roleType:"鬼泣",roleName:"测试3"},
        {roleType:"鬼泣",roleName:"测试3"},
        {roleType:"鬼泣",roleName:"测试3"},
        {roleType:"鬼泣",roleName:"测试3"},
        {roleType:"鬼泣",roleName:"测试3"}
    ]
    w.role_list.setDataSource(list)
    w.exit.click(()=> {
        w.close()
    })
    ui.run(()=>{ w.requestFocus(); })
}