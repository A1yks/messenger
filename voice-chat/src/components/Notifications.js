import React, { useState, useEffect, useRef } from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Account from './Account';
import styles from '../styles/Notifications.module.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useMainPageContext } from '../context/MainPageContext';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../functions/mapDispatchToProps';
import { acceptFriendRequest, rejectFriendRequest } from '../functions/friendRequests';
import { getAesKeys } from '../functions/keys';

function Notifications({ visible, receivedFriendRequests, saveFriendRequests, addContact, rejectFriend, setNotificationsVisible, iconBtnRef, getKeys, aesKeysCount }) {
    const {
        friendRequests,
        removeFriendRequestNotifications,
        removeFriendRequest: removeFriendRequestBySocket,
        acceptFriendRequest: acceptFriendRequestBySocket,
        cancelFriendRequest: cancelFriendRequestBySocket,
    } = useMainPageContext();
    const [loading, setLoading] = useState(true);
    const notificationsMenu = useRef(null);

    useEffect(() => {
        if (visible) {
            console.log(friendRequests);
            const arr = [];
            friendRequests.forEach((id) => {
                if (receivedFriendRequests.find((user) => user.id === id)) return;

                arr.push(
                    fetch(`${process.env.REACT_APP_SERVER_URL}/api/chat/getUser/${id}`, { credentials: 'include' })
                        .then((res) => res.json())
                        .then((json) => ({ ...json.userData }))
                );
            });

            Promise.all(arr).then((users) => {
                saveFriendRequests(users);
                setLoading(false);
                removeFriendRequestNotifications();
            });
        }
    }, [visible, friendRequests.length, receivedFriendRequests.length]);

    useEffect(() => {
        if (visible && iconBtnRef.current !== null) {
            const onClick = (e) => {
                iconBtnRef.current !== null &&
                    notificationsMenu.current !== null &&
                    !iconBtnRef.current.contains(e.target) &&
                    !notificationsMenu.current.contains(e.target) &&
                    setNotificationsVisible(false);
            };

            document.addEventListener('click', onClick);

            return () => document.removeEventListener('click', onClick);
        }
    }, [visible, iconBtnRef.current]);

    if (!visible) return '';

    return (
        <div className={styles.main} ref={notificationsMenu}>
            <Paper className={styles.paper} variant="outlined">
                {loading ? (
                    <CircularProgress className={styles.loading} />
                ) : receivedFriendRequests.length === 0 ? (
                    <span className={styles.empty}>Уведомлений нет</span>
                ) : (
                    <List>
                        {receivedFriendRequests.map(({ username, avatar, id }, i) => {
                            avatar = process.env.REACT_APP_SERVER_URL + avatar;
                            return (
                                <ListItem key={i} className={styles.item}>
                                    <Account username={username} src={avatar} />
                                    <Button
                                        onClick={() =>
                                            acceptFriendRequest(id, (chatId) => {
                                                getAesKeys(getKeys, () => {
                                                    removeFriendRequestBySocket(id, true);
                                                    addContact({ friendId: id, chatId });
                                                    acceptFriendRequestBySocket(id);
                                                });
                                            })
                                        }
                                        className={styles.addFriend}
                                    >
                                        Принять заявку в друзья
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            rejectFriendRequest(id, () => {
                                                removeFriendRequestBySocket(id, true);
                                                rejectFriend(id);
                                                cancelFriendRequestBySocket(id);
                                            })
                                        }
                                        className={styles.cancelFriend}
                                    >
                                        Отклонить заявку в друзья
                                    </Button>
                                </ListItem>
                            );
                        })}
                    </List>
                )}
            </Paper>
        </div>
    );
}

export default connect(
    (state) => ({
        aesKeysCount: Object.keys(state.keys).length,
        receivedFriendRequests: state.userData.receivedFriendRequests,
    }),
    mapDispatchToProps
)(Notifications);
