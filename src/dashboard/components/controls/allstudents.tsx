import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import koLocale from 'date-fns/locale/ko'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { GridCellParams, GridApiRef, GridRenderCellParams, DataGridPro, GridRowsProp, GridColumns, GridColDef, GridToolbar, LicenseInfo, useGridApiRef, GridEditRowsModel, GridFilterModel, } from '@mui/x-data-grid-pro';
import { eachDayOfInterval } from 'date-fns';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { createStyles, makeStyles } from '@mui/styles';
import { createTheme, darken, lighten } from '@mui/material/styles';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import LinearProgress from '@mui/material/LinearProgress';
import { Alert, MenuItem, Stack } from '@mui/material';
import renderCellExpand from '../data/rendercellexpand';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import CalendarModal from './calendarmodal';


import styles from "../../componentsStyle/upload.module.css"

import {
    MuiEvent,
    GridEvents,
    useGridApiContext,
} from '@mui/x-data-grid-pro';
import { GridRowModel } from '@mui/x-data-grid';

LicenseInfo.setLicenseKey("e3ec4d79d1fa1f36cc88ecffd4e68392T1JERVI6MzMyMjMsRVhQSVJZPTE2NjkzODUyMDIwMDAsS0VZVkVSU0lPTj0x");


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "24px",
    boxShadow: 24,
    p: 3,
    paddingLeft: 5,
    paddingRight: 5
};

const style2 = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '1420px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    backgroundColor: "#f5f5f5",
    display : "flex",
    justifyContent : "center",
    pt: 1,
    pb: 4,
    borderRadius: "8px",
};


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
            },
        };
    },
    { defaultTheme },
);


function SelectEditInputCell(props: GridRenderCellParams) {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();
    const [teachersList, setTeachersList] = useState<any>([{id : 1, name : "고용범"}]);

    useEffect(() => {
        const start = async () => {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/avatar/teachers", {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        setTeachersList(result.data);
                    })
            })
        }

        start();
    }, [])

    const handleChange = async (event: SelectChangeEvent) => {
        console.log(id, field, +event.target.value);

        fetch("https://peetsunbae.com/dashboard/avatar/teacher", {
            method : "POST",
            headers : {"content-type" : "application/json"},
            credentials : "include",
            body : JSON.stringify({
                userId : +id,
                teacherId : +event.target.value
            })
        }).then((response : any)=>{
            response.json()
            .then((result : any)=>{
                console.log(result);
            })
        })

        console.log(event.target);
        if(!event.target.value){
            event.target.value = "";
        }
        var teacherName = "";
        teachersList.forEach((each : any) => {
            if(+each.id === +event.target.value){
                teacherName = each.name;
            }
        })

        await apiRef.current.setEditCellValue({ id, field, value: teacherName });
        apiRef.current.stopCellEditMode({ id, field });
    };

    return (
        <Select
            value={value}
            onChange={handleChange}
            size="small"
            sx={{ height: 1 }}
            native
            autoFocus
        >   
            <option key={1} value={1}>
                ----------
            </option>
            {
                teachersList.map((each : any) => {
                    return (
                        <option key={each.id} value={each.id}>
                            {each.name}
                        </option>
                    )
                })
            }
        </Select>
    );
}
  
  const renderSelectEditInputCell: GridColDef['renderCell'] = (params) => {
    return <SelectEditInputCell {...params} />;
  };



const columns: GridColDef[] = [
    { field: 'name', headerName: '이름', width: 120, filterable: true, editable: false },
    { field: 'kind', headerName: '직책', width: 120, filterable: true, editable: false },
    { field: 'status', headerName: '재원중', width: 120, filterable: true, editable: true, type: "boolean" },
    { field: 'phoneNumber', headerName: '전화번호', width: 120, filterable: true, editable: false },
    { field: 'location', headerName: '호점', width: 120, filterable: true, editable: true },
    { field: 'room', headerName: '열람실', width: 120, filterable: true, editable: true },
    { field: 'seat', headerName: '자리', width: 120, filterable: true, editable: true },
    { field: 'demerit', headerName: '이번달 벌점', width: 120, filterable: true, editable: false },
    { field: 'parentPhoneNumber', headerName: '부모님번호', width: 120, filterable: true, editable: true },
    { field: 'teacher', headerName: '담임', width: 120, filterable: true, editable: true, renderEditCell: renderSelectEditInputCell },
    { field: 'teacherDescription', headerName: '담임 배정 이유', width: 120, filterable: true, editable: true, renderCell: renderCellExpand },
    { field: 'chargedMoney', headerName: '충전금잔액', width: 120, filterable: true, editable: false },
    { field: 'fingerprintId', headerName: '지문인식ID', width: 120, filterable: true, editable: true },
    { field: 'firstCome', headerName: '첫 등원', width: 120,type : "date", filterable: true, editable: true },
    { field: 'createdAt', headerName: '회원가입일', width: 120, filterable: true, editable: false },
];




