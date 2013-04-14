function Stoot() {
    var channels = [];
    var self = this;
    self.subscribe = function (channelName) {
        Stoot.registrationChannel.emit("channel:register", {name:channelName});
        return new Channel();
    };

    self.trigger = function (ename, data) {
        Stoot.registrationChannel.emit(ename, {event:ename});
    };
}

function Channel() {
    var self = this;
    self.bindEvent = function (eventName, callback) {
        Stoot.registrationChannel
                .emit("event:register", {event:eventName, channelName:self.name}, callback);

        Stoot.registrationChannel.on(eventName, function(data) {
            callback(data);
        })
    };
}

Stoot.registrationChannel = io.connect("http://localhost:3000")
        .on("channel:register-success",function (data) {
            console.log(data);
        }).on("event:register-success", function (data) {
            console.log(data);
        });
