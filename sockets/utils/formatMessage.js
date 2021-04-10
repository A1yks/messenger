function formatMessage(username, chatId, text) {
    return {
        from: username,
        chatId,
        body: text,
        date: new Date(),
    };
}

module.exports = formatMessage;
