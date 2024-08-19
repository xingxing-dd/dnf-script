const Debugger = function() {
    this.window = undefined,
    this.boxs = [],
    this.boxFont = undefined,
    this.textFont = undefined,
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
    }
    this.init = function() {
        if (this.window) {
            return
        }
        this.window = floaty.rawWindow(
            <canvas id="borad" w="*" h="*"></canvas>
        )
        this.window.setSize(-1, -1)
        this.window.setTouchable(false)
        this.window.borad.on("draw", this.draw.bind(this))
        if (this.boxFont == undefined) { 
            this.boxFont = new Paint()
            //设置画笔颜色为红色
            this.boxFont.setStyle(android.graphics.Paint.Style.STROKE)
            this.boxFont.setColor(colors.RED)
            this.boxFont.setStrokeWidth(3)
        }
        if (this.textFont == undefined) { 
            this.textFont = new Paint()
            this.textFont.setColor(colors.RED)
            this.textFont.setTextSize(30)
        }
    },
    this.refresh = function(boxs) {
        if (!this.window) {
            this.init()
        }
        this.boxs = boxs == undefined ? [] : boxs
    },
    this.add = function(box) {
        if (!this.window) {
            this.init()
        }
        this.boxs.push(box)
    },
    this.close = function() {
        if (!this.window) {
            return
        }
        this.window.close()
    }
}
exports.debuger = new Debugger()