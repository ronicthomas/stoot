exports.setup = function (io) {
    io.configure(function () {
        io.set("transports", ["xhr-polling"]);
        io.set("polling duration", 10);
    });

    io.sockets.on("connection", function (socket) {
        socket.on("channel:register", function (data) {
            var roomName = data.apiKey + "/" + data.name;
            socket.room = roomName;
            socket.join(roomName);
            socket.emit("channel:register-success", "Channel \"" + data.name + "\" has been registered!")
        });

        socket.on("event:register", function (data, fn) {
            socket.on(data.event, function (data) {
                io.sockets.in(socket.room).emit(data.event, data)
            });

            socket.emit("event:register-success", "Event registered successfully: " + data.event);
        })
    });
};