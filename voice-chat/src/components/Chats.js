import React from 'react';
import Account from './Account';
import Button from '@material-ui/core/Button';
import styles from '../styles/Chats.module.scss';

function Chats() {
    return (
        <div className={styles.main}>
            <div className={styles.titleWrapper}>
                <span className={styles.title}>Недавние чаты</span>
            </div>
            <Button className={styles.chatBlock}>
                <div className={styles.wrapper}>
                    <Account username="Test 1" src="https://material-ui.com/static/images/avatar/2.jpg" />
                    <span className={styles.date}>22.03.2017</span>
                </div>
            </Button>
            <Button className={`${styles.chatBlock} ${styles.selected}`}>
                <div className={styles.wrapper}>
                    <Account username="Test 2" src="https://material-ui.com/static/images/avatar/3.jpg" />
                    <span className={styles.date}>22.03.2017</span>
                </div>
            </Button>
            <Button className={styles.chatBlock}>
                <div className={styles.wrapper}>
                    <Account username="Test 3" src="https://material-ui.com/static/images/avatar/1.jpg" />
                    <span className={styles.date}>22.03.2017</span>
                </div>
            </Button>
            <Button className={styles.chatBlock}>
                <div className={styles.wrapper}>
                    <Account username="Test 1" src="https://material-ui.com/static/images/avatar/2.jpg" />
                    <span className={styles.date}>22.03.2017</span>
                </div>
            </Button>
            <Button className={styles.chatBlock}>
                <div className={styles.wrapper}>
                    <Account username="Test 2" src="https://material-ui.com/static/images/avatar/3.jpg" />
                    <span className={styles.date}>22.03.2017</span>
                </div>
            </Button>
            <Button className={styles.chatBlock}>
                <div className={styles.wrapper}>
                    <Account username="Test 3" src="https://material-ui.com/static/images/avatar/1.jpg" />
                    <span className={styles.date}>22.03.2017</span>
                </div>
            </Button>
            <Button className={styles.chatBlock}>
                <div className={styles.wrapper}>
                    <Account username="Test 1" src="https://material-ui.com/static/images/avatar/2.jpg" />
                    <span className={styles.date}>22.03.2017</span>
                </div>
            </Button>
            <Button className={styles.chatBlock}>
                <div className={styles.wrapper}>
                    <Account username="Test 2" src="https://material-ui.com/static/images/avatar/3.jpg" />
                    <span className={styles.date}>22.03.2017</span>
                </div>
            </Button>
            <Button className={styles.chatBlock}>
                <div className={styles.wrapper}>
                    <Account username="Test 3" src="https://material-ui.com/static/images/avatar/1.jpg" />
                    <span className={styles.date}>22.03.2017</span>
                </div>
            </Button>
            <Button className={styles.chatBlock}>
                <div className={styles.wrapper}>
                    <Account username="Test 1" src="https://material-ui.com/static/images/avatar/2.jpg" />
                    <span className={styles.date}>22.03.2017</span>
                </div>
            </Button>
            <Button className={styles.chatBlock}>
                <div className={styles.wrapper}>
                    <Account username="Test 2" src="https://material-ui.com/static/images/avatar/3.jpg" />
                    <span className={styles.date}>22.03.2017</span>
                </div>
            </Button>
            <Button className={styles.chatBlock}>
                <div className={styles.wrapper}>
                    <Account username="Test 3" src="https://material-ui.com/static/images/avatar/1.jpg" />
                    <span className={styles.date}>22.03.2017</span>
                </div>
            </Button>
            <Button className={styles.chatBlock}>
                <div className={styles.wrapper}>
                    <Account username="Test 1" src="https://material-ui.com/static/images/avatar/2.jpg" />
                    <span className={styles.date}>22.03.2017</span>
                </div>
            </Button>
            <Button className={styles.chatBlock}>
                <div className={styles.wrapper}>
                    <Account username="Test 2" src="https://material-ui.com/static/images/avatar/3.jpg" />
                    <span className={styles.date}>22.03.2017</span>
                </div>
            </Button>
            <Button className={styles.chatBlock}>
                <div className={styles.wrapper}>
                    <Account username="Test 3" src="https://material-ui.com/static/images/avatar/1.jpg" />
                    <span className={styles.date}>22.03.2017</span>
                </div>
            </Button>
        </div>
    );
}

export default Chats;
