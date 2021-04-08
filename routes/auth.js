const router = require('express').Router();
const User = require('../models/User');
const joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { verifyToken } = require('../functions/tokens');

const schema = joi.object({
    username: joi.string().min(4).max(25).required(),
    password: joi.string().min(6).max(64).required(),
});

router.get('/verify-token', verifyToken, (req, res) => {
    res.json({ success: true, userId: req.user.id });
});

router.post('/register', async (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const userExists = await User.findOne({
        username: req.body.username,
    });

    if (userExists)
        return res.status(400).json({
            success: false,
            message: 'Такой пользователь уже существует',
        });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        username: req.body.username.trim(),
        password: hashedPassword,
    });

    try {
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '10min' });
        res.cookie('authToken', token, { maxAge: 600000 });
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Произошла ошибка при попытке создания нового пользователя',
        });
    }
});

router.post('/login', async (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const user = await User.findOne({
        username: req.body.username,
    });

    if (!user)
        return res.status(400).json({
            success: false,
            message: 'Неверный логин или пароль',
        });

    const validPass = await bcrypt.compare(req.body.password, user.password);

    if (!validPass)
        return res.status(400).json({
            success: false,
            message: 'Неверный логин или пароль',
        });

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '10min' });
    res.cookie('authToken', token, { maxAge: 600000 });
    res.json({ success: true });
});

module.exports = router;
