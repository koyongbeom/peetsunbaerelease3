import React, { useState, useEffect } from 'react';
import styles from '../../componentsStyle/attendance.module.css';
import { GridRenderCellParams, DataGridPro, GridSelectionModel, GridRowsProp, GridColDef, GridToolbar, LicenseInfo, useGridApiRef, GridEditRowsModel } from '@mui/x-data-grid-pro';
import renderCellExpand from '../data/rendercellexpand';
import { createStyles, makeStyles } from '@mui/styles';
import { createTheme, darken, lighten } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';


LicenseInfo.setLicenseKey("e3ec4d79d1fa1f36cc88ecffd4e68392T1JERVI6MzMyMjMsRVhQSVJZPTE2NjkzODUyMDIwMDAsS0VZVkVSU0lPTj0x");

const defaultTheme = createTheme();
const useStyles2 = makeStyles(
    (theme) => {
        const getBackgroundColor = (color: any) =>
            theme.palette.mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

        const getHoverBackgroundColor = (color: any) =>
            theme.palette.mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

        return {
            root: {
                '& .super-app-theme--처리완료': {
                    color: "blue",
                    '&:hover': {
                        backgroundColor: getHoverBackgroundColor(theme.palette.info.main),
                    },
                },
                '& .super-app-theme--Filled': {
                    backgroundColor: getBackgroundColor(theme.palette.success.main),
                    '&:hover': {
                        backgroundColor: getHoverBackgroundColor(theme.palette.success.main),
                    },
                },
                '& .super-app-theme--확인': {
                    color: "black"
                },
                '& .super-app-theme--미확인': {
                    color: "red",
                    '&:hover': {
                        backgroundColor: getHoverBackgroundColor(theme.palette.error.main),
                    },
                },
            },
        };
    },
    { defaultTheme },
);



const columns: GridColDef[] = [
    { field: 'date', headerName: '날짜', width: 100, filterable: false },
    { field: 'time', headerName: '시간', width: 80, renderCell: renderCellExpand, filterable: false },
    { field: 'name', headerName: '이름', width: 80, editable: true, renderCell: renderCellExpand, filterable: true },
    { field: 'number', headerName: '번호', width: 150, editable: true, renderCell: renderCellExpand, filterable: false },
    { field: 'description', headerName: '내용', width: 730, filterable: false, renderCell: renderCellExpand },
];

