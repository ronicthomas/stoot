exports.setup = function (io) {
    io.configure("production", function () {
        io.set("transports", [
            'websocket'
            , 'flashsocket'
            , 'htmlfile'
            , 'xhr-polling'
            , 'jsonp-polling'
        ]);
        io.set("polling duration", 20);
    });
    io.sockets.on("connection", function (socket) {
        console.log("clients: " + io.sockets.clients("3345cd5532d7-44b8-ae4b-0f77a29d3663/my-channel"));

        socket.on("channel:register", function (data) {
            var roomName = data.apiKey + "/" + data.name;
            socket.room = roomName;
            socket.join(roomName);
            socket.emit("channel:register-success", "Channel \"" + data.name + "\" has been registered!")
        });

        socket.on("event:register", function (data) {
            var event = data.event;
            socket.on(data.event, function (data) {
                var roomName = data.apiKey + "/" + data.channel;
                io.sockets.in(roomName).emit(event, data)
            });

            socket.emit("event:register-success", "Event registered successfully: " + data.event);
        })
    });

};