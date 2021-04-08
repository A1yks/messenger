import React from 'react';
import Account from './Account';
import Button from '@material-ui/core/Button';
import styles from '../styles/Chats.module.scss';
import { useMainPageContext } from '../context/MainPageContext';
import ex from 'classnames';

function Contacts({ showDate, contacts }) {
    const { setProfile } = useMainPageContext();

    if (contacts.length === 0 && showDate) return <span className={styles.notFound}>Контакты не найдены</span>;

    return contacts.map(({ username, avatar, id, date }, i) => (
        <Button key={i} className={styles.chatBlock} onClick={showDate ? () => {} : () => setProfile({ visible: true, avatar, username, id })}>
            <div className={ex(styles.wrapper)}>
                <Account username={username} src={avatar} />
                {showDate ? <span className={styles.date}>{date}</span> : ''}
            </div>
        </Button>
    ));
    // return (
    //     <>
    //         <Button className={styles.chatBlock}>
    //             <div className={styles.wrapper}>
    //                 <Account username="Test 1" src="https://material-ui.com/static/images/avatar/2.jpg" />
    //                 {date ? <span className={styles.date}>22.03.2017</span> : ''}
    //             </div>
    //         </Button>
    //         <Button className={styles.chatBlock}>
    //             <div className={styles.wrapper}>
    //                 <Account username="Test 1" src="https://material-ui.com/static/images/avatar/2.jpg" />
    //                 {date ? <span className={styles.date}>22.03.2017</span> : ''}
    //             </div>
    //         </Button>
    //         <Button className={styles.chatBlock}>
    //             <div className={styles.wrapper}>
    //                 <Account username="Test 1" src="https://material-ui.com/static/images/avatar/2.jpg" />
    //                 {date ? <span className={styles.date}>22.03.2017</span> : ''}
    //             </div>
    //         </Button>
    //         <Button className={styles.chatBlock}>
    //             <div className={styles.wrapper}>
    //                 <Account username="Test 1" src="https://material-ui.com/static/images/avatar/2.jpg" />
    //                 {date ? <span className={styles.date}>22.03.2017</span> : ''}
    //             </div>
    //         </Button>
    //         <Button className={styles.chatBlock}>
    //             <div className={styles.wrapper}>
    //                 <Account username="Test 1" src="https://material-ui.com/static/images/avatar/2.jpg" />
    //                 {date ? <span className={styles.date}>22.03.2017</span> : ''}
    //             </div>
    //         </Button>
    //         {/* <Button className={`${styles.chatBlock} ${styles.selected}`}>
    //             <div className={styles.wrapper}>
    //                 <Account username="Test 2" src="https://material-ui.com/static/images/avatar/3.jpg" />
    //                 <span className={styles.date}>22.03.2017</span>
    //             </div>
    //         </Button>
    //         <Button className={styles.chatBlock}>
    //             <div className={styles.wrapper}>
    //                 <Account username="Test 3" src="https://material-ui.com/static/images/avatar/1.jpg" />
    //                 <span className={styles.date}>22.03.2017</span>
    //             </div>
    //         </Button>
    //         <Button className={styles.chatBlock}>
    //             <div className={styles.wrapper}>
    //                 <Account username="Test 1" src="https://material-ui.com/static/images/avatar/2.jpg" />
    //                 <span className={styles.date}>22.03.2017</span>
    //             </div>
    //         </Button>
    //         <Button className={styles.chatBlock}>
    //             <div className={styles.wrapper}>
    //                 <Account username="Test 2" src="https://material-ui.com/static/images/avatar/3.jpg" />
    //                 <span className={styles.date}>22.03.2017</span>
    //             </div>
    //         </Button>
    //         <Button className={styles.chatBlock}>
    //             <div className={styles.wrapper}>
    //                 <Account username="Test 3" src="https://material-ui.com/static/images/avatar/1.jpg" />
    //                 <span className={styles.date}>22.03.2017</span>
    //             </div>
    //         </Button>
    //         <Button className={styles.chatBlock}>
    //             <div className={styles.wrapper}>
    //                 <Account username="Test 1" src="https://material-ui.com/static/images/avatar/2.jpg" />
    //                 <span className={styles.date}>22.03.2017</span>
    //             </div>
    //         </Button>
    //         <Button className={styles.chatBlock}>
    //             <div className={styles.wrapper}>
    //                 <Account username="Test 2" src="https://material-ui.com/static/images/avatar/3.jpg" />
    //                 <span className={styles.date}>22.03.2017</span>
    //             </div>
    //         </Button>
    //         <Button className={styles.chatBlock}>
    //             <div className={styles.wrapper}>
    //                 <Account username="Test 3" src="https://material-ui.com/static/images/avatar/1.jpg" />
    //                 <span className={styles.date}>22.03.2017</span>
    //             </div>
    //         </Button>
    //         <Button className={styles.chatBlock}>
    //             <div className={styles.wrapper}>
    //                 <Account username="Test 1" src="https://material-ui.com/static/images/avatar/2.jpg" />
    //                 <span className={styles.date}>22.03.2017</span>
    //             </div>
    //         </Button>
    //         <Button className={styles.chatBlock}>
    //             <div className={styles.wrapper}>
    //                 <Account username="Test 2" src="https://material-ui.com/static/images/avatar/3.jpg" />
    //                 <span className={styles.date}>22.03.2017</span>
    //             </div>
    //         </Button>
    //         <Button className={styles.chatBlock}>
    //             <div className={styles.wrapper}>
    //                 <Account username="Test 3" src="https://material-ui.com/static/images/avatar/1.jpg" />
    //                 <span className={styles.date}>22.03.2017</span>
    //             </div>
    //         </Button>
    //         <Button className={styles.chatBlock}>
    //             <div className={styles.wrapper}>
    //                 <Account username="Test 1" src="https://material-ui.com/static/images/avatar/2.jpg" />
    //                 <span className={styles.date}>22.03.2017</span>
    //             </div>
    //         </Button>
    //         <Button className={styles.chatBlock}>
    //             <div className={styles.wrapper}>
    //                 <Account username="Test 2" src="https://material-ui.com/static/images/avatar/3.jpg" />
    //                 <span className={styles.date}>22.03.2017</span>
    //             </div>
    //         </Button>
    //         <Button className={styles.chatBlock}>
    //             <div className={styles.wrapper}>
    //                 <Account username="Test 3" src="https://material-ui.com/static/images/avatar/1.jpg" />
    //                 <span className={styles.date}>22.03.2017</span>
    //             </div>
    //         </Button> */}
    //     </>
    // );
}

export default Contacts;
