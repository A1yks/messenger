import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

function Navbar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" noWrap>
                    Material-UI
                </Typography>
                <div>
                    <div>
                        <SearchIcon />
                    </div>
                    <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
