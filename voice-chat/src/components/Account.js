import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import styles from '../styles/Account.module.scss';

function Account({ username, src, message, className }) {
    return (
        <div className={`${className || ''} ${styles.avatarWrapper}`}>
            <Avatar alt="user" src={src} />
            <div className={styles.info}>
                <span className={styles.username}>{username}</span>
                {message && <span className={styles.messagePart}>{message}</span>}
            </div>
        </div>
    );
}

export default Account;
