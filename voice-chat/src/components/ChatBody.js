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
                                username={from}
                                isUser={from !== user.username}
                                avatar={from === user.username ? user.avatar : friend.avatar}
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
