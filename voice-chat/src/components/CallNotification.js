import React, { useEffect, useRef } from 'react';
import { Card, CardMedia, CardContent, Box, CardActions, Typography, Button } from '@material-ui/core';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import CallEndIcon from '@material-ui/icons/CallEnd';
import ex from 'classnames';
import classes from '../styles/CallNotification.module.scss';
import incomingCallSoung from '../ringtones/call.mp3';

function CallNotification({ username, avatar, hide }) {
    const audio = useRef(new Audio());

    useEffect(() => {
        audio.current.src = incomingCallSoung;
        audio.current.loop = true;
        audio.current.play();

        return stopAudio;
    }, []);

    function stopAudio() {
        audio.current.pause();
        audio.current.currentTime = 0;
    }

    function acceptCall() {}

    function declineCall() {
        // hide();
        stopAudio();
    }

    return (
        <Card className={classes.main}>
            <Box className={classes.wrapper}>
                <CardMedia className={classes.avatar} image={avatar} />
                <Typography variant="h5" component="span" className={classes.username}>
                    {username}
                </Typography>
            </Box>
            <CardActions className={classes.actions}>
                <Button size="small" color="primary" onClick={acceptCall}>
                    <PhoneInTalkIcon className={ex(classes.icon, classes.accept)} />
                </Button>
                <Button size="small" color="primary" onClick={declineCall}>
                    <CallEndIcon className={ex(classes.icon, classes.reject)} />
                </Button>
            </CardActions>
        </Card>
    );
}

export default CallNotification;
