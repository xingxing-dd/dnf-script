"ui";
var utils = require("./common/utils")
var server = require("./common/socket")
var storage = storages.create("info.xingxingdd.dnf");
utils.async(
    () => utils.loadView("loading"),
    () => {
        utils.startServer()
        sleep(2000)
        server.connect()
    },
    () => utils.loadView("home")
)