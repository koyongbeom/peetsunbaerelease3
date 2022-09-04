import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
// import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';

import Box from '@mui/material/Box';
import styles from "../../componentsStyle/restaurant.module.css";
import renderCellExpand from '../data/rendercellexpand';
import koLocale from 'date-fns/locale/ko'
import { DataGridPro, GridRowsProp, GridColDef, GridToolbar, LicenseInfo, useGridApiRef } from '@mui/x-data-grid-pro';

LicenseInfo.setLicenseKey("e3ec4d79d1fa1f36cc88ecffd4e68392T1JERVI6MzMyMjMsRVhQSVJZPTE2NjkzODUyMDIwMDAsS0VZVkVSU0lPTj0x");



const columns: GridColDef[] = [
    { field: 'name', headerName: '이름', width: 150 },
    { field: 'first', headerName: '첫번째', width: 150 },
    { field: 'second', headerName: "두번째", width: 150 },
    { field: 'third', headerName: "세번째", width: 150 },
    { field: 'fourth', headerName: "네번째", width: 250 },
    { field: 'description', headerName: "주관식", width: 150, filterable: false, renderCell: renderCellExpand },
    { field: 'time', headerName: "평가날짜", width: 150 }
];


const CoachingReview: React.FC<any> = (props) => {
    const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
    const [submitBool, setSubmitBool] = useState(false);
    const [rows, setRows] = useState<any>();
    const [sum, setSum] = useState(0);
    const [password, setPassword] = useState();
    const apiRef = useGridApiRef();
    const [firstAverage, setFirstAverage] = useState(0);
    const [secondAverage, setSecondAverage] = useState(0);
    const [thirdAverage, setThirdAverage] = useState(0);
    const [fourthAverage, setFourthAverage] = useState(0);
    const [questions, setQuestions] = useState<any>();


    const filterChange = () => {
        const param = apiRef.current.getVisibleRowModels();
        var sumNumber: any = [0, 0, 0, 0];
        console.log(param);
        var count = 0;
        param.forEach((each) => {
            count++;
            sumNumber[0] += +each.first;
            sumNumber[1] += +each.second;
            sumNumber[2] += +each.third;
            sumNumber[3] += +each.fourth;
        })
        if (count === 0) {
            setFirstAverage(0);
            setSecondAverage(0);
            setThirdAverage(0);
            setFourthAverage(0);
        } else {
            setFirstAverage(sumNumber[0] / count);
            setSecondAverage(sumNumber[1] / count);
            setThirdAverage(sumNumber[2] / count);
            setFourthAverage(sumNumber[3] / count);
        }
    }

    const submit = async (e: any) => {
        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/search/coachingtotal", {
            method: "POST",
            headers: { "Authorization": token, "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                message: value,
                password: password
            })
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    if (result.data) {
                        setQuestions(result.questions);
                        var data: any = [];
                        result.data.forEach((each: any, index: number) => {
                            var oneRow: any = {};
                            oneRow.id = each.id;
                            oneRow.name = each.named === "nonamed" ? "익명" : each.name;
                            oneRow.first = each.satisfyRating;
                            oneRow.second = each.curriculumRating;
                            oneRow.third = each.consultRating;
                            oneRow.fourth = each.hopeRating;
                            oneRow.description = each.description;
                            const date = new Date(each.createdAt);
                            oneRow.time = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                            data.push(oneRow);
                        })
                        console.log(data);
                        setRows([...data]);
                    }
                })
        })
    }

    const letsSum = (param: any) => {
        var sumNumber = 0;
        console.log(param.rows);
        for (const [key, value] of Object.entries(param.rows.idRowsLookup) as any) {
            sumNumber += value.priceNumber;
        }
        // param.rows.idRowsLookup.forEach((each : any)=>{
        //     sumNumber += each.priceNumber;
        // })
        setSum(sumNumber);
    }

    return (
        <div>
            <div className={styles.datePicker}>
                <LocalizationProvider locale={koLocale} dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                        startText="시작일"
                        endText="마지막일"
                        value={value}
                        onChange={(newValue : any) => {
                            setValue(newValue);
                            if (newValue[0] && newValue[1]) {
                                setSubmitBool(true);
                            }
                        }}
                        renderInput={(startProps : any, endProps : any) => (
                            <React.Fragment>
                                <TextField {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps} />
                            </React.Fragment>
                        )}

                    />
                </LocalizationProvider>
                <div className={styles.height}></div>
                <TextField type="password" value={password} onChange={(e: any) => { setPassword(e.target.value) }} id="outlined-basic" placeholder="비밀번호" variant="outlined" />
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
                            <div style={{ flexGrow: 1, backgroundColor: "white" }}>
                                <DataGridPro rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} apiRef={apiRef}
                                    onStateChange={filterChange}
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>

            {questions &&
            <div className={styles.averageDiv}>
                <div>
                    {questions[0].question}<br /> 평균 점수 : {firstAverage} <br />
                </div>
                <div>
                    {questions[1].question}<br /> 평균 점수 : {secondAverage} <br />
                </div>
                <div>
                    {questions[2].question}<br /> 평균 점수 : {thirdAverage} <br />
                </div>
                <div>
                    {questions[3].question}<br /> 평균 점수 : {fourthAverage} <br />
                </div>
            </div>
            }
        </div>
    )
}

export default CoachingReview;