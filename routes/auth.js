const router = require('express').Router();
const User = require('../models/User');
const Token = require('../models/Token');
const joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { verifyToken, getAccessToken, getRefreshToken, updateTokens } = require('../functions/tokens');

const schema = joi.object({
    username: joi.string().min(4).max(25).required(),
    password: joi.string().min(6).max(64).required(),
});

router.get('/verify-token', verifyToken, (req, res) => {
    res.json({ success: true, userId: req.user.id, username: req.user.username, exp: req.user.exp });
});

router.get('/refresh-tokens', (req, res) => {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
        try {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

            if (payload.type !== 'refresh') return res.status(400).json({ success: false, message: 'Невалидный токен' });

            Token.findOne({ _id: payload.tokenId })
                .exec()
                .then(async (token) => {
                    if (token === null) throw new Error('Невалидный токен');

                    return await updateTokens(payload.id, payload.tokenId);
                })
                .then((tokens) => {
                    const exp = 24 * 60 * 60 * 1000;
                    res.cookie('authToken', tokens.accessToken, { maxAge: exp });
                    res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 60 * 60 * 24 * 1000 });
                    res.json({ success: true, exp: Math.floor((Date.now() + exp) / 1000) });
                })
                .catch((err) => res.status(400).json({ success: false, message: err.message }));
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) return res.status(400).json({ success: false, message: 'Время действия токена истекло' });
            return res.status(400).json({ success: false, message: 'Невалидный токен' });
        }
    } else {
        return res.status(400).json({ success: false, message: 'Invalid token!' });
    }
});

router.post('/register', async function register(req, res) {
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
        const token = getAccessToken(user._id, user.username);
        const refreshToken = await getRefreshToken(user._id, user.username);
        const exp = 24 * 60 * 60 * 1000;
        res.cookie('authToken', token, { maxAge: exp });
        res.cookie('refreshToken', refreshToken, { maxAge: 30 * 60 * 60 * 24 * 1000 });
        res.json({ success: true, exp: Math.floor((Date.now() + exp) / 1000) });
    } catch (err) {
        res.status(500).json({
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

    const token = getAccessToken(user._id, user.username);
    const refreshToken = await getRefreshToken(user._id, user.username);
    const exp = 24 * 60 * 60 * 1000;
    res.cookie('authToken', token, { maxAge: exp });
    res.cookie('refreshToken', refreshToken, { maxAge: 30 * 60 * 60 * 24 * 1000 });
    res.json({ success: true, exp: Math.floor((Date.now() + exp) / 1000) });
});

module.exports = router;
