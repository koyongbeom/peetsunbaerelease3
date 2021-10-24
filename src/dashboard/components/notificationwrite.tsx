import React, { useEffect } from 'react';
import Upload from './controls/upload';
import { withStyles } from '@mui/styles';
import styles from '../componentsStyle/notificationWriteStyles';
import {Route, BrowserRouter as Router, Link} from "react-router-dom"
import { RouteComponentProps } from 'react-router';
import { Socket } from 'socket.io-client';
import { Classes } from '@mui/styles/mergeClasses/mergeClasses';

interface socketProps extends RouteComponentProps{
    classes : any;
    socket : Socket;
}


const NotificationWrite : React.FC<socketProps> = (props) => {
    const classes = props.classes;


    return(
        <div className={classes.main}>
            <div className={classes.mainTitle}>공지사항 작성</div>
            
            <Upload socket={props.socket}></Upload>
        </div>
    )
}

export default withStyles(styles)(NotificationWrite);