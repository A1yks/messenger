import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from '../styles/LoadingPage.module.scss';

function LoadingPage() {
    return (
        <div className={styles.main}>
            <CircularProgress size="7rem" />
        </div>
    );
}

export default LoadingPage;
