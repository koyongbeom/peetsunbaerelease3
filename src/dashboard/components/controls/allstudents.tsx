import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import koLocale from 'date-fns/locale/ko'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { GridCellParams, GridApiRef, GridRenderCellParams, DataGridPro, GridRowsProp, GridColumns, GridColDef, GridToolbar, LicenseInfo, useGridApiRef, GridEditRowsModel, GridFilterModel,  } from '@mui/x-data-grid-pro';
import { eachDayOfInterval } from 'date-fns';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { createStyles, makeStyles } from '@mui/styles';
import { createTheme, darken, lighten } from '@mui/material/styles';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import LinearProgress from '@mui/material/LinearProgress';
import { Alert, Stack } from '@mui/material';
import renderCellExpand from '../data/rendercellexpand';

import Select, { SelectChangeEvent } from '@mui/material/Select';


import styles from "../../componentsStyle/upload.module.css"

import {
    MuiEvent,
    GridEvents,
    useGridApiContext,

  } from '@mui/x-data-grid-pro';

LicenseInfo.setLicenseKey("e3ec4d79d1fa1f36cc88ecffd4e68392T1JERVI6MzMyMjMsRVhQSVJZPTE2NjkzODUyMDIwMDAsS0VZVkVSU0lPTj0x");


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius : "24px",
    boxShadow: 24,
    p: 3,
    paddingLeft : 5,
    paddingRight : 5
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

