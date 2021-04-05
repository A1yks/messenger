import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Settings from '@material-ui/icons/Settings';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Account from './Account';
import styles from '../styles/LeftMenuInfo.module.scss';

function LeftMenuInfo() {
    return (
        <div className={styles.main}>
            <div className={styles.account}>
                <Account username="My Account" src="https://material-ui.com/static/images/avatar/1.jpg" />
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

export default LeftMenuInfo;
