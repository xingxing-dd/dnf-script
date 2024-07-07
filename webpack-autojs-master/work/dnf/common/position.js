var skills = {
    "pg": {
        x: 1610,
        y: 780
    },
    "bsj": {
        x: 1460,
        y: 915
    },
    "szz": {
        x: 1400,
        y: 790
    }
}
var textLabels = {}

var processing = false

exports.analysis = (screentshotPath) => {
    let screentshot = images.read(screentshotPath)
    if (screentshot == null || processing) {
        console.info("获取屏幕截图为空:" + screentshotPath)
        return
    }
    processing = true
    let result = gmlkit.ocr(screentshot, "zh")
    if (!result || !result.children) {
        return
    }
    var tmpLabels = {}
    for (var index = 0; index < result.children.length; index++) {
        let textLabel = result.children[index]
        if (!textLabel || !textLabel.text) {
            continue
        }
        tmpLabels[textLabel.text] = textLabel.bounds
    }
    textLabels = tmpLabels
    console.info(textLabels)
    processing = false
}
//https://blog.csdn.net/m0_63493883/article/details/131395062
exports.detect = (targets) => {
    for (var index = 0; index < targets.length; index++) {
        var position = textLabels[targets[index]]
        if (!position) {
            continue
        }
        return {
            x: Math.floor(position.left + Math.random() * (position.right - position.left + 1)),
            y: Math.floor(position.top + Math.random() * (position.bottom - position.top + 1))
        }
    }
    return null
}
//ssh -p 49516 root@xerfjbtrw1vzgmsmsnow.deepln.com
// yolov5s
// python tools/export_model.py -c .\configs\rec\ch_ppocr_v2.0\rec_chinese_lite_train_v2.0.yml -o Global.checkpoints=.\output\rec_chinese_lite_v2.0\best_accuracy  Global.save_inference_dir=.\inference\rec