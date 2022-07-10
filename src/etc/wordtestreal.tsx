import React, { useState, useEffect, useRef } from "react";
import styles from "./wordtest.module.css";
import { ReactComponent as LogoSvg } from '../svg/newlogowhite.svg';

import CircularProgress from '@mui/material/CircularProgress';

import Checkbox from '@mui/material/Checkbox';

import { eachHourOfInterval } from "date-fns";


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

var intervalId: any;

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 6,
    borderRadius : 2,
    p: 4,
};

const Wordtestreal: React.FC<any> = (props) => {

    const [totalWords, setTotalWords] = useState<any>();
    const [dayInfo, setDayInfo] = useState<any>();
    const [currentStep, setCurrentStep] = useState(1);
    const [seconds, setSeconds] = useState(5);
    const [showMeaning, setShowMeaning] = useState(false);

    const [markingResult, setMarkingResult] = useState<any>([]);

    const inputRef = useRef<any>();

    const [inputValue, setInputValue] = useState("");

    const [isEnd, setIsEnd] = useState(false);

    const [correctNumber, setCorrectNumber] = useState(0);
    const [incorrectNumber, setIncorrectNumber] = useState(0);

    const [lastReport, setLastReport] = useState<any>();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(markingResult);
    }, [markingResult])

    useEffect(() => {
        const keyDownHandler = (event: any) => {
            console.log('User pressed: ', event.key);

            if (!showMeaning && event.key === 'Enter') {
                event.preventDefault();
                if (inputRef.current) {
                    inputRef.current.blur();
                }
                setShowMeaning(true);
                if (intervalId) {
                    clearInterval(intervalId);
                }
            }


            if (showMeaning && (event.key === 1 || event.key === "1")){
                event.preventDefault();
                mark("e", 1);
            }

            if (showMeaning && (event.key === 2 || event.key === "2")) {
                console.log("w");
                event.preventDefault();
                mark("e", 2);
            }


        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };

    }, [showMeaning]);

    useEffect(() => {
        console.log(props);

        if (!props.location.state) {
            props.history.goBack();
            return;
        }

        fetch("https://peetsunbae.com/dashboard/words/starttest", {
            method: "POST",
            credentials: "include",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(props.location.state)
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    if (result.message === "success") {
                        setDayInfo(result.dayInfo);
                        const wordsData = result.data;

                        if(wordsData.length === 0){
                            goback("e");
                        }

                        shuffle(wordsData);
                        setTotalWords(wordsData);
                        console.log(wordsData);
                    }
                })
        })

    }, [props]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }

        if (intervalId) {
            clearInterval(intervalId);
        }

        setSeconds(5);
        var remain = 5;

        intervalId = setInterval(() => {
            if (remain > -1) {
                setSeconds(remain);
                remain--;
            }
        }, 1000);


    }, [currentStep, inputRef]);


    useEffect(() => {
        if (seconds === 0) {
            if (inputRef.current) {
                inputRef.current.blur();
            }
            setShowMeaning(true);
            if (intervalId) {
                clearInterval(intervalId);
            }
        }
    }, [seconds])

    const goback = (e: any) => {
        props.history.goBack();
    }

    const shuffle = (data: any) => {
        data.sort(() => Math.random() - 0.5);
    }

    const handleChange = (e: any) => {

        if (!showMeaning) {
            setInputValue(e.target.value);
        }
    }

    const mark = (e: any, kind: number) => {

        if (kind === 1) {
            const newMarkingResult: any = markingResult;
            const currentMarkingData: any = {
                wordId: totalWords[currentStep - 1].id,
                howlong: 5 - seconds,
                answer: inputValue,
                result: "correct"
            }

            newMarkingResult.push(currentMarkingData);

            setMarkingResult([...newMarkingResult]);

            if (totalWords.length !== currentStep) {
                setCurrentStep(currentStep + 1);
                setShowMeaning(false);
                setInputValue("");
            } else {
                setIsEnd(true);

                var totalCorrectCount = 0;
                var totalIncorrectCount = 0;

                newMarkingResult.forEach((each: any) => {
                    if (each.result === "correct") {
                        totalCorrectCount++;
                    } else if (each.result === "incorrect") {
                        totalIncorrectCount++;
                    }
                })

                setCorrectNumber(totalCorrectCount);
                setIncorrectNumber(totalIncorrectCount);

                makeLastReport();

            }

        }
        if (kind === 2) {
            const newMarkingResult: any = markingResult;
            const currentMarkingData: any = {
                wordId: totalWords[currentStep - 1].id,
                result: "incorrect",
                howlong: 5 - seconds,
                answer: inputValue
            }

            newMarkingResult.push(currentMarkingData);

            setMarkingResult([...newMarkingResult]);

            if (totalWords.length !== currentStep) {
                setCurrentStep(currentStep + 1);
                setShowMeaning(false);
                setInputValue("");
            } else {
                setIsEnd(true);

                var totalCorrectCount = 0;
                var totalIncorrectCount = 0;

                newMarkingResult.forEach((each: any) => {
                    if (each.result === "correct") {
                        totalCorrectCount++;
                    } else if (each.result === "incorrect") {
                        totalIncorrectCount++;
                    }
                })

                setCorrectNumber(totalCorrectCount);
                setIncorrectNumber(totalIncorrectCount);

                makeLastReport();


            }

        }
    }


    const makeLastReport = () => {
        if (totalWords) {
            const orderedTotalWords = totalWords;

            orderedTotalWords.sort((a: any, b: any) => {
                return a.id - b.id;
            });

            orderedTotalWords.forEach((eachWord: any) => {
                markingResult.forEach((eachMarking: any) => {
                    if (eachWord.id === eachMarking.wordId) {
                        eachWord.answer = eachMarking.answer;
                        eachWord.howlong = eachMarking.howlong;
                        eachWord.result = eachMarking.result;
                    }
                })
            })

            console.log(orderedTotalWords);
            setLastReport(orderedTotalWords);
        }

    }


    const handleCheckChange = (e: any, index: number) => {

        var newLastReport: any;

        if (e.target.checked) {
            newLastReport = lastReport;
            newLastReport[index].result = "incorrect";
            setLastReport([...newLastReport]);
            console.log(newLastReport);
        } else {
            newLastReport = lastReport;
            newLastReport[index].result = "correct";
            setLastReport([...newLastReport]);
            console.log(newLastReport);
        }

        var totalCorrectCount = 0;
        var totalIncorrectCount = 0;

        newLastReport.forEach((each: any) => {
            if (each.result === "correct") {
                totalCorrectCount++;
            } else if (each.result === "incorrect") {
                totalIncorrectCount++;
            }
        })

        setCorrectNumber(totalCorrectCount);
        setIncorrectNumber(totalIncorrectCount);

    }

    const save = (e: any) => {
        console.log(lastReport);
        setLoading(!loading);

        fetch("https://peetsunbae.com/dashboard/words/save", {
            method: "POST",
            credentials: "include",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                data : JSON.stringify(lastReport),
                dayInfo : dayInfo
            })
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    if (result.message === "success") {
                        setLoading(false);

                        if(window.confirm("저장이 완료되었습니다. 메뉴로 돌아갈까요?")){
                            console.log("yes");
                            goback("e");
                        }else{
                            console.log("no");
                        }
                    }
                })
        })
    }

    return (
        <div>
            <div className={`${styles.appBar} ${styles.notablet}`}>
                <div className={styles.logoDiv}>
                    <LogoSvg className={styles.logoSvg} />
                </div>
                <div className={styles.profileDiv}>
                    <div className={styles.profileConfig} style={{ cursor: "auto" }}>
                        {props.location.state && props.location.state.userName}
                    </div>
                    <div className={styles.avatarCircle} onClick={goback}>
                        <img className={styles.avatar} src="img/avatarG.svg" alt="avatar"></img>
                    </div>
                    <div className={styles.logout} onClick={goback}>
                        메뉴로 돌아가기
                    </div>
                </div>
            </div>

            {
                !isEnd &&
                <div className={styles.paper}>
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

                    <div className={styles.wordsPaper}>
                        <div className={styles.wordsHeaderDiv}>
                            <div style={{ width: "35px" }}>

                            </div>
                            <div className={styles.clockDiv}>
                                {seconds}
                                <div className={styles.leftEar}>

                                </div>
                                <div className={styles.rightEar}>

                                </div>
                            </div>
                            <div style={{ width: "35px", color: "rgba(0, 0, 0, 0.8)", fontWeight: 500, fontSize: "15px", paddingTop: "14px" }}>
                                {totalWords && `${totalWords.length > 0  ? currentStep : "0"}/`}{totalWords && totalWords.length}
                            </div>
                        </div>
                        <div className={styles.wordBox}>
                            <div>
                                {
                                    (totalWords && totalWords.length > 0) && totalWords[currentStep - 1].word
                                }
                            </div>
                            {
                                (showMeaning && totalWords && totalWords.length > 0) &&
                                <div style={{ fontSize: "25px", marginTop: "16px", fontFamily: "Apple_R" }}>
                                    {totalWords[currentStep - 1].meaning}
                                </div>
                            }
                        </div>
                        <div className={`${styles.inputDiv} ${showMeaning ? styles.stop : ""}`}>
                            <input onChange={handleChange} value={inputValue} ref={inputRef} type="text" className={`${styles.answerInput}`}>

                            </input>
                        </div>
                        {
                            showMeaning &&
                            <div className={styles.correctingDiv}>
                                <div onClick={(e) => { mark(e, 1) }} className={styles.correct}>
                                    맞혔어요 (1)
                                </div>
                                <div onClick={(e) => { mark(e, 2) }} className={styles.inCorrect}>
                                    틀렸어요 (2)
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
            {
                isEnd &&
                <div>
                    <div className={styles.resultTitle}>
                        단어테스트 결과지
                    </div>
                    <div className={styles.resultNumberDiv}>
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
                            단어 리스트
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
                                                {each.meaning}
                                            </div>
                                            <div className={styles.reportcol_5}>
                                                {each.answer}
                                            </div>
                                        </div>
                                    );
                                })
                            }


                        </div>
                    </div>

                    <div onClick={save} className={`${styles.startBtn2}`}>
                        저장하기
                    </div>
                </div>
            }

            <Modal
                open={loading}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CircularProgress />
                </Box>
            </Modal>


        </div>
    );
}

export default Wordtestreal;