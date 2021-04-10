import React from 'react';
import Navbar from './Navbar';
import ChatBody from './ChatBody';
import styles from '../styles/Content.module.scss';
import { connect } from 'react-redux';

function Content({ friend }) {
    if (friend === undefined)
        return (
            <div className={styles.main}>
                <span>Рандомный текст</span>
            </div>
        );

    return (
        <div className={styles.main}>
            <Navbar chatName={friend.username} />
            <ChatBody friend={friend} />
        </div>
    );
}

export default connect((state) => ({ friend: state.selectedChat.friend, members: state.selectedChat.members }), null)(Content);
