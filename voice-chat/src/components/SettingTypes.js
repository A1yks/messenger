import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import styles from '../styles/SettingTypes.module.scss';

function Settings() {
    return (
        <div className={styles.main}>
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Аккаунт" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Аккаунт" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Аккаунт" />
                </ListItem>
            </List>
        </div>
    );
}

export default Settings;
