import { CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import styles from "../../componentsStyle/offlinestatus.module.css";
import TextField from '@mui/material/TextField';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import koLocale from 'date-fns/locale/ko'
import { DataGridPro, GridRowsProp, GridColDef, GridToolbar, LicenseInfo, useGridApiRef } from '@mui/x-data-grid-pro';

LicenseInfo.setLicenseKey("e3ec4d79d1fa1f36cc88ecffd4e68392T1JERVI6MzMyMjMsRVhQSVJZPTE2NjkzODUyMDIwMDAsS0VZVkVSU0lPTj0x");

const columns: GridColDef[] = [
    { field: 'teacher', headerName: "선생님", width: 150 },
    { field: 'date', headerName: '날짜', width: 150},
    { field: 'when', headerName: "시간", width: 150},
    { field: 'name', headerName: '신청자', width: 150 },
    { field: 'place', headerName: "위치", width: 150, filterable : false },
    { field: 'subject', headerName: "과목", width: 150 },
];

const columns2: GridColDef[] = [
    { field: 'teacher', headerName: "선생님", width: 150 },
    { field: 'date', headerName: '날짜', width: 150},
    { field: 'total', headerName: "총 갯수", width: 150},
    { field: 'number', headerName: '신청 수', width: 150 },
    { field: 'ratio', headerName: "신청 비율", width: 150},
    { field: 'subject', headerName: "과목", width: 150 },
];

const OfflineStatus: React.FC<any> = (props) => {
    const [day, setDay] = useState<any[]>([]);
    const [date, setDate] = useState<number[]>([]);
    const [info, setInfo] = useState<any>();
    const [number, setNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState("student");

    const [rows, setRows] = useState<any>();
    const [rows2, setRows2] = useState<any>();

    const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
    const [submitBool, setSubmitBool] = useState(false);
    const apiRef = useGridApiRef();
    const apiRef2 = useGridApiRef();

    useEffect(() => {
        if (props.user) {
            setUser(props.user.value);
        }

        setLoading(true);
        console.log("---------");
        async function start() {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/question/offline/check", {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);
                        setInfo(result.data);
                        setLoading(false);
                    })
            })
        }

        if (props.user && props.user.value === "student") {
            start();

            const date = new Date();
            const dateInfo = [];
            date.setDate(date.getDate() - 1);
            for (var i = 0; i < 7; i++) {
                dateInfo.push(date.setDate(date.getDate() + 1));
            }

            console.log(dateInfo);
            const currentDay: any = [];
            const currentDate: any = [];

            dateInfo.forEach((each: any) => {
                currentDate.push(new Date(each).getDate());
                switch (new Date(each).getDay()) {
                    case 0: currentDay.push("일"); break;
                    case 1: currentDay.push("월"); break;
                    case 2: currentDay.push("화"); break;
                    case 3: currentDay.push("수"); break;
                    case 4: currentDay.push("목"); break;
                    case 5: currentDay.push("금"); break;
                    case 6: currentDay.push("토"); break;
                }
            })

            console.log(currentDate);
            console.log(currentDay);
            setDay(currentDay);
            setDate(currentDate);
        } else {
            setLoading(false);
        }

    }, []);

    const submit = async (e : any) => {
        console.log(value);

        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/question/offline/total", {
            method: "POST",
            headers: { "Authorization": token, "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                message: value
            })
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    var data: any = [];
                    result.data.forEach((each: any, index: number) => {
                        var oneRow: any = {};
                        oneRow.id = index + 1;
                        oneRow.name = each.name;
                        oneRow.date = `${new Date(each.targetDate).getMonth() + 1}월 ${new Date(each.targetDate).getDate()}일`;
                        oneRow.when = each.hours + " : " + each.minutes;
                        oneRow.teacher = each.teacherName;
                        if(each.subject === "chemistry"){
                            each.subject = "화학"
                        }
                        if(each.subject === "biology"){
                            each.subject = "생물"
                        }
                        if(each.subject === "organic"){
                            each.subject = "유기"
                        }
                        if(each.subject === "physics"){
                            each.subject = "물리"
                        }

                        oneRow.subject = each.subject;
                        oneRow.place = each.uploadTeacherDescription;
                        // oneRow.time = `${new Date(+each.time).getMonth() + 1}월 ${new Date(+each.time).getDate()}일 ${new Date(+each.time).getHours()}시`;
                        data.push(oneRow);
                    })
                    console.log(data);
                    setRows([...data]);


                    var data2: any = [];
                    result.data2.forEach((each: any, index: number) => {
                        var oneRow: any = {};
                        oneRow.id = index + 1;
                        oneRow.teacher = each.teacherName;
                        oneRow.date = `${new Date(each.targetDate).getMonth() + 1}월 ${new Date(each.targetDate).getDate()}일`;
                        oneRow.total = each.total;
                        oneRow.number = each.enrolled;
                        oneRow.ratio = Math.floor((+each.enrolled/+each.total) * 100) + "%";
                        if(each.subject === "chemistry"){
                            each.subject = "화학"
                        }
                        if(each.subject === "biology"){
                            each.subject = "생물"
                        }
                        if(each.subject === "organic"){
                            each.subject = "유기"
                        }
                        if(each.subject === "physics"){
                            each.subject = "물리"
                        }

                        oneRow.subject = each.subject;
                        // oneRow.time = `${new Date(+each.time).getMonth() + 1}월 ${new Date(+each.time).getDate()}일 ${new Date(+each.time).getHours()}시`;
                        data2.push(oneRow);
                    })
                    console.log(data2);
                    setRows2([...data2]);

                    
                })
        })
    }

    const filterChange = (e : any) => {

    }

    const filterChange2 = (e : any) => {

    }


    return (
        <div className={styles.checkBoard}>
            <div className={styles.title}>
                <img src="img/calendar.svg" alt="calendar"></img><span className={styles.titleText}>질의응답 신청현황</span>
            </div>
            {loading &&
                <div className={styles.loading}>
                    <CircularProgress />
                </div>
            }
            {(user === "student" && !loading) &&
                <>
                    <div className={styles.dayLine}>
                        <div className={styles.dayFirst1}>

                        </div>
                        {day && day.map((eachDay, index) => {
                            return (
                                <div className={styles.dayDiv}>
                                    {eachDay}
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.dateLine}>
                        <div className={styles.dayFirst2}>
                            <div>현</div>
                            <div>황</div>
                        </div>
                        {day && day.map((eachDay, index) => {
                            var day: any;

                            switch (eachDay) {
                                case "일": day = 0; break;
                                case "월": day = 1; break;
                                case "화": day = 2; break;
                                case "수": day = 3; break;
                                case "목": day = 4; break;
                                case "금": day = 5; break;
                                case "토": day = 6; break;
                            }


                            return (
                                <div key={number + index} className={styles.dateDiv}>
                                    {
                                        (typeof (day) === "number" && info && info[day].length > 0) ?
                                            <div className={styles.dateDivDiv}>
                                                {
                                                    info[day].map((eachEnroll: any) => {
                                                        return (
                                                            <div className={styles.eachEnroll}>
                                                                <div>
                                                                    {eachEnroll.subject === "chemistry" && "[화학]"}
                                                                    {eachEnroll.subject === "organic" && "[유기]"}
                                                                    {eachEnroll.subject === "physics" && "[물리]"}
                                                                    {eachEnroll.subject === "biology" && "[생물]"}
                                                                </div>
                                                                <div>
                                                                    {eachEnroll.uploadTeacherDescription}
                                                                </div>
                                                                <div>
                                                                    {eachEnroll.ampm} {eachEnroll.hours}:{eachEnroll.minutes}
                                                                </div>
                                                                <div>
                                                                    {eachEnroll.teacherName}
                                                                </div>

                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                            :
                                            ""
                                    }

                                </div>
                            )
                        })}
                    </div>
                </>
            }
            {
                ((user === "staff") || (user === "teacher")) &&
                <div className={styles.teacherDiv}>
                    <div className={styles.datePicker}>
                        <LocalizationProvider locale={koLocale} dateAdapter={AdapterDateFns}>
                            <DateRangePicker
                                startText="시작일"
                                endText="마지막일"
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                    if (newValue[0] && newValue[1]) {
                                        setSubmitBool(true);
                                    }
                                }}
                                renderInput={(startProps, endProps) => (
                                    <React.Fragment>
                                        <TextField {...startProps} />
                                        <Box sx={{ mx: 2 }}> to </Box>
                                        <TextField {...endProps} />
                                    </React.Fragment>
                                )}

                            />
                        </LocalizationProvider>
                    </div>
                    {submitBool ?
                        <div onClick={submit} className={styles.totalCheckBtn}>
                            조회하기
                        </div>
                        :
                        <div className={styles.disableTotalCheckBtn}>
                            조회하기
                        </div>
                    }


                    <div className={styles.dataGrid}>
                        {rows &&
                            <div style={{ height: 500, width: '100%' }}>
                                <div style={{ display: "flex", height: "100%" }}>
                                    <div style={{ flexGrow: 1 }}>
                                        <DataGridPro rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} apiRef={apiRef}
                                            onStateChange={filterChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                    <div className={styles.dataGrid}>
                        {rows2 &&
                            <div style={{ height: 500, width: '100%' }}>
                                <div style={{ display: "flex", height: "100%" }}>
                                    <div style={{ flexGrow: 1 }}>
                                        <DataGridPro rows={rows2} columns={columns2} components={{ Toolbar: GridToolbar }} apiRef={apiRef2}
                                            onStateChange={filterChange2}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }


        </div>
    )
}

export default OfflineStatus;