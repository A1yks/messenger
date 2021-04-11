const User = require('../models/User');

async function checkFriends(param1, param2) {
    let user, friend;
    let userId, friendId;

    if (typeof param1 === 'string') user = await User.findById(param1);
    else user = param1;

    if (typeof param2 === 'string') friend = await User.findById(param2);
    else friend = param2;

    userId = user._id.toString();
    friendId = friend._id.toString();

    return user.contacts.find(({ friendId: id }) => id === friendId) !== undefined && friend.contacts.find(({ friendId: id }) => id === userId) !== undefined;
}

module.exports = checkFriends;
