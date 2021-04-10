import React, { useState, useEffect } from 'react';
import Account from './Account';
import Button from '@material-ui/core/Button';
import styles from '../styles/Chats.module.scss';
import { useMainPageContext } from '../context/MainPageContext';
import { connect } from 'react-redux';
import ex from 'classnames';
import { mapDispatchToProps } from '../functions/mapDispatchToProps';

function Contacts({ showDate, contacts, user, selectChat }) {
    const [selectedBtn, setSelectedBtn] = useState(-1);
    const { profile, setProfile } = useMainPageContext();

    useEffect(() => {
        if (showDate && profile.chatId !== '') selectChat({ friend: profile, id: profile.chatId });
    }, [profile.chatId, showDate]);

    // async function accessChat() {
    //     // openChat(profile);
    //     // const request = await fetch('/api/chat/access', {
    //     //     method: 'post',
    //     //     headers: {
    //     //         'Content-Type': 'application/json',
    //     //     },
    //     //     body: JSON.stringify({
    //     //         userId: user.id,
    //     //         friendId: profile.id,
    //     //         skipNumber: 0,
    //     //     }),
    //     // });
    //     // const { success, chat } = await request.json();
    // }

    if (contacts.length === 0 && showDate) return <span className={styles.notFound}>Контакты не найдены</span>;

    return contacts.map(({ username, avatar, id, date }, i) => (
        <Button
            key={i}
            className={ex(styles.chatBlock, { [styles.selected]: i === selectedBtn })}
            onClick={() => {
                setProfile({ visible: !showDate, avatar, username, id, chatId: !showDate || user.contacts.length === 0 ? '' : user.contacts[i].chatId });
                setSelectedBtn(i);
            }}
        >
            <div className={styles.wrapper}>
                <Account username={username} src={avatar} />
                {showDate ? <span className={styles.date}>{date}</span> : ''}
            </div>
        </Button>
    ));
}

export default connect(
    (state) => ({
        user: state.userData,
    }),
    mapDispatchToProps
)(Contacts);
