import React from 'react';
import Account from './Account';
import Button from '@material-ui/core/Button';
import styles from '../styles/Profile.module.scss';
import cx from 'classnames';
import { useMainPageContext } from '../context/MainPageContext';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../functions/mapDispatchToProps';
import { sendFriendRequest, cancelFriendRequest, acceptFriendRequest, removeFriend } from '../functions/friendRequests';
import { getAesKeys } from '../functions/keys';

function Profile({ addFriendRequest, sentFriendRequests, receivedFriendRequests, contacts, removeFriendRequest, addContact, removeContact, removeKey, getKeys, closeChat }) {
    const {
        profile,
        setProfile,
        sendFriendRequest: sendFriendRequestBySocket,
        removeFriendRequest: removeFriendRequestBySocket,
        acceptFriendRequest: acceptFriendRequestBySocket,
        deleteFriend: deleteFriendBySocket,
    } = useMainPageContext();

    function closeModal(e) {
        if (e.target.classList.contains(styles.main)) {
            setProfile((prev) => ({ ...prev, visible: false }));
        }
    }

    if (!profile.visible) return '';

    let btnText = '';
    let handleClick = null;

    if (contacts.find(({ friendId }) => friendId === profile.id)) {
        btnText = 'Удалить из друзей';
        handleClick = () =>
            removeFriend(profile.id, () => {
                removeContact(profile.id);
                removeKey(contacts.find(({ friendId }) => friendId === profile.id).chatId);
                deleteFriendBySocket(profile.id);
                setProfile((prev) => ({ ...prev, visible: false, avatar: '', username: '', id: '', chatId: '', requestSent: false, isFriend: false }));
                closeChat();
            });
    } else if (sentFriendRequests.includes(profile.id)) {
        btnText = 'Отменить заявку';
        handleClick = () =>
            cancelFriendRequest(profile.id, () => {
                removeFriendRequestBySocket(profile.id);
                removeFriendRequest(profile.id);
            });
    } else if (receivedFriendRequests.find(({ id }) => id === profile.id)) {
        btnText = 'Принять заявку в друзья';
        handleClick = () =>
            acceptFriendRequest(profile.id, (chatId) => {
                getAesKeys(getKeys, () => {
                    removeFriendRequestBySocket(profile.id, true);
                    addContact({ friendId: profile.id, chatId });
                    acceptFriendRequestBySocket(profile.id);
                });
            });
    } else {
        btnText = 'Добавить в друзья';
        handleClick = () =>
            sendFriendRequest(profile.id, () => {
                sendFriendRequestBySocket(profile.id);
                addFriendRequest(profile.id);
            });
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
