exports.index = function (req, res) {
    res.render("index", {title:"Stoot", uuid: require('node-uuid')()});
};