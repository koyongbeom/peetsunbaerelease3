// import { withStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
// import styles from '../componentsStyle/alarmStyles';
// import "../componentsStyle/alarm.css"
import { userInfo } from 'os';
import styles from "../componentsStyle/alarm.module.css";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TotalDemerit from './totaldemerit';
import {DataGridPro, LicenseInfo, GridColDef} from '@mui/x-data-grid-pro';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

LicenseInfo.setLicenseKey("e3ec4d79d1fa1f36cc88ecffd4e68392T1JERVI6MzMyMjMsRVhQSVJZPTE2NjkzODUyMDIwMDAsS0VZVkVSU0lPTj0x");


type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface user {
    name: string;
    value: "student" | "teacher" | "parent" | "staff";
    id: number;
}

interface AlarmProps extends RouteComponentProps {
    activateMenuList: (curret: currentSideBarMenuList) => void;
    // classes: any;
    user: user | null | undefined;
}

const date = new Date();
var i = [1, 2, 3, 4, 5, 6, 7];
var j = [1, 2, 3, 4, 5, 6];


const columns : GridColDef[] = [
    {field : "score", headerName : "벌점", width : 100},
    {field : "description", headerName : "내용", width : 200},
];

const Alarm: React.FC<AlarmProps> = (props) => {
    // const classes = props.classes;
    const [rows, setRows] = useState([]);
    const [totalScore, setTotalScore] = useState(0);

    const [year, setYear] = useState<number>(date.getFullYear());
    const [month, setMonth] = useState<number>(date.getMonth());
    const [firstDay, setFirstDay] = useState<number>(3);
    const [lastDate, setLastDate] = useState<number>(3);
    const [unit, setUnit] = React.useState('day');
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = useState(false);
    const [data, setData] = useState<any>();
    const handleClose = () => setOpen(false);
    const handleClose2 = () => setOpen2(false);
    const [today, setToday] = useState(new Date());
    const [modalKind, setModalKind] = useState(0);
    const [style, setStyle] = useState<any>([
        {
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 1200,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }
    ]
    );

    const [style2, setStyle2] = useState<any>(
        {
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }
    )


    const [targetDate, setTargetDate] = useState(0);
    const [targetDay, setTargetDay] = useState("월");
    const [loading, setLoading] = useState(false);




    const handleOpen = () => {
        setOpen(true);
    }

    const handleOpen2 = () => {
        setOpen2(true);
    }

    const viewAccessControl = (date : number, day : number) => {
        if(day === -1){
            return;
        }


        setStyle([{
            ...style[0], width : 490, height : 506
        }]);
        console.log(date);
        setTargetDate(date);
        console.log(day);

        switch (day) {
            case 0:
                setTargetDay("일");
                break;
            case 1:
                setTargetDay("월");
                break;
            case 2:
                setTargetDay("화");
                break;
            case 3:
                setTargetDay("수");
                break;
            case 4:
                setTargetDay("목");
                break;
            case 5:
                setTargetDay("금");
                break;
            case 6:
                setTargetDay("토");
                break;
        }


        handleOpen();
    }

    useEffect(() => {
        props.activateMenuList("alarm");
    }, [])

    //달력 날짜 계산하는 곳-----------------------------------------------
    useEffect(() => {
        var date = new Date(year, month, 1);
        setFirstDay(date.getDay());
        date = new Date(year, month + 1, 0);
        setLastDate(date.getDate());

    }, [month]);
    //------------------------------------------------------------------

    //각 날짜별 출입기록 받아오는 곳------------------------------------------
    useEffect(() => {
        async function start() {
            var token = "";
            //-----// 만약 electron 이라면 저장되어 있는 토큰 가져오는 기능----------
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }
            //------------------------------------------------------------------

            if(!props.user?.id){
                console.log("noUser");
                return;
            }

            fetch(`https://peetsunbae.com/fingerprint/totalMonthStampRealForReal`, {
                method: "post",
                headers: { 'content-type' : 'application/json' },
                credentials : "include",
                body : JSON.stringify({
                    id : props.user?.id,
                    month : month + 1
                })
            }).then((response) => {
                response.json()
                    .then((result) => {
                        console.log(result);
                        const newArray : any = [];
                        for(var i=0; i<31; i++){
                            newArray.push([]);
                        }

                        if(!result.data){
                            console.log("noresult");
                            return;
                        }

                        result.data.forEach((each : any)=>{
                            const date = new Date(+each.time);
                            const targetDate = date.getDate();
                            each.hours = date.getHours();
                            each.minutes = date.getMinutes();
                            each.hoursString = each.hours < 10 ? "0" +  each.hours : each.hours;
                            each.minutesString = each.minutes < 10 ? "0" + each.minutes : each.minutes;
                            each.countedTime = each.hours * 60 + each.minutes; 
                            if(each.hours >= 2){
                            newArray[targetDate-1].push(each);
                            }else{
                                if(targetDate === 1){

                                }else{
                                    newArray[targetDate - 2].push(each);
                                }
                            }
                        });

                        console.log(newArray);
                        setData(newArray);

                        if(!result.demerit){
                            console.log("noResult");
                            return;
                        }

                        const newRows : any = [];
                        var newTotalScore = 0;

                        result.demerit.forEach((each : any)=>{
                            const oneRow : any = {};
                            oneRow.id = each.id;
                            oneRow.score = each.score;
                            oneRow.description = each.description;
                            newTotalScore += each.score;

                            newRows.push(oneRow);
                        });

                        setTotalScore(newTotalScore);
                        setRows(newRows);
                    })
            }).catch(error => {
                console.log(error);
            })
        }

        start();
    }, [month, props.user]);
    //-----------------------------------------------------------------------




    const minusMonth = () => {
        setData([]);

        var changeToMonth = month - 1;
        var changeToYear;
        if (changeToMonth === -1) {
            changeToMonth = 11;
            changeToYear = year - 1;
        }
        if (changeToYear) {
            setYear(changeToYear);
        }
        setMonth(changeToMonth);
    }

    const plusMonth = () => {
        setData([]);

        var changeToMonth = month + 1;
        var changeToYear;
        if (changeToMonth === 12) {
            changeToMonth = 0;
            changeToYear = year + 1;
        }
        if (changeToYear) {
            setYear(changeToYear);
        }
        setMonth(changeToMonth);
    }

    const handleChange = (e: any) => {
        setUnit(e.target.value);
    }

    return (
        <div className={styles.main}>
            <div className={styles.title}>
                <div><img className={styles.clock} src="img/alarm.svg" alt="alarm" />출석</div>
                <div className={styles.studentName}><img className={styles.calendarFlat} src="img/calendar.svg" alt="calendar" />{props.user?.name} 일정표</div>
            </div>

            <div className={styles.paper}>
                <div className={styles.paperTitle}>
                    <div className={styles.paperTitleFirst}>
                        <div>
                            <Box sx={{ minWidth: "150px" }}>
                                <FormControl fullWidth>
                                    <Select
                                        sx={{ height: "46px" }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={unit}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="day">일간</MenuItem>
                                        <MenuItem value="week">주간</MenuItem>
                                        <MenuItem value="month">월간</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div>
                            <Box>
                                <Button onClick={()=>{alert("준비중인 기능입니다")}} sx={{ width: "95px", height: "46px", marginLeft: "7px", border: "1px solid #cfcfcf", color: "#6b6b6b", fontFamily: "Apple_R", fontSize: "15px" }} variant="outlined">상담일정</Button>
                            </Box>
                        </div>
                        <div>
                            <Box>
                                <Button onClick={minusMonth} sx={{ minWidth: "46px", height: "46px", marginLeft: "7px", border: "1px solid #cfcfcf", color: "#6b6b6b", fontFamily: "Apple_R" }} variant="outlined"><img src="img/chevron-left.svg" alt="left"></img></Button>
                            </Box>
                        </div>
                        <div>
                            <Box>
                                <Button onClick={plusMonth} sx={{ minWidth: "46px", height: "46px", marginLeft: "7px", border: "1px solid #cfcfcf", color: "#6b6b6b", fontFamily: "Apple_R" }} variant="outlined"><img src="img/chevron-right.svg" alt="right"></img></Button>
                            </Box>
                        </div>
                    </div>
                    <div>
                        <Button onClick={()=>{handleOpen2()}} sx={{ width: "180px", height: "46px", border: "1px solid #728aff", color: "#3d50b0", fontFamily: "Apple_R", fontSize: "16px" }} variant="outlined"># {month+1}월 총 벌점기록</Button>
                    </div>
                </div>
                <div className={styles.whenMonth}>
                    <span>{year}년&nbsp;</span><span>{month + 1}월</span>
                </div>
                <div className={styles.calendar}>
                    <div className={styles.day}>
                        <div className={styles.dayList}>
                            일요일
                        </div>
                        <div className={styles.dayList}>
                            월요일
                        </div>
                        <div className={styles.dayList}>
                            화요일
                        </div>
                        <div className={styles.dayList}>
                            수요일
                        </div>
                        <div className={styles.dayList}>
                            목요일
                        </div>
                        <div className={styles.dayList}>
                            금요일
                        </div>
                        <div className={`${styles.dayList} ${styles.last}`}>
                            토요일
                        </div>
                    </div>
                    <div className={styles.calendarDiv}>
                        {
                            j.map((row, index) => {

                                return (
                                    <div key={Math.random()} className={styles.calendarWeek}>
                                        {
                                            i.map((column, index) => {
                                                const number = (row - 1) * 7 + column;
                                                var targetData : any;
                                                var totalTime;
                                            
                                                var day: any = number - (firstDay);
                                                if (day < 1 || day > lastDate) {
                                                    day = "";
                                                }
                                                if(day && data){
                                                    targetData = data[+(day-1)];
                                                }

                                                if(targetData && targetData.length > 0){
                                                    totalTime = targetData[targetData.length -1].countedTime - targetData[0].countedTime;
                                                }

                                                if(totalTime && totalTime < 0){
                                                    totalTime = targetData[targetData.length -1].countedTime - targetData[0].countedTime + 1440;
                                                }

                                                return (
                                                    <div key={Math.random()} data-year={year} data-month={month} data-day={day} className={`${styles.calendarDay} ${(targetData && targetData.length > 0) ? styles.active : ""}`} onClick={()=>{ viewAccessControl( (+day), (targetData && targetData.length > 0) ? new Date(+targetData[0].time).getDay() : -1 ) }}>
                                                        <div style={{display : "flex"}}>
                                                            <div>
                                                              {day}
                                                            </div>
                                                            {
                                                                (targetData && targetData.length > 1 && totalTime) &&
                                                                <div className={styles.totalHours}>
                                                                    {Math.floor(totalTime/60)}시간 {totalTime%60}분
                                                                </div>
                                                            }
                                                        </div>
                                                        <div className={`${styles.startTime}`}>
                                                            {(targetData && targetData.length > 0) &&
                                                             `${targetData[0].hoursString}:${targetData[0].minutesString} 등원`
                                                             }
                                                        </div>
                                                        <div className={styles.lastTime}>
                                                            {(targetData && targetData.length > 0 && today.getDate() !== (+day)) &&
                                                             `${targetData[targetData.length -1].hoursString}:${targetData[targetData.length -1].minutesString} 하원`
                                                             }
                                                        </div>
                                                    </div>
                                                )

                                            })
                                        }
                                    </div>
                                );

                            })
                        }
                    </div>
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style[modalKind]}>
                    <div>
                        <div className={styles.modalDate}>
                            {month+1}월{targetDate}일({targetDay}요일)
                        </div>
                        <div className={styles.accessControlList}>
                            {
                                (data && data[targetDate-1] && data[targetDate-1].length > 0) && 
                                data[targetDate-1].map((eachData : any, index : number)=>{
                                    return (
                                        <div className={`${styles.eachAccessControl}`}>
                                            <div className={`${styles.eachAccessControlChild} ${eachData.direction === "inside" ? styles.inside : styles.outside}`}>
                                                <span className={styles.timeCheck}>{eachData.hoursString}:{eachData.minutesString}</span>&nbsp;&nbsp; {eachData.direction === "inside" ? "외출" : "입실"} {(index > 0 && eachData.direction === "outside") ? `(외출 ${data[targetDate-1][index].countedTime - data[targetDate-1][index-1].countedTime}분 경과)` : ""}
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={open2}
                onClose={handleClose2}
            >
                <Box sx={style2}>
                            <h4>
                                {month + 1}월 벌점기록
                            </h4>
                            <div style={{ height : 350, width : "100%", backgroundColor : "white", marginTop : "24px"}}>
                                <DataGridPro
                                density='compact'
                                columns={columns}
                                rows={rows}
                                />
                            </div>
                            <div className={styles.totalScore}>
                                총 벌점 : {totalScore}점
                            </div>
                </Box>
            </Modal>
        </div>
    )
}

export default Alarm;

