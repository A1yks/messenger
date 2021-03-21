const router = require('express').Router();
const User = require('../models/User');
const joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const schema = joi.object({
    username: joi.string().min(4).max(25).required(),
    password: joi.string().min(6).max(64).required(),
});

router.post('/register', (req, res) => {
    res.json({ test: true });
});

module.exports = router;
