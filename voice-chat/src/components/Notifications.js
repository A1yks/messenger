import React, { useEffect, useState } from 'react';
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

function Notifications({ visible, receivedFriendRequests, saveFriendRequests }) {
    const { friendRequests, removeFriendRequestNotifications } = useMainPageContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (visible) {
            const arr = [];
            friendRequests.forEach((id) => {
                if (receivedFriendRequests.find((user) => user.id === id)) return;

                arr.push(
                    fetch(`/api/chat/getUser/${id}`)
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
    }, [visible]);

    if (!visible) return '';

    return (
        <div className={styles.main}>
            <Paper className={styles.paper} variant="outlined">
                {loading ? (
                    <CircularProgress className={styles.loading} />
                ) : receivedFriendRequests.length === 0 ? (
                    <span className={styles.empty}>Уведомлений нет</span>
                ) : (
                    <List>
                        {receivedFriendRequests.map(({ username, avatar }, i) => (
                            <ListItem key={i} className={styles.item}>
                                <Account username={username} src={avatar} />
                                <Button className={styles.addFriend}>Принять заявку в друзья</Button>
                                <Button className={styles.cancelFriend}>Отклонить заявку в друзья</Button>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Paper>
        </div>
    );
}

export default connect(
    (state) => ({
        receivedFriendRequests: state.userData.receivedFriendRequests,
    }),
    mapDispatchToProps
)(Notifications);
