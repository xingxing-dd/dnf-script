const Marker = function(name, callback) {
    this.name = name,
    this.callback = callback,
    this.boxs = [],
    this.boxFont = undefined,
    this.textFont = undefined,
    this.operateW = undefined,
    this.displayW = undefined,
    this.draw = function(canvas) {
        canvas.drawColor(0xFFFFFF, android.graphics.PorterDuff.Mode.CLEAR)
        if (!this.boxs || this.boxs.length == 0) {
            return
        }
        for (let index = 0; index < this.boxs.length; index ++) {
            canvas.drawRect(
                this.boxs[index].x, 
                this.boxs[index].y, 
                this.boxs[index].x + this.boxs[index].w, 
                this.boxs[index].y + this.boxs[index].h, 
                this.boxFont
            );
            canvas.drawText(this.boxs[index].label, this.boxs[index].x, this.boxs[index].y - 10, this.textFont);
        }
    },
    this.init = function() {
        this.displayW = floaty.rawWindow(
            <canvas id="borad" w="*" h="*"></canvas>
        )
        this.displayW.setTouchable(false)
        this.displayW.setSize(-1, -1)
        this.displayW.borad.on("draw", this.draw.bind(this))
        this.operateW = floaty.rawWindow(
            <vertical w="690px" h="auto"bg="#ffffff" layout_gravity="right">
                <horizontal w="*">
                    <button id="add" layout_weight="1" text="添加"/>
                    <button id="delete" layout_weight="1" text="删除"/>
                    <button id="exit" layout_weight="1" text="退出"/>
                </horizontal>
                <horizontal w="*" gravity="center_vertical">
                    <button id="subX" text="-" style="Widget.AppCompat.Button.Borderless"/>
                    <input id="x" text="200" layout_weight="1"/>
                    <button id="addX" text="+" style="Widget.AppCompat.Button.Borderless"/>
                </horizontal>
                <horizontal w="*" gravity="center_vertical">
                    <button id="subY" text="-" style="Widget.AppCompat.Button.Borderless"/>
                    <input id="y" text="200" layout_weight="1"/>
                    <button id="addY" text="+" style="Widget.AppCompat.Button.Borderless"/>
                </horizontal>
                <horizontal w="*" gravity="center_vertical">
                    <button id="subW" text="-" style="Widget.AppCompat.Button.Borderless"/>
                    <input id="w" text="200" layout_weight="1"/>
                    <button id="addW" text="+" style="Widget.AppCompat.Button.Borderless"/>
                </horizontal>
                <horizontal w="*" gravity="center_vertical">
                    <button id="subH" text="-" style="Widget.AppCompat.Button.Borderless"/>
                    <input id="h" text="200" layout_weight="1"/>
                    <button id="addH" text="+" style="Widget.AppCompat.Button.Borderless"/>
                </horizontal>
            </vertical>
        )
        this.operateW.setPosition(Math.max(device.width, device.height) - 700, 10)
        this.operateW.setSize(690, -2)
        this.operateW.exit.click(this.close.bind(this))
        if (this.boxFont == undefined) { 
            this.boxFont = new Paint()
            this.boxFont.setStyle(android.graphics.Paint.Style.STROKE)
            this.boxFont.setColor(colors.RED)
            this.boxFont.setStrokeWidth(2)
        }
        if (this.textFont == undefined) { 
            this.textFont = new Paint()
            this.textFont.setColor(colors.RED)
            this.textFont.setTextSize(30)
        }
        this.boxs.push({x:185,y:720,w:180,h:48})
    },
    this.close = function() {
        if(this.displayW != undefined) {
            this.displayW.close()
        }
        if(this.operateW != undefined) {
            this.operateW.close()
        }
    }
}
exports.createMarker = (callback) => {
    let marker = new Marker(callback)
    marker.init()
    return marker
}