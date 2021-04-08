const router = require('express').Router();
const User = require('../models/User');
const { verifyToken } = require('../functions/tokens');

router.get('/getUser/:userId', async (req, res) => {
    const user = await User.findById(req.params.userId);

    if (user === null) return res.status(404).json({ success: false, message: 'Пользователь не найден' });

    const userData = {
        id: user._id,
        avatar: user.avatar,
        username: user.username,
    };
    res.json({ success: true, userData });
});

router.post('/addFriend', verifyToken, async (req, res) => {
    const { userId, friendId } = req.body;
    const user = await User.findById(userId);

    if (user === null) return res.status(404).json({ success: false, message: 'Пользователь 1 не найден' });

    const friend = await User.findById(friendId);

    if (friend === null) return res.status(404).json({ success: false, message: 'Пользователь 2 не найден' });

    user.sentFriendRequests.push(friendId);
    friend.receiverFriendRequests.push(userId);

    try {
        await Promise.all([user.save(), friend.save()]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Возникла ошибка при попытке отправить запрос на добавление в друзья' });
    }
});

router.get('/search/:username', async (req, res) => {
    const users = await User.find({ username: new RegExp(req.params.username, 'i') });
    res.json({ success: true, users });
});

module.exports = router;
