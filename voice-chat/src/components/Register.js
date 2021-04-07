import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from '../styles/Auth.module.scss';
import { useAuthContext } from '../context/AuthContext';

function Register() {
    const { handleClick, handleChange, errors, state, resetState } = useAuthContext();

    useEffect(() => resetState('signUp'), []);

    return (
        <>
            <p className={styles.welcome}>Создание аккаунта</p>
            <TextField
                autoComplete="off"
                required
                label="Придумайте логин"
                className={styles.input}
                value={state.login}
                helperText={errors.signUp.login}
                onChange={(e) => handleChange(e, 'login')}
                error={errors.signUp.login !== ''}
            />
            <TextField
                autoComplete="new-password"
                required
                label="Придумайте пароль"
                type="password"
                className={styles.input}
                value={state.password}
                helperText={errors.signUp.password}
                onChange={(e) => handleChange(e, 'password')}
                error={errors.signUp.password !== ''}
            />
            <TextField
                autoComplete="new-password"
                required
                label="Подтвердите пароль"
                type="password"
                className={styles.input}
                value={state.passwordConf}
                helperText={errors.signUp.passwordConf}
                onChange={(e) => handleChange(e, 'passwordConf')}
                error={errors.signUp.passwordConf !== ''}
            />
            <Button
                type="submit"
                classes={{
                    root: styles.login_root,
                    label: styles.login_label,
                }}
                onClick={(e) => handleClick(e, 'signUp')}
                disabled={state.loading}
            >
                {state.loading ? <CircularProgress color="#fff" size="2.4rem" /> : 'Создать аккаунт'}
            </Button>
        </>
    );
}

export default Register;
