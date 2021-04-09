import React from 'react';
import Account from './Account';
import Button from '@material-ui/core/Button';
import styles from '../styles/Chats.module.scss';
import { useMainPageContext } from '../context/MainPageContext';
import { connect } from 'react-redux';
import ex from 'classnames';

function Contacts({ showDate, contacts, userId }) {
    const { setProfile } = useMainPageContext();

    async function accessChat(friendId) {
        const request = await fetch('/api/chat/access', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                friendId,
                skipNumber: 0,
            }),
        });
        const { success, chat } = await request.json();

        if (success) console.log(chat);
    }

    if (contacts.length === 0 && showDate) return <span className={styles.notFound}>Контакты не найдены</span>;

    return contacts.map(({ username, avatar, id, date }, i) => (
        <Button key={i} className={styles.chatBlock} onClick={showDate ? () => accessChat(id) : () => setProfile({ visible: true, avatar, username, id })}>
            <div className={ex(styles.wrapper)}>
                <Account username={username} src={avatar} />
                {showDate ? <span className={styles.date}>{date}</span> : ''}
            </div>
        </Button>
    ));
}

export default connect(
    (state) => ({
        userId: state.userData.id,
    }),
    null
)(Contacts);
