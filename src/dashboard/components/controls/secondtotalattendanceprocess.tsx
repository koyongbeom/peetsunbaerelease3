import React, { useEffect, useState } from "react";
import { GridRenderCellParams, DataGridPro, GridRowsProp, GridColDef, GridToolbar, LicenseInfo, useGridApiRef, GridEditRowsModel, GridFilterModel } from '@mui/x-data-grid-pro';
import { createStyles, makeStyles } from '@mui/styles';
import renderCellExpand from "../data/rendercellexpand";
import { createTheme, darken, lighten } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SecondOutingTest from "./secondoutingtest";
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


const columns1: GridColDef[] = [
    { field: 'name', headerName: '이름', width: 150 },
    { field: 'status', headerName: '위치', width: 100, filterable: true },
    { field: 'last', headerName: '마지막 기록', width: 250, filterable: false },
    { field: 'firstReply', headerName: '자리에 없는 이유', width: 400, filterable: false, renderCell: renderCellExpand, editable: true },
    { field: 'secondReply', headerName: '최종 처리', width: 400, filterable: false, renderCell: renderCellExpand, editable: true },
    { field : "oneReply_1", headerName : "1교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "oneReply_2", headerName : "1교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "twoReply_1", headerName : "2교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "twoReply_2", headerName : "2교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "threeReply_1", headerName : "3교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "threeReply_2", headerName : "3교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fourReply_1", headerName : "4교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fourReply_2", headerName : "4교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fiveReply_1", headerName : "5교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fiveReply_2", headerName : "5교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixReply_1", headerName : "6교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixReply_2", headerName : "6교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sevenReply_1", headerName : "7교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sevenReply_2", headerName : "7교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand}
];

const columns3: GridColDef[] = [
    { field: 'name', headerName: '이름', width: 150 },
    { field: 'status', headerName: '위치', width: 100, filterable: true },
    { field: 'last', headerName: '마지막 기록', width: 250, filterable: false },
    { field: 'firstReply', headerName: '자리에 없는 이유', width: 400, filterable: false, renderCell: renderCellExpand, editable: true },
    { field: 'secondReply', headerName: '최종 처리', width: 400, filterable: false, renderCell: renderCellExpand, editable: true },
    { field : "twoReply_1", headerName : "2교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "twoReply_2", headerName : "2교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "oneReply_1", headerName : "1교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "oneReply_2", headerName : "1교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "threeReply_1", headerName : "3교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "threeReply_2", headerName : "3교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fourReply_1", headerName : "4교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fourReply_2", headerName : "4교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fiveReply_1", headerName : "5교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fiveReply_2", headerName : "5교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixReply_1", headerName : "6교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixReply_2", headerName : "6교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sevenReply_1", headerName : "7교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sevenReply_2", headerName : "7교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand}
];

const columns4: GridColDef[] = [
    { field: 'name', headerName: '이름', width: 150 },
    { field: 'status', headerName: '위치', width: 100, filterable: true },
    { field: 'last', headerName: '마지막 기록', width: 250, filterable: false },
    { field: 'firstReply', headerName: '자리에 없는 이유', width: 400, filterable: false, renderCell: renderCellExpand, editable: true },
    { field: 'secondReply', headerName: '최종 처리', width: 400, filterable: false, renderCell: renderCellExpand, editable: true },
    { field : "threeReply_1", headerName : "3교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "threeReply_2", headerName : "3교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "twoReply_1", headerName : "2교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "twoReply_2", headerName : "2교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "oneReply_1", headerName : "1교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "oneReply_2", headerName : "1교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fourReply_1", headerName : "4교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fourReply_2", headerName : "4교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fiveReply_1", headerName : "5교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fiveReply_2", headerName : "5교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixReply_1", headerName : "6교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixReply_2", headerName : "6교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sevenReply_1", headerName : "7교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sevenReply_2", headerName : "7교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand}
];

