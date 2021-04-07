import React from 'react';
import Navbar from './Navbar';
import ChatBody from './ChatBody';
import styles from '../styles/Content.module.scss';

function Content() {
    return (
        <div className={styles.main}>
            <Navbar chatName="Test 2" />
            <ChatBody />
        </div>
    );
}

export default Content;
