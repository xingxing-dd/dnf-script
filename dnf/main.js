"ui";
var utils = require("./common/utils")
var storage = storages.create("info.xingxingdd.dnf");
ui.statusBarColor("#ffffff");
utils.loadView("loading")
utils.loadView("home")
threads.start(function(){
    utils.downloadServer()
});
// var home = require("./view/home")
// var update = require("./view/update")
// ui.setContentView(home.view(ui.container))