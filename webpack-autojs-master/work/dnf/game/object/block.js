exports.instance = (properties) => {
    return new Object({
        bounds: properties,
        click: function() {
            x = this.bounds.x + (1 - Math.floor(random())) * this.bounds.w
            y = this.bounds.y + (1 - Math.floor(random())) * this.bounds.h
            click(x, y)
        },
        press: function(time) {
            x = this.bounds.x + (1 - Math.floor(random())) * this.bounds.w
            y = this.bounds.y + (1 - Math.floor(random())) * this.bounds.h
            press(x, y, time)
        }
    })
}