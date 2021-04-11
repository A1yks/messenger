const router = require('express').Router();
const User = require('../models/User');
const Conversation = require('../models/Conversation');
const { verifyToken } = require('../functions/tokens');
const checkFriends = require('../functions/checkFriends');
const createChat = require('../functions/createChat');

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

    user.sentFriendRequests = user.sentFriendRequests.filter((id) => id !== friendId);
    friend.receivedFriendRequests = friend.receivedFriendRequests.filter((id) => id !== userId);

    try {
        await Promise.all([user.save(), friend.save()]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Возникла ошибка при попытке отправить запрос на добавление в друзья' });
    }
});

router.post('/acceptFriend', verifyToken, async (req, res) => {
    const { friendId } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (user === null) return res.status(404).json({ success: false, message: 'Пользователь 1 не найден' });

    const friend = await User.findById(friendId);

    if (friend === null) return res.status(404).json({ success: false, message: 'Пользователь 2 не найден' });

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

    user.contacts = user.contacts.filter(({ friendId: id }) => id !== friendId);
    friend.contacts = friend.contacts.filter(({ friendId: id }) => id !== userId);

    try {
        await Promise.all([user.save(), friend.save()]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Возникла ошибка при попытке принять запрос в друзья' });
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

router.post('/access', verifyToken, async (req, res) => {
    const { friendId, skipNumber } = req.body;
    const friends = await checkFriends(userId, friendId);

    if (!friends) return res.status(403).json({ success: false, message: 'Возникла ошибка при попытке получить доступ к беседе' });

    const chat = await Conversation.findOne({ members: { $all: [userId, friendId] } }, { messages: { $slice: [skipNumber, 30] } });

    if (chat === null) return res.status(404).json({ succes: false, message: 'Чат не найден' });

    res.json({ success: true, chat: chat.toClient() });
    // if (chat !== null) {
    //     res.json({
    //         success: true,
    //         chat: chat.toClient(),
    //     });
    // } else {
    //     const chat = new Conversation({
    //         members: [userId, friendId],
    //         date: new Date(),
    //     });

    //     try {
    //         await chat.save();
    //         res.json({ success: true, chat: chat.toClient() });
    //     } catch (err) {
    //         res.json({ success: false, message: 'Возникла ошибка при попытке создать беседу' });
    //     }
    // }
});

module.exports = router;
