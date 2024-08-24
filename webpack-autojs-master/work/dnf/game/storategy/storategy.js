const Storategy = function(properties) {
    Object.assign(this, properties || {
        name: undefined,
        storategies: undefined
    }),
    this.fightStorategy = function(level) {
        let storategy = this.storategis[level]
        if (storategy == undefined) {
            return null
        }
        return storategy
    }
}
exports.createStorategy = (properties) => {
    return new Storategy(properties)
}