"ui";
var utils = require("./common/utils")
//加载主页
utils.async(
    () => utils.loadView("loading"),
    utils.startServer,
    () => utils.loadView("home", true),
    1000
)

