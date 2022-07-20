import React, { useEffect, useState } from "react";
import { RouteComponentProps } from 'react-router';
import styles from "../componentsStyle/text.module.css";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { Link } from 'react-router-dom';

import Checkbox from '@mui/material/Checkbox';
import { LinearProgress } from "@mui/material";

import Switch from '@mui/material/Switch';
import EachdayTest from "./controls/eachdaytest";

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const label2 = { inputProps: { 'aria-label': 'Switch demo' } }

type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고" | "text";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

// interface textProps extends RouteComponentProps {
//     activateMenuList: any;
//     user: any;
// }

const Text: React.FC<any> = (props) => {

    const [selectMenu, setSelectMenu] = useState("total");
    const [index, setIndex] = useState(1);
    const [indexChangeable, setIndexChangeable] = useState(true);

    const [dayInfo, setDayInfo] = useState<any>();
    const [lastReport, setLastReport] = useState<any>();

    const [correctNumber, setCorrectNumber] = useState<any>(0);
    const [incorrectNumber, setIncorrectNumber] = useState<any>(0);
    const [createdAt, setCreatedAt] = useState<any>();

    const [loading, setLoading] = useState(false);

    const [meaningSwitch, setMeaningSwitch] = useState(true);

    const [display, setDisplay] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);

    const [userValue, setUserValue] = useState();

    const [users, setUsers] = useState<any>();

    const [selectedUser, setSelectedUser] = useState<any>();



    useEffect(() => {
        props.activateMenuList("chart");

        setLoading(true);
        console.log("---------");
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
                        result.data.forEach((each: any, index: number) => {
                            var data: any = {};
                            data.id = each.id;
                            data.label = each.name;
                            data.phoneNumber = each.phoneNumber;
                            data.value = each.value;
                            data.key = index;
                            rows.push(data);
                        })
                        setUsers([...rows]);
                        setLoading(false);

                    })
            })
        }

        start();

    }, [])



    const changeSelectedMenu = (e: any, kind: string) => {
        setSelectMenu(kind);
    }

    const onchange = (e: any, value: any) => {
        console.log(value);
        setIndex(1);
        setSelectedUser(value);
    }

    useEffect(() => {
        if (!props.chart) {
            props.activateMenuList("text");
        }
    }, []);

    useEffect(() => {
        if (props.chart) {
            setSelectedUser(props.selectedUser);
        }
    }, []);

    useEffect(() => {

        if (props.user) {
            setUserValue(props.user.value);
        }

        var studentId = 0;

        if (selectedUser && props.user && props.user.value === "teacher") {
            studentId = selectedUser.id;
            if (studentId === 0) {
                return;
            }
        }

        setDisplay([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);

        setLoading(true);


        if (selectMenu === "total") {
            fetch("https://peetsunbae.com/dashboard/words/gettotal?index=" + index + "&studentId=" + studentId, {
                method: "GET",
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);
                        if (result.data && result.data.length > 0) {

                            result.data[0].report.sort(function (a: any, b: any) {
                                if (a.result === "correct" && b.result === "incorrect") {
                                    return 1;
                                } else if (a.result === "incorrect" && b.result === "correct") {
                                    return -1;
                                } else {
                                    return 1;
                                }
                            })

                            setLastReport(result.data[0].report);
                            setDayInfo(result.data[0].dayInfo);
                            setCreatedAt(result.data[0].createdAt);

                            var totalCorrectCount = 0;
                            var totalIncorrectCount = 0;

                            result.data[0].report.forEach((each: any) => {
                                if (each.result === "correct") {
                                    totalCorrectCount++;
                                } else if (each.result === "incorrect") {
                                    totalIncorrectCount++;
                                }
                            });

                            setCorrectNumber(totalCorrectCount);
                            setIncorrectNumber(totalIncorrectCount);
                            setIndexChangeable(true);

                        } else {
                            setLastReport("");
                            setDayInfo("");
                            setCreatedAt("")
                            setCorrectNumber("");
                            setIncorrectNumber("");
                            setIndexChangeable(false);
                        }
                        setLoading(false);
                    })
            })
        } else if (selectMenu === "day") {

        }

    }, [selectMenu, index, props.user, selectedUser])

    const plus = (e: any) => {
        if (indexChangeable) {
            setIndex(index + 1);
        }
    }

    const minus = (e: any) => {
        if (index > 1) {
            setIndex(index - 1);
        }
    }

    const handleCheckChange = (e: any, index: number) => {

        // var newLastReport: any;

        // if (e.target.checked) {
        //     newLastReport = lastReport;
        //     newLastReport[index].result = "incorrect";
        //     setLastReport([...newLastReport]);
        //     console.log(newLastReport);
        // } else {
        //     newLastReport = lastReport;
        //     newLastReport[index].result = "correct";
        //     setLastReport([...newLastReport]);
        //     console.log(newLastReport);
        // }

        // var totalCorrectCount = 0;
        // var totalIncorrectCount = 0;

        // newLastReport.forEach((each: any) => {
        //     if (each.result === "correct") {
        //         totalCorrectCount++;
        //     } else if (each.result === "incorrect") {
        //         totalIncorrectCount++;
        //     }
        // })

        // setCorrectNumber(totalCorrectCount);
        // setIncorrectNumber(totalIncorrectCount);

    }

    const save = (e: any) => {
        console.log(lastReport);
        setLoading(!loading);

        fetch("https://peetsunbae.com/dashboard/words/save", {
            method: "POST",
            credentials: "include",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                data: JSON.stringify(lastReport),
                dayInfo: dayInfo
            })
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    if (result.message === "success") {
                        setLoading(false);

                        if (window.confirm("저장이 완료되었습니다. 메뉴로 돌아갈까요?")) {
                            console.log("yes");
                        } else {
                            console.log("no");
                        }
                    }
                })
        })
    }

    const switchChange = (e: any) => {
        setDisplay([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
        setMeaningSwitch(e.target.checked);
    }

    const show = (e: any, index: number, choice: boolean) => {
        const newDisplay = display;
        newDisplay[index] = choice;
        setDisplay([...newDisplay]);
    }

    return (
        <div className={`${styles.main} ${props.chart ? styles.chartMain : ""}`}>
            <div className={styles.title}>
                <div><img className={styles.clock} src="img/off/text.svg" alt="alarm" />영단어 시험 결과</div>
            </div>


            <div className="selectMenu" style={{ justifyContent: "flex-start" }}>
                <div onClick={(e) => { changeSelectedMenu(e, "total") }} className={`selectedMenu ${selectMenu === "total" ? "active" : ""}`}>
                    시험별로 보기
                </div>
                <div onClick={(e) => { changeSelectedMenu(e, "day") }} className={`selectedMenu ${selectMenu === "day" ? "active" : ""}`}>
                    Day별로 보기
                </div>
            </div>

            {
                (userValue === "teacher" && !props.chart) &&
                <div className={styles.studentSelectDiv}>
                    <div className={styles.selectStudentText}>
                        학생선택
                    </div>
                    <div className={styles.autocompleteDiv}>
                        <Autocomplete
                            onChange={onchange}
                            disablePortal
                            id="combo-box-demo"
                            options={users}
                            sx={{ width: 226 }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </div>
                </div>
            }

            {
                selectMenu === "total" &&
                <div className={`${styles.paperBackground} ${props.user && props.user.value === "teacher" ? styles.noMargin : ""}`}>
                    <div>
                        <div className={styles.resultTitle}>
                            <div onClick={plus} style={{ display: "flex", alignItems: "center" }}>
                                <img className={styles.chevron} src="img/chevron-left-light.svg" />
                            </div>
                            <div>
                                단어테스트 결과지{
                                    createdAt &&
                                    `(${new Date(createdAt).getFullYear()}-${new Date(createdAt).getMonth() + 1}-${new Date(createdAt).getDate()})`
                                }
                            </div>
                            <div onClick={minus} style={{ display: "flex", alignItems: "center" }}>
                                <img className={styles.chevron} src="img/chevron-right-light.svg" />
                            </div>
                        </div>

                        <div className={styles.resultNumberDiv}>

                            {
                                loading &&
                                <div style={{ width: "970px", margin: "0 auto" }}>
                                    <LinearProgress />
                                </div>

                            }
                            <div className={styles.titleDiv}>
                                {
                                    dayInfo && dayInfo.map((each: any, index: number) => {
                                        return (
                                            <div key={index} className={styles.dayList}>
                                                {each.dayNumber}일차 ({each.isTotal ? "모든 단어" : "틀린 단어"}){index !== dayInfo.length - 1 ? " /" : ""}
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div className={styles.resultNumber}>
                                정답 &nbsp;&nbsp;<span className={styles.correctNumber}>{correctNumber}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;오답&nbsp;&nbsp; <span className={styles.incorrectNumber}>{incorrectNumber}</span>
                            </div>
                        </div>

                        <div className={styles.resultReportDiv}>
                            <div className={styles.resultReportTitle}>
                                <div>
                                    단어 리스트
                                </div>
                                <div>
                                    <Switch checked={meaningSwitch} onChange={switchChange} {...label2} />
                                </div>
                            </div>
                            <div className={styles.resultReportWordsDiv}>
                                <div className={styles.resultReportWordsHeader}>
                                    <div className={styles.reportcol_1}>
                                        오답여부
                                    </div>
                                    <div className={styles.reportcol_2}>
                                        범위
                                    </div>
                                    <div className={styles.reportcol_3}>
                                        단어
                                    </div>
                                    <div className={styles.reportcol_4}>
                                        정답
                                    </div>
                                    <div className={styles.reportcol_5}>
                                        내가 쓴 답
                                    </div>
                                    {/* <div className={styles.reportcol_6}>
                                    소요 시간
                                </div> */}
                                </div>
                                {
                                    lastReport &&
                                    lastReport.map((each: any, index: number) => {
                                        return (
                                            <div key={each.id} className={`${styles.resultReportWordsBody} ${each.result === "incorrect" ? styles.incorrect : ""}`}>
                                                <div className={styles.reportcol_1}>

                                                    <Checkbox
                                                        {...label}
                                                        checked={each.result === "incorrect"}
                                                        onChange={(e: any) => { handleCheckChange(e, index) }}
                                                        sx={{
                                                            color: "#ddd",
                                                            '&.Mui-checked': {
                                                                color: "#d14e4e",
                                                            },
                                                        }}
                                                    />
                                                </div>
                                                <div className={styles.reportcol_2}>
                                                    Day {each.day}
                                                </div>
                                                <div className={styles.reportcol_3}>
                                                    {each.word}
                                                </div>
                                                <div className={styles.reportcol_4}>
                                                    {
                                                        (!meaningSwitch && !display[index]) &&
                                                        <img onClick={(e: any) => { show(e, index, true) }} className={styles.eye} src="img/eye-slash-light.svg" />
                                                    }
                                                    {
                                                        (!meaningSwitch && display[index]) &&
                                                        <img onClick={(e: any) => { show(e, index, false) }} className={styles.eye} src="img/eye-light.svg" />
                                                    }
                                                    {
                                                        meaningSwitch &&
                                                        each.meaning
                                                    }
                                                    {
                                                        (!meaningSwitch && display[index]) &&
                                                        each.meaning
                                                    }
                                                </div>
                                                <div className={styles.reportcol_5}>
                                                    {
                                                        meaningSwitch &&
                                                        each.answer
                                                    }
                                                    {
                                                        (!meaningSwitch && display[index]) &&
                                                        each.answer
                                                    }
                                                </div>
                                            </div>
                                        );
                                    })
                                }


                            </div>
                        </div>

                        {/* <div onClick={save} className={`${styles.startBtn2}`}>
                        저장하기
                    </div> */}
                    </div>
                </div>
            }
            {
                selectMenu === "day" &&
                <EachdayTest selectedUser={selectedUser} user={props.user} />
            }


            <Link to="/wordtest">
                <div className="qnaWrite">
                    <img src="./img/pencil.svg" alt="pencil" />
                    시험보러 가기
                </div>
            </Link>


        </div>
    );
}

export default Text;