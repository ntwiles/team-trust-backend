"use strict";
exports.__esModule = true;
exports.getUsersByChannel = exports.getUserById = void 0;
var users = [
    {
        id: '3a374bf1-a411-43a7-b9d4-77fb2a068aca',
        displayName: 'Nathan Wiles',
        interests: ['programming', 'reading'],
        locations: ['cincinnati']
    },
    {
        id: 'd8719507-9ae3-4278-9531-6d385150eb4b',
        displayName: 'Colin Feris',
        interests: ['programming', 'reading'],
        locations: ['cincinnati']
    },
    {
        id: '7944d338-4299-484e-b368-fcf9de2860a7',
        displayName: 'Bhawana Yadav',
        interests: ['programming', 'reading'],
        locations: ['cincinnati']
    },
];
var getUserById = function (userId) {
    return users.find(function (u) { return u.id === userId; });
};
exports.getUserById = getUserById;
var getUsersByChannel = function (channel) {
    return users.filter(function (u) {
        return u.locations.includes(channel.location) &&
            u.interests.includes(channel.interest);
    });
};
exports.getUsersByChannel = getUsersByChannel;
