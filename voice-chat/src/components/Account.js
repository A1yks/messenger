import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import styles from '../styles/Account.module.scss';

function Account({ username, src, message, online, className }) {
    if (src === process.env.REACT_APP_SERVER_URL) src = '';

    return (
        <div className={`${className || ''} ${styles.avatarWrapper}`}>
            {online ? (
                <Badge
                    color="secondary"
                    variant="dot"
                    className={styles.online}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <Avatar alt="user" src={src} />
                </Badge>
            ) : (
                <Avatar alt="user" src={src} />
            )}
            <div className={styles.info}>
                <span className={styles.username}>{username}</span>
                {message && <span className={styles.messagePart}>{message}</span>}
            </div>
        </div>
    );
}

export default Account;
