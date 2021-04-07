import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import styles from '../styles/Message.module.scss';

function Message({ avatar, username, date, children }) {
    return (
        <div className={styles.main}>
            <Avatar alt="user" src={avatar} className={styles.avatar} />
            <div className={styles.messageWrapper}>
                <div className={styles.usernameWrapper}>
                    <span className={styles.username}>{username}</span>
                    <span className={styles.date}>{date}</span>
                </div>
                <div className={styles.message}>{children}</div>
            </div>
        </div>
    );
}

export default Message;
