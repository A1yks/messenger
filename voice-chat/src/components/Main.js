import React from 'react';
import Content from './Content';
import styles from '../styles/Main.module.scss';
import { Switch, Route } from 'react-router-dom';
import Auth from './Auth';
import LeftMenu from './LeftMenu';

function Main() {
    return (
        <Switch>
            <Route exact path="/">
                <div className={styles.wrapper}>
                    <LeftMenu />
                    <Content />
                </div>
            </Route>
            <Route path="/auth">
                <Auth />
            </Route>
        </Switch>
    );
}

export default Main;
