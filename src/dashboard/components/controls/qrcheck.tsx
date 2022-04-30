import React, { useEffect, useState } from "react";
import { GridRenderCellParams, DataGridPro, GridRowsProp, GridColDef, GridToolbar, LicenseInfo, useGridApiRef, GridEditRowsModel, GridFilterModel } from '@mui/x-data-grid-pro';
import { createStyles, makeStyles } from '@mui/styles';
import { createTheme, darken, lighten } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


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
                '& .timeout': {
                    color: theme.palette.error.main,
                },
            },
        };
    },
    { defaultTheme },
);



const columns: GridColDef[] = [
    { field: 'name', headerName: '위치', width: 120, filterable: true },
    { field: 'one', headerName: '1교시', width: 100, filterable: false },
    { field: 'two', headerName: '2교시', width: 100, filterable: false },
    { field: 'three', headerName: '3교시', width: 100, filterable: false },
    { field: 'four', headerName: '4교시', width: 100, filterable: false },
    { field: 'five', headerName: '5교시', width: 100, filterable: false },
    { field: 'six', headerName: '6교시', width: 100, filterable: false },
    { field: 'seven', headerName: '6-1교시', width: 100, filterable: false },
    { field: 'eight', headerName: '6-2교시', width: 100, filterable: false },
    { field: 'nine', headerName: '6-3교시', width: 100, filterable: false },
];


