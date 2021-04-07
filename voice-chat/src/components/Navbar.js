import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PhoneIcon from '@material-ui/icons/Phone';
import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';
import classes from '../styles/Navbar.module.scss';

function Navbar({ chatName }) {
    return (
        <AppBar className={classes.appBar} position="sticky">
            <Toolbar className={classes.toolbar}>
                <div className={classes.chatName}>
                    <PersonIcon />
                    <Typography className={classes.title} variant="h6" noWrap>
                        {chatName}
                    </Typography>
                </div>
                <div className={classes.icons}>
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
