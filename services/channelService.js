exports.setup = function (io) {
    io.sockets.on("connection", function (socket) {
        socket.on("channel:register", function (data) {
            socket.room = data.name;
            socket.join(data.name);
            socket.emit("channel:register-success", "Channel \"" + data.name + "\" has been registered!")
        });

        socket.on("event:register", function (data, fn) {
            console.log(fn);
            socket.on(data.event, function (data) {
                console.log("in here");
                io.sockets.in(socket.room).emit(data.event, data)
            });

            socket.emit("event:register-success", "Event registered successfully: " + data.event);
        })
    });
};