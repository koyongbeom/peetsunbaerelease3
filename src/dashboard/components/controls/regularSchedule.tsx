import React, { useEffect, useState } from 'react';
import styles from '../../componentsStyle/regularschedule.module.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from "@mui/material/TextField";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import TimePicker from '@mui/lab/TimePicker'
import { exit } from 'process';
import Menu from '@mui/material/Menu';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Alert, LinearProgress } from '@mui/material';
import koLocale from 'date-fns/locale/ko'


const array = ["", "", "", "", "", "", ""];

const RegularSchedule: React.FC<any> = (props) => {

    const [loading, setLoading] = useState(false);
    const [monday, setMonday] = useState<any>([]);
    const [tuesday, setTuesday] = useState<any>([]);
    const [wednesday, setWednesday] = useState<any>([]);
    const [thursday, setThursday] = useState<any>([]);
    const [friday, setFriday] = useState<any>([]);
    const [saturday, setSaturday] = useState<any>([]);
    const [sunday, setSunday] = useState<any>([]);

    const [startValue, setStartValue] = useState<any>();
    const [exitValue, setExitValue] = useState<any>();
    const [dayValue, setDayValue] = useState("1");
    const [kindValue, setKindValue] = useState("long");
    const [expireValue, setExpireValue] = useState("week");
    const [reason, setReason] = useState("");
    const [uploadBool, setUploadBool] = useState(false);

    const [isUpload, setIsUpload] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);

    const [random, setRandom] = useState(0);





    const change = (e: any, type: string) => {
        console.log(kindValue);
        console.log(kindValue === "add");
        console.log(new Date(startValue).getHours());
        const newDate = new Date();
        const startTimeStandard = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate(), 9).getTime();

        switch (type) {
            case "day":
                console.log(1);

                if (kindValue === "among") {
                    console.log(2);
                    if (new Date(startValue).getTime() < new Date(exitValue).getTime() && e.target.value && kindValue && expireValue && reason) {
                        setUploadBool(true);
                        console.log(3);
                    } else {
                        setUploadBool(false);
                        console.log(4);
                    }
                } else if (kindValue === "add") {
                    if (e.target.value === "6" || e.target.value === "0") {
                        if (new Date(startValue).getTime() < new Date(exitValue).getTime() && e.target.value && kindValue && expireValue && reason) {
                            setUploadBool(true);
                            console.log(5);
                        } else {
                            setUploadBool(false);
                            console.log(6);
                        }
                    } else {
                        if (new Date(startValue).getTime() <= startTimeStandard && new Date(exitValue).getHours() >= 22 && e.target.value && kindValue && expireValue && reason) {
                            setUploadBool(true);
                            console.log(7);
                        } else {
                            setUploadBool(false);
                            console.log(8);
                        }
                    }
                } else {
                    if (e.target.value && kindValue && expireValue && reason) {
                        console.log(9);
                        setUploadBool(true);
                    } else {
                        console.log(10);
                        setUploadBool(false);
                    }
                }
                setDayValue(e.target.value);
                break;
            case "kind":
                console.log(1);
                if (e.target.value === "among") {
                    console.log(2);
                    if (new Date(startValue).getTime() < new Date(exitValue).getTime() && dayValue && e.target.value && expireValue && reason) {
                        setUploadBool(true);
                        console.log(3);
                    } else {
                        setUploadBool(false);
                        console.log(4);
                    }
                } else if (e.target.value === "add") {
                    if (dayValue === "6" || dayValue === "0") {
                        if (new Date(startValue).getTime() < new Date(exitValue).getTime() && dayValue && e.target.value && expireValue && reason) {
                            setUploadBool(true);
                            console.log(5);
                        } else {
                            setUploadBool(false);
                            console.log(6);
                        }
                    } else {
                        if (new Date(startValue).getTime() <= startTimeStandard && new Date(exitValue).getHours() >= 22 && dayValue && e.target.value && expireValue && reason) {
                            setUploadBool(true);
                            console.log(7);
                        } else {
                            setUploadBool(false);
                            console.log(8);
                        }
                    }
                } else {
                    if (dayValue && e.target.value && expireValue && reason) {
                        console.log(9);
                        setUploadBool(true);
                    } else {
                        console.log(10);
                        setUploadBool(false);
                    }
                }
                setKindValue(e.target.value);
                break;
            case "expire":
                console.log(1);
                if (kindValue === "among") {
                    console.log(2);
                    if (new Date(startValue).getTime() < new Date(exitValue).getTime() && dayValue && kindValue && e.target.value && reason) {
                        setUploadBool(true);
                        console.log(3);
                    } else {
                        setUploadBool(false);
                        console.log(4);
                    }
                } else if (kindValue === "add") {
                    if (dayValue === "6" || dayValue === "0") {
                        if (new Date(startValue).getTime() < new Date(exitValue).getTime() && dayValue && kindValue && e.target.value && reason) {
                            setUploadBool(true);
                            console.log(5);
                        } else {
                            setUploadBool(false);
                            console.log(6);
                        }
                    } else {
                        if (new Date(startValue).getTime() <= startTimeStandard && new Date(exitValue).getHours() >= 22 && dayValue && kindValue && e.target.value && reason) {
                            setUploadBool(true);
                            console.log(7);
                        } else {
                            setUploadBool(false);
                            console.log(8);
                        }
                    }
                } else {
                    if (dayValue && kindValue && e.target.value && reason) {
                        console.log(9);
                        setUploadBool(true);
                    } else {
                        console.log(10);
                        setUploadBool(false);
                    }
                }
                setExpireValue(e.target.value);
                break;
            case "reason":
                console.log(1);
                if (kindValue === "among") {
                    console.log(2);
                    if (new Date(startValue).getTime() < new Date(exitValue).getTime() && dayValue && kindValue && expireValue && e.target.value) {
                        setUploadBool(true);
                        console.log(3);
                    } else {
                        setUploadBool(false);
                        console.log(4);
                    }
                } else if (kindValue === "add") {
                    if (dayValue === "6" || dayValue === "0") {
                        if (new Date(startValue).getTime() < new Date(exitValue).getTime() && dayValue && kindValue && expireValue && e.target.value) {
                            setUploadBool(true);
                            console.log(5);
                        } else {
                            setUploadBool(false);
                            console.log(6);
                        }
                    } else {
                        if (new Date(startValue).getTime() <= startTimeStandard && new Date(exitValue).getHours() >= 22 && dayValue && kindValue && expireValue && e.target.value) {
                            setUploadBool(true);
                            console.log(7);
                        } else {
                            setUploadBool(false);
                            console.log(8);
                        }
                    }
                } else {
                    if (dayValue && kindValue && expireValue && e.target.value) {
                        console.log(9);
                        setUploadBool(true);
                    } else {
                        console.log(10);
                        setUploadBool(false);
                    }
                }
                setReason(e.target.value);
                break;
            case "startTime" :
                console.log(1);
                if (kindValue === "among") {
                    console.log(2);
                    if (new Date(e).getTime() < new Date(exitValue).getTime() && dayValue && kindValue && expireValue && reason) {
                        setUploadBool(true);
                        console.log(3);
                    } else {
                        setUploadBool(false);
                        console.log(4);
                    }
                } else if (kindValue === "add") {
                    if (dayValue === "6" || dayValue === "0") {
                        if (new Date(e).getTime() < new Date(exitValue).getTime() && dayValue && kindValue && expireValue && reason) {
                            setUploadBool(true);
                            console.log(5);
                        } else {
                            setUploadBool(false);
                            console.log(6);
                        }
                    } else {
                        if (new Date(e).getTime() <= startTimeStandard && new Date(exitValue).getHours() >= 22 && dayValue && kindValue && expireValue && reason) {
                            setUploadBool(true);
                            console.log(7);
                        } else {
                            setUploadBool(false);
                            console.log(8);
                        }
                    }
                } else {
                    if (dayValue && kindValue && expireValue && reason) {
                        console.log(9);
                        setUploadBool(true);
                    } else {
                        console.log(10);
                        setUploadBool(false);
                    }
                }
                setStartValue(e);
                break;
            case "exitTime" :
                console.log(1);
                if (kindValue === "among") {
                    console.log(2);
                    if (new Date(startValue).getTime() < new Date(e).getTime() && dayValue && kindValue && expireValue && reason) {
                        setUploadBool(true);
                        console.log(3);
                    } else {
                        setUploadBool(false);
                        console.log(4);
                    }
                } else if (kindValue === "add") {
                    if (dayValue === "6" || dayValue === "0") {
                        if (new Date(startValue).getTime() < new Date(e).getTime() && dayValue && kindValue && expireValue && reason) {
                            setUploadBool(true);
                            console.log(5);
                        } else {
                            setUploadBool(false);
                            console.log(6);
                        }
                    } else {
                        if (new Date(startValue).getTime() <= startTimeStandard && new Date(e).getHours() >= 22 && dayValue && kindValue && expireValue && reason) {
                            setUploadBool(true);
                            console.log(7);
                        } else {
                            setUploadBool(false);
                            console.log(8);
                        }
                    }
                } else {
                    if (dayValue && kindValue && expireValue && reason) {
                        console.log(9);
                        setUploadBool(true);
                    } else {
                        console.log(10);
                        setUploadBool(false);
                    }
                }
                setExitValue(e);
                break;
        }
    }


    useEffect(() => {
        setLoading(true);
        console.log("---------");

        const date = new Date();
        const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 14);
        setStartValue(newDate);
        setExitValue(newDate);




        async function start() {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }


            fetch(`https://peetsunbae.com/dashboard/chart/regularSchedule?studentId=${props.selectedUser.id}`, {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);
                        setLoading(false);
                        if (result.data) {
                            result.data.forEach((each: any) => {
                                switch (each.day) {
                                    case 0:
                                        const newSunday = [];
                                        newSunday.push(each);
                                        setSunday([...newSunday]);
                                        break;
                                    case 1:
                                        const newMonday = [];
                                        newMonday.push(each);
                                        setMonday([...newMonday]);
                                        break;
                                    case 2:
                                        const newTuesday = [];
                                        newTuesday.push(each);
                                        setTuesday([...newTuesday]);
                                        break;
                                    case 3:
                                        const newWednesday = [];
                                        newWednesday.push(each);
                                        setWednesday([...newWednesday]);
                                        break;
                                    case 4:
                                        const newThursday = [];
                                        newThursday.push(each);
                                        setThursday([...newThursday]);
                                        break;
                                    case 5:
                                        const newFriday = [];
                                        newFriday.push(each);
                                        setFriday([...newFriday]);
                                        break;
                                    case 6:
                                        const newSaturday = [];
                                        newSaturday.push(each);
                                        setSaturday([...newSaturday]);
                                        break;
                                }
                            })
                        }
                    })
            })
        }

        start();
    }, [random])

    const submit = async (e : any) =>{
        setUploadLoading(true);
        const message = {dayValue, kindValue, startValue, exitValue, expireValue, reason}

        var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch(`https://peetsunbae.com/dashboard/chart/regularSchedule/write?studentId=${props.selectedUser.id}`, {
                method: "POST",
                headers: { "Authorization": token, "Content-Type" : "application/json" },
                credentials: "include",
                body : JSON.stringify(message)
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);
                        if(result.message === "success"){
                            console.log(11);
                            setRandom(Math.random());
                        }
                        setUploadLoading(false);
                        setIsUpload(true);
                        setTimeout(()=>{
                            setIsUpload(false);
                        }, 2000);
                    })
            })
    }

    const deleteOne = async (e: any, id: number, day : string) => {
        console.log(id);

        const message = { id }

        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch(`https://peetsunbae.com/dashboard/chart/regularSchedule/delete`, {
            method: "DELETE",
            headers: { "Authorization": token, "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(message)
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    if(result.message === "success"){
                    switch (day) {
                        case "monday":
                            const newMonDay = monday;
                            const filteredMonDay = newMonDay.filter((each: any) => each.id != id);
                            setMonday([...filteredMonDay]);
                            break;
                        case "tuesday":
                            const newTuesDay = tuesday;
                            const filteredTuesDay = newTuesDay.filter((each: any) => each.id != id);
                            setTuesday([...filteredTuesDay]);
                            break;
                        case "wednesday":
                            const newWednesDay = wednesday;
                            const filteredWednesDay = newWednesDay.filter((each: any) => each.id != id);
                            setWednesday([...filteredWednesDay]);
                            break;
                        case "thursday":
                            const newThursDay = thursday;
                            const filteredThursDay = newThursDay.filter((each: any) => each.id != id);
                            setThursday([...filteredThursDay]);
                            break;
                        case "friday":
                            const newFriDay = friday;
                            const filteredFriDay = newFriDay.filter((each: any) => each.id != id);
                            setFriday([...filteredFriDay]);
                            break;
                        case "saturday":
                            const newSaturDay = saturday;
                            const filteredSaturDay = newSaturDay.filter((each: any) => each.id != id);
                            setSaturday([...filteredSaturDay]);
                            break;
                        case "sunday":
                            const newSunDay = sunday;
                            const filteredSunDay = newSunDay.filter((each: any) => each.id != id);
                            setSunday([...filteredSunDay]);
                            break;
                    }

                    console.log(11);
                    }
                })
        })
    }

    return (
        <div className={styles.regularSchedule}>
            <div className={styles.title}>
                <img src="img/calendar.svg" alt="calendar" /> ???????????? ?????? {props.name ? "- " + props.name : ""}
            </div>
            <div className={styles.calendarDiv}>
                <div className={styles.days}>
                    <div className={styles.dayFirst1}>

                    </div>
                    <div className={styles.dayDiv}>
                        ???
                    </div>
                    <div className={styles.dayDiv}>
                        ???
                    </div>
                    <div className={styles.dayDiv}>
                        ???
                    </div>
                    <div className={styles.dayDiv}>
                        ???
                    </div>
                    <div className={styles.dayDiv}>
                        ???
                    </div>
                    <div className={styles.dayDiv}>
                        ???
                    </div>
                    <div className={styles.dayDiv}>
                        ???
                    </div>
                </div>
                <div className={styles.dateDiv}>
                    <div className={styles.dayFirst2}>
                        <div>???</div>
                        <div>???</div>
                    </div>
                    <div className={styles.dateDivDiv}>
                        {monday.map((each: any) => {
                            return (
                                <div className={styles.eachDay}>
                                    <div className={styles.eachDayTitle}>
                                        [
                                        {each.type === "long" && "??????"}
                                        {each.type === "among" && "??????"}
                                        {each.type === "early" && "????????????"}
                                        {each.type === "add" && "????????????"}
                                        {each.type === "absent" && "??????"}
                                        ]
                                    </div>
                                    <div>
                                        <div>{each.type === "long" && `????????????`}</div>
                                        <div>{each.type === "long" && `${each.startHours}:${each.startMinutes < 10 ? "0" + each.startMinutes : each.startMinutes}`}</div>
                                        <div>{each.type === "among" && `????????????`}</div>
                                        <div>{each.type === "among" && `${each.startHours}:${each.startMinutes < 10 ? "0" + each.startMinutes : each.startMinutes}~${each.endHours}:${each.endMinutes < 10 ? "0" + each.endMinutes : each.endMinutes}`}</div>
                                        <div>{each.type === "early" && `????????????`}</div>
                                        <div>{each.type === "early" && `${each.endHours}??? ${each.endMinutes < 10 ? "0" + each.endMinutes : each.endMinutes}???`}</div>
                                        <div>{each.type === "add" && `??????????????????`}</div>
                                        <div>{each.type === "add" && `${each.startHours}:${each.startMinutes < 10 ? "0" + each.startMinutes : each.startMinutes}~${each.endHours}:${each.endMinutes < 10 ? "0" + each.endMinutes : each.endMinutes}`}</div>
                                    </div>
                                    <div>
                                        <div>{each.reason}</div>
                                    </div>
                                    <div>
                                        <button onClick={(e)=>{deleteOne(e, each.id, "monday")}} className={styles.button4} role="button">??????</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.dateDivDiv}>
                        {tuesday.map((each: any) => {
                            return (
                                <div className={styles.eachDay}>
                                    <div className={styles.eachDayTitle}>
                                        [
                                        {each.type === "long" && "??????"}
                                        {each.type === "among" && "??????"}
                                        {each.type === "early" && "????????????"}
                                        {each.type === "add" && "????????????"}
                                        {each.type === "absent" && "??????"}
                                        ]
                                    </div>
                                    <div>
                                        <div>{each.type === "long" && `????????????`}</div>
                                        <div>{each.type === "long" && `${each.startHours}:${each.startMinutes < 10 ? "0" + each.startMinutes : each.startMinutes}`}</div>
                                        <div>{each.type === "among" && `????????????`}</div>
                                        <div>{each.type === "among" && `${each.startHours}:${each.startMinutes < 10 ? "0" + each.startMinutes : each.startMinutes}~${each.endHours}:${each.endMinutes < 10 ? "0" + each.endMinutes : each.endMinutes}`}</div>
                                        <div>{each.type === "early" && `????????????`}</div>
                                        <div>{each.type === "early" && `${each.endHours}??? ${each.endMinutes < 10 ? "0" + each.endMinutes : each.endMinutes}???`}</div>
                                        <div>{each.type === "add" && `??????????????????`}</div>
                                        <div>{each.type === "add" && `${each.startHours}:${each.startMinutes < 10 ? "0" + each.startMinutes : each.startMinutes}~${each.endHours}:${each.endMinutes < 10 ? "0" + each.endMinutes : each.endMinutes}`}</div>
                                    </div>
                                    <div>
                                        <div>{each.reason}</div>
                                    </div>
                                    <div>
                                        <button onClick={(e)=>{deleteOne(e, each.id, "tuesday")}} className={styles.button4} role="button">??????</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.dateDivDiv}>
                        {wednesday.map((each: any) => {
                            return (
                                <div className={styles.eachDay}>
                                    <div className={styles.eachDayTitle}>
                                        [
                                        {each.type === "long" && "??????"}
                                        {each.type === "among" && "??????"}
                                        {each.type === "early" && "????????????"}
                                        {each.type === "add" && "????????????"}
                                        {each.type === "absent" && "??????"}
                                        ]
                                    </div>
                                    <div>
                                        <div>{each.type === "long" && `????????????`}</div>
                                        <div>{each.type === "long" && `${each.startHours}:${each.startMinutes < 10 ? "0" + each.startMinutes : each.startMinutes}`}</div>
                                        <div>{each.type === "among" && `????????????`}</div>
                                        <div>{each.type === "among" && `${each.startHours}:${each.startMinutes < 10 ? "0" + each.startMinutes : each.startMinutes}~${each.endHours}:${each.endMinutes < 10 ? "0" + each.endMinutes : each.endMinutes}`}</div>
                                        <div>{each.type === "early" && `????????????`}</div>
                                        <div>{each.type === "early" && `${each.endHours}??? ${each.endMinutes < 10 ? "0" + each.endMinutes : each.endMinutes}???`}</div>
                                        <div>{each.type === "add" && `??????????????????`}</div>
                                        <div>{each.type === "add" && `${each.startHours}:${each.startMinutes < 10 ? "0" + each.startMinutes : each.startMinutes}~${each.endHours}:${each.endMinutes < 10 ? "0" + each.endMinutes : each.endMinutes}`}</div>
                                    </div>
                                    <div>
                                        <div>{each.reason}</div>
                                    </div>
                                    <div>
                                        <button onClick={(e)=>{deleteOne(e, each.id, "wednesday")}} className={styles.button4} role="button">??????</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.dateDivDiv}>
                        {thursday.map((each: any) => {
                            return (
                                <div className={styles.eachDay}>
                                    <div className={styles.eachDayTitle}>
                                        [
                                        {each.type === "long" && "??????"}
                                        {each.type === "among" && "??????"}
                                        {each.type === "early" && "????????????"}
                                        {each.type === "add" && "????????????"}
                                        {each.type === "absent" && "??????"}
                                        ]
                                    </div>
                                    <div>
                                        <div>{each.type === "long" && `????????????`}</div>
                                        <div>{each.type === "long" && `${each.startHours}:${each.startMinutes < 10 ? "0" + each.startMinutes : each.startMinutes}`}</div>
                                        <div>{each.type === "among" && `????????????`}</div>
                                        <div>{each.type === "among" && `${each.startHours}:${each.startMinutes < 10 ? "0" + each.startMinutes : each.startMinutes}~${each.endHours}:${each.endMinutes < 10 ? "0" + each.endMinutes : each.endMinutes}`}</div>
                                        <div>{each.type === "early" && `????????????`}</div>
                                        <div>{each.type === "early" && `${each.endHours}??? ${each.endMinutes < 10 ? "0" + each.endMinutes : each.endMinutes}???`}</div>
                                        <div>{each.type === "add" && `??????????????????`}</div>
                                        <div>{each.type === "add" && `${each.startHours}:${each.startMinutes < 10 ? "0" + each.startMinutes : each.startMinutes}~${each.endHours}:${each.endMinutes < 10 ? "0" + each.endMinutes : each.endMinutes}`}</div>
                                    </div>
                                    <div>
                                        <div>{each.reason}</div>
                                    </div>
                                    <div>
                                        <button onClick={(e)=>{deleteOne(e, each.id, "thursday")}} className={styles.button4} role="button">??????</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.dateDivDiv}>
                        {friday.map((each: any) => {
                            return (
                                <div className={styles.eachDay}>
                                    <div className={styles.eachDayTitle}>
                                        [
                                        {each.type === "long" && "??????"}
                                        {each.type === "among" && "??????"}
                                        {each.type === "early" && "????????????"}
                                        {each.type === "add" && "????????????"}
                                        {each.type === "absent" && "??????"}
                                        ]
                                    </div>
                                    <div>
                                        <div>{each.type === "long" && `????????????`}</div>
                                        <div>{each.type === "long" && `${each.startHours}:${each.startMinutes < 10 ? "0" + each.startMinutes : each.startMinutes}`}</div>
                                        <div>{each.type === "among" && `????????????`}</div>
                                        <div>{each.type === "among" && `${each.startHours}:${each.startMinutes < 10 ? "0" + each.startMinutes : each.startMinutes}~${each.endHours}:${each.endMinutes < 10 ? "0" + each.endMinutes : each.endMinutes}`}</div>
                                        <div>{each.type === "early" && `????????????`}</div>
                                        <div>{each.type === "early" && `${each.endHours}??? ${each.endMinutes < 10 ? "0" + each.endMinutes : each.endMinutes}???`}</div>
                                        <div>{each.type === "add" && `??????????????????`}</div>
                                        <div>{each.type === "add" && `${each.startHours}:${each.startMinutes < 10 ? "0" + each.startMinutes : each.startMinutes}~${each.endHours}:${each.endMinutes < 10 ? "0" + each.endMinutes : each.endMinutes}`}</div>
                                    </div>
                                    <div>
                                        <div>{each.reason}</div>
                                    </div>
                                    <div>
                                        <button onClick={(e)=>{deleteOne(e, each.id, "friday")}} className={styles.button4} role="button">??????</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.dateDivDiv}>
                        {saturday.map((each: any) => {
                            return (
                                <div className={styles.eachDay}>
                                    <div className={styles.eachDayTitle}>
                                        [
                                        {each.type === "long" && "??????"}
                                        {each.type === "among" && "??????"}
                                        {each.type === "early" && "????????????"}
                                        {each.type === "add" && "????????????"}
                                        {each.type === "absent" && "??????"}
                                        ]
                                    </div>
                                    <div>
                                        <div>{each.type === "long" && `????????????`}</div>
                                        <div>{each.type === "long" && `${each.startHours}:${each.startMinutes < 10 ? "0" + each.startMinutes : each.startMinutes}`}</div>
                                        <div>{each.type === "among" && `????????????`}</div>
                                        <div>{each.type === "among" && `${each.startHours}:${each.startMinutes < 10 ? "0" + each.startMinutes : each.startMinutes}~${each.endHours}:${each.endMinutes < 10 ? "0" + each.endMinutes : each.endMinutes}`}</div>
                                        <div>{each.type === "early" && `????????????`}</div>
                                        <div>{each.type === "early" && `${each.endHours}??? ${each.endMinutes < 10 ? "0" + each.endMinutes : each.endMinutes}???`}</div>
                                        <div>{each.type === "add" && `??????????????????`}</div>
                                        <div>{each.type === "add" && `${each.startHours}:${each.startMinutes < 10 ? "0" + each.startMinutes : each.startMinutes}~${each.endHours}:${each.endMinutes < 10 ? "0" + each.endMinutes : each.endMinutes}`}</div>
                                    </div>
                                    <div>
                                        <div>{each.reason}</div>
                                    </div>
                                    <div>
                                        <button onClick={(e)=>{deleteOne(e, each.id, "saturday")}} className={styles.button4} role="button">??????</button>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                    <div className={styles.dateDivDiv}>
                        {sunday.map((each: any) => {
                            return (
                                <div className={styles.eachDay}>
                                    <div className={styles.eachDayTitle}>
                                        [
                                        {each.type === "long" && "??????"}
                                        {each.type === "among" && "??????"}
                                        {each.type === "early" && "????????????"}
                                        {each.type === "add" && "????????????"}
                                        {each.type === "absent" && "??????"}
                                        ]
                                    </div>
                                    <div>
                                        <div>{each.type === "long" && `????????????`}</div>
                                        <div>{each.type === "long" && `${each.startHours}:${each.startMinutes < 10 ? "0" + each.startMinutes : each.startMinutes}`}</div>
                                        <div>{each.type === "among" && `????????????`}</div>
                                        <div>{each.type === "among" && `${each.startHours}:${each.startMinutes < 10 ? "0" + each.startMinutes : each.startMinutes}~${each.endHours}:${each.endMinutes < 10 ? "0" + each.endMinutes : each.endMinutes}`}</div>
                                        <div>{each.type === "early" && `????????????`}</div>
                                        <div>{each.type === "early" && `${each.endHours}??? ${each.endMinutes < 10 ? "0" + each.endMinutes : each.endMinutes}???`}</div>
                                        <div>{each.type === "add" && `??????????????????`}</div>
                                        <div>{each.type === "add" && `${each.startHours}:${each.startMinutes < 10 ? "0" + each.startMinutes : each.startMinutes}~${each.endHours}:${each.endMinutes < 10 ? "0" + each.endMinutes : each.endMinutes}`}</div>
                                    </div>
                                    <div>
                                        <div>{each.reason}</div>
                                    </div>
                                    <div>
                                        <button onClick={(e)=>{deleteOne(e, each.id, "sunday")}} className={styles.button4} role="button">??????</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className={styles.calendarDescription}>
                {/* <div>*?????? ????????????</div>
                <div>???~??? : 9:00 ~ 22:00, ???~??? : ????????????</div> */}
            </div>

            <div className={styles.title}>
                <img src="img/off/edit.svg" alt="calendar" /> ???????????? ?????? {props.name ? "- " + props.name : ""}
            </div>

            <div className={styles.form}>

                
                <div className={styles.daySelectDiv}>
                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">??????</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={kindValue}
                            onChange={(e) => { change(e, "kind") }}
                            autoWidth
                            label="??????"
                        >
                            <MenuItem value="long">
                                <span className={styles.dayText}>??????</span>
                            </MenuItem>
                            <MenuItem value="among"><span className={styles.dayText}>??????</span></MenuItem>
                            <MenuItem value="early"><span className={styles.dayText}>?????? ??????</span></MenuItem>
                            <MenuItem value="absent"><span className={styles.dayText}>??????</span></MenuItem>
                            <MenuItem value="add"><span className={styles.dayText}>???????????? ??????</span></MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className={styles.datetimepicker}>
                    <div className={styles.daySelectDiv}>
                        <div className={styles.startTimeTitle}>??????</div>
                        <FormControl sx={{ m: 1, minWidth: 300 }}>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={dayValue}
                                onChange={(e) => { change(e, "day") }}
                                autoWidth
                            >
                                <MenuItem value="1">
                                    <span className={styles.dayText}>?????????</span>
                                </MenuItem>
                                <MenuItem value="2"><span className={styles.dayText}>?????????</span></MenuItem>
                                <MenuItem value="3"><span className={styles.dayText}>?????????</span></MenuItem>
                                <MenuItem value="4"><span className={styles.dayText}>?????????</span></MenuItem>
                                <MenuItem value="5"><span className={styles.dayText}>?????????</span></MenuItem>
                                <MenuItem value="6"><span className={styles.dayText}>?????????</span></MenuItem>
                                <MenuItem value="0"><span className={styles.dayText}>?????????</span></MenuItem>

                            </Select>
                        </FormControl>
                    </div>

                    {(kindValue === "long" || kindValue === "among" || kindValue == "add") &&
                        <div className={styles.startTimeDiv}>
                            <div className={styles.startTimeTitle}>{(kindValue === "long" || kindValue === "add") && "????????????"}{kindValue === "among" && "????????????"}</div>
                            <LocalizationProvider locale={koLocale} dateAdapter={AdapterDateFns}>
                                <TimePicker
                                    value={startValue}
                                    onChange={(newValue: any) => {
                                        change(newValue, "startTime");
                                    }}
                                    renderInput={(params) => <TextField sx={{ minWidth: 300, ml: 1, mt: 1 }} {...params}>????????????</TextField>}
                                />
                            </LocalizationProvider>
                        </div>
                    }
                    {(kindValue === "early" || kindValue === "among" || kindValue == "add") &&
                        <div className={styles.startTimeDiv}>
                            <div className={styles.startTimeTitle}>{(kindValue === "early" || kindValue === "add") && "????????????"}{kindValue === "among" && "????????????"}</div>
                            <LocalizationProvider locale={koLocale} dateAdapter={AdapterDateFns}>
                                <TimePicker
                                    value={exitValue}
                                    onChange={(newValue: any) => {
                                        change(newValue, "exitTime");
                                    }}
                                    renderInput={(params) => <TextField sx={{ minWidth: 300, ml: 1, mt: 1 }} {...params}>????????????</TextField>}
                                />
                            </LocalizationProvider>
                        </div>
                    }
                </div>


                <div className={styles.daySelectDiv}>
                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">????????????</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={expireValue}
                            onChange={(e) => { change(e, "expire") }}
                            autoWidth
                            label="????????????"
                        >
                            <MenuItem value="730"><span className={styles.dayText}>??????</span></MenuItem>
                            <MenuItem value="7"><span className={styles.dayText}>1???</span></MenuItem>
                            <MenuItem value="14"><span className={styles.dayText}>2???</span></MenuItem>
                            <MenuItem value="21"><span className={styles.dayText}>3???</span></MenuItem>
                            <MenuItem value="28"><span className={styles.dayText}>4???</span></MenuItem>
                            <MenuItem value="35"><span className={styles.dayText}>5???</span></MenuItem>
                            <MenuItem value="42"><span className={styles.dayText}>6???</span></MenuItem>
                            <MenuItem value="56"><span className={styles.dayText}>8???</span></MenuItem>
                            <MenuItem value="84"><span className={styles.dayText}>12???</span></MenuItem>
                            <MenuItem value="112"><span className={styles.dayText}>16???</span></MenuItem>

                        </Select>
                    </FormControl>
                </div>

                <div className={styles.reasonDiv}>
                    <TextField value={reason} onChange={(e) => { change(e, "reason") }} fullWidth id="outlined-basic" label="??????" variant="outlined" />
                </div>

                {
                    uploadLoading &&
                    <div className={styles.uploadLoading}>
                        <LinearProgress />
                    </div>
                }

                {
                    isUpload &&
                    <div className={styles.isUpload}>
                        <Alert severity="info">????????? ??????!</Alert>
                    </div>
                }

                {uploadBool ?
                    <div onClick={submit} className={styles.submitBtn}>
                        ?????????
                    </div>
                    :
                    <div className={styles.disabledChargedBtn}>
                        ?????????
                    </div>
                }
            </div>



        </div >
    )
}

export default RegularSchedule;