const columns5: GridColDef[] = [
    { field: 'name', headerName: '이름', width: 150 },
    { field: 'status', headerName: '위치', width: 100, filterable: true },
    { field: 'last', headerName: '마지막 기록', width: 250, filterable: false },
    { field: 'firstReply', headerName: '자리에 없는 이유', width: 400, filterable: false, renderCell: renderCellExpand, editable: true },
    { field: 'secondReply', headerName: '최종 처리', width: 400, filterable: false, renderCell: renderCellExpand, editable: true },
    { field : "fourReply_1", headerName : "4교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fourReply_2", headerName : "4교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "threeReply_1", headerName : "3교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "threeReply_2", headerName : "3교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "twoReply_1", headerName : "2교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "twoReply_2", headerName : "2교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "oneReply_1", headerName : "1교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "oneReply_2", headerName : "1교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fiveReply_1", headerName : "5교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fiveReply_2", headerName : "5교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixReply_1", headerName : "6교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixReply_2", headerName : "6교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sevenReply_1", headerName : "7교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sevenReply_2", headerName : "7교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand}
];

const columns6: GridColDef[] = [
    { field: 'name', headerName: '이름', width: 150 },
    { field: 'status', headerName: '위치', width: 100, filterable: true },
    { field: 'last', headerName: '마지막 기록', width: 250, filterable: false },
    { field: 'firstReply', headerName: '자리에 없는 이유', width: 400, filterable: false, renderCell: renderCellExpand, editable: true },
    { field: 'secondReply', headerName: '최종 처리', width: 400, filterable: false, renderCell: renderCellExpand, editable: true },
    { field : "fiveReply_1", headerName : "5교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fiveReply_2", headerName : "5교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fourReply_1", headerName : "4교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fourReply_2", headerName : "4교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "threeReply_1", headerName : "3교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "threeReply_2", headerName : "3교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "twoReply_1", headerName : "2교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "twoReply_2", headerName : "2교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "oneReply_1", headerName : "1교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "oneReply_2", headerName : "1교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixReply_1", headerName : "6교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixReply_2", headerName : "6교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sevenReply_1", headerName : "7교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sevenReply_2", headerName : "7교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand}
];

//6-1교시용
const columns7: GridColDef[] = [
    { field: 'name', headerName: '이름', width: 150 },
    { field: 'status', headerName: '위치', width: 100, filterable: true },
    { field: 'last', headerName: '마지막 기록', width: 250, filterable: false },
    { field: 'firstReply', headerName: '자리에 없는 이유', width: 400, filterable: false, renderCell: renderCellExpand, editable: true },
    { field: 'secondReply', headerName: '최종 처리', width: 400, filterable: false, renderCell: renderCellExpand, editable: true },
    { field : "sixReply_1", headerName : "6교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixReply_2", headerName : "6교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fiveReply_1", headerName : "5교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fiveReply_2", headerName : "5교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fourReply_1", headerName : "4교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fourReply_2", headerName : "4교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "threeReply_1", headerName : "3교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "threeReply_2", headerName : "3교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "twoReply_1", headerName : "2교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "twoReply_2", headerName : "2교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "oneReply_1", headerName : "1교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "oneReply_2", headerName : "1교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixFirstReply_1", headerName : "6-1교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixFirstReply_2", headerName : "6-1교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixSecondReply_1", headerName : "6-2교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixSecondReply_2", headerName : "6-2교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sevenReply_1", headerName : "7교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sevenReply_2", headerName : "7교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
];

//6-2교시용
const columns8: GridColDef[] = [
    { field: 'name', headerName: '이름', width: 150 },
    { field: 'status', headerName: '위치', width: 100, filterable: true },
    { field: 'last', headerName: '마지막 기록', width: 250, filterable: false },
    { field: 'firstReply', headerName: '자리에 없는 이유', width: 400, filterable: false, renderCell: renderCellExpand, editable: true },
    { field: 'secondReply', headerName: '최종 처리', width: 400, filterable: false, renderCell: renderCellExpand, editable: true },
    { field : "sixFirstReply_1", headerName : "6-1교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixFirstReply_2", headerName : "6-1교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixReply_1", headerName : "6교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixReply_2", headerName : "6교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fiveReply_1", headerName : "5교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fiveReply_2", headerName : "5교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fourReply_1", headerName : "4교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fourReply_2", headerName : "4교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "threeReply_1", headerName : "3교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "threeReply_2", headerName : "3교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "twoReply_1", headerName : "2교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "twoReply_2", headerName : "2교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "oneReply_1", headerName : "1교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "oneReply_2", headerName : "1교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixSecondReply_1", headerName : "6-2교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixSecondReply_2", headerName : "6-2교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sevenReply_1", headerName : "7교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sevenReply_2", headerName : "7교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand}
];

//7교시용
const columns9: GridColDef[] = [
    { field: 'name', headerName: '이름', width: 150 },
    { field: 'status', headerName: '위치', width: 100, filterable: true },
    { field: 'last', headerName: '마지막 기록', width: 250, filterable: false },
    { field: 'firstReply', headerName: '자리에 없는 이유', width: 400, filterable: false, renderCell: renderCellExpand, editable: true },
    { field: 'secondReply', headerName: '최종 처리', width: 400, filterable: false, renderCell: renderCellExpand, editable: true },
    { field : "sixSecondReply_1", headerName : "6-2교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixSecondReply_2", headerName : "6-2교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixFirstReply_1", headerName : "6-1교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixFirstReply_2", headerName : "6-1교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixReply_1", headerName : "6교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sixReply_2", headerName : "6교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fiveReply_1", headerName : "5교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fiveReply_2", headerName : "5교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fourReply_1", headerName : "4교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "fourReply_2", headerName : "4교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "threeReply_1", headerName : "3교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "threeReply_2", headerName : "3교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "twoReply_1", headerName : "2교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "twoReply_2", headerName : "2교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "oneReply_1", headerName : "1교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "oneReply_2", headerName : "1교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sevenReply_1", headerName : "7교시 상황", width : 100, filterable : false, renderCell : renderCellExpand},
    { field : "sevenReply_2", headerName : "7교시 최종처리", width : 100, filterable : false, renderCell : renderCellExpand}
];

const SecondTotalAttendanceProcess: React.FC<any> = (props) => {
    const classes = useStyles2();
    const [rows, setRows] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [alignment, setAlignment] = React.useState('one');
    const [targetDate, setTargetDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 9));
    const apiRef = useGridApiRef();
    const [name, setName] = useState("");
    const [userData, setUserData] = useState<any>();
    const [bool, setBool] = useState([true, true, true, true, true, true, true]);

    const [inNumber, setInNumber] = useState(0);
    const [outNumber, setOutNumber] = useState(0);

    const [users, setUsers] = useState();
    const [data, setData] = useState();

    const [first, setFirst] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 9));
    const [second, setSecond] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 10, 30));
    const [third, setThird] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 13, 20));
    const [fourth, setFourth] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 14, 50));
    const [fifth, setFifth] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 16, 20));
    const [sixth, setSixth] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 18, 40));
    const [seventh, setSeventh] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 21, 30));
    const [sixFirst, setSixFirst] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 19, 30));
    const [sixSecond, setSixSecond] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 20, 30));



    const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
        items: [
            { id: 2, columnField: 'name', operatorValue: 'contains', value: "" }
        ],
    });


    useEffect(() => {
        setLoading(true);
        var date = targetDate.getTime();
        start(date, "one");
    }, []);

    useEffect(() => {
        var currentDateTime = new Date();
        var index = -1;

        if (currentDateTime.getTime() > first.getTime()) {
            index = 0;
        }
        if (currentDateTime.getTime() > second.getTime()) {
            index = 1;
        }
        if (currentDateTime.getTime() > third.getTime()) {
            index = 2;
        }
        if (currentDateTime.getTime() > fourth.getTime()) {
            index = 3;
        }
        if (currentDateTime.getTime() > fifth.getTime()) {
            index = 4;
        }
        if (currentDateTime.getTime() > sixth.getTime()) {
            index = 5;
        }
        if (currentDateTime.getTime() > seventh.getTime()) {
            index = 6;
        }


        const newBool = bool;

        for (var i = 0; i <= index + 10; i++) {
            newBool[i] = false;
        }

        setBool([...newBool]);

    }, []);

    const start = async (date: number, currentClass : string) => {
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
                    const data = result.data;
                    const reply = result.reply;
                    const users = result.users;

                    setData(data);
                    setUsers(users);

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

                    reply.forEach((eachReply : any)=> {
                        users.forEach((eachUser : any) => {
                            if(eachReply.fingerprintUserId === +eachUser.user_id){
                                eachUser.reply.push(eachReply);
                            }
                        })
                    })

                    

                    users.sort(function (a: any, b: any) {
                        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                    });

                    users.forEach((user: any) => {
                        user.records.forEach((record: any) => {
                            record.realTime = `${new Date(+record.time).getDate()} - ${new Date(+record.time).getHours()} - ${new Date(+record.time).getMinutes()}`;
                            // console.log(record.realTime);
                        })
                    })

                    setUserData(users);
                    filterUsers(users, date, currentClass);
                    setLoading(false);
                })
        })
    }

    const filterUsers = (preParsedUsers: any, targetTime: number, currentClass : string) => {
        preParsedUsers.forEach((user: any) => {
            user.records.forEach((record: any) => {
                record.realTime = `${new Date(+record.time).getDate()} - ${new Date(+record.time).getHours()} - ${new Date(+record.time).getMinutes()}`;
            })
        })

        const parsedUsers: any = [];

        preParsedUsers.forEach((each: any) => {
            if (each.access_groups[0].name === "학생" && each.name !== "Administrator") {
                each.records = each.records.filter((record: any) =>
                    +record.time < targetTime
                );

                each.records.forEach((record: any) => {
                    const specify = new Date(+record.time);
                    record.realTime = `${specify.getDate()}, ${specify.getHours()}, ${specify.getMinutes()}`
                })

                parsedUsers.push(each);
            }
        })

        const newRows: any = [];


        parsedUsers.forEach((user: any) => {
            const oneRow: any = {}
            oneRow.id = user.user_id;
            oneRow.name = user.name;
            user.reply.forEach((eachReply: any) => {
                switch (eachReply.period) {
                    case "one":
                        oneRow.oneReply_1 = eachReply.firstReply;
                        oneRow.oneReply_2 = eachReply.secondReply;
                        break;
                    case "two":
                        oneRow.twoReply_1 = eachReply.firstReply;
                        oneRow.twoReply_2 = eachReply.secondReply;
                        break;
                    case "three":
                        oneRow.threeReply_1 = eachReply.firstReply;
                        oneRow.threeReply_2 = eachReply.secondReply;
                        break;
                    case "four":
                        oneRow.fourReply_1 = eachReply.firstReply;
                        oneRow.fourReply_2 = eachReply.secondReply;
                        break;
                    case "five":
                        oneRow.fiveReply_1 = eachReply.firstReply;
                        oneRow.fiveReply_2 = eachReply.secondReply;
                        break;
                    case "six":
                        oneRow.sixReply_1 = eachReply.firstReply;
                        oneRow.sixReply_2 = eachReply.secondReply;
                        break;
                    case "sixFirst":
                        oneRow.sixFirstReply_1 = eachReply.firstReply;
                        oneRow.sixFirstReply_2 = eachReply.secondReply;
                        break;
                    case "sixSecond":
                        oneRow.sixSecondReply_1 = eachReply.firstReply;
                        oneRow.sixSecondReply_2 = eachReply.secondReply;
                        break;
                    case "seven":
                        oneRow.sevenReply_1 = eachReply.firstReply;
                        oneRow.sevenReply_2 = eachReply.secondReply;
                        break;
                }

                if(eachReply.period === currentClass){
                    oneRow.firstReply = eachReply.firstReply;
                    oneRow.secondReply = eachReply.secondReply;
                }
            });


            if (user.records.length > 0) {
                const lastRecord = user.records[user.records.length - 1];
                const lastTime = new Date(+lastRecord.time);
                oneRow.last = `${lastTime.getHours() < 10 ? "0" + lastTime.getHours() : lastTime.getHours()}:${lastTime.getMinutes() < 10 ? "0" + lastTime.getMinutes() : lastTime.getMinutes()}`;

                const location = lastRecord.direction === "outside" ? "IN" : "OUT";
                oneRow.status = location;
                if (location === "IN") {
                    oneRow.last = oneRow.last + "에 들어옴";
                } else if (location === "OUT") {
                    oneRow.last = oneRow.last + "에 나감";
                    const delayMinutes = Math.floor((targetTime - lastTime.getTime())/60000);
                    const delay = `${Math.floor(delayMinutes/60)}시간 ${delayMinutes%60}분 경과`
                    oneRow.last = oneRow.last + `(${delay})`;
                }
            } else {
                oneRow.last = `${new Date(targetTime).getHours() < 10 ? "0" + new Date(targetTime).getHours() : new Date(targetTime).getHours()}:${new Date(targetTime).getMinutes() < 10 ? "0" + new Date(targetTime).getMinutes() : new Date(targetTime).getMinutes()}까지 기록 없음`;
                oneRow.status = "OUT";
            }

            newRows.push(oneRow);
        })

        newRows.sort(function (a: any, b: any) {
            if (a.status === "IN" && b.status === "OUT") {
                return 1;
            } else if (a.status === "OUT" && b.status === "IN") {
                return -1;
            } else {
                return 0;
            }
        })

        newRows.sort(function (a: any, b: any) {
            if (a.last.split(" ")[2] === "없음" && b.last.split(" ")[2] !== "없음") {
                return -1;
            } else if (a.last.split(" ")[2] === "없음" && b.last.split(" ")[2] !== "없음") {
                return 1;
            } else {
                return 0;
            }
        })
        setRows([...newRows]);

    }

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);

        switch (newAlignment) {
            case "one":
                setRows([]);
                setLoading(true);
                var newDate = targetDate;
                newDate.setHours(9, 0);
                setTargetDate(newDate);
                start(newDate.getTime(), newAlignment);
                break;
            case "two":
                setRows([]);
                setLoading(true);
                var newDate = targetDate;
                newDate.setHours(10, 30);
                setTargetDate(newDate);
                start(newDate.getTime(), newAlignment);
                break;
            case "three":
                setRows([]);
                setLoading(true);
                var newDate = targetDate;
                newDate.setHours(13, 20);
                setTargetDate(newDate);
                start(newDate.getTime(), newAlignment);
                break;
            case "four":
                setRows([]);
                setLoading(true);
                var newDate = targetDate;
                newDate.setHours(14, 50);
                setTargetDate(newDate);
                start(newDate.getTime(), newAlignment);
                break;
            case "five":
                setRows([]);
                setLoading(true);
                var newDate = targetDate;
                newDate.setHours(16, 20);
                setTargetDate(newDate);
                start(newDate.getTime(), newAlignment);
                break;
            case "six":
                setRows([]);
                setLoading(true);
                var newDate = targetDate;
                newDate.setHours(18, 40);
                setTargetDate(newDate);
                start(newDate.getTime(), newAlignment);
                break;
            case "sixFirst":
                setRows([]);
                setLoading(true);
                var newDate = targetDate;
                newDate.setHours(19, 30);
                setTargetDate(newDate);
                start(newDate.getTime(), newAlignment);
                break;
            case "sixSecond":
                setRows([]);
                setLoading(true);
                var newDate = targetDate;
                newDate.setHours(20, 30);
                setTargetDate(newDate);
                start(newDate.getTime(), newAlignment);
                break;
            case "seven":
                setRows([]);
                setLoading(true);
                var newDate = targetDate;
                newDate.setHours(21, 30);
                setTargetDate(newDate);
                start(newDate.getTime(), newAlignment);
                break;
        }
    };

    const handleCommit = async (e: any) => {

        const fingerprintUserId = e.id;
        const field = e.field;
        var value = e.value;

        if (!value) {
            value = "";
        }

        const data = {
            fingerprintUserId,
            field,
            value,
            alignment
        }

        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/report/attendanceProcess", {
            method: "POST",
            headers: { "Authorization": token, "Content-Type" : "application/json" },
            credentials: "include",
            body : JSON.stringify(data)
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result.body);
                })
        })
    }


    const tableChange = () => {
        const params = apiRef.current.getVisibleRowModels();

        var validationCount = 0;
        var inCount = 0;
        var outCount = 0;

        if(params.size){
            params.forEach((each : any)=>{
                if(each){
                    if(each.status === "OUT"){
                        outCount++;
                    }else if(each.status === "IN"){
                        inCount++;
                    }
                }
            })
        }

        setInNumber(inCount);
        setOutNumber(outCount);
    }

    const previousDay = () => {
        setRows([]);
        setLoading(true);
        const newDate = targetDate;
        newDate.setDate(newDate.getDate()-1);
        setTargetDate(newDate);
        start(newDate.getTime(), alignment);
    }

    const nextDay = () => {
        setRows([]);
        setLoading(true);
        const newDate = targetDate;
        newDate.setDate(newDate.getDate()+1);
        setTargetDate(newDate);
        start(newDate.getTime(), alignment);
    }



    return (
        <div>
            <div style={{display : "flex", justifyContent : "space-between"}}>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton disabled={bool[0]} value="one"><span style={{ fontFamily: "Apple_B" }}>1교시</span></ToggleButton>
                    <ToggleButton disabled={bool[1]} value="two"><span style={{ fontFamily: "Apple_B" }}>2교시</span></ToggleButton>
                    <ToggleButton disabled={bool[2]} value="three"><span style={{ fontFamily: "Apple_B" }}>3교시</span></ToggleButton>
                    <ToggleButton disabled={bool[3]} value="four"><span style={{ fontFamily: "Apple_B" }}>4교시</span></ToggleButton>
                    <ToggleButton disabled={bool[4]} value="five"><span style={{ fontFamily: "Apple_B" }}>5교시</span></ToggleButton>
                    <ToggleButton disabled={bool[5]} value="six"><span style={{ fontFamily: "Apple_B" }}>6교시</span></ToggleButton>
                    <ToggleButton disabled={bool[6]} value="sixFirst"><span style={{ fontFamily: "Apple_B" }}>6-1교시</span></ToggleButton>
                    <ToggleButton disabled={bool[7]} value="sixSecond"><span style={{ fontFamily: "Apple_B" }}>6-2교시</span></ToggleButton>
                    <ToggleButton disabled={bool[8]} value="seven"><span style={{ fontFamily: "Apple_B" }}>6-3교시</span></ToggleButton>

                </ToggleButtonGroup>

                <div style={{ marginTop: "16px", fontFamily: "Apple_R" }}>
                    <div>
                        기준 시간 : {targetDate.getMonth() + 1}월 {targetDate.getDate()}일 {targetDate.getHours() < 10 ? "0" + targetDate.getHours() : targetDate.getHours()}시 {targetDate.getMinutes() < 10 ? "0" + targetDate.getMinutes() : targetDate.getMinutes()}분
                    </div>
                </div>
            </div>
            <div style={{display : "flex", justifyContent : "end", marginTop : "12px"}}>
                <div style={{ fontSize: "18px", fontFamily: "Apple_B" }}>
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button onClick={previousDay}>◁</Button>
                        <Button onClick={nextDay}>▷</Button>
                    </ButtonGroup>
                </div>
            </div>
            

            <div>
                <div style={{marginTop : "16px", fontFamily : "Apple_B"}}>
                    지각/결석 검사
                </div>
                <div className={classes.root} style={{ height: 500, width: '100%', backgroundColor: "white", marginTop: "8px" }}>

                    <DataGridPro loading={loading} rows={rows} columns={(alignment === "one" || alignment === "two") ? columns1 : alignment === "three" ? columns3 : alignment === "four" ? columns4 : alignment === "five" ? columns5 : alignment === "six" ? columns6 : alignment === "sixFirst" ? columns7 : alignment === "sixSecond" ? columns8 : alignment === "seven" ? columns9 : columns1}
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

            <div>
                <div style={{fontFamily : "Apple_R", fontSize : "14px"}}>
                    OUT : {outNumber}명 / IN : {inNumber}명
                </div>
            </div>

            {
                (users && data && targetDate) &&
                <SecondOutingTest data={data} users={users} targetDate={targetDate} />
            }
            
        </div>
    )
}

export default SecondTotalAttendanceProcess;