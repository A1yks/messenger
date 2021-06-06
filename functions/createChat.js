const Conversation = require('../models/Conversation');
const Aes256 = require('../encryption/aes');
const Key = require('../models/Key');

async function createChat(userId, friendId) {
    const chatExists = await Conversation.findOne({ members: { $all: [userId, friendId] } });

    if (chatExists) return chatExists;

    const chat = new Conversation({
        members: [userId, friendId],
        date: new Date(),
    });
    const aesKey = new Key({
        chatId: chat._id,
        aesKey: Aes256.generateKey(),
    });

    try {
        await chat.save();
        await aesKey.save();
        return chat;
    } catch (err) {
        console.error(err);
        return null;
    }
}

module.exports = createChat;
