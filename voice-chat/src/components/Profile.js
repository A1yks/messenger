import React, { useState } from 'react';
import Account from './Account';
import Button from '@material-ui/core/Button';
import styles from '../styles/Profile.module.scss';
import cx from 'classnames';
import { useMainPageContext } from '../context/MainPageContext';

function Profile() {
    const { profile, setProfile } = useMainPageContext();

    function handleClick(e) {
        if (e.target.classList.contains(styles.main)) {
            setProfile((prev) => ({ ...prev, visible: false }));
        }
    }

    if (!profile.visible) return '';

    return (
        <div className={styles.main} onClick={handleClick}>
            <div className={styles.wrapper}>
                <Account username={profile.username} src={profile.avatar} className={styles.account} />
                <Button className={cx({ [styles.removeFriend]: profile.isFriend }, { [styles.addFriend]: !profile.isFriend }, styles.btn)}>
                    {profile.isFriend ? 'Удалить из друзей' : 'Добавить в друзья'}
                </Button>
            </div>
        </div>
    );
}

export default Profile;
