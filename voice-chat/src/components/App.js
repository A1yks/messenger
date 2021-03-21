import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../functions/mapDispatchToProps';
// import styles from '../styles/App.module.scss';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { AuthContextProvider } from '../context/AuthContext';

const history = createBrowserHistory();

function App() {
    return (
        <Router history={history}>
            <AuthContextProvider />
        </Router>
    );
}

export default connect((state) => ({}), mapDispatchToProps)(App);
