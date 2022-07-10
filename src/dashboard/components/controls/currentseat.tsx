import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import koLocale from 'date-fns/locale/ko'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { GridRenderCellParams, DataGridPro, GridRowsProp, GridColDef, GridToolbar, LicenseInfo, useGridApiRef, GridEditRowsModel, GridFilterModel } from '@mui/x-data-grid-pro';
import { eachDayOfInterval } from 'date-fns';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { createStyles, makeStyles } from '@mui/styles';
import styles from '../../componentsStyle/upload.module.css';
import { createTheme, darken, lighten } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import renderCellExpand from '../data/rendercellexpand';
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
    { field: 'name', headerName: '이름', width: 150, renderCell: renderCellExpand },
    { field: 'status', headerName: '위치', width: 100, renderCell: renderCellExpand, filterable: true },
    { field: 'last', headerName: '마지막 기록', width: 200, filterable: false },
    { field: 'value', headerName: '출입그룹', width: 150, renderCell: renderCellExpand, filterable: true },
];

const CurrentSeat: React.FC<any> = (props) => {
    const classes = useStyles2();
    const [rows, setRows] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [alignment, setAlignment] = React.useState('all');
    const [targetDate, setTargetDate] = useState(new Date());
    const apiRef = useGridApiRef();
    const [name, setName] = useState("");
    const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
        items: [
            { id: 2, columnField: 'name', operatorValue: 'contains', value: "" }
        ],
    });

    const start = async (date: number) => {
        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/fingerprint/totalStamp?date=" + date, {
            method: "GET",
            headers: { "Authorization": token },
            credentials: "include",
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    const data = result.data;
                    const users = result.users;
                    //   console.log(data);
                    //   console.log(users);
                    users.forEach((eachUser: any) => {
                        eachUser.records = [];
                    })

                    data.forEach((eachData: any) => {
                        users.forEach((eachUser: any) => {
                            if (+eachData.userId === +eachUser.user_id) {
                                eachUser.records.push(eachData);
                            }
                        })
                    })



                    const newRows: any = [];

                    users.sort(function (a: any, b: any) {
                        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                    });

                    users.forEach((eachUser: any) => {
                        const oneRow: any = {};
                        console.log(1);
                        oneRow.id = +eachUser.user_id;
                        console.log(2);
                        oneRow.name = eachUser.name;
                        console.log(3);
                        const lastRecord = eachUser.records[eachUser.records.length - 1];
                        console.log(4);
                        if(eachUser.access_groups){
                        oneRow.group = eachUser.access_groups[0].name;
                        }
                        console.log(5);
                        oneRow.lastRecord = lastRecord;
                        var createdAt
                        if (lastRecord) {
                            createdAt = new Date(+lastRecord.time);
                            var ampm: string;
                            var hours: number;
                            if (createdAt.getHours() >= 12) {
                                ampm = "오후";
                                hours = createdAt.getHours() - 12;
                                if (hours === 0) {
                                    hours = 12;
                                }
                            } else {
                                ampm = "오전";
                                hours = createdAt.getHours()
                            }
                            oneRow.last = `${ampm} ${hours < 10 ? "0" + hours : hours}:${createdAt.getMinutes() < 10 ? "0" + createdAt.getMinutes() : createdAt.getMinutes()}`
                        } else {
                            oneRow.last = "오늘 기록 없음"
                        }



                        if (!lastRecord) {
                            oneRow.status = "OUTSIDE"
                        } else if (lastRecord.direction === "inside") {
                            oneRow.status = "OUTSIDE";
                            oneRow.last = oneRow.last + "에 나감";
                        } else if (lastRecord.direction === "outside") {
                            oneRow.status = "INSIDE"
                            oneRow.last = oneRow.last + "에 들어옴";
                        }

                        newRows.push(oneRow);
                    })

                    setRows(newRows);
                    setLoading(false);
                })
        })
    }


    useEffect(() => {
        setLoading(true);
        console.log(2);

        var date = targetDate.getTime();

        start(date);

    }, []);

    const nameChange = (e: any) => {
        console.log(filterModel);
        setName(e.target.value);
        console.log(111);
        const newFilterModel: any = filterModel;
        newFilterModel.items.forEach((each: any) => {
            if (each.id === 2) {
                each.value = e.target.value;
            }
        })
        console.log(newFilterModel);
        setFilterModel({ ...newFilterModel });
    }


    return (
        <div>
            <div style={{ marginBottom: "12px", fontSize: "20px", fontFamily: "Apple_R" }}>
                {targetDate.getFullYear()}-{targetDate.getMonth() + 1}-{targetDate.getDate()} {targetDate.getHours()}:{targetDate.getMinutes()} 기준
            </div>
            {/* <div className={styles.mysearchDate}>
                <div style={{ fontSize: "18px", fontFamily: "Apple_B" }}>

                </div>
                <div>
                    <TextField value={name} onChange={nameChange} id="standard-basic" placeholder="이름을 검색하세요" variant="standard" />
                </div>
            </div>
            <div className={classes.root} style={{ height: 500, width: '100%', backgroundColor: "white" }}>

                <DataGridPro loading={loading} rows={rows} columns={columns}
                    density='compact'
                    components={{ Toolbar: GridToolbar }}
                    filterModel={filterModel}
                    apiRef={apiRef}
                    onFilterModelChange={(model) => setFilterModel(model)}
                    getRowClassName={(params: any) => {
                        if (params.getValue(params.id, "status") === "INSIDE") {
                            return (
                                "super-app-theme--확인"
                            )
                        } else {
                            return (
                                "super-app-theme--처리완료"
                            )
                        }
                    }
                    }
                />

            </div>
            <div className={styles.mysearchDescription}>
                * 미완료 - 빨강색, 현재 할일 - 주황색, 완료 - 파랑색<br />
            </div> */}
            <div className={styles.studentTitle}>
                학생
            </div>
            <div className={styles.studentsBox}>
                {rows.map((each: any) => {
                    if (each.group === "학생" && each.name !== "Administrator") {
                        return (
                            <div key={each.id} className={`${(each.last.split(" ")[2] === "들어옴") ? styles.insideStudent : styles.outsideStudent}  `}>
                                <div>{each.name}</div>
                                <div>{each.last.split("에")[0]}</div>
                                <div></div>
                            </div>
                        );
                    }
                })}
            </div>
            <div className={styles.teacherTitle}>
                관리자
            </div>
            <div className={styles.studentsBox}>
                {rows.map((each: any) => {
                    if (each.group === "관리자" && each.name !== "Administrator") {
                        return (
                            <div key={each.id} className={`${(each.last.split(" ")[2] === "들어옴") ? styles.insideStudent : styles.outsideStudent}  `}>
                                <div>{each.name}</div>
                                <div>{each.last.split("에")[0]}</div>
                                <div></div>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    )
}

export default CurrentSeat;