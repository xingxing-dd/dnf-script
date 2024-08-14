const Runtime = function(m) {
    this.model = m,
    this.context = {},
    this.tasks = {},
    this.objs = {}
}
exports.instance = (m) => new Runtime(m)