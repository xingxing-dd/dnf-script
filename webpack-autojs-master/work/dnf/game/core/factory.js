const { gameDetectProcessor } = require("./processor/game_detect_processor")

exports.acquireProcessor = function(type) {
    if (type == "game_detect") {
        return gameDetectProcessor
    }
    return undefined
}