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

const Alarm: React.FC<AlarmProps> = (props) => {
    // const classes = props.classes;
    const [year, setYear] = useState<number>(date.getFullYear());
    const [month, setMonth] = useState<number>(date.getMonth());
    const [firstDay, setFirstDay] = useState<number>(3);
    const [lastDate, setLastDate] = useState<number>(3);
    const [unit, setUnit] = React.useState('day');

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

            fetch(`https://peetsunbae.com/dashboard/scheduler/year/${year}/month/${month + 1}`, {
                method: "GET",
                credentials: "include",
                headers: { 'Authorization': token }
            }).then((response) => {
                response.json()
                    .then((result) => {
                        console.log(result);
                    })
            }).catch(error => {
                console.log(error);
            })
        }

        // start();
    }, [])
    //-----------------------------------------------------------------------


    const minusMonth = () => {
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

    const handleChange = (e : any) => {
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
                                        sx={{height : "46px"}}
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
                                <Button sx={{width : "95px", height : "46px", marginLeft : "7px", border : "1px solid #cfcfcf", color : "#6b6b6b", fontFamily : "Apple_R", fontSize : "15px"}} variant="outlined">상담일정</Button>
                            </Box>
                        </div>
                        <div>
                            <Box>
                                <Button onClick={minusMonth} sx={{minWidth : "46px",height : "46px", marginLeft : "7px", border : "1px solid #cfcfcf", color : "#6b6b6b", fontFamily : "Apple_R"}} variant="outlined"><img src="img/chevron-left.svg" alt="left"></img></Button>
                            </Box>
                        </div>
                        <div>
                            <Box>
                                <Button onClick={plusMonth} sx={{minWidth : "46px",height : "46px", marginLeft : "7px", border : "1px solid #cfcfcf", color : "#6b6b6b", fontFamily : "Apple_R"}} variant="outlined"><img src="img/chevron-right.svg" alt="right"></img></Button>
                            </Box>
                        </div>
                    </div>
                    <div>
                        <Button sx={{width : "180px", height : "46px", border : "1px solid #728aff", color : "#3d50b0", fontFamily : "Apple_R", fontSize : "16px"}} variant="outlined"># 이번 달 총 벌점기록</Button>
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
                                    <div className={styles.calendarWeek}>
                                        {
                                            i.map((column, index) => {
                                                const number = (row - 1) * 7 + column;
                                                var day: any = number - (firstDay);
                                                if (day < 1 || day > lastDate) {
                                                    day = "";
                                                }
                                                return (
                                                    <div data-year={year} data-month={month} data-day={day} className={styles.calendarDay}>{day}</div>
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
        </div>
    )
}

export default Alarm;

