exports.view = () => {
    "ui";
    const view = ui.inflate(
        <vertical>
            <text text="DNF自动搬砖脚本DEBUG" gravity="center" textColor="red"/>
            <horizontal >
                <text textSize="16sp" textColor="black" text="测试文件路径"/>
                <input id="filePath" text="/storage/emulated/0/DCIM/Screenshots/Screenshot_2024-06-10-15-42-06-386_com.tencent.tmgp.dnf.jpg" w="*"/>
                {/* <input id="filePath" text="/mnt/shared/Pictures/frame_000010.jpg" w="*"/> */}
            </horizontal>
            <horizontal>
                <img id="fileImg" src="https://img-home.csdnimg.cn/images/20240621020913.jpeg" w="*" h="150sp"/>
            </horizontal>
            <horizontal>
                <text textSize="16sp" layout_weight="1" gravity="center_vertical">检测结果</text>
            </horizontal>
            <horizontal>
                <text id="detectionResult" maxLines="5"/>
            </horizontal>
            <horizontal h="40sp">
                <text textSize="16sp" h="40sp" layout_weight="1" gravity="center_vertical">执行结果</text>
            </horizontal>
            <horizontal h="80sp">
                <text id="executeResult" maxLines="5"/>
            </horizontal>
            <horizontal>
                <text textSize="16sp" h="*" layout_weight="1" gravity="center_vertical">识别耗时</text>
                <text id="takeUpTime" maxLines="3"/>
            </horizontal>
            <button id="sendDebugMsg" text="发送"/>
            <button id="screenshot" text="截图"/>
        </vertical>
    )
    return view
}
exports.action = () => {
    var socket = require("../common/socket")
    ui.sendDebugMsg.click(function(){
        var filePath = ui.filePath.getText()
        console.info(filePath)
        ui.fileImg.attr("src", "file://" + filePath)
        socket.send({
            action: "debug-img-detection",
            data: {
                "filePath": String(filePath)
            }
        }, data => {
            ui.post(() => {
                ui.detectionResult.setText(data.objs)
                ui.takeUpTime.setText(String(data.takeUpTime/1000000))
            })
        })
    })

    ui.screenshot.click(function(){
        socket.send({
            action: "screenshot"
        }, data => {
            console.info(data)
        })
    })
}