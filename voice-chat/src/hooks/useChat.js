import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import aes256 from 'aes256';
import playNewMessageSound from '../functions/playNewMessageSound';
import { useDispatch, useSelector } from 'react-redux';
import { mapDispatchToProps } from '../functions/mapDispatchToProps';
import { getAesKeys } from '../functions/keys';

function useChat(username, userId, setProfile) {
    const [messages, setMessages] = useState({});
    const [unreadMessages, setUnreadMessages] = useState({});
    const [online, setOnline] = useState({});
    const [friendRequests, setFriendRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const socketRef = useRef(null);
    const dispatch = useDispatch();
    const { logout, addContact, removeContact, removeFriendRequest: removeFriendRequestRedux, getKeys, closeChat, rejectFriend } = mapDispatchToProps(dispatch);
    const aesKeys = useRef(null);
    const keys = useSelector((state) => state.keys);

    useEffect(() => {
        aesKeys.current = keys;
    }, [Object.keys(keys).length]);

    useEffect(() => {
        if (username !== '' && userId !== '') {
            socketRef.current = io(process.env.REACT_APP_SERVER_URL, {
                withCredentials: true,
                transports: ['websocket', 'polling'],
            });

            socketRef.current.on('loadData', ({ receivedFriendRequests }) => {
                setFriendRequests(receivedFriendRequests);
            });

            socketRef.current.on('message', ({ from, chatId, body, date }) => {
                setMessages((prev) => ({ ...prev, [chatId]: [...prev[chatId], { from, body: decryptMessage(body, chatId), date }] }));

                if (from !== username) {
                    setUnreadMessages((prev) => ({ ...prev, [chatId]: prev[chatId] + 1 }));
                    playNewMessageSound();
                }
            });

            socketRef.current.on('loadMessages', ({ messages, chatId }) => {
                messages = messages.map((obj) => ({ ...obj, body: decryptMessage(obj.body, chatId) }));
                setMessages((prev) => ({ ...prev, [chatId]: [...messages, ...prev[chatId]] }));
            });

            socketRef.current.on('joinedChat', ({ chatId, notificationsCount, online }) => {
                setUnreadMessages((prev) => ({ ...prev, [chatId]: notificationsCount }));
                setOnline((prev) => ({ ...prev, ...online }));
                setLoading(false);
            });

            socketRef.current.on('newFriendRequest', ({ friendRequest }) => {
                setFriendRequests((prev) => [...prev, friendRequest.from]);
            });

            socketRef.current.on('removeFriendRequest', ({ friendRequest }) => {
                setFriendRequests((prev) => prev.filter((id) => id !== friendRequest.from));
                rejectFriend(friendRequest.from);
            });

            socketRef.current.on('friendOffline', ({ friendId }) => {
                setOnline((prev) => ({ ...prev, [friendId]: false }));
            });

            socketRef.current.on('friendOnline', ({ friendId }) => {
                setOnline((prev) => ({ ...prev, [friendId]: true }));
            });

            socketRef.current.on('authError', async () => logout());

            socketRef.current.on('friendRequestAccepted', ({ contact }) => {
                getAesKeys(getKeys, () => addContact(contact));
            });

            socketRef.current.on('friendDeleted', ({ friendId }) => {
                setProfile((prev) => ({ ...prev, visible: false, avatar: '', username: '', id: '', chatId: '', requestSent: false, isFriend: false }));
                closeChat();
                removeContact(friendId);
                getAesKeys(getKeys);
            });

            socketRef.current.on('friendRequestCancelled', ({ userId }) => {
                removeFriendRequestRedux(userId);
            });

            const timer = setInterval(() => socketRef.current.emit('online'), 15000);

            return () => {
                socketRef.current.disconnect();
                clearInterval(timer);
            };
        }
    }, [username, userId]);

    function joinChat(chatId) {
        socketRef.current.emit('joinChat', { chatId });
        loadMessages(chatId);
        setMessages((prev) => ({ ...prev, [chatId]: [] }));
    }

    function loadMessages(chatId) {
        socketRef.current.emit('loadMessages', { chatId });
    }

    function sendMessage(chatId, message) {
        socketRef.current.emit('chatMessage', { chatId, message: encryptMessage(message, chatId) });
        setMessages((prev) => ({ ...prev, [chatId]: [...prev[chatId], { from: { username }, body: message, date: new Date() }] }));
    }

    function readMessages(chatId) {
        setUnreadMessages((prev) => ({ ...prev, [chatId]: 0 }));
        socketRef.current.emit('removeMessageNotifications', { chatId });
    }

    function sendFriendRequest(friendId) {
        socketRef.current.emit('newFriendRequest', { friendId });
    }

    function removeFriendRequest(friendId, accepted = false) {
        socketRef.current.emit('removeFriendRequest', { friendId, accepted });
    }

    function removeFriendRequestNotifications() {
        setFriendRequests([]);
        socketRef.current.emit('removeFriendRequestNotifications');
    }

    function acceptFriendRequest(friendId) {
        socketRef.current.emit('acceptFriendRequest', { friendId });
    }

    function deleteFriend(friendId) {
        socketRef.current.emit('deleteFriend', { friendId });
    }

    function cancelFriendRequest(friendId) {
        socketRef.current.emit('cancelFriendRequest', { friendId });
    }

    function encryptMessage(message, chatId) {
        return aes256.encrypt(aesKeys.current[chatId], message);
    }

    function decryptMessage(message, chatId) {
        return aes256.decrypt(aesKeys.current[chatId], message);
    }

    return {
        joinChat,
        sendMessage,
        messages,
        unreadMessages,
        online,
        loadMessages,
        readMessages,
        setLoading,
        loading,
        friendRequests,
        removeFriendRequestNotifications,
        sendFriendRequest,
        removeFriendRequest,
        acceptFriendRequest,
        deleteFriend,
        cancelFriendRequest,
    };
}

export default useChat;
