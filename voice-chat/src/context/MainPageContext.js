import React, { useState, useEffect, useContext } from 'react';
import checkToken from '../functions/checkToken';
import useChat from '../hooks/useChat';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../functions/mapDispatchToProps';
import checkRefreshToken from '../functions/checkRefreshToken';

export const MainPageContext = React.createContext();

export const useMainPageContext = () => useContext(MainPageContext);

function MainPageContextProvider({ children, aesKeys, logout, contactsCount }) {
    const [state, setState] = useState({
        autoLogin: true,
        userId: '',
        username: '',
        keysLoaded: false,
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

    const [settingsOpened, setSettingsOpened] = useState(false);

    const {
        joinChat,
        sendMessage,
        messages,
        unreadMessages,
        online,
        loadMessages,
        readMessages,
        setLoading: setChatLoading,
        loading: chatLoading,
        friendRequests,
        removeFriendRequestNotifications,
        sendFriendRequest,
        removeFriendRequest,
        acceptFriendRequest,
        deleteFriend,
        cancelFriendRequest,
    } = useChat(state.username, state.userId, setProfile);

    useEffect(() => {
        let timer;

        (async () => {
            const { success, userId, username, exp } = await checkToken();
            console.log(exp, (exp * 1000 - Date.now()) * 0.8);
            if (!success) return logout();

            const callback = async () => {
                const { success, exp } = await checkRefreshToken();
                if (!success) return logout();
                else {
                    console.log(success, exp);
                    timer = setTimeout(callback, (exp * 1000 - Date.now()) * 0.8);
                }
            };

            timer = setTimeout(callback, (exp * 1000 - Date.now()) * 0.8);

            setState((prev) => ({ ...prev, autoLogin: false, userId, username }));
        })();

        return () => timer && clearTimeout(timer);
    }, []);

    return (
        <MainPageContext.Provider
            value={{
                state,
                setState,
                profile,
                setProfile,
                joinChat,
                sendMessage,
                messages,
                unreadMessages,
                online,
                loadMessages,
                readMessages,
                setChatLoading,
                chatLoading,
                friendRequests,
                removeFriendRequestNotifications,
                sendFriendRequest,
                removeFriendRequest,
                acceptFriendRequest,
                settingsOpened,
                setSettingsOpened,
                deleteFriend,
                cancelFriendRequest,
            }}
        >
            {children}
        </MainPageContext.Provider>
    );
}

MainPageContextProvider = connect((state) => ({ aesKeys: state.keys, contactsCount: state.userData.contacts.length }), mapDispatchToProps)(MainPageContextProvider);

export { MainPageContextProvider };
