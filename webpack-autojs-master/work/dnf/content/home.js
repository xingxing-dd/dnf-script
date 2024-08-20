var utils = require("../common/utils")
exports.display = () => {
    var w = floaty.rawWindow(
        <vertical layout_gravity="center" w="{{Math.floor(device.width * 0.9)}}px" h="900px" bg="#FFFFFF">
            <horizontal w="*" padding="20px">
                <text text="软蛋脚本V1.0" gravity="left" layout_weight="1"textSize="16sp" textColor="red"/>
                <text id="exit" w="auto" text="退出" layout_gravity="right"/>
            </horizontal>
            <horizontal layout_gravity="center" w="*" textSize="14sp" padding="20px">
                <text id="role_setting" layout_weight="1">搬砖仔列表</text>
                <text id="game_setting" layout_weight="1" gravity="center">搬砖设置</text>
                <text id="system_setting" layout_weight="1" gravity="center">系统设置</text>
                <text id="system_setting" layout_weight="1" gravity="right">系统公告</text>
            </horizontal>
            
            <relative id="content" gravity="center">
                <list id="role_list" w="*" layout_alignParentTop="true" layout_centerHorizontal="true" layout_above="@+id/tips">
                    <horizontal w="*">
                        <checkbox id="selected" checked="false"/>
                        <input text="{{roleName}}" singleLine="true" layout_weight="1" textSize="12sp"/>
                        <spinner entries="{{roleType}}" layout_gravity="right" textSize="12sp"/>
                        <spinner entries="布万加|山脊|猫妖" layout_gravity="right" textSize="12sp"/>
                    </horizontal>
                </list>
                <text id="tips" text="请注意，目前仅支持觉醒的职业搬砖,不要添加未觉醒的职业！请检测能否在主界面上识别到玩家名称，不能识别会影响自动切换角色，请联系我分析处理！" padding="20px" textSize="12sp" textColor="red" layout_above="@+id/bottom"/>
                <horizontal id="bottom" w="*" layout_alignParentBottom="true" layout_centerHorizontal="true">
                    <button id="add" layout_weight="1" text="添加角色"/>
                    <button id="init" layout_weight="1" text="初始化键位"/>
                </horizontal>
            </relative>
        </vertical>
    )
    w.setSize(-1, -1)
    //w.setTouchable(false)
    w.role_setting.setTextColor(colors.BLACK)
    let list = [
        {roleType:"大魔导师|暗狱战狂|狂暴者|大暗黑天",roleName:"2009年的秋天"},
        {roleType:"暗狱战狂|大魔导师|狂暴者|大暗黑天",roleName:"2009年玩红眼"},
        {roleType:"狂暴者|暗狱战狂|大魔导师|大暗黑天",roleName:"鸡哔伱呦"},
        {roleType:"大暗黑天|狂暴者|暗狱战狂|大魔导师",roleName:"星仔的修罗"}
    ]
    w.role_list.setDataSource(list)
    w.add.click(()=> {
        w.setTouchable(false)
        w.setSize(0, 0)
    })
    w.exit.click(()=> {
        w.close()
    })
    ui.run(()=>{ w.requestFocus(); })
}