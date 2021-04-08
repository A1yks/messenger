import React, { useEffect } from 'react';
import Content from './Content';
import styles from '../styles/ChatMainPage.module.scss';
import LeftMenu from './LeftMenu';
import { useMainPageContext } from '../context/MainPageContext';
import LoadingPage from './LoadingPage';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../functions/mapDispatchToProps';
import Profile from './Profile';

function ChatMainPage({ getUserData }) {
    const { state } = useMainPageContext();

    useEffect(() => {
        if (state.userId !== '') {
            getUserData(state.userId);
        }
    }, [state.userId]);

    if (state.autoLogin) return <LoadingPage />;

    return (
        <div className={styles.wrapper}>
            <Profile />
            <LeftMenu />
            <Content />
        </div>
    );
}

export default connect(null, mapDispatchToProps)(ChatMainPage);
