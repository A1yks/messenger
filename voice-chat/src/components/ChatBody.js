import React, { useEffect, useRef } from 'react';
import Message from './Message';
import SendMessage from './SendMessage';
import styles from '../styles/ChatBody.module.scss';
import moment from 'moment';
import { connect } from 'react-redux';
import { useMainPageContext } from '../context/MainPageContext';
import getFormatString from '../functions/getFormatString';

function ChatBody({ user, friend, selectedChat }) {
    const { messages } = useMainPageContext();
    const messagesWrapperRef = useRef(null);

    useEffect(() => {
        if (messagesWrapperRef.current !== null) {
            messagesWrapperRef.current.scrollTop = messagesWrapperRef.current.scrollHeight;
        }
    }, [messages[selectedChat.id].length]);

    const userAvatar = user.avatar === process.env.REACT_APP_SERVER_URL ? '' : user.avatar;
    const friendAvatar = friend.avatar === process.env.REACT_APP_SERVER_URL ? '' : friend.avatar;

    return (
        <div className={styles.main}>
            <div className={styles.messagesWrapper} ref={messagesWrapperRef}>
                <div className={styles.messages}>
                    {selectedChat.id === undefined || messages[selectedChat.id].length === 0 ? (
                        <span className={styles.emptyHistory}>История сообщений пуста</span>
                    ) : (
                        messages[selectedChat.id].map(({ from, body, date }, i) => (
                            <Message
                                key={i}
                                username={from.username}
                                isUser={from.username !== user.username}
                                avatar={from.username === user.username ? userAvatar : friendAvatar}
                                date={moment(date).format(getFormatString(date))}
                            >
                                {body}
                            </Message>
                        ))
                    )}
                </div>
            </div>
            <SendMessage placeholder={friend.username} />
        </div>
    );
}

export default connect(
    (state) => ({
        user: state.userData,
        selectedChat: state.selectedChat,
    }),
    null
)(ChatBody);
