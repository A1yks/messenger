import React, { useState, useEffect, useContext } from 'react';
import history from '../history';
import checkToken from '../functions/checkToken';
import useChat from '../hooks/useChat';

export const MainPageContext = React.createContext();

export const useMainPageContext = () => useContext(MainPageContext);

export function MainPageContextProvider({ children }) {
    const [state, setState] = useState({
        autoLogin: true,
        userId: '',
        username: '',
    });

    const [profile, setProfile] = useState({
        visible: false,
        avatar: '',
        username: '',
        id: '',
        chatId: '',
        requestSent: false,
        isFriend: false,
    });

    const { joinChat, sendMessage, messages, unreadMessages, readMessages, setLoading: setChatLoading, loading: chatLoading } = useChat(state.username, state.userId);

    useEffect(() => {
        (async () => {
            const { success, userId, username } = await checkToken();
            if (!success) return history.push('/auth/login');
            setState((prev) => ({ ...prev, autoLogin: false, userId, username }));
        })();
    }, []);

    return (
        <MainPageContext.Provider value={{ state, profile, setProfile, joinChat, sendMessage, messages, unreadMessages, readMessages, setChatLoading, chatLoading }}>
            {children}
        </MainPageContext.Provider>
    );
}
