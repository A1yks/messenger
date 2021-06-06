const mongoose = require('mongoose');

const keySchema = new mongoose.Schema(
    {
        chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
        aesKey: String,
    },
    { collection: 'keys', versionKey: false }
);

module.exports = mongoose.model('Key', keySchema);
