import React, { useState, useEffect } from 'react';
import Contacts from './Contacts';
import styles from '../styles/Chats.module.scss';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useMainPageContext } from '../context/MainPageContext';
import { mapDispatchToProps } from '../functions/mapDispatchToProps';

function Chats({ contacts, userId, keysLoaded, aesKeys }) {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const { joinChat } = useMainPageContext();

    useEffect(() => {
        if (userId !== '' && keysLoaded) {
            const arr = [];
            contacts.forEach(({ friendId, chatId }) => {
                joinChat(chatId);
                arr.push(
                    fetch(`${process.env.REACT_APP_SERVER_URL}/api/chat/getUser/${friendId}`, { credentials: 'include' })
                        .then((res) => res.json())
                        .then((json) => ({ ...json.userData, chatId }))
                );
            });
            Promise.all(arr).then((users) => {
                setFriends(users);
                setLoading(false);
            });
        }
    }, [userId, contacts, keysLoaded]);

    return (
        <div className={styles.main}>
            {loading ? (
                <CircularProgress className={styles.loading} />
            ) : (
                <>
                    <div className={styles.titleWrapper}>
                        <span className={styles.title}>Недавние чаты</span>
                    </div>
                    <Contacts showDate={true} contacts={friends} />
                </>
            )}
        </div>
    );
}

export default connect(
    (state) => ({
        contacts: state.userData.contacts,
        userId: state.userData.id,
        aesKeys: state.keys,
        keysLoaded: Object.keys(state.keys).length === state.userData.contacts.length,
    }),
    mapDispatchToProps
)(Chats);
