import React from 'react';
import SettingTypes from './SettingTypes';
import SettingProperties from './SettingProperties';
import { Paper, Button, List, ListItem } from '@material-ui/core';
import Account from './Account';
import { connect } from 'react-redux';
import styles from '../styles/Settings.module.scss';
import { mapDispatchToProps } from '../functions/mapDispatchToProps';

function Settings({ user, getUserData }) {
    function loadAvatar() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.addEventListener('change', function () {
            const file = this.files[0];

            if (!file || !/^image\/.+$/.test(file.type)) return console.log({ success: false, message: 'Попытка загрузить некорректный файл' });

            const data = new FormData();
            data.append('image', file);
            fetch('/api/chat/uploadImage', {
                method: 'post',
                body: data,
            })
                .then((res) => res.json())
                .then(({ success }) => {
                    if (success) getUserData(user.id);
                });
        });

        input.click();
    }

    return (
        <div className={styles.main}>
            <Paper className={styles.wrapper} variant="outlined">
                <div className={styles.loadAvatar}>
                    <Account username={user.username} src={user.avatar} className={styles.account} />
                    <div className={styles.buttons}>
                        <Button onClick={loadAvatar}>Загрузить аватар</Button>
                        <Button>Изменить пароль</Button>
                    </div>
                </div>
                <Paper className={styles.mainSettings} variant="outlined">
                    <List className={styles.list}>
                        <ListItem className={styles.item}>
                            <div className={styles.itemData}>
                                <span className={styles.dataUp}>Имя пользователя</span>
                                <span className={styles.dataDown}>{user.username}</span>
                            </div>
                            <Button>Изменить</Button>
                        </ListItem>
                    </List>
                </Paper>
            </Paper>
        </div>
    );
}

export default connect((state) => ({ user: state.userData }), mapDispatchToProps)(Settings);
