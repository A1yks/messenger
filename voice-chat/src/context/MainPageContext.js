import React, { useState, useEffect, useContext } from 'react';
import history from '../history';
import checkToken from '../functions/checkToken';

export const MainPageContext = React.createContext();

export const useMainPageContext = () => useContext(MainPageContext);

export function MainPageContextProvider({ children }) {
    const [state, setState] = useState({
        autoLogin: true,
        userId: '',
    });

    const [profile, setProfile] = useState({
        visible: false,
        avatar: '',
        username: '',
        isFriend: false,
    });

    useEffect(() => {
        (async () => {
            const { success, userId } = await checkToken();
            if (!success) return history.push('/auth/login');
            setState((prev) => ({ ...prev, autoLogin: false, userId }));
        })();
    }, []);

    return <MainPageContext.Provider value={{ state, profile, setProfile }}>{children}</MainPageContext.Provider>;
}
