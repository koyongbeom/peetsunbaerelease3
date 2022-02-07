import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import koLocale from 'date-fns/locale/ko'
import { DataGridPro, GridRowsProp, GridColDef, GridToolbar, LicenseInfo, useGridApiRef } from '@mui/x-data-grid-pro';
import { createStyles, makeStyles } from '@mui/styles';
import styles from '../../componentsStyle/upload.module.css';
import { createTheme, darken, lighten } from '@mui/material/styles';

LicenseInfo.setLicenseKey("e3ec4d79d1fa1f36cc88ecffd4e68392T1JERVI6MzMyMjMsRVhQSVJZPTE2NjkzODUyMDIwMDAsS0VZVkVSU0lPTj0x");


const defaultTheme = createTheme();
const useStyles2 = makeStyles(
  (theme) => {
    const getBackgroundColor = (color: any) =>
      theme.palette.mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

    const getHoverBackgroundColor = (color: any) =>
      theme.palette.mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

    return {
      root: {
        '& .super-app-theme--처리완료': {
          backgroundColor: getBackgroundColor(theme.palette.info.main),
          '&:hover': {
            backgroundColor: getHoverBackgroundColor(theme.palette.info.main),
          },
        },
        '& .super-app-theme--Filled': {
          backgroundColor: getBackgroundColor(theme.palette.success.main),
          '&:hover': {
            backgroundColor: getHoverBackgroundColor(theme.palette.success.main),
          },
        },
        '& .super-app-theme--확인': {
          backgroundColor: getBackgroundColor(theme.palette.warning.main),
          '&:hover': {
            backgroundColor: getHoverBackgroundColor(theme.palette.warning.main),
          },
        },
        '& .super-app-theme--미확인': {
          backgroundColor: getBackgroundColor(theme.palette.error.main),
          '&:hover': {
            backgroundColor: getHoverBackgroundColor(theme.palette.error.main),
          },
        },
        '& .pluscell': {
          color : theme.palette.error.main,
        },
        '& .minuscell': {
            color : theme.palette.info.main,
        },
      },
    };
  },
  { defaultTheme },
);


const columns: GridColDef[] = [
    { field: 'description', headerName: '사유', width: 450 },
    { field: 'score', headerName: '벌점', width: 150, filterable: false },
    { field: 'name', headerName: "벌점 부여자", width: 150 },
    { field: 'date', headerName: "벌점 부여 일자", width: 250 }
];


const TotalDemerit: React.FC<any> = (props) => {
    const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
    const [submitBool, setSubmitBool] = useState(false);
    const [rows, setRows] = useState<any>();
    const [sum, setSum] = useState(0);
    const apiRef = useGridApiRef();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        start();
    }, [])

    const start = async () => {
        setLoading(true);
        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/avatar/demerit", {
            method: "GET",
            headers: { "Authorization": token },
            credentials: "include"
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    var data: any = [];
                    var totalScore = 0;
                    result.data.forEach((each: any, index: number) => {
                        var oneRow: any = {};
                        const date = new Date(each.createdAt);
                        if (date.getMonth() === new Date().getMonth()) {
                            oneRow.id = each.id;
                            oneRow.description = each.description;
                            oneRow.name = each.name;
                            oneRow.score = each.score;
                            oneRow.date = `${date.getMonth() + 1}월 ${date.getDate()}일`
                            totalScore += each.score;
                        }
                        data.push(oneRow);
                    })
                    console.log(data);
                    setRows([...data]);
                    setSum(totalScore);
                    setLoading(false);
                })
        })
    }

    const letsSum = (param: any) => {
        var sumNumber = 0;
        console.log(param.rows);
        for (const [key, value] of Object.entries(param.rows.idRowsLookup) as any) {
            sumNumber += value.priceNumber;
        }
        setSum(sumNumber);
    }

    return (
        <div>
            <div>
                <div style={{fontFamily : "Apple_B", marginBottom : "12px", fontSize : "20px", marginLeft : "8px"}}>
                    {new Date().getMonth()+1}월 벌점 기록
                </div>
                <div style={{ height: 400, width: '100%' }}>
                    <div style={{ display: "flex", height: "100%" }}>
                        <div style={{ flexGrow: 1 }}>
                            <DataGridPro rows={rows} columns={columns} apiRef={apiRef} loading={loading}
                                density="compact"
                                getCellClassName={(params: any) => {
                                    if (params.field != "score") {
                                      return '';
                                    } else if(!params.value){
                                      return '';
                                    } else {
                                        console.log(params.value);
                                      if(params.value > 0){
                                          return "pluscell"
                                      }else{
                                          return "minuscell"
                                      }
                                    }
                                  }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div style={{ marginTop: "12px", fontFamily: "Apple_R", textAlign: "end", fontSize: "18px", marginRight: "8px" }}>
                    이번달 총 벌점 : {sum}점
                </div>
            </div>
        </div>
    )
}

export default TotalDemerit;