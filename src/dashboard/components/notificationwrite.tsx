import React from 'react';
import Upload from './controls/upload';
import { withStyles } from '@mui/styles';
import styles from '../componentsStyle/notificationWriteStyles';
import {Route, BrowserRouter as Router, Link} from "react-router-dom"


interface props {
    classes : any;
}

const NotificationWrite : React.FC<props> = (props) => {
    const classes = props.classes;

    return(
        <div className={classes.main}>
            <div className={classes.mainTitle}>공지사항 작성</div>
            
            <Upload></Upload>
        </div>
    )
}

export default withStyles(styles)(NotificationWrite);