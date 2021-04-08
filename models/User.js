const mongoose = require('mongoose');

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
        contacts: [String],
    },
    { collection: 'users' }
);

module.exports = mongoose.model('User', userSchema);
