import React, { useEffect } from 'react';
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

function Contacts({ showDate, contacts, selectChat, selectedChat }) {
    const { profile, setProfile, messages, unreadMessages, online, readMessages, setSettingsOpened } = useMainPageContext();

    useEffect(() => {
        if (showDate && profile.chatId !== '') {
            selectChat({ friend: profile, id: profile.chatId, messagesCount: 30 });
            readMessages(profile.chatId);
        }
    }, [profile.chatId, showDate]);

    useEffect(() => {
        if (selectedChat.id && unreadMessages[selectedChat.id] > 0) readMessages(selectedChat.id);
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

            return 1;
        });

    return sorted.map(({ username, avatar, id, chatId }, i) => {
        avatar = process.env.REACT_APP_SERVER_URL + avatar;
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
                        <Account className={styles.account} username={username} src={avatar} online={online[id]} />
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
                    <span className={styles.fromUser}>{from.username}:</span>
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
                    setSettingsOpened(false);
                }}
            >
                <div className={styles.wrapper}>
                    <Account className={styles.account} username={username} src={avatar} message={text} online={online[id]} />
                    <div className={styles.badgeWrapper}>
                        <Badge className={styles.newMessagesCount} badgeContent={chatNotifications} max={999} color="secondary" />
                        <span className={styles.date}>{date && moment(date).format(getFormatString(date))}</span>
                    </div>
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
