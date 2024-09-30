const { remove, acquire, cache } = require("../../common/utils")
const Processor = function() {
    this.process = function(object, runtime) {
        if (object == undefined || object.x == undefined) {
            return false
        }

        return true
    }
}

exports.matchCacheProcessor = new Processor()