interface EditToolbarProps {
    selectedCellParams?: any;
    setSelectedCellParams: (value: any) => void;
  }
  
  function EditToolbar(props: EditToolbarProps) {
    const apiRef : any = useGridApiContext();
    const { selectedCellParams, setSelectedCellParams } = props;
  
    const handleClick = async () => {
      if (!selectedCellParams) {
        return;
      }
      const { id, field, cellMode } = selectedCellParams;
      if (cellMode === 'edit') {
        apiRef.current.stopCellEditMode({ id, field });
        setSelectedCellParams({ ...selectedCellParams, cellMode: 'view' });
      } else {
        apiRef.current.startCellEditMode({ id, field });
        setSelectedCellParams({ ...selectedCellParams, cellMode: 'edit' });
      }
    };
  
    const handleMouseDown = (event: React.MouseEvent) => {
      // Keep the focus in the cell
      event.preventDefault();
    };
  
    return (
      <Box
        sx={{
          justifyContent: 'center',
          display: 'flex',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Button
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          disabled={!selectedCellParams}
          color="primary"
        >
          {selectedCellParams?.cellMode === 'edit' ? 'Save' : 'Edit'}
        </Button>
      </Box>
    );
  }




const columns: GridColDef[] = [
    { field: 'name', headerName: '이름', width: 120, filterable: true, editable: false },
    { field: 'kind', headerName: '직책', width: 120, filterable: true, editable: false },
    { field: 'status', headerName: '재원중', width: 120, filterable: true, editable: true, type : "boolean" },
    { field: 'phoneNumber', headerName: '전화번호', width: 120, filterable: true, editable: false },
    { field: 'location', headerName: '호점', width: 120, filterable: true, editable: false },
    { field: 'room', headerName: '열람실', width: 120, filterable: true, editable: false },
    { field: 'seat', headerName: '자리', width: 120, filterable: true, editable: false },
    { field: 'demerit', headerName: '이번달 벌점', width: 120, filterable: true, editable: false },
    { field: 'parentPhoneNumber', headerName: '부모님번호', width: 120, filterable: true, editable: false },
    { field: 'chargedMoney', headerName: '충전금잔액', width: 120, filterable: true, editable: false },
    { field: 'fingerprintId', headerName: '지문인식ID', width: 120, filterable: true, editable: true },
    { field: 'firstCome', headerName: '첫 등원', width: 120, filterable: true, editable: false },
    { field: 'createdAt', headerName: '회원가입일', width: 120, filterable: true, editable: false },
    { field: 'teacher', headerName: '담임', width: 120, filterable: true, editable: true },
    { field: 'teacherDescription', headerName: '담임 배정 이유', width: 120, filterable: true, editable: false, renderCell: renderCellExpand },
];

const AllStudents: React.FC<any> = (props) => {
    const classes = useStyles2();
    const [rows, setRows] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [demeritLoading, setDemeritLoading] = useState(false);

    const [editRowsModel, setEditRowsModel] = React.useState({});

    const apiRef = useGridApiRef();

    const [selectedUserId, setSelectedUserId] = useState();
    const [selectedUserName, setSelectedUserName] = useState();
    const [open, setOpen] = React.useState(false);
    const [uploadBool, setUploadBool] = useState(false);
    const [active, setActive] = useState(true);
    const [message, setMessage] = useState("");
    const [score, setScore] = useState(0);

    const [update, setUpdate] = useState(0);
    const [name, setName] = useState("");

    const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
        items: [
            { id: 2, columnField: 'name', operatorValue: 'contains', value: "" }
        ],
    });

    const [selectedCellParams, setSelectedCellParams] =
    React.useState<GridCellParams | null>(null);

    const nameChange = (e : any) => {
        setName(e.target.value);
        
        const newFilterModel : any = filterModel;
        newFilterModel.items.forEach((each : any)=>{
            if(each.id === 2){
                each.value = e.target.value;
            }
        })
        setFilterModel({...newFilterModel});
    }



    const handleOpen = () => {if(selectedUserId)setOpen(true);}
    const handleClose = () => {setActive(true); setOpen(false); setScore(0); setMessage("")}

    const changeMessage = (e : any) => {
        setMessage(e.target.value);
        if(e.target.value){
            setActive(false);
        }
    }

    const submit = async (e : any) => {
        setDemeritLoading(true);
        console.log(selectedUserId);
        console.log(score);
        console.log(message);

        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch(`https://peetsunbae.com/dashboard/avatar/addDemerit`, {
            method: "post",
            headers: { "Authorization": token, "Content-Type" : "application/json" },
            credentials: "include",
            body : JSON.stringify({
                userId : selectedUserId,
                score : score,
                description : message
            })
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result.message);
                    if(result.message === "success"){
                        setDemeritLoading(false);
                        setUploadBool(true);
                        setTimeout(()=>{
                            setUploadBool(false);
                        }, 1000);
                        setScore(0);
                        setMessage("");
                        setUpdate(Math.random());
                    }
                })
        })
    }


    const handleCellClick = React.useCallback((params: GridCellParams) => {
        setSelectedCellParams(params);
      }, []);
    
      const handleCellEditStart = (
        params: GridCellParams,
        event: MuiEvent<React.SyntheticEvent>,
      ) => {
        event.defaultMuiPrevented = true;
      };
    
      const handleCellEditStop: any = (
        params : any,
        event : any,
      ) => {
        event.defaultMuiPrevented = true;
      };



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
                            oneRow.createdAt = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                            oneRow.teacher = each.teacherName;
                            oneRow.teacherId = each.teacherId;
                            newRows.push(oneRow);
                        })
                        setRows([...newRows]);
                        setLoading(false);
                    })
            })
        }

        start();
    }, [update]);

    const handleCommit = async (e: any) => {
        console.log(e);
        const id = e.id;
        const field = e.field;
        var value = e.value;
        console.log(id, field, value);

        if (!value) {
            value = "";
        }

        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        // fetch(`https://peetsunbae.com/dashboard/envelope/message`, {
        //     method: "PATCH",
        //     headers: { "Authorization": token, "Content-Type" : "application/json" },
        //     credentials: "include",
        //     body : JSON.stringify({
        //         id, field, value
        //     })
        // }).then((response: any) => {
        //     response.json()
        //         .then((result: any) => {
        //             props.unreadMessage();
        //             console.log(result);
        //         })
        // })
    }



    return (
        <div>
            <div style={{marginBottom : "12px", display : "flex", justifyContent : "space-between"}}>
                <div>
                    <Button onClick={handleOpen} variant="outlined">벌점 추가</Button>
                </div>
                <div>
                    <TextField value={name} onChange={nameChange} id="standard-basic" placeholder="이름을 검색하세요" variant="standard" />
                </div>
            </div>
            <div className={classes.root} style={{ height: 500, width: '100%', backgroundColor: "white" }}>
                <DataGridPro loading={loading} rows={rows} columns={columns}
                    density='compact'

                    onCellClick={handleCellClick}
                    onCellEditStart={handleCellEditStart}
                    onCellEditStop={handleCellEditStop}
                    components={{
                        Toolbar: EditToolbar,
                    }}
                    componentsProps={{
                        toolbar: {
                            selectedCellParams,
                            setSelectedCellParams,
                        },
                    }}
                    experimentalFeatures={{newEditingApi : true}}
                    filterModel={filterModel}
                    onFilterModelChange={(model) => setFilterModel(model)}
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
                    <div style={{fontFamily : "Apple_B", marginBottom : "12px"}}>
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
                            onChange={(e : any)=>{setScore(e.target.value);}}
                        />
                    </div>
                    <div style={{marginTop : "8px"}} className={styles.messageTitle}>
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

                    <div style={{display : "flex", justifyContent : "end", marginTop : "16px"}}>
                        <Button onClick={submit} disabled={active} variant="contained"><span style={{fontFamily : "Apple_R"}}>전송하기</span></Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default AllStudents;