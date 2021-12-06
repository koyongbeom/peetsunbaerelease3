import React, { useEffect } from 'react';
import Upload from './controls/questionupload';
// import { withStyles } from '@mui/styles';
// import styles from '../componentsStyle/notificationWriteStyles';
import {Route, BrowserRouter as Router, Link} from "react-router-dom"
import { RouteComponentProps } from 'react-router';
import { Socket } from 'socket.io-client';
import { Classes } from '@mui/styles/mergeClasses/mergeClasses';
import styles from "../componentsStyle/notificationwrite.module.css"

type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface socketProps extends RouteComponentProps{
    // classes : any;
    socket : Socket;
    activateMenuList : (curret : currentSideBarMenuList) => void;
}


const QuestionWrite : React.FC<socketProps> = (props) => {
    useEffect(()=>{
        props.activateMenuList("question");
    }, [])

    // const classes = props.classes;


    return(
        <div className={styles.main}>
            <div className={styles.mainTitle}>질의응답 작성</div>
            
            <Upload socket={props.socket}></Upload>
        </div>
    )
}

export default QuestionWrite;