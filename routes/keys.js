const router = require('express').Router();
const NodeRSA = require('node-rsa');
const { verifyToken } = require('../functions/tokens');
const User = require('../models/User');
const Key = require('../models/Key');

async function getKeys(cipher, chatId) {
    const { aesKey } = await Key.findOne({ chatId });
    const encryptedAesKey = cipher.encrypt(aesKey, 'base64');

    return new Promise((resolve) => resolve({ [chatId]: encryptedAesKey }));
}

router.post('/getKeys', verifyToken, async (req, res) => {
    const { publicRSAKey } = req.body;
    const cipher = new NodeRSA();

    cipher.importKey(publicRSAKey);

    const user = await User.findById(req.user.id);
    const keys = user.contacts.map(({ chatId }) => getKeys(cipher, chatId));

    Promise.all(keys).then((keys) => {
        res.json({ success: true, keys: keys.reduce((acc, curr) => ({ ...acc, ...curr }), {}) });
    });
});

module.exports = router;
