const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.cookies.authToken;

    if (!token) return res.status(401).json({ success: false, message: 'Доступ запрещен' });

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ success: false, message: 'Невалидный токен' });
    }
}

module.exports = { verifyToken };
