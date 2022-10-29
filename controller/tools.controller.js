const tools = [
    { id: 1, name: "hammer1" },
    { id: 2, name: "hammer2" },
    { id: 3, name: "hammer3" }
]


module.exports.getAllTools = (req, res, next) => {
    const { limit, page, k } = req.query;
    console.log(limit, page, k)
    res.json(tools)
}

module.exports.saveAllTool = (req, res) => {
    res.send("post tools")
}

module.exports.getToolDetail = (req, res) => {
    res.send("tools id")
}