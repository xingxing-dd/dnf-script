const Dungeons = function(properties) {
    Object.assign(this, properties || {
        name: undefined,
        routes: undefined
    }),
    this.acquireLevel = function() {
        return 1
    },
    this.defaultRoute = function(level, objects) {},
    this.specialRoute = function(level, objects) {}
}

exports.createScene = (properties) => {
    return new Dungeons(properties)
}