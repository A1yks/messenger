const User = require('../models/User');

async function checkFriends(userId, friendId) {
    const user = await User.findById(userId);

    if (user === null) return { success: false, message: 'Пользователь 1 не найден' };

    const friend = await User.findById(friendId);

    if (friend === null) return { success: false, message: 'Пользователь 2 не найден' };

    return user.contacts.includes(friendId) && friend.contacts.includes(userId);
}

module.exports = checkFriends;
