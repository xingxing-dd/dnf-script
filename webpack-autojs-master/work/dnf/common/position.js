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
var textLabels = []

exports.detectLabels = (screentshotPath) => {
    let screentshot = images.read(screentshotPath)
    if (screentshot == null) {
        console.info("获取屏幕截图为空:" + screentshotPath)
        return
    }
    let start = new Date()
    let result = gmlkit.ocr(img, "zh")
    console.info('OCR识别耗时：' + (new Date() - start) + 'ms')
    if (!result || !result.children) {
        return
    }
    for (var index = 0; index < result.children.length; index++) {
        let label = result.children[index]
    }
}