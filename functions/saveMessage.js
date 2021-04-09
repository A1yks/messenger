async function saveMessage(chat, from, body) {
    chat.messages.push({ from, body });
    chat.date = new Date();
    await chat.save();
}

module.exports = saveMessage;
