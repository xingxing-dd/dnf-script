const Runtime = function(m) {
    this.model = m,
    this.tasks = {},
    this.objs = {}
}
exports.instance = (m) => new Runtime(m)