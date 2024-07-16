let img = images.read("1.jpg")
console.info(img)
let result = gmlkit.ocr(img, "zh")
console.info(result)