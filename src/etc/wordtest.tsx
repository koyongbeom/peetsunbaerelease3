import React, { useEffect, useState } from "react";
import styles from "./wordtest.module.css";
import { ReactComponent as LogoSvg } from '../svg/newlogowhite.svg';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



const WordTest: React.FC<any> = (props) => {


    const dayList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 34, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
    const [check, setCheck] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
    const [userName, setUserName] = useState("");
    const [testRecord, setTestRecord] = useState<any>();

    useEffect(() => {
        fetch("https://peetsunbae.com/dashboard/words/userinfo", {
            method: "GET",
            credentials: "include"
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    if (result.message === "success") {
                        setUserName(result.data.name);
                        setTestRecord(result.record);
                    }
                })
        })
    }, [])


    //로그아웃 시키는 기능-----------------------------------------------------
    const logOut = async () => {
        //일렉트론 이라면 저장된 토큰 삭제-----------------------------------------------------
        if (window.electron) {
            const result = await window.electron.sendMessageApi.setToken("logOut");
            console.log(result);
        }

        // ipcRenderer.send("signOut");

        //-----------------------------------------------------------------------

        //쿠키 삭제 위해 서버로 fetch 보냄-----------------------------------------
        fetch("https://peetsunbae.com/login/logout", {
            method: "GET",
            credentials: "include"
        }).then((response) => {
            response.json()
                .then((result) => {
                    console.log(result);
                    props.history.push({
                        pathname: "/login2",
                        state: { from: "dashboard" }
                    });
                })
        }).catch((err) => {
            console.log(err);
        })
        //--------------------------------------------------------------------------

        //-------------------------------------------------------------------
    }
    //-----------------------------------------------------------------------


    const handleCheck = (event: any, index: number) => {
        const newCheck = check;

        if (index % 2 === 0) {
            if (event.target.checked === true && newCheck[index + 1] === true) {
                newCheck[index + 1] = false;
            }
        } else {
            if (event.target.checked === true && newCheck[index - 1] === true) {
                newCheck[index - 1] = false;
            }
        }


        newCheck[index] = event.target.checked;
        setCheck([...newCheck]);

    }

    const start = (e: any) => {
        const currentCheck = check;
        var count = 0;

        currentCheck.forEach((each: any) => {
            if (each === true) {
                count++;
            }
        });

        if (count === 0) {
            alert("시험 볼 DAY를 선택하신 후 시작하세요");
            return;
        }

        props.history.push({
            pathname: "/wordtestreal",
            state: { check: check, userName: userName }
        });

    }



    return (
        <div>

            <div className={`${styles.appBar} ${styles.notablet}`}>
                <div className={styles.logoDiv}>
                    <LogoSvg className={styles.logoSvg} />
                </div>
                <div className={styles.profileDiv}>
                    <div className={styles.profileConfig} style={{ cursor: "auto" }}>
                        {userName}
                    </div>
                    <div className={styles.avatarCircle} onClick={logOut}>
                        <img className={styles.avatar} src="img/avatarG.svg" alt="avatar"></img>
                    </div>
                    <div className={styles.logout} onClick={logOut}>
                        로그아웃
                    </div>
                </div>
            </div>

            <div className={styles.main}>
                <div className={styles.title}>
                    {userName}님 환영합니다<br></br>영어 단어 테스트를<br></br>시작할게요.
                </div>
                <div className={styles.subTitle}>
                    아래 표에서 원하는<br></br>시험 범위를 선택해주세요.
                </div>
            </div>

            <div className={styles.tableDiv}>
                <div className={styles.tableTop}>
                    <div className={styles.col_1}>
                        범위
                    </div>
                    <div className={styles.col_4}>
                        시험 볼 단어 선택
                    </div>
                    <div className={styles.col_2}>
                        마지막 테스트
                    </div>
                    <div className={styles.col_3}>
                        틀린 단어 갯수
                    </div>

                </div>
                {
                    dayList.map((eachDay: any, index: number) => {

                        const number = index + 1;
                        var count = 0;

                        var dateString: any;
                        var testKind: any;
                        var incorrectWordsCunt : any;

                        if (testRecord) {
                            testRecord.forEach((eachRecord: any, recordIndex: number) => {
                                if (eachRecord.day === eachDay) {
                                    count++;
                                    const date = new Date(eachRecord.createdAt);
                                    dateString = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
                                    testKind = eachRecord.isTotal ? "전체 단어" : "틀린 단어만";
                                    dateString = dateString + "(" + testKind + ")"
                                    incorrectWordsCunt = eachRecord.count + "개"
                                }
                            })
                        }

                        return (
                            <div key={index} className={styles.rowDiv}>
                                <div className={styles.col_1}>
                                    Day {eachDay}
                                </div>
                                <div className={styles.col_4}>
                                    <FormGroup>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <FormControlLabel control={<Checkbox checked={check[(number * 2) - 2]} onChange={(e: any) => { handleCheck(e, (number * 2) - 2) }} />} label={<span style={{ fontFamily: "Apple_R", marginRight: "16px" }}>전체 단어</span>} />
                                            <FormControlLabel disabled={(count === 0 || incorrectWordsCunt === "0개") ? true : false} control={<Checkbox checked={check[(number * 2) - 1]} onChange={(e: any) => { handleCheck(e, (number * 2) - 1) }} />} label={<span style={{ fontFamily: "Apple_R" }}>틀린 단어만</span>} />
                                        </div>
                                    </FormGroup>
                                </div>
                                <div className={styles.col_2}>
                                    {
                                        count ?
                                            dateString : "-"
                                    }
                                </div>
                                <div className={styles.col_3}>
                                    {
                                        count ?
                                            incorrectWordsCunt : "-"
                                    }
                                </div>

                            </div>
                        );
                    })
                }
            </div>

            <div onClick={start} className={styles.startBtn}>
                테스트 시작
            </div>
        </div>
    )
}

export default WordTest;