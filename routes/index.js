exports.index = function (req, res) {
    if (req.user) {
        res.render("dashboard")
    } else {
        res.render("index");
    }
};