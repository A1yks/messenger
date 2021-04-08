import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Settings from '@material-ui/icons/Settings';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Account from './Account';
import styles from '../styles/LeftMenuInfo.module.scss';
import { connect } from 'react-redux';

function LeftMenuInfo({ username, avatar }) {
    return (
        <div className={styles.main}>
            <div className={styles.account}>
                <Account username={username} src={avatar} />
                <IconButton className={styles.settingsBtn}>
                    <Settings />
                </IconButton>
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
                />
            </div>
        </div>
    );
}

export default connect(
    (state) => ({
        username: state.userData.username,
        avatar: state.userData.avatar,
    }),
    null
)(LeftMenuInfo);
