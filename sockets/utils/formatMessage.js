const moment = require('moment');

function formatMessage(username, chatId, text) {
    return {
        from: username,
        chatId,
        body: text,
        date: moment().format('hh:mm a'),
    };
}

module.exports = formatMessage;
