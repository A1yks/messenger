import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:3001';

function useChat(username, userId) {
    const [messages, setMessages] = useState({});
    const [unreadMessages, setUnreadMessages] = useState({});
    const [loading, setLoading] = useState(true);
    const socketRef = useRef(null);

    useEffect(() => {
        if (username !== '' && userId !== '') {
            socketRef.current = io(SERVER_URL, {
                withCredentials: true,
                query: { username, userId },
            });

            socketRef.current.on('message', ({ from, chatId, body, date }) => {
                setMessages((prev) => ({ ...prev, [chatId]: [...prev[chatId], { from, body, date }] }));

                if (from !== username) setUnreadMessages((prev) => ({ ...prev, [chatId]: prev[chatId] + 1 }));
            });

            socketRef.current.on('loadMessages', ({ messages, chatId, notificationsCount }) => {
                setMessages((prev) => ({ ...prev, [chatId]: [...prev[chatId], ...messages] }));
                setUnreadMessages((prev) => ({ ...prev, [chatId]: notificationsCount }));
                setLoading(false);
            });
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
        socketRef.current.emit('removeNotifications', { chatId });
    }

    return { joinChat, sendMessage, messages, unreadMessages, readMessages, setLoading, loading };
}

export default useChat;
