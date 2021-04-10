const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({ friendId: String, chatId: String }, { _id: false });

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            min: 4,
            max: 25,
            required: true,
        },
        password: {
            type: String,
            min: 6,
            max: 64,
            required: true,
        },
        avatar: {
            type: String,
            default: '',
        },
        sentFriendRequests: [String],
        receivedFriendRequests: [String],
        contacts: [contactSchema],
    },
    { collection: 'users' }
);

module.exports = mongoose.model('User', userSchema);
