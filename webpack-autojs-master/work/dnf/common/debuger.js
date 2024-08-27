const Debuger = function() {
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
            let box = this.boxs[index]
            if (box == undefined) {
                continue
            }
            canvas.drawRect(
                box.x, 
                box.y, 
                box.x + box.w, 
                box.y + box.h, 
                this.boxFont
            );
            canvas.drawText(box.label, box.x, box.y - 10, this.textFont);
        }
    }
    this.init = function() {
        if (this.window) {
            return
        }
        this.window = floaty.rawWindow(
            <relative w="*" h="*">
                <text id="title" textColor="red" textSize="16sp"w="*" gravity="center_horizontal"/>
                <canvas id="borad" w="*" h="*"></canvas>
            </relative>
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
    this.title = function(title) {
        if (!this.window) {
            this.init()
        }
        this.window.title.setText(title)
    }
    this.add = function(box) {
        if (!this.window) {
            this.init()
        }
        if (!box || box.x == undefined) {
            return
        }
        this.boxs.push(box)
    },
    this.close = function() {
        if (!this.window) {
            return
        }
        this.window.close()
        this.window = undefined
    }
}
exports.debuger = new Debuger()
