import React, { useState, useEffect } from 'react';
import Account from './Account';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import styles from '../styles/Chats.module.scss';
import { useMainPageContext } from '../context/MainPageContext';
import { connect } from 'react-redux';
import ex from 'classnames';
import moment from 'moment';
import 'moment/locale/ru';
import { mapDispatchToProps } from '../functions/mapDispatchToProps';
import getFormatString from '../functions/getFormatString';

moment.locale('ru');

function Contacts({ showDate, contacts, user, selectChat, selectedChat }) {
    const { profile, setProfile, messages, unreadMessages, readMessages } = useMainPageContext();

    useEffect(() => {
        if (showDate && profile.chatId !== '') {
            selectChat({ friend: profile, id: profile.chatId });
            readMessages(profile.chatId);
        }
    }, [profile.chatId, showDate]);

    useEffect(() => {
        if (selectedChat.id && unreadMessages[selectedChat.id] !== 0) readMessages(selectedChat.id);
    });

    if (contacts.length === 0 && showDate) return <span className={styles.notFound}>Контакты не найдены</span>;

    let sorted = [...contacts];

    if (showDate)
        sorted.sort((obj1, obj2) => {
            const chatId1 = obj1.chatId;
            const chatId2 = obj2.chatId;
            const lm1 = messages[chatId1][messages[chatId1].length - 1];
            const lm2 = messages[chatId2][messages[chatId2].length - 1];
            const date1 = lm1?.date;
            const date2 = lm2?.date;

            if (date1 && date2) return new Date(date2).getTime() - new Date(date1).getTime();

            return 0;
        });

    return sorted.map(({ username, avatar, id, chatId }, i) => {
        if (chatId === undefined)
            return (
                <Button
                    key={i}
                    className={styles.chatBlock}
                    onClick={() => {
                        setProfile((prev) => ({ ...prev, visible: true, avatar, username, id }));
                    }}
                >
                    <div className={styles.wrapper}>
                        <Account className={styles.account} username={username} src={avatar} />
                    </div>
                </Button>
            );

        const lastMessage = messages[chatId][messages[chatId].length - 1];
        const body = lastMessage?.body;
        const date = lastMessage?.date;
        const from = lastMessage?.from;
        const chatNotifications = unreadMessages[chatId] || 0;
        const text =
            from && body ? (
                <>
                    <span className={styles.fromUser}>{from}:</span>
                    <span className={styles.msgText}>{body}</span>
                </>
            ) : (
                ''
            );

        return (
            <Button
                key={i}
                className={ex(styles.chatBlock, { [styles.selected]: selectedChat.id === chatId })}
                onClick={() => {
                    setProfile((prev) => ({ ...prev, visible: !showDate, avatar, username, id, chatId }));
                }}
            >
                <div className={styles.wrapper}>
                    <Account className={styles.account} username={username} src={avatar} message={text} />
                    <Badge className={styles.newMessagesCount} badgeContent={chatNotifications} max={999} color="secondary" />
                    <span className={styles.date}>{date && moment(date).format(getFormatString(date))}</span>
                </div>
            </Button>
        );
    });
}

export default connect(
    (state) => ({
        user: state.userData,
        selectedChat: state.selectedChat,
    }),
    mapDispatchToProps
)(Contacts);
