const Scene = function(properties) {
    Object.assign(this, properties || {
        name: undefined,
        specialRoute: undefined
    }),
    this.checkCurrentRoom = function() {},
    this.findSpecialRoute = function(level, objects) {}
}

exports.createScene = (properties) => {
    return new Scene(properties)
}