import React, { useState } from 'react';
import Account from './Account';
import Button from '@material-ui/core/Button';
import styles from '../styles/Profile.module.scss';
import cx from 'classnames';
import { useMainPageContext } from '../context/MainPageContext';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../functions/mapDispatchToProps';

function Profile({ userId, addFriendRequest, sentFriendRequests, receivedFriendRequests, contacts, removeFriendRequest, addContact, removeContact }) {
    const { profile, setProfile } = useMainPageContext();

    function closeModal(e) {
        if (e.target.classList.contains(styles.main)) {
            setProfile((prev) => ({ ...prev, visible: false }));
        }
    }

    async function sendFriendRequest() {
        const request = await fetch('/api/chat/addFriend', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                friendId: profile.id,
            }),
        });
        const { success } = await request.json();

        if (success) addFriendRequest(profile.id);
    }

    async function cancelFriendRequest() {
        const request = await fetch('/api/chat/cancelFriendRequest', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                friendId: profile.id,
            }),
        });
        const { success } = await request.json();

        if (success) removeFriendRequest(profile.id);
    }

    async function acceptFriendRequest() {
        const request = await fetch('/api/chat/acceptFriend', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                friendId: profile.id,
            }),
        });
        const { success, chatId } = await request.json();

        if (success) addContact({ friendId: profile.id, chatId });
    }

    async function removeFriend() {
        const request = await fetch('/api/chat/removeFriend', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                friendId: profile.id,
            }),
        });
        const { success } = await request.json();

        if (success) removeContact(profile.id);
    }

    if (!profile.visible) return '';

    let btnText = '';
    let handleClick = null;

    if (contacts.find(({ friendId }) => friendId === profile.id)) {
        btnText = 'Удалить из друзей';
        handleClick = removeFriend;
    } else if (sentFriendRequests.includes(profile.id)) {
        btnText = 'Отменить заявку';
        handleClick = cancelFriendRequest;
    } else if (receivedFriendRequests.includes(profile.id)) {
        btnText = 'Принять заявку в друзья';
        handleClick = acceptFriendRequest;
    } else {
        btnText = 'Добавить в друзья';
        handleClick = sendFriendRequest;
    }

    return (
        <div className={styles.main} onClick={closeModal}>
            <div className={styles.wrapper}>
                <Account username={profile.username} src={profile.avatar} className={styles.account} />
                <Button
                    onClick={handleClick}
                    className={cx(
                        { [styles.removeFriend]: contacts.find(({ friendId }) => friendId === profile.id) },
                        { [styles.cancelRequest]: sentFriendRequests.includes(profile.id) },
                        { [styles.addFriend]: !contacts.find(({ friendId }) => friendId === profile.id) },
                        styles.btn
                    )}
                >
                    {btnText}
                </Button>
            </div>
        </div>
    );
}

export default connect(
    (state) => ({
        userId: state.userData.id,
        sentFriendRequests: state.userData.sentFriendRequests,
        receivedFriendRequests: state.userData.receivedFriendRequests,
        contacts: state.userData.contacts,
    }),
    mapDispatchToProps
)(Profile);
