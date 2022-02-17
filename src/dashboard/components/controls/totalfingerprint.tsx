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


LicenseInfo.setLicenseKey("e3ec4d79d1fa1f36cc88ecffd4e68392T1JERVI6MzMyMjMsRVhQSVJZPTE2NjkzODUyMDIwMDAsS0VZVkVSU0lPTj0x");

const columns: GridColDef[] = [
  { field: 'direction', headerName: '방향', width: 100, renderCell: renderCellExpand, filterable: false },
  { field: 'time', headerName: '시간', width: 120, filterable: false },
  { field: 'name', headerName: '이름', width: 150, renderCell: renderCellExpand },
  { field: 'value', headerName: '출입그룹', width: 150, renderCell: renderCellExpand, filterable: true },
];

const TotalFingerprint: React.FC<any> = (props) => {
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

  const start = async (date : number) => {
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
          console.log(data);
          const newRows: any = [];
          data.forEach((each: any, number: number) => {
            const oneRow: any = {};
            oneRow.id = each.id;
            oneRow.name = each.name;
            oneRow.value = each.accessGroup;
            oneRow.direction = each.direction === "outside" ? "ENTER" : "EXIT"
            const createdAt = new Date(+each.time);
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
            oneRow.time = `${ampm} ${hours < 10 ? "0" + hours : hours}:${createdAt.getMinutes() < 10 ? "0" + createdAt.getMinutes() : createdAt.getMinutes()}`
            newRows.push(oneRow);
          });
          setRows([...newRows]);
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

  const previousDay = (e: any) => {
    setRows([]);
    setLoading(true);
    console.log(1);
    var newTargetDate = targetDate;
    newTargetDate.setDate(newTargetDate.getDate() - 1);
    setTargetDate(newTargetDate);
    start(newTargetDate.getTime());
  }

  const nextDay = (e: any) => {
    setRows([]);
    setLoading(true);
    console.log(1);
    var newTargetDate = targetDate;
    newTargetDate.setDate(newTargetDate.getDate() + 1);
    setTargetDate(newTargetDate);
    start(newTargetDate.getTime());
  }




  return (
    <div>
      <div style={{marginBottom : "12px", fontSize : "20px", fontFamily : "Apple_R", marginLeft : "12px"}}>
        {targetDate.getFullYear()}-{targetDate.getMonth()+1}-{targetDate.getDate()}
      </div>
      <div className={styles.mysearchDate}>
        <div style={{ fontSize: "18px", fontFamily: "Apple_B" }}>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button onClick={previousDay}>◁</Button>
            <Button onClick={nextDay}>▷</Button>
          </ButtonGroup>
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
            if (params.getValue(params.id, "direction") === "ENTER") {
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
        
      </div>
    </div>
  )
}

export default TotalFingerprint;