const Conversation = require('../models/Conversation');

async function createChat(userId, friendId) {
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
