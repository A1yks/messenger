import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import styles from '../styles/Account.module.scss';

function Account({ username, src }) {
    return (
        <div className={styles.avatarWrapper}>
            <Avatar alt="user" src={src} />
            <span className={styles.username}>{username}</span>
        </div>
    );
}

export default Account;
