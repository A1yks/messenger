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
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import classes from '../styles/Navbar.module.scss';

function Navbar() {
    return (
        <AppBar className={classes.appBar} position="static">
            <Toolbar className={classes.toolbar}>
                <div className={classes.search_wrapper}>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Material-UI
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.search_icon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Поиск пользователей"
                            classes={{
                                root: classes.search_root,
                                input: classes.search_input,
                            }}
                        />
                    </div>
                </div>
                <div className={classes.icons}>
                    <IconButton aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <IconButton aria-label="show 17 new notifications" color="inherit">
                        <Badge badgeContent={17} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton edge="end" aria-label="account of current user" color="inherit">
                        <AccountCircle />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
