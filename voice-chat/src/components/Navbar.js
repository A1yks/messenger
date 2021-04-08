import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PhoneIcon from '@material-ui/icons/Phone';
import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';
import styles from '../styles/Navbar.module.scss';

function Navbar({ chatName }) {
    return (
        <AppBar className={styles.appBar} position="sticky">
            <Toolbar className={styles.toolbar}>
                <div className={styles.chatName}>
                    <PersonIcon />
                    <Typography className={styles.title} variant="h6" noWrap>
                        {chatName}
                    </Typography>
                </div>
                <div className={styles.icons}>
                    <IconButton edge="end" color="inherit" title="Позвонить">
                        <PhoneIcon />
                    </IconButton>
                    <IconButton edge="end" color="inherit" title="Закрыть чат">
                        <CloseIcon />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
