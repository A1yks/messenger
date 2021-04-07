import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import IconButton from '@material-ui/core/IconButton';
import styles from '../styles/SendMessage.module.scss';

function SendMessage({ placeholder }) {
    return (
        <div className={styles.main}>
            <TextField className={styles.input} multiline rowsMax={7} placeholder={`Написать ${placeholder}`} fullWidth variant="outlined" />
            <IconButton className={styles.sendBtn}>
                <SendRoundedIcon />
            </IconButton>
        </div>
    );
}

export default SendMessage;
