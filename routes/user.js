const router = require('express').Router();
const { verifyToken } = require('../functions/tokens');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const joi = require('@hapi/joi');

const usernameSchema = joi.object({ username: joi.string().min(4).max(25).required() });
const passwordSchema = joi.object({ password: joi.string().min(6).max(64).required() });

router.post('/changePassword', verifyToken, async (req, res) => {
    const { currPassword, newPassword } = req.body;
    const { error } = passwordSchema.validate({ password: newPassword });

    if (error) return res.status(400).json({ success: false, message: 'Пароль должен быть длиной от 6 до 64 символов' });

    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ success: false, message: 'Пользователь не найден' });

    const validPass = await bcrypt.compare(currPassword, user.password);

    if (!validPass) return res.status(400).json({ success: false, message: 'Неверный пароль' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    try {
        await user.save();
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Возникла ошибка при попытке сохранить новый пароль' });
    }
});

router.post('/changeUsername', verifyToken, async (req, res) => {
    const { currPassword, newUsername } = req.body;
    const { error } = usernameSchema.validate({ username: newUsername });

    if (error) return res.status(400).json({ success: false, message: 'Имя пользователя должно содержать от 4 до 25 символов' });

    const anotherUser = await User.findOne({ username: newUsername });

    if (anotherUser !== null) return res.status(400).json({ success: false, message: 'Пользователь с таким именем уже существует' });

    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ success: false, message: 'Пользователь не найден' });

    const validPass = await bcrypt.compare(currPassword, user.password);

    if (!validPass) return res.status(400).json({ success: false, message: 'Неверный пароль' });

    user.username = newUsername;

    try {
        await user.save();
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Возникла ошибка при попытке сохранить новый пароль' });
    }
});

module.exports = router;
