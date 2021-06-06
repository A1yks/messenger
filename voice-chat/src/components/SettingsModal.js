import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from '../styles/SettingsModal.module.scss';

function SettingsModal({ show, settings: { handleClose, handleSave, title, content, labels, type } }) {
    const [firstLabelValue, setFirstLabelValue] = useState('');
    const [password, setPassword] = useState('');

    function save() {
        handleSave(password, firstLabelValue);
        setFirstLabelValue('');
        setPassword('');
    }

    function close() {
        handleClose();
        setFirstLabelValue('');
        setPassword('');
    }

    return (
        <Dialog open={show} onClose={handleClose}>
            <div className={styles.main}>
                <DialogTitle className={styles.title}>{title}</DialogTitle>
                <DialogContent className={styles.content}>
                    <DialogContentText className={styles.info}>{content}</DialogContentText>
                    <TextField margin="dense" label={labels[0]} type={type} fullWidth value={firstLabelValue} onChange={(e) => setFirstLabelValue(e.target.value)} />
                    <TextField margin="dense" label={labels[1]} type="password" fullWidth autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </DialogContent>
                <DialogActions className={styles.actions}>
                    <Button onClick={close} color="primary">
                        Отмена
                    </Button>
                    <Button color="primary" onClick={save}>
                        Сохранить
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
}

export default SettingsModal;
