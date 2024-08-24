const Storategy = function(properties) {
    Object.assign(this, properties || {
        name: undefined,
        storategy: undefined
    }),
    this.fightStorategy = function(level) {
        
    }
}
exports.createStorategy = (properties) => {
    return new Storategy(properties)
}