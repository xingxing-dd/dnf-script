exports.instance = (properties) => {
    return new Object({
        bounds: properties,
        focus: function() {
            if (!this.bounds.x || !this.bounds.y) {
                return null
            }
            return {
                x: this.bounds.x + this.bounds.width / 2,
                y: this.bounds.y + this.bounds.height,
            }
        }
    })
}