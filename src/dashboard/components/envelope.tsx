import { RouteComponentProps } from 'react-router';
import React, { useState, useEffect, useRef } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import koLocale from 'date-fns/locale/ko'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { GridRenderCellParams, DataGridPro, GridRowsProp, GridColDef, GridToolbar, LicenseInfo, useGridApiRef, GridEditRowsModel } from '@mui/x-data-grid-pro';
import { eachDayOfInterval } from 'date-fns';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { createStyles, makeStyles } from '@mui/styles';
import styles from '../componentsStyle/envelope.module.css';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Autocomplete from '@mui/material/Autocomplete';
import LinearProgress from '@mui/material/LinearProgress';
import { Alert, Stack } from '@mui/material';
import MyMessage from './controls/mymessage';
import TotalMessage from './controls/totalmessage';
import { Socket } from 'socket.io-client';
import MineMessage from './controls/minemessage';
import Chat from './controls/chat';
import ChatForTeacher from './controls/chatforteacher';


LicenseInfo.setLicenseKey("e3ec4d79d1fa1f36cc88ecffd4e68392T1JERVI6MzMyMjMsRVhQSVJZPTE2NjkzODUyMDIwMDAsS0VZVkVSU0lPTj0x");


type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface envelopeProps extends RouteComponentProps {
    activateMenuList: (curret: currentSideBarMenuList) => void;
    user: any;
    socket: Socket;
    unreadMessage: any;
}



const Envelope: React.FC<envelopeProps> = (props) => {

    useEffect(() => {
        props.activateMenuList("envelope");
    }, [props.user]);


    // const submit = async (e: any) => {
    //     console.log(selectedUser);
    //     console.log(message);

    //     setLoading(true);

    //     var token = "";
    //     if (window.electron) {
    //         token = await window.electron.sendMessageApi.getToken();
    //     }

    //     fetch("https://peetsunbae.com/dashboard/envelope/message", {
    //         method: "POST",
    //         headers: { "Authorization": token, "Content-Type": "application/json" },
    //         credentials: "include",
    //         body: JSON.stringify({
    //             message, selectedUser
    //         })
    //     }).then((response: any) => {
    //         response.json()
    //             .then((result: any) => {
    //                 console.log(result);
    //                 setLoading(false);
    //                 if (result.message === "success") {
    //                     setUploadBool(true);
    //                     setTimeout(() => {
    //                         setUploadBool(false);
    //                     }, 1000);
    //                     if(props.socket){
    //                     props.socket.emit("newMessage", selectedUser.id, props.user.name);
    //                     setUpdate(Math.random());
    //                     }
    //                 }
    //             })
    //     })

    // }


    return (
        <div className={styles.main}>
            {
                (props.user.value === "teacher" || props.user.value === "staff") &&
                <ChatForTeacher user={props.user} socket={props.socket} />
            }
            {
                (props.user.value === "student" || props.user.value === "parent") &&
                <Chat user={props.user} socket={props.socket} />
            }
        </div>
    )
}

export default Envelope;