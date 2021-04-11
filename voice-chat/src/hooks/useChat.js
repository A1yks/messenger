import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:3001';

function useChat(username, userId) {
    const [messages, setMessages] = useState({});
    const [unreadMessages, setUnreadMessages] = useState({});
    const [friendRequests, setFriendRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const socketRef = useRef(null);

    useEffect(() => {
        if (username !== '' && userId !== '') {
            socketRef.current = io(SERVER_URL, {
                withCredentials: true,
                query: { username, userId },
                transports: ['websocket', 'polling'],
            });

            socketRef.current.on('loadData', ({ receivedFriendRequests }) => {
                setFriendRequests(receivedFriendRequests);
            });

            socketRef.current.on('message', ({ from, chatId, body, date }) => {
                console.log(from);
                setMessages((prev) => ({ ...prev, [chatId]: [...prev[chatId], { from, body, date }] }));

                if (from !== username) setUnreadMessages((prev) => ({ ...prev, [chatId]: prev[chatId] + 1 }));
            });

            socketRef.current.on('loadMessages', ({ messages, chatId, notificationsCount }) => {
                setMessages((prev) => ({ ...prev, [chatId]: [...prev[chatId], ...messages] }));
                setUnreadMessages((prev) => ({ ...prev, [chatId]: notificationsCount }));
                setLoading(false);
            });

            socketRef.current.on('newFriendRequest', ({ friendRequest }) => {
                setFriendRequests((prev) => [...prev, friendRequest.from]);
            });

            socketRef.current.on('removeFriendRequest', ({ friendRequest }) => {
                setFriendRequests((prev) => prev.filter((id) => id !== friendRequest.from));
            });

            return () => socketRef.current.disconnect();
        }
    }, [username, userId]);

    function joinChat(chatId) {
        socketRef.current.emit('joinChat', { chatId });
        setMessages((prev) => ({ ...prev, [chatId]: [] }));
    }

    function sendMessage(chatId, message) {
        socketRef.current.emit('chatMessage', { chatId, message });
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

    return { joinChat, sendMessage, messages, unreadMessages, readMessages, setLoading, loading, friendRequests, removeFriendRequestNotifications, sendFriendRequest, removeFriendRequest };
}

export default useChat;
