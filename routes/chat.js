const router = require('express').Router();
const User = require('../models/User');
const { verifyToken } = require('../functions/tokens');
const checkFriends = require('../functions/checkFriends');
const createChat = require('../functions/createChat');
const { v4: uuid } = require('uuid');
const fs = require('fs');

router.get('/getUser/:userId', verifyToken, async (req, res) => {
    const user = await User.findById(req.params.userId);

    if (user === null) return res.status(404).json({ success: false, message: 'Пользователь не найден' });

    let userData = {};

    if (req.user.id === req.params.userId)
        userData = {
            id: user._id,
            avatar: user.avatar,
            username: user.username,
            sentFriendRequests: user.sentFriendRequests,
            receivedFriendRequests: user.receivedFriendRequests,
            contacts: user.contacts,
            notifications: user.notifications,
        };
    else
        userData = {
            id: user._id,
            avatar: user.avatar,
            username: user.username,
        };

    res.json({ success: true, userData });
});

router.post('/addFriend', verifyToken, async (req, res) => {
    const { friendId } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (user === null) return res.status(404).json({ success: false, message: 'Пользователь 1 не найден' });

    const friend = await User.findById(friendId);

    if (friend === null) return res.status(404).json({ success: false, message: 'Пользователь 2 не найден' });

    if (await checkFriends(user, friend)) return res.status(500).json({ success: false, message: 'Возникла ошибка при попытке отправить запрос на добавление в друзья' });

    if (user.sentFriendRequests.includes(friendId)) return res.status(406).json({ success: false, message: 'Запрос на добавления в друзья уже отправлен' });
    else user.sentFriendRequests.push(friendId);

    if (friend.receivedFriendRequests.includes(userId)) return res.status(406).json({ success: false, message: 'Запрос на добавления в друзья уже получен' });
    else friend.receivedFriendRequests.push(userId);

    try {
        await Promise.all([user.save(), friend.save()]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Возникла ошибка при попытке отправить запрос на добавление в друзья' });
    }
});

router.post('/cancelFriendRequest', verifyToken, async (req, res) => {
    const { friendId } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (user === null) return res.status(404).json({ success: false, message: 'Пользователь 1 не найден' });

    const friend = await User.findById(friendId);

    if (friend === null) return res.status(404).json({ success: false, message: 'Пользователь 2 не найден' });

    const friends = await checkFriends(user, friend);

    if (friends || !friend.receivedFriendRequests.includes(userId)) res.status(500).json({ success: false, message: 'Возникла ошибка при попытке отменить запрос на добавление в друзья' });

    user.sentFriendRequests = user.sentFriendRequests.filter((id) => id !== friendId);
    friend.receivedFriendRequests = friend.receivedFriendRequests.filter((id) => id !== userId);

    try {
        await Promise.all([user.save(), friend.save()]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Возникла ошибка при попытке отменить запрос на добавление в друзья' });
    }
});

router.post('/acceptFriend', verifyToken, async (req, res) => {
    const { friendId } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (user === null) return res.status(404).json({ success: false, message: 'Пользователь 1 не найден' });

    const friend = await User.findById(friendId);

    if (friend === null) return res.status(404).json({ success: false, message: 'Пользователь 2 не найден' });

    const friends = await checkFriends(user, friend);

    if (friends || !user.receivedFriendRequests.includes(friendId)) return res.status(500).json({ success: false, message: 'Возникла ошибка при попытке принять запрос в друзья' });

    user.receivedFriendRequests = user.receivedFriendRequests.filter((id) => id !== friendId);
    friend.sentFriendRequests = friend.sentFriendRequests.filter((id) => id !== userId);
    const chat = await createChat(friendId, userId);
    user.contacts.push({ friendId, chatId: chat._id });
    friend.contacts.push({ friendId: userId, chatId: chat._id });

    try {
        await Promise.all([user.save(), friend.save()]);
        res.json({ success: true, chatId: chat._id });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Возникла ошибка при попытке принять запрос в друзья' });
    }
});

router.post('/removeFriend', verifyToken, async (req, res) => {
    const { friendId } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (user === null) return res.status(404).json({ success: false, message: 'Пользователь 1 не найден' });

    const friend = await User.findById(friendId);

    if (friend === null) return res.status(404).json({ success: false, message: 'Пользователь 2 не найден' });

    const friends = await checkFriends(user, friend);

    if (!friends) return res.status(500).json({ success: false, message: 'Возникла ошибка при попытке удалить пользователя из списка друзей' });

    user.contacts = user.contacts.filter(({ friendId: id }) => id !== friendId);
    friend.contacts = friend.contacts.filter(({ friendId: id }) => id !== userId);

    try {
        await Promise.all([user.save(), friend.save()]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Возникла ошибка при попытке удалить пользователя из списка друзей' });
    }
});

router.post('/rejectFriend', verifyToken, async (req, res) => {
    const { friendId } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (user === null) return res.status(404).json({ success: false, message: 'Пользователь 1 не найден' });

    const friend = await User.findById(friendId);

    if (friend === null) return res.status(404).json({ success: false, message: 'Пользователь 2 не найден' });

    const friends = await checkFriends(user, friend);

    if (friends || !user.receivedFriendRequests.includes(friendId)) return res.status(500).json({ success: false, message: 'Возникла ошибка при попытке отклонить запрос в друзья' });

    user.receivedFriendRequests = user.receivedFriendRequests.filter((id) => id !== friendId);
    friend.sentFriendRequests = friend.sentFriendRequests.filter((id) => id !== userId);

    try {
        await Promise.all([user.save(), friend.save()]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Возникла ошибка при попытке отклонить запрос в друзья' });
    }
});

router.get('/search/:username?', verifyToken, async (req, res) => {
    if (!req.params.username) return res.json({ success: true, users: [] });

    const dbUsers = await User.find({ username: new RegExp(`^${req.params.username}`, 'i') }).limit(30);
    const users = dbUsers
        .filter(({ _id }) => _id.toString() !== req.user.id)
        .map(({ username, avatar, _id }) => ({
            username,
            avatar,
            id: _id,
        }));

    res.json({ success: true, users });
});

router.post('/uploadImage', verifyToken, (req, res) => {
    const userId = req.user.id;
    const { image } = req.files;

    if (!image || !/^image\/.+$/.test(image.mimetype)) return res.status(400).json({ success: false, message: 'Попытка загрузить некорректный файл' });

    const arr = image.name.split('.');
    const fileExtension = arr[arr.length - 1];
    const imageName = `${uuid()}.${fileExtension}`;

    image.mv(__dirname + `/../images/${imageName}`, async (err) => {
        if (err) return res.status(500).json({ success: false, message: 'Возникла ошибка при попытке загрузить изображение' });

        const user = await User.findById(userId);

        if (user.avatar !== '') {
            const arr = user.avatar.split('/');
            const oldImageName = arr[arr.length - 1];

            fs.unlink(__dirname + `/../images/${oldImageName}`, async (err) => {
                if (err) console.error(err);
            });
        }

        user.avatar = `/static/images/${imageName}`;
        await user.save();
        res.json({ success: true });
    });
});

module.exports = router;
