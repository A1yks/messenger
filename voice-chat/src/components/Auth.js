import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import styles from '../styles/Auth.module.scss';

function Auth() {
    return (
        <div className={styles.background}>
            <div className={styles.wrapper}>
                <form className={styles.auth} method="POST">
                    <Switch>
                        <Route exact path="/auth/login">
                            <Login />
                        </Route>
                        <Route exact path="/auth/register">
                            <Register />
                        </Route>
                        <Route path="/auth">
                            <Redirect to="/auth/login" />
                        </Route>
                    </Switch>
                </form>
            </div>
        </div>
    );
}

export default Auth;
