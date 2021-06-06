import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PhoneIcon from '@material-ui/icons/Phone';
import CloseIcon from '@material-ui/icons/Close';
import styles from '../styles/Navbar.module.scss';
import { useMainPageContext } from '../context/MainPageContext';

function Navbar({ name, online, onClose, phoneIcon, children }) {
    const { setProfile } = useMainPageContext();

    function handleClose() {
        setProfile((prev) => ({ ...prev, visible: false, avatar: '', username: '', id: '', chatId: '', requestSent: false, isFriend: false }));
        onClose();
    }

    return (
        <AppBar className={styles.appBar} position="static">
            <Toolbar className={styles.toolbar}>
                <div className={styles.chatName}>
                    {children}
                    <Typography className={styles.title} variant="h6" noWrap>
                        {name}
                    </Typography>
                    {online !== undefined && <span className={styles.online}>{online ? 'В сети' : 'Не в сети'}</span>}
                </div>
                <div className={styles.icons}>
                    {phoneIcon && (
                        <IconButton edge="end" color="inherit" title="Позвонить">
                            <PhoneIcon />
                        </IconButton>
                    )}
                    <IconButton edge="end" color="inherit" title="Закрыть чат" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
