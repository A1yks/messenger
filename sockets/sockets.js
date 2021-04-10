const formatMessage = require('./utils/formatMessage');
const Conversation = require('../models/Conversation');

function sockets(io) {
    io.on('connection', (socket) => {
        const { username, userId } = socket.handshake.query;

        socket.on('joinChat', async ({ chatId }) => {
            socket.join(chatId);
            const chat = await Conversation.findById(chatId);
            socket.emit('loadMessages', { messages: chat.messages, chatId });
        });

        console.log(username, userId);

        socket.on('chatMessage', async ({ chatId, message }) => {
            const chat = await Conversation.findById(chatId);
            const formattedMessage = formatMessage(username, chatId, message);
            chat.messages.push({ from: formattedMessage.from, body: formattedMessage.body, date: formattedMessage.date });
            console.log(chat);
            chat.save();
            io.to(chatId).emit('message', formattedMessage);
        });
    });
}

module.exports = sockets;
