var utils = require("../common/utils")
exports.display = () => {
    var w = floaty.rawWindow(  
        <vertical layout_gravity="center" w="{{Math.floor(device.width * 0.9)}}px" h="900px" bg="#FFFFFF">
            <horizontal w="*" padding="20px">
                <text text="软蛋脚本V1.0" gravity="left" layout_weight="1"textSize="16sp" textColor="red"/>
                <text id="exit" w="auto" text="退出" layout_gravity="right"/>
            </horizontal>
            <appbar>
                <tabs id="tabs" textSize="14sp" bg="#000000"/>
            </appbar>
            <viewpager id="viewpager">
                <frame>
                    <relative id="content" gravity="center">
                        <list id="role_list" w="*" layout_alignParentTop="true" layout_centerHorizontal="true" layout_above="@+id/bottom">
                            <horizontal w="*">
                                <checkbox id="selected" checked="false"/>
                                <input text="{{roleName}}" singleLine="true" layout_weight="1" textSize="12sp"/>
                                <spinner entries="{{roleType}}" layout_gravity="right" textSize="12sp"/>
                                <spinner entries="布万加|山脊|猫妖" layout_gravity="right" textSize="12sp"/>
                            </horizontal>
                        </list>
                        <horizontal id="bottom" w="*" layout_alignParentBottom="true" layout_centerHorizontal="true">
                            <text id="tips" text="注意：添加使用教程请参考公告详细说明！" padding="20px" textSize="14sp" textColor="red" />
                            <button id="add" w="*" layout_alignParentBottom="true" layout_centerHorizontal="true" text="添加角色"/>
                        </horizontal>
                    </relative>
                </frame>
                <frame>
                    <ScrollView>
                        <vertical w="*">
                            <text text="搬砖设置（自动搬砖请全部勾选）" padding="20px" textSize="14sp" textColor="red" />
                            <horizontal w="*">
                                <checkbox id="selected" textSize="12sp" layout_weight="1" text="刷狮子头" checked="false"/>
                                <checkbox id="selected" textSize="12sp" layout_weight="1" text="修理装备" checked="false"/>
                                <checkbox id="selected" textSize="12sp" layout_weight="1" text="清理背包" checked="false"/>
                            </horizontal>
                            <horizontal w="*">
                                <checkbox id="selected" textSize="12sp" layout_weight="1" text="循环刷图" checked="false"/>
                            </horizontal>
                            <text text="日常任务（内测，暂未开放）" padding="20px" textSize="14sp" textColor="red" />
                            <horizontal w="*">
                                <checkbox id="selected" textSize="12sp" layout_weight="1" text="迷惘之塔" checked="false"/>
                                <checkbox id="selected" textSize="12sp" layout_weight="1" text="异界陨石" checked="false"/>
                                <checkbox id="selected" textSize="12sp" layout_weight="1" text="哥布林" checked="false"/>
                            </horizontal>
                            <horizontal w="*">
                                <checkbox id="selected" textSize="12sp" layout_weight="1" text="祥瑞溪谷" checked="false"/>
                                <checkbox id="selected" textSize="12sp" layout_weight="1" text="南部溪谷" checked="false"/>
                                <checkbox id="selected" textSize="12sp" layout_weight="1" text="玻璃树" checked="false"/>
                            </horizontal>
                            <horizontal w="*">
                                <checkbox id="selected" textSize="12sp" layout_weight="1" text="经典地下城" checked="false"/>
                            </horizontal>
                        </vertical>
                    </ScrollView>
                </frame>
                <frame>
                    <text text="有问题请联系开发者进行处理!" textColor="red" textSize="16sp"/>
                </frame>
                <frame>
                    <text text="有问题请联系开发者进行处理!" textColor="red" textSize="16sp"/>
                </frame>
            </viewpager>
        </vertical>
    )
    w.setSize(-1, -1)

    //设置滑动页面的标题
    w.viewpager.setTitles(["搬砖仔列表", "搬砖设置", "系统设置", "系统公告"]);
    //让滑动页面和标签栏联动
    w.tabs.setupWithViewPager(w.viewpager);
    //w.setTouchable(false)
    // w.role_setting.setTextColor(colors.BLACK)
    let list = []
    w.role_list.setDataSource(list)
    w.add.click(() => {
        list = list.concat({roleType:"暗狱战狂|大暗黑天",roleName:""})
        w.role_list.setDataSource(list)
        w.role_list.getAdapter().notifyItemChanged(list.length - 1)
        w.role_list.smoothScrollToPosition(list.length - 1)
    })
    // w.add.click(()=> {
    //     w.setTouchable(false)
    //     w.setSize(0, 0)
    // })
    w.exit.click(()=> {
        w.close()
    })
    ui.run(()=>{ w.requestFocus(); })
}