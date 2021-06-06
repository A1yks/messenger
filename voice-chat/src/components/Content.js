import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import Avatar from '@material-ui/core/Avatar';
import Navbar from './Navbar';
import ChatBody from './ChatBody';
import styles from '../styles/Content.module.scss';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../functions/mapDispatchToProps';
import { useMainPageContext } from '../context/MainPageContext';
import Settings from './Settings';

function Content({ friend, closeChat }) {
    const { settingsOpened, setSettingsOpened, online, setProfile } = useMainPageContext();

    function handleClick() {
        setProfile((prev) => ({ ...prev, visible: true, avatar: friend.avatar, username: friend.username }));
    }

    if (settingsOpened)
        return (
            <div className={styles.main}>
                <Navbar name="Настройки" onClose={() => setSettingsOpened(false)}>
                    <SettingsIcon />
                </Navbar>
                <Settings />
            </div>
        );

    if (friend === undefined)
        return (
            <div className={styles.main}>
                <span className={styles.text}>Выберите, кому хотели бы написать</span>
            </div>
        );

    return (
        <div className={styles.main}>
            <Navbar online={online[friend.id]} name={friend.username} onClose={closeChat}>
                <Avatar alt="user" src={friend.avatar === process.env.REACT_APP_SERVER_URL ? '' : friend.avatar} className={styles.avatar} onClick={handleClick} />
            </Navbar>
            <ChatBody friend={friend} />
        </div>
    );
}

export default connect((state) => ({ friend: state.selectedChat.friend, members: state.selectedChat.members }), mapDispatchToProps)(Content);
