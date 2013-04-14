exports.registerChannel = function (req, res) {

    var channelName = "/" + req.query['channelName'];

    if (!channels[channelName]) {
        channels[channelName] = io.of(channelName).on('connection', function (socket) {
            socket.emit('channel:register-success', "Connect to channel successful")
        });
    }
    res.send("success");
};

exports.registerEvent = function (req, res) {
    var channelName = "/" + req.query['channelName'];
    var eventName = req.query['eventName'];
    if(channels[channelName] !== undefined) {
        channels[channelName].on(eventName, function(data) {
            console.log("got event");
            channels[channelName].emit(eventName, data);
        });

        channels[channelName].on("connection", function(socket){
            socket.emit("event:register-success", "Event registered!")
        });
    }

    res.send("success");

};