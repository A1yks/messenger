const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

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
        sentFriendRequests: [ObjectId],
        receivedFriendRequests: [ObjectId],
        contacts: [ObjectId],
    },
    { collection: 'users' }
);

module.exports = mongoose.model('User', userSchema);
