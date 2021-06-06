const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const Token = require('../models/Token');

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

function verifySocketToken(socket, next) {
    const cookies = cookie.parse(socket.handshake?.headers?.cookie || '');
    const token = cookies.authToken || '';

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        socket.user = verified;
        socket.authToken = token;
        next();
    } catch (err) {
        console.error(err);
        next(new Error('Authentication error'));
    }
}

const getAccessToken = (userId, username) => {
    return jwt.sign({ id: userId, username, type: 'access' }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
};

const getRefreshToken = async (userId, username) => {
    await Token.findOneAndDelete({ userId });
    const refreshToken = new Token({ userId });
    const savedToken = await refreshToken.save();
    return jwt.sign({ id: userId, username, tokenId: savedToken._id, type: 'refresh' }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
};

const updateTokens = async (userId, refreshTokenId) => {
    const token = await Token.findOne({ userId, _id: refreshTokenId });

    if (token !== null) {
        const accessToken = getAccessToken(userId);
        const refreshToken = await getRefreshToken(userId);

        return {
            accessToken,
            refreshToken,
        };
    }

    return null;
};

module.exports = { verifyToken, verifySocketToken, getAccessToken, getRefreshToken, updateTokens };
