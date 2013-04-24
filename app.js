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

var passport = require('passport')
        , GoogleStrategy = require('passport-google').Strategy;

passport.use(new GoogleStrategy({
            returnURL:SERVER_CONFIG.url + 'auth/google/return',
            realm:SERVER_CONFIG.url
        },
        function (identifier, profile, done) {
            console.log(identifier);
        }
));

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


app.post('/auth/google', passport.authenticate('google'));

// Google will redirect the user to this URL after authentication.  Finish
// the process by verifying the assertion.  If valid, the user will be
// logged in.  Otherwise, authentication has failed.
app.get('/auth/google/return',
        passport.authenticate('google', { successRedirect:'/',
            failureRedirect:'/login' }));


app.get("/", routes.index);
app.get("/static/stoot.js", function (req, res) {
    res.set("Content-type", "text/javascript");
    res.render('stoot.ejs', {url:require('config').SERVER.url});
});

app.get("/stoot/triggerEvent", function (req, res) {
    var channel = req.query.channel;
    var event = req.query.event;
    var data = req.query.data;
    var apiKey = "3345cd5532d7-44b8-ae4b-0f77a29d3663";
    console.log([channel, event, data, apiKey + "/" + channel]);
    console.log(io.sockets.clients(apiKey + "/" + channel));
    io.sockets.in(apiKey + "/" + channel).emit(event, data);
    res.send('success');
});

server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
