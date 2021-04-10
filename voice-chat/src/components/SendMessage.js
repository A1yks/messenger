import React, { useState, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import IconButton from '@material-ui/core/IconButton';
import styles from '../styles/SendMessage.module.scss';
import { useMainPageContext } from '../context/MainPageContext';

function SendMessage({ placeholder }) {
    const [value, setValue] = useState('');
    const textFieldRef = useRef(null);
    const { profile, sendMessage } = useMainPageContext();

    function handleSend(e) {
        if (e.type === 'keydown' && (e.shiftKey || e.ctrlKey) && e.key === 'Enter') return;

        if ((e.type === 'keydown' && e.key === 'Enter') || e.type === 'click') {
            e.preventDefault();
            setValue('');
            if (textFieldRef.current) textFieldRef.current.focus();
            sendMessage(profile.chatId, value);
        }
    }

    function handleChange(e) {
        setValue(e.target.value);
    }

    return (
        <div className={styles.main}>
            <TextField
                inputRef={textFieldRef}
                className={styles.input}
                multiline
                rowsMax={7}
                placeholder={`Написать ${placeholder}`}
                fullWidth
                variant="outlined"
                value={value}
                onChange={handleChange}
                onKeyDown={handleSend}
            />
            <IconButton className={styles.sendBtn} onClick={handleSend}>
                <SendRoundedIcon />
            </IconButton>
        </div>
    );
}

export default SendMessage;