const Mobile: React.FC<any> = (props) => {
    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
    const classes = useStyles2();
    const [rows, setRows] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState("");
    const [telephoneNumber, setTelephoneNumber] = useState("");
    const [selectedName, setSelectedName] = useState("");
    const [description, setDescription] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [users, setUsers] = useState<any>();

    const [where, setWhere] = useState<any>();

    const [sendSuccess, setSendSuccess] = useState(false);
    const [sendFail, setSendFail] = useState(false);
    const [sendLoading, setSendLoading] = useState(false);


    const start = async () => {
        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }


        fetch(`https://peetsunbae.com/dashboard/report/mobileuser`, {
            method: "GET",
            headers: { "Authorization": token },
            credentials : "include"
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    setUsers(result.user);
                })  
        })
    }


    useEffect(()=>{
        start();
    }, []);




    const connect = async (e: any, where: string) => {
        setRows([]);
        setLoading(true);


        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        var port;
        if (where === "second") {
            port = 3101;
        }
        if (where === "six") {
            port = 3100;
        }
        if (where === "four") {
            port = 3102;
        }

        setCurrent(where);


        fetch(`https://peetsunbae.com/dashboard/report/mobile?where=${where}`, {
            method: "GET",
            headers: { "Authorization": token },
            credentials : "include"
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    console.log(result.data);
                    const rows: any = [];
                    result.data.forEach((each: any, userIndex : any) => {
                        each.name = ""
                        each.fullMessages.reverse();
                        if(users){
                            users.forEach((user : any)=>{
                                if(user.telephoneNumber === each.number){
                                    console.log(1);
                                    console.log(user.name);
                                    each.name = user.name;
                                }
                            })
                        }

                        each.fullMessages.forEach((message: any, index : number) => {
                            if(index < 8){
                            const oneRow: any = {};
                            oneRow.id = each.number + "a" + index + "a" + each.name ;
                            oneRow.name = each.name;
                            oneRow.number = each.number;
                            oneRow.description = message.text;
                            oneRow.from = message.from;
                            const spliter = message.time.split(" ");
                            oneRow.date = spliter.length === 1 ? "오늘" : spliter[0];
                            oneRow.time = spliter.length === 1 ? spliter[0] : spliter[1];
                            rows.push(oneRow);
                            }
                        })
                        const defaultRow: any = { id : userIndex + "defaultRow",date: "--------------", time: "-----------", number: "--------------------", description: "----------------------------------------------------------------------------------------------------------------------------------------------", from: "blank" }
                        rows.push(defaultRow);
                    })

                    console.log("rows");
                    console.log(rows);
                    setRows([...rows]);
                    setLoading(false);
                })
        })
    }

    const change = (e : any, type : string) => {
        switch(type) {
            case "number" : 
                setTelephoneNumber(e.target.value);
                setSelectedName("");
                if(e.target.value && description && current){
                    setDisabled(false);
                }else{
                    setDisabled(true);
                }
                break;
            case "description" :
                setDescription(e.target.value);
                if(description && e.target.value && current){
                    setDisabled(false);
                }else{
                    setDisabled(true);
                }
                break;
        }
    }


    const send = async (e : any) => {
        setSendLoading(true);
        console.log(telephoneNumber);
        console.log(description);

        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }


        fetch(`https://peetsunbae.com/dashboard/report/sendsms?where=${current}`, {
            method: "POST",
            headers: { "Authorization": token, "Content-Type" : "application/json" },
            credentials : "include",
            body : JSON.stringify({
                telephoneNumber,
                description
            })
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    setSendLoading(false);
                    if(result.message === "success"){
                        setSendSuccess(true);
                        alert("전송 성공");
                        setDescription("");
                        setTimeout(()=>{
                            setSendSuccess(false);
                        }, 1000)
                    }else{
                        setSendFail(true);
                        setTimeout(()=>{
                            setSendFail(false);
                        }, 1500);
                    }
                })  
        })
    }

    return (
        <div>
            <div className={styles.board}>
                <div className={`${styles.phoneBoard} ${current === "four" ? styles.active : ""}`} onClick={(e) => { connect(e, "four") }}>
                    <div className={styles.phoneImage}>
                        <img className={styles.phone} src="img/mobile-duotone.svg" alt="phone" />
                    </div>
                    <div className={styles.phoneTitle}>
                        4층폰
                    </div>
                </div>
                <div className={`${styles.phoneBoard} ${current === "six" ? styles.active : ""}`} onClick={(e) => { connect(e, "six") }}>
                    <div className={styles.phoneImage}>
                        <img className={styles.phone} src="img/mobile-duotone.svg" alt="phone" />
                    </div>
                    <div className={styles.phoneTitle}>
                        6층폰
                    </div>

                </div>
                <div className={`${styles.phoneBoard} ${current === "second" ? styles.active : ""}`} onClick={(e) => { connect(e, "second") }}>
                    <div className={styles.phoneImage}>
                        <img className={styles.phone} src="img/mobile-duotone.svg" alt="phone" />
                    </div>
                    <div className={styles.phoneTitle}>
                        2호점
                    </div>
                </div>
            </div>

            <div className={classes.root} style={{ height: 500, width: '100%', backgroundColor: "white", marginTop: "24px" }}>
                <DataGridPro loading={loading} rows={rows} columns={columns}
                    density='compact'
                    getRowClassName={(params) => {
                        if (params.getValue(params.id, "from") === "me" || params.getValue(params.id, "from") === "me_file") {
                            return (
                                `super-app-theme--미확인`
                            )
                        } else if (params.getValue(params.id, "from") === "blank") {
                            return (
                                `super-app-theme--확인`
                            )
                        }
                        else {
                            return (
                                `super-app-theme--처리완료`
                            )
                        }
                    }
                    }
                    onSelectionModelChange={(newSelectionModel) => {
                        if(newSelectionModel[0]){
                        console.log(newSelectionModel);
                        setTelephoneNumber(newSelectionModel[0].toString().split("a")[0]);
                        setSelectedName(newSelectionModel[0].toString().split("a")[2])
                        setSelectionModel(newSelectionModel);
                        }
                      }}
                    selectionModel={selectionModel}
                />
            </div>
            <div className={styles.sendsmstitle}>
                문자 발송하기
            </div>
            <div className={styles.sendsms}>
                <div className={styles.firstDiv}>
                    <div className={styles.sendsmsphone}>
                        전화번호
                    </div>
                    <div className={styles.sendsmsphonetext}>
                        <TextField value={telephoneNumber} onChange={(e : any)=>{change(e, "number")}} id="filled-basic" placeholder="(- 없이)" variant="outlined" sx={{ backgroundColor: "white", width: "140px" }} />
                    </div>
                </div>

                <div className={styles.secondDiv}>

                    <div className={styles.sendsmsdescription}>
                        내용
                    </div>
                    <div className={styles.sendsmsdescriptiontext}>
                        <TextField value={description} onChange={(e : any)=>{change(e, "description")}} multiline={true} id="filled-basic" placeholder="내용을 입력하세요.(ENTER로 줄바꿈)" variant="outlined" sx={{ backgroundColor: "white", width: "600px" }} />
                    </div>
                </div>
                <div className={styles.sendBtn}>
                    <Button onClick={send} variant="contained" disabled={disabled} endIcon={<SendIcon />} sx={{height : "56.5px"}}>
                         Send
                    </Button>
                </div>
            </div>
            <div className={styles.sendName}>
                - {selectedName}
                {sendLoading &&
                <div className={styles.alertDiv}>
                    <Box sx={{ width: '845px' }}>
                        <LinearProgress />
                    </Box>
                </div>
                }
                {sendSuccess &&
                    <div className={styles.alertDiv}>
                        <Alert severity="info">전송 성공!</Alert>
                    </div>
                }
                {
                    sendFail &&
                    <div className={styles.alertDiv}>
                        <Alert severity="error">전송 실패!</Alert>
                    </div>
                }

            </div>
            <div className={styles.messageLaw}>
                <div className={styles.messageLawTitle}>
                    [메세지 전송 가이드라인]
                </div>
                <div className={styles.messageLawText}>
                    <ul>
                        <li>메세지 보내기 전 전화는 <span className={styles.bold}>소리샘 안내</span>가 나올때까지 대기하고 받으면 잘 맞춰서 와달라는 내용 포함해서 얘기하기</li>
                        <li>
                            처음 메세지는 <span className={styles.bold}>'학생 이름/위반 내용/규정 준수 바람/답장 바람'</span>을 포함해서 보내기 - (출석에 신경을 많이 쓰고 있다는 것을 보이게 하는 것이 포인트)<br></br>
                            (ex)<br></br> 민수님 정기일정에 11시까지 등원하시기로 되있는데 아직 등원 안하셔서 연락드립니다.<br></br>
                            등원 시간 잘 지켜주시길 바랍니다.
                            <br></br>
                            보시면 전화나 문자 바로 부탁드립니다.
                        </li>
                        <li>
                            학생이 답장오면 <span className={styles.bold}>한번 더 잘 지켜주길 당부</span>하는 식으로 답장<br></br>
                            (ex)<br></br>
                            (학생) - 늦잠 때문에 늦었어요.
                            <br></br>
                            (학원) - 민수님 다음부터는 출석 시간 꼭 잘 지켜주시길 부탁드릴게요. 있다 봬요!
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Mobile;