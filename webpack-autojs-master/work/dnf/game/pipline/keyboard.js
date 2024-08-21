var { engine }   = require("../engine")

{
    "1"= {
        template:"ayzk/1",
        action: "match",
        ext:{},
        desc:"操作杆",
        callback: ()=>{}
    }
}

const KeyboardInit = function() {
    this.exec = function() {
       engine.submit 
    }
}

exports.init = function() {
    return new KeyboardInit()
}