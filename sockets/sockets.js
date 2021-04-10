const formatMessage = require('./utils/formatMessage');
const Conversation = require('../models/Conversation');
const User = require('../models/User');

function sockets(io) {
    io.on('connection', (socket) => {
        const { username, userId } = socket.handshake.query;

        socket.on('joinChat', async ({ chatId }) => {
            socket.join(chatId);
            const chat = await Conversation.findById(chatId);
            const notifications = await User.findById(userId).then((user) => user.notifications.filter(({ type, data }) => type === 'NEW_MESSAGE' && data.chatId === chatId));
            socket.emit('loadMessages', { messages: chat.messages, chatId, notificationsCount: notifications.length });
        });

        console.log(username, userId);

        socket.on('chatMessage', async ({ chatId, message }) => {
            const formattedMessage = formatMessage(username, chatId, message);

            Conversation.findById(chatId).then((chat) => {
                const members = chat.members.filter((id) => id !== userId);

                chat.messages.push({ from: formattedMessage.from, body: formattedMessage.body, date: formattedMessage.date });
                chat.save();

                members.forEach((id) =>
                    User.findById(id).then((user) => {
                        user.notifications.push({ type: 'NEW_MESSAGE', data: { chatId } });
                        user.save();
                    })
                );
            });

            io.to(chatId).emit('message', formattedMessage);
        });

        socket.on('removeNotifications', ({ chatId }) =>
            User.findById(userId).then((user) => {
                user.notifications = user.notifications.filter(({ type, data }) => type !== 'NEW_MESSAGE' || data.chatId !== chatId);
                user.save();
            })
        );
    });
}

module.exports = sockets;
