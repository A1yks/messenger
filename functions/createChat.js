const Conversation = require('../models/Conversation');

async function createChat(userId, friendId) {
    const chatExists = await Conversation.findOne({ members: { $all: [userId, friendId] } });

    if (chatExists) return chatExists;

    const chat = new Conversation({
        members: [userId, friendId],
        date: new Date(),
    });

    try {
        await chat.save();
        return chat;
    } catch (err) {
        console.error(err);
        return null;
    }
}

module.exports = createChat;