const QrCheck: React.FC<any> = (props) => {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState<any>([]);
    const [targetDate, setTargetDate] = useState(new Date());

    const classes = useStyles2();

    const start = (time : number) => {
        console.log("qrcheck");
        const newRows = [
            { id: "sixone", name: "sixone", one: [], two: [], three: [], four: [], five: [], six: [], seven: [], eight: [], nine: [] },
            { id: "sixtwo", name: "sixtwo", one: [], two: [], three: [], four: [], five: [], six: [], seven: [], eight: [], nine: [] },
            { id: "sixthree", name: "sixthree", one: [], two: [], three: [], four: [], five: [], six: [], seven: [], eight: [], nine: [] },
            { id: "sixfour", name: "sixfour", one: [], two: [], three: [], four: [], five: [], six: [], seven: [], eight: [], nine: [] },
            { id: "sixrest", name: "sixrest", one: [], two: [], three: [], four: [], five: [], six: [], seven: [], eight: [], nine: [] },
            { id: "sixwait", name: "sixwait", one: [], two: [], three: [], four: [], five: [], six: [], seven: [], eight: [], nine: [] },
            { id: "foura", name: "foura", one: [], two: [], three: [], four: [], five: [], six: [], seven: [], eight: [], nine: [] },
            { id: "fourb", name: "fourb", one: [], two: [], three: [], four: [], five: [], six: [], seven: [], eight: [], nine: [] },
            { id: "fourc", name: "fourc", one: [], two: [], three: [], four: [], five: [], six: [], seven: [], eight: [], nine: [] },
            { id: "fourd", name: "fourd", one: [], two: [], three: [], four: [], five: [], six: [], seven: [], eight: [], nine: [] },
            { id: "fours", name: "fours", one: [], two: [], three: [], four: [], five: [], six: [], seven: [], eight: [], nine: [] },
            { id: "secondleftone", name: "secondleftone", one: [], two: [], three: [], four: [], five: [], six: [], seven: [], eight: [], nine: [] },
            { id: "secondlefttwo", name: "secondlefttwo", one: [], two: [], three: [], four: [], five: [], six: [], seven: [], eight: [], nine: [] },
            { id: "secondleftthree", name: "secondleftthree", one: [], two: [], three: [], four: [], five: [], six: [], seven: [], eight: [], nine: [] },
            { id: "secondopenone", name: "secondopenone", one: [], two: [], three: [], four: [], five: [], six: [], seven: [], eight: [], nine: [] },
            { id: "secondopentwo", name: "secondopentwo", one: [], two: [], three: [], four: [], five: [], six: [], seven: [], eight: [], nine: [] },
            { id: "secondopenthree", name: "secondopenthree", one: [], two: [], three: [], four: [], five: [], six: [], seven: [], eight: [], nine: [] },
        ]

        var token = "";

        fetch(`https://peetsunbae.com/dashboard/report/qrcheck?time=${time}`, {
            method: "GET",
            credentials: "include",
        }).then((response) => {
            response.json()
                .then((result) => {
                    console.log(result);

                    result.data.forEach((qrcheck: any) => {
                        const qrcheckTime = new Date(qrcheck.createdAt);
                        const evaluateTime = qrcheckTime.getHours() * 60 + qrcheckTime.getMinutes();

                        newRows.forEach((eachRow: any) => {
                            if (qrcheck.location + qrcheck.room === eachRow.name) {
                                if (evaluateTime >= 540 && evaluateTime <= 620) {
                                    eachRow.one.push(qrcheck);
                                } else if (evaluateTime >= 630 && evaluateTime <= 710) {
                                    eachRow.two.push(qrcheck);
                                } else if (evaluateTime >= 800 && evaluateTime <= 880) {
                                    eachRow.three.push(qrcheck);
                                } else if (evaluateTime >= 890 && evaluateTime <= 970) {
                                    eachRow.four.push(qrcheck);
                                } else if (evaluateTime >= 980 && evaluateTime <= 1040) {
                                    eachRow.five.push(qrcheck);
                                } else if (evaluateTime >= 1120 && evaluateTime <= 1150) {
                                    eachRow.six.push(qrcheck);
                                } else if (evaluateTime >= 1170 && evaluateTime <= 1200) {
                                    eachRow.seven.push(qrcheck);
                                } else if (evaluateTime >= 1200 && evaluateTime <= 1290) {
                                    eachRow.eight.push(qrcheck);
                                } else if (evaluateTime >= 1290 && evaluateTime <= 1320) {
                                    eachRow.nine.push(qrcheck);
                                }
                            }
                        })
                    })

                    newRows.forEach((eachRow: any) => {
                        switch (eachRow.name) {
                            case "sixone":
                                eachRow.name = "6층 1열람실";
                                break;
                            case "sixtwo":
                                eachRow.name = "6층 2열람실";
                                break;
                            case "sixthree":
                                eachRow.name = "6층 3열람실";
                                break;
                            case "sixfour":
                                eachRow.name = "6층  4열람실";
                                break;
                            case "sixwait":
                                eachRow.name = "6층 대기실";
                                break;
                            case "sixrest":
                                eachRow.name = "6층 휴게실";
                                break;
                            case "foura":
                                eachRow.name = "4층 A열람실";
                                break;
                            case "fourb":
                                eachRow.name = "4층 B열람실";
                                break;
                            case "fourc":
                                eachRow.name = "4층 C열람실";
                                break;
                            case "fourd":
                                eachRow.name = "4층 D열람실";
                                break;
                            case "fours":
                                eachRow.name = "4층 S열람실";
                                break;
                            case "secondleftone":
                                eachRow.name = "2호점 칸막이1";
                                break;
                            case "secondlefttwo":
                                eachRow.name = "2호점 칸막이2";
                                break;
                            case "secondleftthree":
                                eachRow.name = "2호점 칸막이3";
                                break;
                            case "secondopenone":
                                eachRow.name = "2호점 오픈석1";
                                break;
                            case "secondopentwo":
                                eachRow.name = "2호점 오픈석2";
                                break;
                            case "secondopenthree":
                                eachRow.name = "2호점 오픈석3";
                                break;
                        }


                        for (const [key, value] of Object.entries(eachRow)) {
                            if (key !== "name" && key !== "id") {
                                if (eachRow[key].length > 0) {
                                    const length = eachRow[key].length;
                                    const lastQr = eachRow[key][length - 1];
                                    eachRow[key] = `${new Date(lastQr.createdAt).getHours() < 10 ? "0" + new Date(lastQr.createdAt).getHours() : new Date(lastQr.createdAt).getHours()}:${new Date(lastQr.createdAt).getMinutes() < 10 ? "0" + new Date(lastQr.createdAt).getMinutes() : new Date(lastQr.createdAt).getMinutes()}:${new Date(lastQr.createdAt).getSeconds() < 10 ? "0" + new Date(lastQr.createdAt).getSeconds() : new Date(lastQr.createdAt).getSeconds()}`;
                                } else {
                                    eachRow[key] = "";
                                }
                            }
                        }

                    })


                    console.log("new");
                    console.log(newRows);
                    setRows(newRows);
                    setLoading(false);

                })
        })

    }

    useEffect(() => {
        setLoading(true);
        const time = targetDate.getTime();

        start(time);
    }, []);

    const previousDay = () => {
        var newDate = targetDate;
        newDate.setDate(newDate.getDate()-1);
        start(newDate.getTime());
        setTargetDate(newDate);
    }

    const nextDay = () => {
        var newDate = targetDate;
        newDate.setDate(newDate.getDate()+1);
        start(newDate.getTime());
        setTargetDate(newDate);
    }


    return (
        <div>
            <div style={{display : "flex", justifyContent : "space-between",  marginTop: "48px", marginBottom: "12px"}}>
                <div>
                    <div style={{fontFamily: "Apple_B" }}>
                        순찰 가이드라인
                    </div>
                    <div>
                        1. QR CODE 태깅 전 열람실에 자는 학생은 깨워주시고 딴짓 하는 사람한테는 주의주세요.
                    </div>
                    <div>
                        2. 순찰 돌 때는 항상 출석부 판 들고 돌아주세요.
                    </div>
                </div>
                <div>
                    <div style={{marginBottom : "6px", fontFamily : "Apple_B"}}>
                        {targetDate.getFullYear()}-{targetDate.getMonth()+1}-{targetDate.getDate()}
                    </div>
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button onClick={previousDay}>◁</Button>
                        <Button onClick={nextDay}>▷</Button>
                    </ButtonGroup>
                </div>
            </div>

            <div className={classes.root} style={{ height: 720, width: '100%', backgroundColor: "white", marginTop: "12px" }}>

                <DataGridPro loading={loading} rows={rows} columns={columns}
                    density='compact'
                    disableSelectionOnClick={true}
                    getCellClassName={(params: any) => {
                        if (!params.value) {
                            return "super-app-theme--확인";
                        } else {
                            return "";
                        }
                    }}
                />

            </div>
        </div>
    )
}

export default QrCheck;