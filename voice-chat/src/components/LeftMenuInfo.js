import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Settings from '@material-ui/icons/Settings';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Account from './Account';
import Contacts from './Contacts';
import styles from '../styles/LeftMenuInfo.module.scss';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../functions/mapDispatchToProps';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useMainPageContext } from '../context/MainPageContext';
import cx from 'classnames';
import Notifications from './Notifications';

function LeftMenuInfo({ username, avatar, searchUsers, searchResults, logout }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [notificationsVisible, setNotificationsVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const { friendRequests } = useMainPageContext();

    function search(e) {
        setSearchQuery(() => {
            searchUsers(e.target.value);
            return e.target.value;
        });
    }

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function toggleNotifications() {
        setNotificationsVisible((prev) => !prev);
    }

    return (
        <div className={styles.main}>
            <div className={styles.account}>
                <Account username={username} src={avatar} />
                <div className={styles.icons}>
                    <IconButton onClick={handleOpen} className={cx(styles.icon, styles.exitBtn)} title="Выход">
                        <ExitToAppIcon />
                    </IconButton>
                    <IconButton className={cx(styles.icon, styles.notificationsBtn)} title="Уведомления" onClick={toggleNotifications}>
                        <Badge className={styles.notificationsCount} badgeContent={friendRequests.length} max={999} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton className={cx(styles.icon, styles.settingsBtn)} title="Настройки">
                        <Settings />
                    </IconButton>

                    <Notifications visible={notificationsVisible} />
                </div>
            </div>
            <div className={styles.search}>
                <div className={styles.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Поиск пользователей"
                    classes={{
                        root: styles.searchRoot,
                        input: styles.searchInput,
                    }}
                    value={searchQuery}
                    onChange={search}
                />
            </div>
            <div className={styles.contacts} style={{ marginTop: searchResults.length === 0 ? '0' : '1.8rem' }}>
                <Contacts contacts={searchResults} />
            </div>
            <Dialog className={styles.logout} open={open} onClose={handleClose}>
                <DialogTitle className={styles.logoutTitle}>Вы уверены, что хотите выйти?</DialogTitle>
                <DialogActions>
                    <Button className={styles.logoutBtn} onClick={handleClose} color="primary">
                        Нет
                    </Button>
                    <Button
                        className={styles.logoutBtn}
                        onClick={() => {
                            handleClose();
                            logout();
                        }}
                        color="primary"
                        autoFocus
                    >
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default connect(
    (state) => ({
        username: state.userData.username,
        avatar: state.userData.avatar,
        searchResults: state.searchResults,
    }),
    mapDispatchToProps
)(LeftMenuInfo);
