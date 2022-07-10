import React, { useEffect, useState } from "react";
import styles from "../../componentsStyle/eachdaytest.module.css";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Switch from '@mui/material/Switch';

import Checkbox from '@mui/material/Checkbox';
import { LinearProgress } from "@mui/material";

const label2 = { inputProps: { 'aria-label': 'Switch demo' } }

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 6.5 + ITEM_PADDING_TOP,
            width: 180,
        },
    },
};

const EachdayTest: React.FC<any> = (props) => {

    const [day, setDay] = useState(1);

    const [meaningSwitch, setMeaningSwitch] = useState(true);

    const [display, setDisplay] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);

    const [loading, setLoading] = useState(false);

    const [lastReport, setLastReport] = useState<any>();

    useEffect(() => {

        setDisplay([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);

        setLoading(true);

        var studentId = 0;

        console.log(props.user)

        if(props.selectedUser && props.user && props.user.value === "teacher"){
            studentId = props.selectedUser.id;
            if(studentId === 0){
                return;
            }
        }


        fetch("https://peetsunbae.com/dashboard/words/getday?day=" + day + "&studentId=" + studentId, {
            method: "GET",
            credentials: "include",
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    if (result.data && result.data.length > 0) {

                        result.data.sort(function (a: any, b: any) {
                            if (a.result === "correct" && b.result === "incorrect") {
                                return 1;
                            } else if (a.result === "incorrect" && b.result === "correct") {
                                return -1;
                            } else {
                                return 1;
                            }
                        })

                        setLastReport(result.data);


                        var totalCorrectCount = 0;
                        var totalIncorrectCount = 0;

                        result.data.forEach((each: any) => {
                            if (each.result === "correct") {
                                totalCorrectCount++;
                            } else if (each.result === "incorrect") {
                                totalIncorrectCount++;
                            }
                        });

                        // setCorrectNumber(totalCorrectCount);
                        // setIncorrectNumber(totalIncorrectCount);


                    }

                    setLoading(false);
                })
        })

    }, [day, props.selectedUser, props.user])


    const handleChange = (e: any) => {
        setDay(e.target.value);
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



    return (
        <div className={`${styles.paperBackground} ${(props.user && props.user.value === "teacher") ? styles.noMargin : ""}`}>
            <div>
                <div className={styles.resultReportDiv}>
                    <div className={styles.boxDiv}>
                        <Box sx={{ width: 180, marginTop: "30px", marginBottom: "40px" }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Day</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={day}
                                    label="Day"
                                    onChange={handleChange}
                                    MenuProps={MenuProps}
                                >
                                    {
                                        Array.apply(null, Array(50)).map((each: any, index: number) => {
                                            console.log(1);
                                            return (
                                                <MenuItem value={index + 1}>Day {index + 1}</MenuItem>
                                            );
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                    </div>

                    <div className={styles.resultReportTitle}>
                        <div>
                            단어 리스트
                        </div>
                        <div>
                            <Switch checked={meaningSwitch} onChange={switchChange} {...label2} />
                        </div>
                    </div>
                    <div>
                        {
                            loading &&
                            <LinearProgress />
                        }
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

            </div>


        </div>
    )
}

export default EachdayTest;
