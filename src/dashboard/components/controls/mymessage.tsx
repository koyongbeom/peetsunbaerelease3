import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import koLocale from 'date-fns/locale/ko'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { GridCellParams, GridApiRef, GridRenderCellParams,DataGridPro, GridRowsProp, GridColumns, GridColDef, GridToolbar, LicenseInfo, useGridApiRef, GridEditRowsModel, GridFilterModel } from '@mui/x-data-grid-pro';
import { eachDayOfInterval } from 'date-fns';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { createStyles, makeStyles } from '@mui/styles';
import styles from '../../componentsStyle/upload.module.css';
import { createTheme, darken, lighten } from '@mui/material/styles';
import Button from '@mui/material/Button';
import renderCellExpand from '../data/rendercellexpand';

LicenseInfo.setLicenseKey("e3ec4d79d1fa1f36cc88ecffd4e68392T1JERVI6MzMyMjMsRVhQSVJZPTE2NjkzODUyMDIwMDAsS0VZVkVSU0lPTj0x");


const defaultTheme = createTheme();
const useStyles2 = makeStyles(
  (theme) => {
    const getBackgroundColor = (color : any) =>
      theme.palette.mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

    const getHoverBackgroundColor = (color : any) =>
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
        '& .from' : {
          color : theme.palette.warning.main
        },
        '& .to' : {
          color : theme.palette.info.main
        }
      },
    };
  },
  { defaultTheme },
);




LicenseInfo.setLicenseKey("e3ec4d79d1fa1f36cc88ecffd4e68392T1JERVI6MzMyMjMsRVhQSVJZPTE2NjkzODUyMDIwMDAsS0VZVkVSU0lPTj0x");

const columns: GridColDef[] = [
    { field: 'name', headerName: '이름', width: 120, editable : false},
    { field: 'description', headerName: '내용', width: 730, renderCell: renderCellExpand, filterable : false, editable : false },
    { field: 'time', headerName: '전송시간', width: 160, filterable : false, editable : false},
  ];

const MyMessage : React.FC<any> = (props) => {
    const classes = useStyles2();
    const [rows, setRows] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [editRowsModel, setEditRowsModel] = React.useState({});
    const [update, setUpdate] = useState(0);
    const apiRef = useGridApiRef();
    const [name, setName] = useState("");

    const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
      items: [
          { id: 2, columnField: 'name', operatorValue: 'contains', value: "" }
      ],
  });

    const nameChange = (e : any) => {
      console.log(filterModel);
      setName(e.target.value);
      console.log(111);
      const newFilterModel : any = filterModel;
      newFilterModel.items.forEach((each : any)=>{
          if(each.id === 2){
              each.value = e.target.value;
          }
      })
      console.log(newFilterModel);
      setFilterModel({...newFilterModel});
    }

    useEffect(() => {
        setLoading(true);


        const start = async () => {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/envelope/message", {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        setLoading(false);
                        console.log(result);
                        const newRows : any = [];
                        result.data.forEach((each : any)=>{
                            const oneRow : any = {};
                            const createdAt = new Date(each.createdAt);
                            var ampm : string;
                            var hours : number;
                            if(createdAt.getHours() >= 12){
                                ampm = "오후";
                                hours = createdAt.getHours() - 12;
                                if(hours === 0){
                                    hours = 12;
                                }
                            }else{
                                ampm = "오전";
                                hours = createdAt.getHours()
                            }
                            oneRow.id = each.id;
                            oneRow.name = each.direction === "from" ? each.toUserName : each.fromUserName;
                            oneRow.time = `${createdAt.getMonth()+1}월${createdAt.getDate()}일 ${ampm} ${hours < 10 ? "0" + hours : hours}:${createdAt.getMinutes() < 10 ? "0" + createdAt.getMinutes() : createdAt.getMinutes()}`
                            oneRow.description = each.message;
                            oneRow.answer = each.answer;
                            oneRow.direction = each.direction;
                            newRows.push(oneRow);
                        })
                        console.log(11);
                        setRows([...newRows]);
                        props.unreadMessage();
                    })
            })
        }

        start();
    }, [props.update]);



  return (
    <div>
      <div className={styles.mysearchDate}>
        <div className={styles.caution}>
          - 꼭! 메세지 확인 후 답변 보내주세요.(수월한 업무처리 도와주세요!)<br></br>
        </div>
        <div>
            <TextField value={name} onChange={nameChange} id="standard-basic" placeholder="이름을 검색하세요" variant="standard" />
        </div>
      </div>
      <div className={classes.root} style={{ height: 500, width: '100%', backgroundColor: "white" }}>
        <DataGridPro loading={loading} rows={rows} columns={columns}
          density="compact"
          apiRef={apiRef}
          filterModel={filterModel}
          onFilterModelChange={(model) => setFilterModel(model)}
          getRowClassName={(params) => {
            if(params.getValue(params.id, "direction") === "from"){
              return (
                `from`
              )
            }else{
              return (
                `to`
              )
            }
          }
          }
        />
      </div>
      <div className={styles.mysearchDescription}>
        * 전송한 메세지 : 빨간색, 수신한 메세지 : 파란색<br />
      </div>
    </div>
  )
}

export default MyMessage;