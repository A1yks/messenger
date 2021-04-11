import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import Navbar from './Navbar';
import ChatBody from './ChatBody';
import styles from '../styles/Content.module.scss';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../functions/mapDispatchToProps';
import { useMainPageContext } from '../context/MainPageContext';
import Settings from './Settings';

function Content({ friend, closeChat }) {
    const { settingsOpened, setSettingsOpened } = useMainPageContext();

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
                <span>Рандомный текст</span>
            </div>
        );

    return (
        <div className={styles.main}>
            <Navbar name={friend.username} onClose={closeChat} phoneIcon={true}>
                <PersonIcon />
            </Navbar>
            <ChatBody friend={friend} />
        </div>
    );
}

export default connect((state) => ({ friend: state.selectedChat.friend, members: state.selectedChat.members }), mapDispatchToProps)(Content);
