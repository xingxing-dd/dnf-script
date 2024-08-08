
"ui";
ui.layout(
    <vertical>
        <horizontal>
            <text textSize="16sp" textColor="black" layout_weight="1" text="搜索热词"/>
            <input id="keyword" hint="请输入搜索关键词" layout_weight="3"/>
        </horizontal>
        <horizontal>
            <text textSize="16sp" textColor="black" layout_weight="1" text="保存目录"/>
            <input id="filepath" hint="请输入数据保存目录" layout_weight="3"/>
        </horizontal>
        <button id="start" text="开始采集"/>
    </vertical>
);
ui.filepath.setText(files.getSdcardPath() + "/" + new Date().getTime() + ".csv")
var search = (keyword) => {
    var search_input = id("com.ss.android.ugc.aweme:id/et_search_kw").findOne(5000)
    if (search_input == null) {
        console.info("为空")
        return
    }
    var search_input_b = search_input.bounds()
    click(search_input_b.centerX(), search_input_b.centerY());
    sleep(1000)
    setText(keyword)
    var search_btn = desc("搜索").findOne(5000)
    if (search_btn == null) {
        console.info("为空")
        return
    }
    var search_btn_b = search_btn.bounds()
    click(search_btn_b.centerX(), search_btn_b.centerY());
    sleep(3000)
    var search_item = className("com.lynx.tasm.behavior.ui.LynxFlattenUI").findOne(5000)
    var search_item_b = search_item.bounds()
    click(search_item_b.centerX(), search_item_b.centerY());
    var content = id("com.ss.android.ugc.aweme:id/quw").findOne(5000)
    if (content == null) {
        console.info("为空")
        return
    }
    sleep(2000)
    var img = captureScreen()
    let result = gmlkit.ocr(img, "zh");
    log(result.text)
}
var process= (keyword) => {
    text("抖音").findOne().click()
    search(keyword)
}
ui.start.click(function() {
    if (!requestScreenCapture()) {
        exit()
    }
    var keyword = ui.keyword.getText()
    home()
    threads.start(function(){
        process(keyword)
    });
})
// var w = floaty.window(
//     <vertical layout_gravity="center" w="auto" h="auto" bg="#FFFFFF" padding="20">
//         <text text="抖音数据采集V1.0" gravity="center" textColor="red"/>
//         <horizontal>
//              <text textSize="16sp" textColor="black" layout_weight="1" text="搜索"/>
//              <input id="keyword" hint="请输入搜索关键词" layout_weight="3"/>
//          </horizontal>
//          <horizontal>
//              <text textSize="16sp" textColor="black" layout_weight="1" text="目录"/>
//              <text id="filepath" hint="请输入数据保存目录" layout_weight="3" lines ="1" ellipsize="end"/>
//          </horizontal>
//          <button id="start" text="开始采集"/>
//         <button id="exit" text="退出"/>
//     </vertical>
// );
// w.filepath.setText(files.getSdcardPath() + "/" + new Date().getTime() + ".csv")
// w.setSize(-2, -2);
// w.start.click(() => {
//     var float = require("./float")
//     if (!requestScreenCapture()) {
//         toast('请求截图权限失败')
//         return
//     }
//     float.show()
//     w.close()
// })
// w.exit.click(() => {
//     w.close()
// })
// setInterval(() => {}, 100000)