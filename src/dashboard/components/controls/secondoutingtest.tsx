import React, { useEffect, useState } from 'react';
import { GridRenderCellParams, DataGridPro, GridRowsProp, GridColDef, GridToolbar, LicenseInfo, useGridApiRef, GridEditRowsModel, GridFilterModel } from '@mui/x-data-grid-pro';
import { createStyles, makeStyles } from '@mui/styles';
import renderCellExpand from "../data/rendercellexpand";
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
                    color: "red",
                },
                '& .super-app-theme--Filled': {
                    backgroundColor: getBackgroundColor(theme.palette.success.main),
                    '&:hover': {
                        backgroundColor: getHoverBackgroundColor(theme.palette.success.main),
                    },
                },
                '& .super-app-theme--확인': {
                    color: "blue",
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
    { field: 'name', headerName: '이름', width: 150 },
    { field: 'interval', headerName: '외출 간격', width: 150, filterable: true },
    { field: 'exitTime', headerName: '나간 시간', width: 150, filterable: false },
    { field: 'enterTime', headerName: '들어온 시간', width: 150, filterable: false },
    { field: 'firstReply', headerName: '상황', width: 200, filterable: false, renderCell: renderCellExpand, editable: true },
    { field: 'secondReply', headerName: '최종처리', width: 200, filterable: false, renderCell: renderCellExpand, editable: true },
];

const SecondOutingTest: React.FC<any> = (props) => {
    const classes = useStyles2();
    const [rows, setRows] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const apiRef = useGridApiRef();
    const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
        items: [
            { id: 2, columnField: 'name', operatorValue: 'contains', value: "" }
        ],
    });


    const start = async () => {
        if (props.targetDate) {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch(`https://peetsunbae.com/dashboard/report/attendanceOutingProcess?date=${props.targetDate.getTime()}`, {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result.data);
                        const outingData = result.data;


                        const users = props.users;
                        const data = props.data;

                        users.forEach((eachUser: any) => {
                            eachUser.records = [];
                            eachUser.reply = [];
                        })

                        data.forEach((eachData: any) => {
                            users.forEach((eachUser: any) => {
                                if (+eachData.userId === +eachUser.user_id) {
                                    eachUser.records.push(eachData);
                                }
                            })
                        })
                        console.log("outing");
                        console.log(props);

                        const newRows: any = [];

                        users.forEach((user: any) => {
                            if (user.access_groups[0].name === "학생" && user.name !== "Administrator") {
                                var previousRecord: any;
                                user.records.forEach((record: any, index: number) => {
                                    const oneRow: any = {};
                                    if (index > 0) {
                                        if (previousRecord.direction === "inside") {
                                            if (record.direction === "outside") {
                                                const delay = Math.floor(((+record.time) - (+previousRecord.time)) / 60000);
                                                const interval = `${Math.floor(delay / 60)}시간 ${delay % 60}분 경과`
                                                oneRow.id = `${user.user_id}_${props.targetDate.getMonth() + 1}-${props.targetDate.getDate()}_${previousRecord.time}`;
                                                oneRow.name = user.name;
                                                oneRow.interval = interval;
                                                const exitDate = new Date(+previousRecord.time);
                                                const enterDate = new Date(+record.time);
                                                oneRow.exitDateNumber = +previousRecord.time;
                                                oneRow.exitTime = `${exitDate.getHours() < 10 ? "0" + exitDate.getHours() : exitDate.getHours()}:${exitDate.getMinutes() < 10 ? "0" + exitDate.getMinutes() : exitDate.getMinutes()}`;
                                                oneRow.enterTime = `${enterDate.getHours() < 10 ? "0" + enterDate.getHours() : enterDate.getHours()}:${enterDate.getMinutes() < 10 ? "0" + enterDate.getMinutes() : enterDate.getMinutes()}`;

                                                const forTestExitNumber = (exitDate.getHours() * 60) + (exitDate.getMinutes());

                                                outingData.forEach((eachData : any)=>{
                                                    if(eachData.outingId === oneRow.id){
                                                        oneRow.firstReply = eachData.firstReply;
                                                        oneRow.secondReply = eachData.secondReply;
                                                    }
                                                })

                                                if (delay > 10) {
                                                    if ((forTestExitNumber > 540 && forTestExitNumber < 620) || (forTestExitNumber > 630 && forTestExitNumber < 710) || (forTestExitNumber > 800 && forTestExitNumber < 880) || (forTestExitNumber > 890 && forTestExitNumber < 970) || (forTestExitNumber > 980 && forTestExitNumber < 1040) || (forTestExitNumber > 1120 && forTestExitNumber < 1320))
                                                        newRows.push(oneRow);
                                                    console.log(oneRow.id);
                                                }

                                            }
                                        }
                                    }
                                    previousRecord = record;
                                })
                            }
                        })

                        newRows.sort(function (a: any, b: any) {
                            if (a.exitDateNumber < b.exitDateNumber) {
                                return 1;
                            } else if (a.exitDateNumber > b.exitDateNumber) {
                                return -1;
                            } else {
                                return 0;
                            }
                        })

                        console.log(newRows);

                        setRows([...newRows]);

                    })
            })
        }
    }


    useEffect(() => {

        start();

    }, [props.data]);

    const handleCommit = async (e: any) => {
        const id = e.id;
        const field = e.field;
        var value = e.value;

        if (!value) {
            value = "";
        }

        const data = {
            id, field, value
        }

        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/report/attendanceOutingProcess", {
            method: "POST",
            headers: { "Authorization": token, "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data)
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result.body);
                })
        })
    }

    const tableChange = (e: any) => {

    }

    return (
        <div>
            <div style={{ marginTop: "24px", fontFamily: "Apple_B", fontSize: "16px", display: "flex", justifyContent: "space-between" }}>
                <div>
                    장기 외출 검사
                </div>
                <div>
                    {props.targetDate.getMonth() + 1}월 {props.targetDate.getDate()}일
                </div>
            </div>

            <div className={classes.root} style={{ height: 500, width: '100%', backgroundColor: "white", marginTop: "8px" }}>

                <DataGridPro loading={loading} rows={rows} columns={columns}
                    density='compact'
                    components={{ Toolbar: GridToolbar }}
                    filterModel={filterModel}
                    apiRef={apiRef}
                    onFilterModelChange={(model) => setFilterModel(model)}
                    onCellEditCommit={handleCommit}
                    onStateChange={tableChange}
                />

            </div>
        </div>
    )
}

export default SecondOutingTest;