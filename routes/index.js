exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.second = function(req, res){
  res.render('second', { title: 'Express' });
};