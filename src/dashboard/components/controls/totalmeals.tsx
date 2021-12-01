import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import styles from "../../componentsStyle/restaurant.module.css";
import koLocale from 'date-fns/locale/ko'
import { DataGridPro, GridRowsProp, GridColDef, GridToolbar, LicenseInfo, useGridApiRef } from '@mui/x-data-grid-pro';

LicenseInfo.setLicenseKey("e3ec4d79d1fa1f36cc88ecffd4e68392T1JERVI6MzMyMjMsRVhQSVJZPTE2NjkzODUyMDIwMDAsS0VZVkVSU0lPTj0x");



const columns: GridColDef[] = [
    { field: 'name', headerName: '이름', width: 150 },
    { field: 'date', headerName: '배송 날짜', width: 150, filterable : false },
    { field: 'whenType', headerName: "시간", width: 150},
    { field: 'restaurant', headerName: "업체", width: 150 },
    { field: 'mealName', headerName: "도시락", width: 250 },
    { field: 'price', headerName: "가격", width: 150, filterable : false },
    { field: 'time', headerName: "주문시각", width: 150, filterable : false }
];


const Totalmeals: React.FC<any> = (props) => {
    const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
    const [submitBool, setSubmitBool] = useState(false);
    const [rows, setRows] = useState<any>();
    const [sum, setSum] = useState(0);
    const apiRef = useGridApiRef();

    const filterChange = () => {
        console.log(1111111);
        const param = apiRef.current.getVisibleRowModels();
        var sumNumber = 0;
        console.log(param);
        param.forEach((each)=>{
            if(each.priceNumber){
            console.log(each);
            sumNumber += each.priceNumber
            }
        })
        // param.rows.idRowsLookup.forEach((each : any)=>{
        //     sumNumber += each.priceNumber;
        // })
        setSum(sumNumber);
    }

    const submit = async (e: any) => {
        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/restaurant/total", {
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
                        oneRow.whenType = each.whenType === "lunch" ? "점심" : "저녁";
                        oneRow.restaurant = each.restaurantName;
                        oneRow.mealName = each.mealName;
                        oneRow.price = `${each.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`;
                        oneRow.priceNumber = +each.price;
                        oneRow.time = `${new Date(+each.time).getMonth() + 1}월 ${new Date(+each.time).getDate()}일 ${new Date(+each.time).getHours()}시`;
                        data.push(oneRow);
                    })
                    console.log(data);
                    setRows([...data]);
                })
        })
    }

    const letsSum = (param : any) => {
        var sumNumber = 0;
        console.log(param.rows);
        for (const [key, value] of Object.entries(param.rows.idRowsLookup) as any){
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
                        <div style={{display : "flex", height : "100%"}}>
                            <div style={{ flexGrow: 1 }}>
                                <DataGridPro rows={rows} columns={columns} components={{Toolbar : GridToolbar}} apiRef={apiRef} 
                                onStateChange={filterChange}
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>

            <div className={styles.totalSumDiv}>
                <div>
                    총액 : {sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                </div>
            </div>
        </div>
    )
}

export default Totalmeals;