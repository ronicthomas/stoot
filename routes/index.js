exports.index = function (req, res) {
    res.render('index', {})
};

exports.dashboard = function (req, res) {
    res.render("dashboard", {});
};

exports.authenticate = function(req ,res) {
    console.log(req.param);
    var username = req.param('username');
    var password = req.param('password');
    console.log([username, password])
};
