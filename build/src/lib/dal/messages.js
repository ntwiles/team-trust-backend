"use strict";
exports.__esModule = true;
exports.getMessagesByChannel = void 0;
var messages = [
    {
        body: 'Hey, this is our first message!',
        channel: {
            interest: 'programming',
            location: 'cincinnati'
        },
        timestamp: new Date(),
        user: '3a374bf1-a411-43a7-b9d4-77fb2a068aca'
    },
];
var getMessagesByChannel = function (channel) {
    return messages.filter(function (m) { return m.channel === channel; });
};
exports.getMessagesByChannel = getMessagesByChannel;
