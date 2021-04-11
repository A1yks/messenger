import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './Auth';
import ChatMainPage from './ChatMainPage';
import { AuthContextProvider } from '../context/AuthContext';
import { MainPageContextProvider } from '../context/MainPageContext';

function Main() {
    return (
        <Switch>
            <Route path="/auth">
                <AuthContextProvider>
                    <Auth />
                </AuthContextProvider>
            </Route>
            <Route path="/">
                <MainPageContextProvider>
                    <ChatMainPage />
                </MainPageContextProvider>
            </Route>
        </Switch>
    );
}

export default Main;
