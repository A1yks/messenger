import React, { useState, useEffect } from 'react';
import Contacts from './Contacts';
import styles from '../styles/Chats.module.scss';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { useMainPageContext } from '../context/MainPageContext';

function Chats({ contacts, userId }) {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const { joinChat } = useMainPageContext();

    useEffect(() => {
        if (userId !== '') {
            const arr = [];
            contacts.forEach(({ friendId, chatId }) => {
                joinChat(chatId);
                arr.push(
                    fetch(`/api/chat/getUser/${friendId}`)
                        .then((res) => res.json())
                        .then((json) => ({ ...json.userData, chatId }))
                );
            });
            Promise.all(arr).then((users) => {
                setFriends(users);
                setLoading(false);
            });
        }
    }, [userId, contacts]);

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
    }),
    null
)(Chats);
