import React from 'react';
import Contacts from './Contacts';
import styles from '../styles/Chats.module.scss';

function Chats() {
    return (
        <div className={styles.main}>
            <div className={styles.titleWrapper}>
                <span className={styles.title}>Недавние чаты</span>
            </div>
            <Contacts showDate={true} contacts={[]} />
        </div>
    );
}

export default Chats;
