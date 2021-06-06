const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema(
    {
        userId: mongoose.Types.ObjectId,
    },
    { collection: 'tokens' }
);

module.exports = mongoose.model('Token', TokenSchema);
