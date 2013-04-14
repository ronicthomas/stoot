exports.registerEvent = function (data, fn) {
    console.log(data);
    console.log(fn);
    var channel = io.of("/" + data.channelName).on('connection', function (socket) {
        channel.on(data.event, function (d) {
            console.log("Found me!")
        });

        socket.emit("channel:connect", "Connected to channel: " + data.channelName)
    });



    console.log(io.namespaces);
};