const router = require('express').Router();
const User = require('../models/User');
const joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const schema = joi.object({
    username: joi.string().min(4).max(25).required(),
    password: joi.string().min(6).max(64).required(),
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
        res.json({
            success: true,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Произошла ошибка при попытке создания нового пользователя',
        });
    }
});

module.exports = router;
