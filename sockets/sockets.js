const formatMessage = require('./utils/formatMessage');
const Conversation = require('../models/Conversation');
const User = require('../models/User');
const { verifySocketToken } = require('../functions/tokens');

function sockets(io) {
    io.use(verifySocketToken).on('connection', async (socket) => {
        const { username, id: userId } = socket.user;
        console.log(username);

        socket.on('loadMessages', async ({ chatId }) => {
            const chat = await Conversation.findOne({ _id: chatId }).populate({
                path: 'messages.from',
                select: 'username -_id',
            });
            socket.emit('loadMessages', { messages: chat.messages, chatId });
        });

        socket.on('joinChat', async ({ chatId }) => {
            socket.join(chatId);
            const chat = await Conversation.findById(chatId).populate({ path: 'messages.from', select: 'username -_id' });
            const notifications = await User.findById(userId).then((user) => user.notifications.filter(({ type, data }) => type === 'NEW_MESSAGE' && data.chatId === chatId));
            const friendId = chat.members.find((id) => id !== userId);
            const friend = await User.findById(friendId);
            const online = { [friendId]: friend.socketId !== '' };
            socket.emit('joinedChat', { chatId, notificationsCount: notifications.length, online });
        });

        socket.on('chatMessage', ({ chatId, message }) => {
            const formattedMessage = formatMessage(username, chatId, message);

            Conversation.findById(chatId)
                .populate({ path: 'messages.from', select: 'username -_id' })
                .then((chat) => {
                    const members = chat.members.filter((id) => id !== userId);

                    chat.messages.push({ from: userId, body: formattedMessage.body, date: formattedMessage.date });
                    chat.save();

                    members.forEach((id) =>
                        User.findById(id).then((user) => {
                            user.notifications.push({ type: 'NEW_MESSAGE', data: { chatId } });
                            user.save();
                        })
                    );
                });

            socket.to(chatId).emit('message', formattedMessage);
        });

        socket.on('removeMessageNotifications', async ({ chatId }) => {
            const user = await User.findById(userId);
            user.notifications = user.notifications.filter(({ type, data }) => type !== 'NEW_MESSAGE' || data.chatId !== chatId);
            user.save();
        });

        socket.on('removeFriendRequestNotifications', async () => {
            const user = await User.findById(userId);
            user.notifications = user.notifications.filter(({ type, data }) => type !== 'FRIEND_REQUEST' || data.friendId !== userId);
            user.save();
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

        socket.on('acceptFriendRequest', async ({ friendId }) => {
            const friend = await User.findById(friendId);

            if (friend !== null && friend.socketId !== '') {
                const contact = friend.contacts.find(({ friendId }) => friendId === userId);
                if (contact !== undefined) io.to(friend.socketId).emit('friendRequestAccepted', { contact });
            }
        });

        socket.on('deleteFriend', async ({ friendId }) => {
            const friend = await User.findById(friendId);

            if (friend !== null && friend.socketId !== '') {
                io.to(friend.socketId).emit('friendDeleted', { friendId: userId });
            }
        });

        socket.on('cancelFriendRequest', async ({ friendId }) => {
            const friend = await User.findById(friendId);

            if (friend !== null && friend.socketId !== '') {
                io.to(friend.socketId).emit('friendRequestCancelled', { userId });
            }
        });

        socket.on('disconnect', async () => {
            const user = await User.findById(userId);
            user.socketId = '';
            user.contacts.forEach(({ chatId }) => socket.to(chatId).emit('friendOffline', { friendId: user._id }));
            user.save();
            console.log('disconnect', username);
        });

        socket.on('call', async ({ chatId }) => {
            socket.to(chatId).emit('incomingCall', { from: username });
        });

        socket.on('error', () => {
            socket.emit('authError');
        });

        socket.on('online', async () => {
            await User.findOneAndUpdate({ _id: userId }, { socketId: socket.id });
        });

        const user = await User.findById(userId);
        user.contacts.forEach(({ chatId }) => socket.to(chatId).emit('friendOnline', { friendId: user._id }));
        const receivedFriendRequests = user.receivedFriendRequests;
        user.socketId = socket.id;

        socket.emit('loadData', { receivedFriendRequests });

        user.save();
    });
}

module.exports = sockets;