const AllStudents: React.FC<any> = (props) => {
    const classes = useStyles2();
    const [rows, setRows] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [demeritLoading, setDemeritLoading] = useState(false);

    const [editRowsModel, setEditRowsModel] = React.useState({});

    const [selectedUserId, setSelectedUserId] = useState();
    const [selectedUserFingerprintId, setSelectedUserFingerprintId ] = useState();
    const [selectedUserName, setSelectedUserName] = useState();
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = useState(false);
    const [uploadBool, setUploadBool] = useState(false);
    const [active, setActive] = useState(true);
    const [message, setMessage] = useState("");
    const [score, setScore] = useState(0);

    const [update, setUpdate] = useState(0);
    const [name, setName] = useState("");

    const apiRef = useGridApiRef();

    const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
        items: [
            { id: 2, columnField: 'name', operatorValue: 'contains', value: "" },
            { id : 3, columnField : "status", operatorValue : "is", value : "true"}
        ],
    });

    const nameChange = (e: any) => {
        setName(e.target.value);
        console.log(filterModel);

        const newFilterModel: any = filterModel;
        newFilterModel.items.forEach((each: any) => {
            if (each.id === 2) {
                each.value = e.target.value;
            }
        })
        setFilterModel({ ...newFilterModel });
    }


    const handleClick = (e : any) => {  setSelectedUserFingerprintId(e.row.fingerprintId); setSelectedUserId(e.id); setSelectedUserName(e.row.name);}
    const handleOpen = () => { if (selectedUserFingerprintId) setOpen(true); }
    const handleClose = () => { setActive(true); setOpen(false); setScore(0); setMessage("") }

    const handleOpen2 = () => { if (selectedUserFingerprintId) setOpen2(true); }
    const handleClose2 = () => { setOpen2(false); }


    

    const changeMessage = (e: any) => {
        setMessage(e.target.value);
        if (e.target.value) {
            setActive(false);
        }
    }

    const submit = async (e: any) => {
        setDemeritLoading(true);
        console.log(selectedUserFingerprintId);
        console.log(score);
        console.log(message);

        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch(`https://peetsunbae.com/dashboard/avatar/addDemerit`, {
            method: "post",
            headers: { "Authorization": token, "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                userId: selectedUserFingerprintId,
                score: score,
                description: message
            })
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result.message);
                    if (result.message === "success") {
                        setDemeritLoading(false);
                        setUploadBool(true);
                        setTimeout(() => {
                            setUploadBool(false);
                        }, 1000);
                        setScore(0);
                        setMessage("");
                        setUpdate(Math.random());
                    }
                })
        })
    }



    useEffect(() => {
        setLoading(true);

        const start = async () => {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/avatar/users", {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {

                        console.log(result);
                        const newRows: any = [];
                        result.data.forEach((each: any) => {
                            const oneRow: any = {};
                            const date = new Date(+each.createdAt);
                            oneRow.id = each.id;
                            oneRow.name = each.name;
                            var value;
                            switch (each.value) {
                                case "teacher":
                                    value = "직원";
                                    break;
                                case "parent":
                                    value = "학부모";
                                    break;
                                case "student":
                                    value = "학생";
                                    break;
                            }
                            oneRow.kind = value;
                            if(each.isNow === 0){
                                oneRow.status = false;
                            }
                            if(each.isNow === null){
                                oneRow.status = true;
                            }
                            if(each.isNow === 1){
                                oneRow.status = true;
                            }
                            oneRow.phoneNumber = each.phoneNumber;
                            oneRow.location = each.location;
                            oneRow.locationId = each.locationId;
                            oneRow.room = each.room;
                            oneRow.seat = each.seat;
                            oneRow.demerit = each.demeritScore ? each.demeritScore : 0;
                            oneRow.parentPhoneNumber = each.parentPhoneNumber;
                            oneRow.chargedMoney = each.amount ? each.amount : 0;
                            oneRow.fingerprintId = each.fingerprintId;
                            oneRow.firstCome = each.firstCome;
                            if(each.firstCome){
                                oneRow.firstCome = new Date(each.firstCome);
                            }
                            oneRow.createdAt = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                            oneRow.teacher = each.teacherName;
                            oneRow.teacherId = each.teacherId;
                            oneRow.teacherDescription = each.description;
                            newRows.push(oneRow);
                        })
                        setRows([...newRows]);
                        setLoading(false);
                    })
            })
        }

        start();
    }, [update]);




    const handleEditCommit = React.useCallback(
        async (newRow : GridRowModel, old : any) => {
            var field = "";
            console.log("new");
            
            for (const [key, value] of Object.entries(newRow)){
                if(value !== old[key]){
                    field = key;
                    console.log(field);
                }
            }

            if(field === "status"){
                console.log(newRow.id);
                console.log(newRow.status);
                

                fetch("https://peetsunbae.com/dashboard/avatar/userDetail", {
                    method : "POST",
                    headers : {"content-type" : "application/json"},
                    credentials : "include",
                    body : JSON.stringify({
                        userId : newRow.id,
                        value : newRow[field] ? newRow[field] : false,
                        field
                    })
                }).then((response : any)=>{
                    response.json()
                    .then((result : any)=>{
                        console.log(result);
                    })
                })
            }


            if (field === "parentPhoneNumber" || field === "fingerprintId") {

                fetch("https://peetsunbae.com/dashboard/avatar/userDetail", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        userId: newRow.id,
                        value:  newRow[field] ? newRow[field] : "",
                        field
                    })
                }).then((response: any) => {
                    response.json()
                        .then((result: any) => {
                            console.log(result);
                        })
                })

            }

            if (field === "firstCome" ){

                var value : any = null;

                const rowValue = newRow[field];

                if(rowValue){
                    const date = new Date(rowValue);
                    value = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} 00:00:00`
                }
                
                fetch("https://peetsunbae.com/dashboard/avatar/userDetail", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        userId: newRow.id,
                        value: value,
                        field
                    })
                }).then((response: any) => {
                    response.json()
                        .then((result: any) => {
                            console.log(result);
                        })
                })
            }

            //mysql상 user table 아니고 teacher table 이라 분리해놨음
            if(field === "teacherDescription"){
                fetch("https://peetsunbae.com/dashboard/avatar/userDetail", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        userId: newRow.id,
                        value: newRow[field] ? newRow[field] : "",
                        field
                    })
                }).then((response: any) => {
                    response.json()
                        .then((result: any) => {
                            console.log(result);
                        })
                })
            }


            if(field === "location" || field === "room" || field === "seat"){
                fetch("https://peetsunbae.com/dashboard/avatar/userDetail", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        userId: newRow.id,
                        value: newRow[field] ? newRow[field] : "",
                        field
                    })
                }).then((response: any) => {
                    response.json()
                        .then((result: any) => {
                            console.log(result);
                        })
                })
            }
            

            return newRow;
      }, []
    );

    const handleProcessRowUpdateError = React.useCallback((error: Error) => {
        console.log("error");
        alert(error.message);
      }, []);




    return (
        <div>
            <div style={{ marginBottom: "12px", display: "flex", justifyContent: "space-between" }}>
                <div>
                    <Button onClick={handleOpen} sx={{marginRight : "8px"}} variant="outlined">벌점 추가</Button>
                    <Button onClick={handleOpen2} variant="outlined">출입기록 및 벌점</Button>
                </div>
                <div>
                    <TextField value={name} onChange={nameChange} id="standard-basic" placeholder="이름을 검색하세요" variant="standard" />
                </div>
            </div>
            <div className={classes.root} style={{ height: 500, width: '100%', backgroundColor: "white" }}>
                <DataGridPro loading={loading} rows={rows} columns={columns}
                    density='compact'
                    filterModel={filterModel}
                    onFilterModelChange={(model) => setFilterModel(model)}
                    experimentalFeatures={{ newEditingApi: true }}
                    onRowClick={handleClick}
                    processRowUpdate={handleEditCommit}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                    isCellEditable={(params : any) => {
                        if(params.field === "teacherDescription"){
                            if(!apiRef.current.getCellValue(params.id, "teacher")){
                                return false;
                            }else{
                                return true;
                            }
                        }else{
                            return true
                        }
                    }}
                    apiRef={apiRef}
                />
            </div>
            <div className={styles.mysearchDescription}>
                * 미답변 메세지 - 파랑색<br />
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ fontFamily: "Apple_B", marginBottom: "12px" }}>
                        {selectedUserName}
                    </div>
                    <div className={styles.messageTitle}>
                        벌점
                    </div>
                    <div className={styles.autocompleteDiv}>
                        <TextField
                            type="number"
                            fullWidth
                            margin='dense'
                            value={score}
                            onChange={(e: any) => { setScore(e.target.value); }}
                        />
                    </div>
                    <div style={{ marginTop: "8px" }} className={styles.messageTitle}>
                        사유
                    </div>
                    <div className={styles.textfieldDiv}>
                        <TextField margin='dense' value={message} onChange={(e) => { changeMessage(e) }} fullWidth id="outlined-basic" placeholder="벌점 부여 사유" variant="outlined" />
                    </div>


                    {demeritLoading &&
                        <Box sx={{ width: '100%', marginTop: 3, marginBottom: 3 }}>
                            <LinearProgress />
                        </Box>
                    }



                    {uploadBool &&
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="info" sx={{ marginTop: 2, marginBottom: 2 }}><span className={styles.spanStyles2}>업로드 성공 !</span></Alert>
                        </Stack>
                    }

                    <div style={{ display: "flex", justifyContent: "end", marginTop: "16px" }}>
                        <Button onClick={submit} disabled={active} variant="contained"><span style={{ fontFamily: "Apple_R" }}>전송하기</span></Button>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={open2}
                onClose={handleClose2}
            >
                <Box sx={style2}>
                    <CalendarModal user={{id : selectedUserId}} />
                </Box>
            </Modal>
        </div>
    )
}

export default AllStudents;

