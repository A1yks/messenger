import React, { useState, useEffect, useContext, useRef } from 'react';
import history from '../history';
import checkToken from '../functions/checkToken';

export const AuthContext = React.createContext();

export const useAuthContext = () => useContext(AuthContext);

export function AuthContextProvider({ children }) {
    const [state, setState] = useState({
        login: '',
        password: '',
        passwordConf: '',
        loading: false,
        autoLogin: true,
    });

    const errorTexts = [
        {
            login: 'Поле логина не должно быть пустым',
            password: 'Поле пароля не должно быть пустым',
            passwordConf: 'Поле подтверждения пароля не должно быть пустым',
        },
        {
            login: 'Логин может содержать только латинские буквы, цифры и _',
            password: 'Длина пароля должна быть от 6 до 64 символов',
            passwordConf: 'Пароли не совпадают',
        },
        {
            login: 'Длина логина должна быть от 4 до 25 символов',
        },
    ];

    const [errors, setErrors] = useState({
        signUp: {
            login: '',
            password: '',
            passwordConf: '',
        },
        signIn: {
            login: '',
            password: '',
            passwordConf: '',
        },
    });

    let type = useRef(null);

    useEffect(() => {
        (async () => {
            const result = await checkToken();
            if (result.success) history.push('/');
            setState((prev) => ({ ...prev, autoLogin: false }));
        })();
    }, []);

    useEffect(() => {
        if (type.current === 'signUp') {
            if (Object.values(errors.signUp).every((value) => value === '')) {
                setState((prev) => ({ ...prev, loading: true }));
                fetch('/api/auth/register', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: state.login,
                        password: state.password,
                    }),
                })
                    .then((res) => res.json())
                    .then(({ success, message }) => {
                        setState((prev) => ({ ...prev, loading: false }));
                        if (!success)
                            return setErrors((prev) => ({
                                ...prev,
                                signUp: { ...prev.signUp, login: message },
                            }));

                        history.push('/');
                    });
            }
        } else if (type.current === 'signIn') {
            if (errors.signIn.login === '' && errors.signIn.password === '') {
                setState((prev) => ({ ...prev, loading: true }));
                fetch('/api/auth/login', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: state.login,
                        password: state.password,
                    }),
                })
                    .then((res) => res.json())
                    .then(({ success, message }) => {
                        setState((prev) => ({ ...prev, loading: false }));
                        if (!success)
                            return setErrors((prev) => ({
                                ...prev,
                                signIn: { ...prev.signUp, login: message },
                            }));

                        history.push('/');
                    });
            }
        }
    }, [errors.signUp, errors.signIn]);

    function handleClick(e, authType) {
        e.preventDefault();
        type.current = authType;
        validateFields(type.current);
    }

    function handleChange(e, type) {
        setState((prev) => ({
            ...prev,
            [type]: e.target.value.trim(),
        }));
    }

    function resetState(authType) {
        type.current = null;
        setState({ login: '', password: '', passwordConf: '', loading: false });
        setErrors((prev) => ({
            ...prev,
            [authType]: { login: '', password: '', passwordConf: '' },
        }));
    }

    function validateFields(type) {
        if (state.login.length < 4 || state.login.length > 25)
            setErrors((prev) => ({
                ...prev,
                [type]: { ...prev[type], login: errorTexts[2].login },
            }));
        else if (/\W/gi.test(state.login))
            setErrors((prev) => ({
                ...prev,
                [type]: { ...prev[type], login: errorTexts[1].login },
            }));
        else
            setErrors((prev) => ({
                ...prev,
                [type]: { ...prev[type], login: '' },
            }));

        if (state.password.length < 6 || state.password.length > 64)
            setErrors((prev) => ({
                ...prev,
                [type]: { ...prev[type], password: errorTexts[1].password },
            }));
        else
            setErrors((prev) => ({
                ...prev,
                [type]: { ...prev[type], password: '' },
            }));

        if (state.password !== state.passwordConf)
            setErrors((prev) => ({
                ...prev,
                signUp: { ...prev.signUp, passwordConf: errorTexts[1].passwordConf },
            }));
        else
            setErrors((prev) => ({
                ...prev,
                signUp: { ...prev.signUp, passwordConf: '' },
            }));

        for (const key in state) {
            if (state[key] === '')
                setErrors((prev) => ({
                    ...prev,
                    [type]: { ...prev[type], [key]: errorTexts[0][key] },
                }));
        }
    }

    return <AuthContext.Provider value={{ handleClick, handleChange, errors, setErrors, state, setState, resetState }}>{children}</AuthContext.Provider>;
}
