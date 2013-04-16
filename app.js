/**
 * Module dependencies.
 */

var express = require('express')
        , routes = require('./routes')
        , http = require('http')
        , path = require('path')
        , channelService = require('./services/channelService')
        , io = require('socket.io')
        , SERVER_CONFIG = require('config').SERVER
        , server;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

server = http.createServer(app);

io = io.listen(server);//.set("log level", 2);

channelService.setup(io);

app.get("/", routes.index);
app.get("/static/stoot.js", function(req,res) {
    res.set("Content-type", "text/javascript");
    res.render('stoot.ejs',{url:require('config').SERVER.url});
});

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
