import { withStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import styles from '../componentsStyle/alarmStyles';
import "../componentsStyle/alarm.css"
import { userInfo } from 'os';

type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface user {
    name: string;
    value: "student" | "teacher" | "parent" | "staff";
    id: number;
}

interface AlarmProps extends RouteComponentProps {
    activateMenuList: (curret: currentSideBarMenuList) => void;
    classes: any;
    user : user | null | undefined;
}

const date = new Date();
var i = [1, 2, 3, 4, 5, 6, 7];
var j = [1, 2, 3, 4, 5, 6];

const Alarm: React.FC<AlarmProps> = (props) => {
    const classes = props.classes;
    const [year, setYear] = useState<number>(date.getFullYear());
    const [month, setMonth] = useState<number>(date.getMonth());
    const [firstDay, setFirstDay] = useState<number>(3);
    const [lastDate, setLastDate] = useState<number>(3);

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
    useEffect(()=>{
        async function start() {
            var token = "";
            //-----// 만약 electron 이라면 저장되어 있는 토큰 가져오는 기능----------
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }
            //------------------------------------------------------------------

            fetch(`https://peetsunbae.com/dashboard/scheduler/year/${year}/month/${month+1}`, {
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

        start();
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

    return (
        <div className={`${classes.main} main`}>
            <div className={classes.title}>
                <img className={classes.clock} src="img/alarm.svg" alt="alarm" />출석
            </div>

            <div className={classes.paper}>
                <div className={classes.paperTitle}>
                    <div className={classes.studentName}><img className={classes.calendarFlat} src="img/calendar.svg" alt="calendar" />{props.user?.name} 일정표</div>
                    <div className={classes.monthStudyTime}>#이번 달 총 공부시간</div>
                </div>
                <div className={classes.calendar}>
                    <div className={classes.calendarTitle}>
                        <div className="calendarTitleText">
                            <img className={classes.chevronLeft} onClick={minusMonth} src="img/chevron-left-regular.svg" alt="chevronLeft" />
                            <span>{year}년 </span><span>{month + 1}월</span>
                            <img className={classes.chevronRight} onClick={plusMonth} src="img/chevron-right-regular.svg" alt="chevronRight" />
                        </div>
                    </div>
                    <div className={classes.day}>
                        <div className={classes.dayList}>
                            일요일
                        </div>
                        <div className={classes.dayList}>
                            월요일
                        </div>
                        <div className={classes.dayList}>
                            화요일
                        </div>
                        <div className={classes.dayList}>
                            수요일
                        </div>
                        <div className={classes.dayList}>
                            목요일
                        </div>
                        <div className={classes.dayList}>
                            금요일
                        </div>
                        <div className={classes.dayList_last}>
                            토요일
                        </div>
                    </div>
                    <div>
                        {
                            j.map((row, index) => {

                                    return (
                                        <div className={`calendarWeek calendarWeek${index}`}>
                                            {
                                                i.map((column, index) => {   
                                                        const number = (row - 1) * 7 + column;
                                                        var day : any = number - (firstDay);
                                                        if(day < 1 || day > lastDate){
                                                            day = "";
                                                        }
                                                        return (
                                                            <div data-year={year} data-month={month} data-day={day} className={`calendarDay calendarDay${index}`}>{day}</div>
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

export default withStyles(styles)(Alarm);

