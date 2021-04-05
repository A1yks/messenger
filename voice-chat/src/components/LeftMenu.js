import React from 'react';
import styles from '../styles/LeftMenu.module.scss';
import LeftMenuInfo from './LeftMenuInfo';
import Chats from './Chats';

function LeftMenu() {
    return (
        <div className={styles.leftMenu}>
            <LeftMenuInfo />
            <Chats />
        </div>
    );
}

export default LeftMenu;
