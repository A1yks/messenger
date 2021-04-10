const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({ from: String, body: String, date: String }, { _id: false });

const conversationSchema = new mongoose.Schema(
    {
        members: [String],
        messages: [messageSchema],
        date: String,
    },
    { collection: 'conversation', versionKey: false }
);

conversationSchema.method('toClient', function () {
    const obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;

    return obj;
});

module.exports = mongoose.model('Conversation', conversationSchema);
