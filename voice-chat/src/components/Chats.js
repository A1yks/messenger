import React, { useState, useEffect } from 'react';
import Contacts from './Contacts';
import styles from '../styles/Chats.module.scss';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

function Chats({ contacts }) {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const arr = [];
        contacts.forEach((id) =>
            arr.push(
                fetch(`/api/chat/getUser/${id}`)
                    .then((res) => res.json())
                    .then((json) => json.userData)
            )
        );
        Promise.all(arr).then((users) => setFriends(users));
    }, [contacts]);

    return (
        <div className={styles.main}>
            {contacts.length !== 0 && friends.length === 0 ? (
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
    }),
    null
)(Chats);
