import { withStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import "../componentsStyle/edit.css";
// import styles from "../componentsStyle/editStyles";
import TextField from "@mui/material/TextField";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import TimePicker from '@mui/lab/TimePicker'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress'
import { Alert, Stack } from '@mui/material';
import koLocale from 'date-fns/locale/ko'
import Totaledits from './controls/totaledits';


type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface editProps extends RouteComponentProps {
    activateMenuList: (curret: currentSideBarMenuList) => void;
    // classes: any;
    user : {name: string;
        value: "student" | "teacher" | "parent" | "staff";
        id: number;} | undefined | null
}


const Edit: React.FC<editProps> = (props) => {
    // const classes = props.classes;
    const date = new Date();
    date.setDate(date.getDate() + 1);
    const minDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const [select, setSelect] = useState("submit");

    const [loading, setLoading] = useState(false);
    const [uploadBool, setUploadBool] = useState(false);

    const [currentMenu, setCurrentMenu] = useState("long");

    const [noRemain, setNoremain] = useState(false);
    const [remain, setRemain] = useState(0);
    const exitArriveDefaultDate = new Date(2021, 11, 8, 9);
    const [dateValue, setDateValue] = useState(date);
    const [exitValue, setExitValue] = useState(exitArriveDefaultDate);
    const [arriveValue, setArriveValue] = useState(exitArriveDefaultDate);
    const [description, setDescription] = useState("");

    const [checkResult, setCheckResult] = useState<any>();



    useEffect(() => {
        props.activateMenuList("edit");
    }, []);

    useEffect(() => {
        async function start() {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/edit/remain", {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);
                        if (result.message > 3) {
                            result.message = 3;
                        }
                        setRemain(3 - result.message);
                    })
            })
        }
        start();
    }, [uploadBool, checkResult])


    const changeSelect = (event: any, menu: string) => {
        switch (menu) {
            case "submit": setSelect("submit"); break;
            case "check": setSelect("check"); break;
            case "total" : setSelect("total");
        }
    }

    const menuChange = (event: any, type: string) => {
        switch (type) {
            case 'long': setCurrentMenu("long"); break;
            case 'absent': setCurrentMenu('absent'); break;
            case 'early': setCurrentMenu("early"); break;
            case 'among': setCurrentMenu('among');
        }
    }

    const submit = async (e: any) => {
        // if (description === "" || description === "구체적인 사유를 적어주세요.") {
        //     alert("사유를 적은 후에 제출 부탁드립니다 : )");
        //     return;
        // }
        if (remain < 1) {
            setNoremain(true);
            return;
        }

        setLoading(true);
        var dateInfo = new Date(dateValue);
        const year = dateInfo.getFullYear();
        const month = dateInfo.getMonth() + 1;
        const date = dateInfo.getDate();
        var exitInfo = new Date(exitValue);
        var exitHours = exitInfo.getHours();
        var exitMinutes = exitInfo.getMinutes();
        var arriveInfo = new Date(arriveValue);
        var arriveHours = arriveInfo.getHours();
        var arriveMinutes = arriveInfo.getMinutes();

        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/edit/reason", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": token },
            credentials: "include",
            body: JSON.stringify({
                type: currentMenu,
                year: year,
                month: month,
                date: date,
                exitHours: exitHours,
                exitMinutes: exitMinutes,
                arriveHours: arriveHours,
                arriveMinutes: arriveMinutes,
                description: description
            })
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    setLoading(false);
                    console.log(result);
                    if (result.message === "success") {
                        setUploadBool(true);
                    }
                })
        })
    }


    useEffect(() => {
        async function start() {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/edit/check", {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);
                        setCheckResult(result.message)
                    })
            })
        }
        setTimeout(() => {
            start();
        }, 500)
    }, [uploadBool])




    const cancel = async (e: any) => {
        console.log(e.target.dataset.id);

        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/edit/delete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "Authorization": token },
            credentials: "include",
            body: JSON.stringify({
                id: e.target.dataset.id
            })
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    if (result.message === "success") {
                        setCheckResult(
                            checkResult.filter((each: any) => each.id != e.target.dataset.id)
                        )
                    }
                })
        })
    }


    return (
        <div className="main2">
            <div>
                <div className="title"><img className="editImage" src="img/edit.svg" alt="edit"></img>지각/결석 사유 제출</div>
            </div>
            <div className="menu">
                <div className="submenu">
                    <div className={`menu_status ${select === "submit" ? "active" : ""}`} onClick={(e) => { changeSelect(e, "submit") }}>
                        # 지각/결석 날짜 선택
                    </div>
                    <div className={`menu_status ${select === "check" ? "active" : ""}`} onClick={(e) => { changeSelect(e, "check") }}>
                        내 사유 제출 현황
                    </div>
                    {
                        (props.user && props.user.value) &&
                        <div className={`menu_status ${select === "total" ? "active" : ""}`} onClick={(e) => { changeSelect(e, "total") }}>
                            전체 제출 현황
                        </div>
                    }
                </div>
                <div className="remain">
                    # 잔여 횟수 - <span>{remain}</span>회
                </div>
            </div>


            {select === "submit" &&
                <div className="wrap">

                    <LocalizationProvider locale={koLocale} dateAdapter={AdapterDateFns}>
                        <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            openTo="day"
                            value={dateValue}
                            disablePast
                            minDate={minDate}
                            onChange={(newValue: any) => {
                                console.log(newValue);
                                setDateValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>

                    <div className="select">
                        <div className="selectTitle">
                            <div className={`selectmenu ${currentMenu === "long" ? "active" : ""}`} onClick={(e) => { menuChange(e, "long") }}>
                                #지각
                            </div>
                            <div className={`selectmenu ${currentMenu === "absent" ? "active" : ""}`} onClick={(e) => { menuChange(e, "absent") }}>
                                #결석
                            </div>
                            <div className={`selectmenu ${currentMenu === "early" ? "active" : ""}`} onClick={(e) => { menuChange(e, "early") }}>
                                #조기하원
                            </div>
                            <div className={`selectmenu ${currentMenu === "among" ? "active" : ""}`} onClick={(e) => { menuChange(e, "among") }}>
                                #외출
                            </div>
                        </div>

                        <div className="timePicker">

                            {(currentMenu === "early" || currentMenu === "among") &&
                                <div className="timePickerExit">
                                    <div className="timePickerExitTitle">
                                        학원 나가는 시간
                                    </div>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <TimePicker
                                            value={exitValue}
                                            onChange={(newValue: any) => {
                                                console.log(newValue);
                                                setExitValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                            }

                            {(currentMenu === "long" || currentMenu === "among") &&
                                <div className="timePickerArrive">
                                    <div className="timePickerArriveTitle">
                                        학원 도착 시간
                                    </div>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <TimePicker
                                            value={arriveValue}
                                            onChange={(newValue: any) => {
                                                console.log(newValue);
                                                setArriveValue(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                            }

                        </div>



                    </div>
                    <div className="description">
                        <div className="descriptionTitle">
                            지각/결석 사유
                        </div>
                        <div className="descriptionWrite">
                            <TextField
                                id="filled-multiline-static"
                                multiline
                                rows={8}
                                defaultValue="구체적인 사유를 적어주세요."
                                variant="filled"
                                fullWidth
                                onChange={(e) => { setDescription(e.target.value); }}
                            />
                        </div>
                    </div>
                </div>}

            {(noRemain && select === "submit") &&
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error" sx={{ marginTop: 2, marginBottom: 2 }}><span>잔여 횟수가 없습니다.</span></Alert>
                </Stack>
            }

            {(loading && select === "submit") &&
                <Box sx={{ width: '100%', marginTop: 3, marginBottom: 3 }}>
                    <LinearProgress />
                </Box>
            }

            {(uploadBool && select === "submit") &&
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="info" sx={{ marginTop: 2, marginBottom: 2 }}><span>업로드 성공 !</span></Alert>
                </Stack>
            }

            {select === "submit" &&
                <div className="submitDiv">
                    <div className="submit" onClick={submit}>
                        제출하기
                        <img src="img/navigate_next.svg" alt="right"></img>
                    </div>
                </div>
            }

            {select === "check" &&
                <div className="checkBoard">
                    <div className="checkBoardTitle">
                        이번달 사유 제출 현황
                    </div>
                    {
                        checkResult && checkResult.map((each: { id: number, type: string, targetDate: string, reason: string, startHours: number, startMinutes: number, endHours: number, endMinutes: number }) => {
                            const date = new Date(each.targetDate);
                            const currentDate = new Date();
                            const bool = currentDate.getTime() < date.getTime();
                            var description;
                            switch (each.type) {
                                case "long": description = "지각"; break;
                                case "early": description = "조기하원"; break;
                                case "among": description = "외출"; break;
                                case "absent": description = "결석"; break;
                            }

                            return (
                                <div key={each.id} className="checklist" data-id={each.id}>
                                    <div className="checklistTitle">
                                        <div className="checklistTitle_1">
                                            <div className="date">
                                                {`${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`}
                                            </div>
                                            <div>
                                                <span>[{description}] </span>
                                                <span>
                                                    {each.type === "long" && `${each.startHours > 11 ? "오후" : "오전"} ${each.startHours > 12 ? each.startHours - 12 : each.startHours}시 ${each.startMinutes.toString().length === 1 ? "0"+each.startMinutes : each.startMinutes}분 도착`}
                                                    {each.type === "early" && `${each.endHours > 11 ? "오후" : "오전"} ${each.endHours > 12 ? each.endHours - 12 : each.endHours}시 ${each.endMinutes.toString().length === 1 ? "0"+each.endMinutes : each.endMinutes}분 하원`}
                                                    {each.type === "among" && `${each.endHours > 11 ? "오후" : "오전"}  ${each.startHours > 12 ? each.startHours - 12 : each.startHours}시 ${each.startMinutes.toString().length === 1 ? "0"+each.startMinutes : each.startMinutes}분 외출 -
                                                    ${each.endHours > 11 ? "오후" : "오전"} ${each.endHours > 12 ? each.endHours - 12 : each.endHours}시 ${each.endMinutes.toString().length === 1 ? "0"+each.endMinutes : each.endMinutes}분 복귀
                                                    `
                                                    
                                                    }

                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {bool ?
                                        <div className="cancel" onClick={cancel} data-id={each.id}>
                                            취소하기
                                        </div>
                                        :
                                        <div>
                                        </div>
                                    }

                                </div>
                            );
                        })
                    }

                </div>}

                {
                    select === "total" && 
                    <Totaledits />
                }


        </div>
    )
}

export default Edit;