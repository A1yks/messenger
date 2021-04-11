const User = require('../models/User');

async function checkFriends(userId, friendId) {
    let user, friend;

    if (typeof userId === 'string') user = await User.findById(userId);
    else user = userId;

    if (user === null) return { success: false, message: 'Пользователь 1 не найден' };

    if (typeof friendId === 'string') friend = await User.findById(friendId);
    else friend = friendId;

    if (friend === null) return { success: false, message: 'Пользователь 2 не найден' };

    return user.contacts.find(({ friendId: id }) => id === friendId) !== undefined && !!user.contacts.find(({ friendId: id }) => id === userId) !== undefined;
}

module.exports = checkFriends;
