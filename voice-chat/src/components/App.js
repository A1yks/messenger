import React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../functions/mapDispatchToProps';
import classes from '../styles/App.module.scss';
import { Router } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import history from '../history';
import Main from '../components/Main';

function App() {
    const notistackRef = React.createRef();

    function handleClickDismiss(key) {
        notistackRef.current.closeSnackbar(key);
    }

    return (
        <Router history={history}>
            <SnackbarProvider
                ref={notistackRef}
                maxSnack={3}
                action={(key) => (
                    <Button className={classes.closeBtn} onClick={() => handleClickDismiss(key)}>
                        <CloseIcon className={classes.icon} />
                    </Button>
                )}
                classes={{
                    variantSuccess: classes.alert,
                    variantError: classes.alert,
                    variantWarning: classes.alert,
                    variantInfo: classes.alert,
                }}
            >
                <Main />
            </SnackbarProvider>
        </Router>
    );
}

export default connect((state) => ({}), mapDispatchToProps)(App);
