import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import koLocale from 'date-fns/locale/ko'
import styles from "../../componentsStyle/totaledit.module.css"
import { GridRenderCellParams,DataGridPro, GridRowsProp, GridColDef, GridToolbar, LicenseInfo, useGridApiRef } from '@mui/x-data-grid-pro';
import { eachDayOfInterval } from 'date-fns';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { createStyles, makeStyles } from '@mui/styles';

LicenseInfo.setLicenseKey("e3ec4d79d1fa1f36cc88ecffd4e68392T1JERVI6MzMyMjMsRVhQSVJZPTE2NjkzODUyMDIwMDAsS0VZVkVSU0lPTj0x");


interface GridCellExpandProps {
    value: string;
    width: number;
  }


  const useStyles = makeStyles(() =>
  createStyles({
    root: {
      alignItems: 'center',
      lineHeight: '24px',
      width: '100%',
      height: '100%',
      position: 'relative',
      display: 'flex',
      '& .cellValue': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
  }),
);


function isOverflown(element: Element): boolean {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  }


  const GridCellExpand = React.memo(function GridCellExpand(
    props: GridCellExpandProps,
  ) {
    const { width, value } = props;
    const wrapper = React.useRef<HTMLDivElement | null>(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const classes = useStyles();
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);
  
    const handleMouseEnter = () => {
      const isCurrentlyOverflown = isOverflown(cellValue.current!);
      setShowPopper(isCurrentlyOverflown);
      setAnchorEl(cellDiv.current);
      setShowFullCell(true);
    };
  
    const handleMouseLeave = () => {
      setShowFullCell(false);
    };
  
    React.useEffect(() => {
      if (!showFullCell) {
        return undefined;
      }
  
      function handleKeyDown(nativeEvent: KeyboardEvent) {
        // IE11, Edge (prior to using Bink?) use 'Esc'
        if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
          setShowFullCell(false);
        }
      }
  
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [setShowFullCell, showFullCell]);
  
    return (
      <div
        ref={wrapper}
        className={classes.root}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={cellDiv}
          style={{
            height: 1,
            width,
            display: 'block',
            position: 'absolute',
            top: 0,
          }}
        />
        <div ref={cellValue} className="cellValue">
          {value}
        </div>
        {showPopper && (
          <Popper
            open={showFullCell && anchorEl !== null}
            anchorEl={anchorEl}
            style={{ width, marginLeft: -17 }}
          >
            <Paper
              elevation={1}
              style={{ minHeight: wrapper.current!.offsetHeight - 3 }}
            >
              <Typography variant="body2" style={{ padding: 8 }}>
                {value}
              </Typography>
            </Paper>
          </Popper>
        )}
      </div>
    );
  });
  
  function renderCellExpand(params: GridRenderCellParams<string>) {
    return (
      <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
    );
  }




















const columns: GridColDef[] = [
    { field: 'name', headerName: '이름', width: 150 },
    { field: 'date', headerName: '날짜', width: 150, filterable: false },
    { field: 'type', headerName: "종류", width: 150 },
    { field: 'agree', headerName: "학부모 승인", width: 150 },
    { field: 'endTime', headerName: "출발 시간", width: 150 },
    { field: 'startTime', headerName: "도착 시간", width: 150 },
    { field: 'reason', headerName: "사유", width: 150, filterable: false, renderCell: renderCellExpand },
    { field: 'time', headerName: "제출시각", width: 150, filterable: false }
];

const Totaledits: React.FC<any> = (props) => {
    const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
    const [submitBool, setSubmitBool] = useState(false);
    const [rows, setRows] = useState<any>();

    const submit = async () => {

        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/edit/total", {
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
                        var type;
                        switch (each.type) {
                            case 'long': type = "지각"; break;
                            case 'absent': type = "결석"; break;
                            case 'early': type = "조기하원"; break;
                            case 'among': type = "외출"; break;
                        }

                        if(each.type === "among"){
                            var sudden;
                            sudden = each.startHours;
                            each.startHours = each.endHours;
                            each.endHours = sudden;

                            sudden = each.startMinutes;
                            each.startMinutes = each.endMinutes;
                            each.endMinutes = sudden;
                        }

                        if(each.startMinutes != -1 && each.startMinutes < 10){
                            each.startMinutes = "0" + each.startMinutes;
                        }

                        if(each.endMinutes != -1 && each.endMinutes < 10){
                            each.endMinutes = "0" + each.endMinutes;
                        }

                        var oneRow: any = {};
                        oneRow.id = index + 1;
                        oneRow.name = each.name;
                        oneRow.date = `${new Date(each.targetDate).getMonth() + 1}월 ${new Date(each.targetDate).getDate()}일`;
                        oneRow.type = type;
                        oneRow.startTime = each.startHours === -1 ? `-` : `${each.startHours} : ${each.startMinutes}`;
                        oneRow.endTime = each.endHours === -1 ? '-' : `${each.endHours} : ${each.endMinutes}`;
                        oneRow.reason = each.reason;
                        oneRow.time = `${new Date(+each.time).getMonth() + 1}월 ${new Date(+each.time).getDate()}일 ${new Date(+each.time).getHours()}시`;

                        data.push(oneRow);
                    })
                    console.log(data);
                    setRows([...data]);
                })
        })

    }

    return (
        <div>
            <div className={styles.datePicker}>
                <LocalizationProvider locale={koLocale} dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                        startText="시작일"
                        endText="마지막일"
                        value={value}
                        onChange={(newValue : any) => {
                            setValue(newValue);
                            if (newValue[0] && newValue[1]) {
                                setSubmitBool(true);
                            }
                        }}
                        renderInput={(startProps : any, endProps : any) => (
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
                    <div style={{ height: 400, width: '100%' }}>
                        <div style={{ display: "flex", height: "100%" }}>
                            <div style={{ flexGrow: 1 }}>
                                <DataGridPro rowHeight={40} rows={rows} columns={columns} components={{ Toolbar: GridToolbar }}
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Totaledits;