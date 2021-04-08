import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import styles from '../styles/Message.module.scss';
import { useMainPageContext } from '../context/MainPageContext';

function Message({ avatar, username, date, children }) {
    const { setProfile } = useMainPageContext();

    function handleClick() {
        setProfile({ visible: true, avatar, username });
    }

    return (
        <div className={styles.main}>
            <Avatar alt="user" src={avatar} className={styles.avatar} onClick={handleClick} />
            <div className={styles.messageWrapper}>
                <div className={styles.usernameWrapper}>
                    <span className={styles.username} onClick={handleClick}>
                        {username}
                    </span>
                    <span className={styles.date}>{date}</span>
                </div>
                <div className={styles.message}>{children}</div>
            </div>
        </div>
    );
}

export default Message;
