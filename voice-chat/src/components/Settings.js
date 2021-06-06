import React, { useState } from 'react';
import SettingTypes from './SettingTypes';
import SettingsModal from './SettingsModal';
import { Paper, Button, List, ListItem } from '@material-ui/core';
import Account from './Account';
import { connect } from 'react-redux';
import styles from '../styles/Settings.module.scss';
import { mapDispatchToProps } from '../functions/mapDispatchToProps';
import { useSnackbar } from 'notistack';

// Добавить рефы на пользователей
// https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/

function Settings({ user, getUserData }) {
    const [openModal, setOpenModal] = useState(false);
    const [modalProps, setModalProps] = useState({ labels: [] });
    const { enqueueSnackbar } = useSnackbar();

    function loadAvatar() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.addEventListener('change', function () {
            const file = this.files[0];

            if (!file || !/^image\/.+$/.test(file.type)) return enqueueSnackbar('Попытка загрузить некорректный файл', { variant: 'error', autoHideDuration: 3000 });

            const data = new FormData();
            data.append('image', file);
            fetch(`${process.env.REACT_APP_SERVER_URL}/api/chat/uploadImage`, {
                method: 'post',
                body: data,
                credentials: 'include',
            })
                .then((res) => res.json())
                .then(({ success }) => {
                    if (success) getUserData(user.id);
                });
        });

        input.click();
    }

    function changePassword(currPassword, newPassword) {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/changePassword`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currPassword,
                newPassword,
            }),
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    console.log('success');
                    setOpenModal(false);
                    enqueueSnackbar('Пароль был успешно изменен', { variant: 'success', autoHideDuration: 3000 });
                } else {
                    enqueueSnackbar(json.message, { variant: 'error', autoHideDuration: 3000 });
                }
            });
    }

    function changeUsername(currPassword, newUsername) {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/user/changeUsername`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currPassword,
                newUsername,
            }),
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    getUserData(user.id);
                    setOpenModal(false);
                    enqueueSnackbar('Имя пользователя успешно изменено', { variant: 'success', autoHideDuration: 3000 });
                } else {
                    enqueueSnackbar(json.message, { variant: 'error', autoHideDuration: 3000 });
                }
            });
    }

    return (
        <div className={styles.main}>
            <Paper className={styles.wrapper} variant="outlined">
                <div className={styles.loadAvatar}>
                    <Account username={user.username} src={user.avatar} className={styles.account} />
                    <div className={styles.buttons}>
                        <Button onClick={loadAvatar}>Загрузить аватар</Button>
                        <Button
                            onClick={() => {
                                setModalProps({
                                    title: 'Изменить пароль',
                                    content: 'Введите текущий и новый пароли',
                                    labels: ['Новый пароль', 'Текущий пароль'],
                                    type: 'password',
                                    handleSave: changePassword,
                                    handleClose() {
                                        setOpenModal(false);
                                    },
                                });
                                setOpenModal(true);
                            }}
                        >
                            Изменить пароль
                        </Button>
                    </div>
                </div>
                <Paper className={styles.mainSettings} variant="outlined">
                    <List className={styles.list}>
                        <ListItem className={styles.item}>
                            <div className={styles.itemData}>
                                <span className={styles.dataUp}>Имя пользователя</span>
                                <span className={styles.dataDown}>{user.username}</span>
                            </div>
                            <Button
                                onClick={() => {
                                    setModalProps({
                                        title: 'Изменить имя пользователя',
                                        content: 'Введите новое имя пользователя и текущий пароль',
                                        labels: ['Новое имя пользователя', 'Текущий пароль'],
                                        type: 'text',
                                        handleSave: changeUsername,
                                        handleClose() {
                                            setOpenModal(false);
                                        },
                                    });
                                    setOpenModal(true);
                                }}
                            >
                                Изменить
                            </Button>
                        </ListItem>
                    </List>
                </Paper>
            </Paper>
            <SettingsModal show={openModal} settings={modalProps} />
        </div>
    );
}

export default connect((state) => ({ user: state.userData }), mapDispatchToProps)(Settings);
