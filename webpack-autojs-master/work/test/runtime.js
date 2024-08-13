exports.instance = (m) => {
    return new Object({
        model: m,
        action: null,
        coward: null,
        monsters: [],
        stuffs: []
    })
}