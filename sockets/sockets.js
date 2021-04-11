const formatMessage = require('./utils/formatMessage');
const Conversation = require('../models/Conversation');
const User = require('../models/User');

function sockets(io) {
    io.on('connection', async (socket) => {
        const { username, userId } = socket.handshake.query;

        socket.on('joinChat', async ({ chatId }) => {
            socket.join(chatId);
            const chat = await Conversation.findById(chatId);
            const notifications = await User.findById(userId).then((user) => user.notifications.filter(({ type, data }) => type === 'NEW_MESSAGE' && data.chatId === chatId));
            socket.emit('loadMessages', { messages: chat.messages, chatId, notificationsCount: notifications.length });
        });

        socket.on('chatMessage', ({ chatId, message }) => {
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

        socket.on('removeMessageNotifications', async ({ chatId }) => {
            const user = await User.findById(userId);
            const updatedNotifications = user.notifications.filter(({ type, data }) => type !== 'NEW_MESSAGE' || data.chatId !== chatId);
            await User.findOneAndUpdate({ _id: userId }, { notifications: updatedNotifications });
        });

        socket.on('removeFriendRequestNotifications', async () => {
            const user = await User.findById(userId);
            const updatedNotifications = user.notifications.filter(({ type, data }) => type !== 'FRIEND_REQUEST' || data.friendId !== userId);
            await User.findOneAndUpdate({ _id: userId }, { notifications: updatedNotifications });
        });

        socket.on('newFriendRequest', async ({ friendId }) => {
            const friend = await User.findById(friendId);

            if (friend !== null && friend.socketId !== '') {
                const friendRequest = { from: userId };
                friend.notifications.push({ type: 'FRIEND_REQUEST', data: { friendId } });
                await friend.save();
                io.to(friend.socketId).emit('newFriendRequest', { friendRequest });
            }
        });

        socket.on('removeFriendRequest', async ({ friendId, accepted }) => {
            const friend = await User.findById(accepted ? userId : friendId);

            if (friend !== null && friend.socketId !== '') {
                const friendRequest = { from: accepted ? friendId : userId };
                io.to(friend.socketId).emit('removeFriendRequest', { friendRequest });
            }
        });

        socket.on('disconnect', async () => {
            await User.findOneAndUpdate({ _id: userId }, { socketId: '' });
            console.log('disconnect', username);
        });

        const user = await User.findById(userId);
        const receivedFriendRequests = user.receivedFriendRequests;
        user.socketId = socket.id;

        socket.emit('loadData', { receivedFriendRequests });

        user.save();
    });
}

module.exports = sockets;
