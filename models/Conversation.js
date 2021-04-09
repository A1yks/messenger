const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
    {
        members: [String],
        messages: [{ from: String, body: String }],
        date: Date,
    },
    { collection: 'conversation' }
);

module.exports = mongoose.model('Conversation', conversationSchema);
