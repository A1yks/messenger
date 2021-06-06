import React, { useState, useEffect } from 'react';
import Content from './Content';
import styles from '../styles/ChatMainPage.module.scss';
import LeftMenu from './LeftMenu';
import { useMainPageContext } from '../context/MainPageContext';
import LoadingPage from './LoadingPage';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../functions/mapDispatchToProps';
import Profile from './Profile';
import { getAesKeys } from '../functions/keys';

function ChatMainPage({ aesKeysCount, getUserData, getKeys, contactsCount, userData }) {
    const { state, setState } = useMainPageContext();

    useEffect(() => {
        if (!state.autoLogin && userData.id !== '' && aesKeysCount === contactsCount && !state.keysLoaded) setState((prev) => ({ ...prev, keysLoaded: true }));
    }, [aesKeysCount, contactsCount, state.autoLogin, userData.id]);

    useEffect(() => {
        if (state.userId !== '') {
            getUserData(state.userId);
            getAesKeys(getKeys);
        }
    }, [state.userId]);

    if (state.autoLogin || !state.keysLoaded) return <LoadingPage />;

    return (
        <div className={styles.wrapper}>
            <Profile />
            <LeftMenu />
            <Content />
        </div>
    );
}

export default connect((state) => ({ userData: state.userData, aesKeysCount: Object.keys(state.keys).length, contactsCount: state.userData.contacts.length }), mapDispatchToProps)(ChatMainPage);
