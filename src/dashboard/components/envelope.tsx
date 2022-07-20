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


LicenseInfo.setLicenseKey("e3ec4d79d1fa1f36cc88ecffd4e68392T1JERVI6MzMyMjMsRVhQSVJZPTE2NjkzODUyMDIwMDAsS0VZVkVSU0lPTj0x");


type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface envelopeProps extends RouteComponentProps {
    activateMenuList: (curret: currentSideBarMenuList) => void;
    user: any;
    socket: Socket;
    unreadMessage: any;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "24px",
    boxShadow: 24,
    p: 3,
    paddingLeft: 5,
    paddingRight: 5
};


const Envelope: React.FC<envelopeProps> = (props) => {
    const [searchMenu, setSearchMenu] = useState("write");
    const [open, setOpen] = React.useState(false);
    const [selectedUser, setSelectedUser] = useState<any>();
    const [active, setActive] = useState(true);
    const [users, setUsers] = useState<any>();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploadBool, setUploadBool] = useState(false);
    const [update, setUpdate] = useState(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => { setActive(true); setOpen(false); }


    useEffect(() => {
        props.activateMenuList("envelope");

        async function start() {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/chart/users", {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);
                        const rows: any = [];
                        if (result.data) {
                            result.data.forEach((each: any, index: number) => {
                                var data: any = {};
                                data.id = each.id;
                                switch (each.name) {
                                    case "고용범":
                                        each.name = "[대표]" + " 고용범";
                                        break;
                                    case "민지희":
                                        each.name = "[수능선배 야간 사감조교]" + " 민지희";
                                        break;
                                    case "강다연":
                                        each.name = "[수능선배 주간 사감조교]" + " 강다연";
                                        break;
                                    case "박가을":
                                        each.name = "[원장]" + " 박가을";
                                        break;
                                    // case "윤예주":
                                    //     each.name = "[본점 4층 조교샘]" + " 윤예주";
                                    //     break;
                                    // case "최윤":
                                    //     each.name = "[본점 6층 조교샘]" + " 최윤";
                                    //     break;
                                    case "김동훈":
                                        each.name = "[담임관리자]" + " 김동훈";
                                        break;
                                }
                                data.label = each.name;
                                data.phoneNumber = each.phoneNumber;
                                data.value = each.value;
                                data.key = index;
                                if (props.user && props.user.value === "student") {
                                    if (data.label.includes("[")) {
                                        rows.push(data);
                                    }
                                } else {
                                    rows.push(data);
                                }
                            })
                            setUsers([...rows]);
                        }
                    })
            })
        }

        start();
    }, [props.user]);


    const onchange = (e: any, value: any) => {
        console.log(value);
        setSelectedUser(value);
        if (value && message) {
            setActive(false);
        } else {
            setActive(true);
        }
    }

    const changeMessage = (e: any) => {
        setMessage(e.target.value);
        if (selectedUser && e.target.value) {
            setActive(false);
        } else {
            setActive(true);
        }
    }

    const submit = async (e: any) => {
        console.log(selectedUser);
        console.log(message);

        setLoading(true);

        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/envelope/message", {
            method: "POST",
            headers: { "Authorization": token, "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                message, selectedUser
            })
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    setLoading(false);
                    if (result.message === "success") {
                        setUploadBool(true);
                        setTimeout(() => {
                            setUploadBool(false);
                        }, 1000);
                        if(props.socket){
                        props.socket.emit("newMessage", selectedUser.id, props.user.name);
                        setUpdate(Math.random());
                        }
                    }
                })
        })

    }


    return (
        <div className={styles.main}>
            <Chat />
            {/* <div className={styles.mainBoard}>
                <div className={styles.title}>
                    <img src="img/off/envelope.svg" alt="envelope" />
                    나에게 온 메세지
                </div>

                <div className={styles.searchMenu}>
                    <div onClick={(e) => { setSearchMenu("write") }} className={`${styles.searchMenuDiv} ${searchMenu === "write" ? styles.active : ""}`}>
                        메세지함
                    </div>
                    {(props.user && (props.user.value === "teacher" || props.user.value === "staff")) &&
                        <div onClick={(e) => { setSearchMenu("watch") }} className={`${styles.searchMenuDiv} ${searchMenu === "watch" ? styles.active : ""}`}>
                            전체 메세지
                        </div>
                    }
                </div>

                <div>
                    {
                        searchMenu === "write" &&
                        <MyMessage update={update} unreadMessage={props.unreadMessage} />
                    }
                    {
                        searchMenu === "watch" &&
                        <TotalMessage />
                    }
                </div>
            </div>






            <div onClick={handleOpen} className={`${styles.message} qnaWrite`}>
                <img src="./img/pencil.svg" alt="pencil" />
                메세지 보내기
            </div>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={styles.messageTitle}>
                        메세지 보내기
                    </div>
                    <div className={styles.autocompleteDiv}>
                        <Autocomplete
                            onChange={onchange}
                            disablePortal
                            id="combo-box-demo"
                            options={users}
                            sx={{ width: "100%", borderRadius: "40px !important" }}
                            renderInput={(params) => <TextField {...params} sx={{ borderRadius: "24px" }} label={<span className={styles.nameText}>이름</span>} />}
                        />
                    </div>
                    <div className={styles.textfieldDiv}>
                        <TextField value={message} onChange={(e) => { changeMessage(e) }} fullWidth id="outlined-basic" label={<span className={styles.nameText}>메세지</span>} variant="outlined" />
                    </div>


                    {loading &&
                        <Box sx={{ width: '100%', marginTop: 3, marginBottom: 3 }}>
                            <LinearProgress />
                        </Box>
                    }



                    {uploadBool &&
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="info" sx={{ marginTop: 2, marginBottom: 2 }}><span className={styles.spanStyles2}>업로드 성공 !</span></Alert>
                        </Stack>
                    }

                    <div className={styles.buttonDiv}>
                        <Button onClick={submit} disabled={active} variant="contained"><span className={styles.buttonText}>전송하기</span></Button>
                    </div>
                </Box>
            </Modal> */}


        </div>
    )
}

export default Envelope;