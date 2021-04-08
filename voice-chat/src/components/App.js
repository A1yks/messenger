import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../functions/mapDispatchToProps';
// import styles from '../styles/App.module.scss';
import { Router } from 'react-router-dom';
import history from '../history';
import Main from '../components/Main';

function App() {
    return (
        <Router history={history}>
            <Main />
        </Router>
    );
}

export default connect((state) => ({}), mapDispatchToProps)(App);
