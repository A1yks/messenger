const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({ from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, body: String, date: Date }, { _id: false });

const conversationSchema = new mongoose.Schema(
    {
        members: [String],
        messages: [messageSchema],
        date: String,
        key: String,
    },
    { collection: 'conversation', versionKey: false }
);

conversationSchema.method('toClient', function () {
    const obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;
    delete obj.key;

    return obj;
});

module.exports = mongoose.model('Conversation', conversationSchema);
