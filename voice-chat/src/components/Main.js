import React from 'react';
import Navbar from './Navbar';
import Content from './Content';
import styles from '../styles/Main.module.scss';
import { Switch, Route, Redirect } from 'react-router-dom';
import Auth from './Auth';

function Main() {
    return (
        <Switch>
            <Route exact path="/">
                <div className={styles.wrapper}>
                    <Navbar />
                    <Content />
                </div>
            </Route>
            <Route path="/auth">
                <Auth />
                <Redirect to="/auth/login" />
            </Route>
        </Switch>
    );
}

export default Main;
