import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from '../styles/Auth.module.scss';
import { useAuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Login() {
    const { handleClick, handleChange, errors, state, resetState } = useAuthContext();

    useEffect(() => resetState('signIn'), []);

    return (
        <>
            <p className={styles.welcome}>Добро пожаловать!</p>
            <TextField
                required
                label="Логин"
                className={styles.input}
                value={state.login}
                helperText={errors.signIn.login}
                onChange={(e) => handleChange(e, 'login')}
                error={errors.signIn.login !== ''}
            />
            <TextField
                required
                label="Пароль"
                type="password"
                autoComplete="current-password"
                className={styles.input}
                value={state.password}
                helperText={errors.signIn.password}
                onChange={(e) => handleChange(e, 'password')}
                error={errors.signIn.password !== ''}
            />
            <Button
                type="submit"
                classes={{
                    root: styles.login_root,
                    label: styles.login_label,
                }}
                onClick={(e) => handleClick(e, 'signIn')}
                disabled={state.loading}
            >
                {state.loading ? <CircularProgress classes={{ colorPrimary: styles.colorPrimary }} size="2.4rem" /> : 'Войти'}
            </Button>
            <div className={styles.register}>
                <p>
                    Нет аккаунта? <Link to="/auth/register">Создать</Link>
                </p>
            </div>
        </>
    );
}

export default Login;
