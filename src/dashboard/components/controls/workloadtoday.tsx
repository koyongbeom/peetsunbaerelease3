import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import koLocale from 'date-fns/locale/ko'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { GridRenderCellParams,DataGridPro, GridRowsProp, GridColDef, GridToolbar, LicenseInfo, useGridApiRef, GridEditRowsModel } from '@mui/x-data-grid-pro';
import { eachDayOfInterval } from 'date-fns';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { createStyles, makeStyles } from '@mui/styles';
import styles from '../../componentsStyle/upload.module.css';
import { createTheme, darken, lighten } from '@mui/material/styles';

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
      },
    };
  },
  { defaultTheme },
);




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








LicenseInfo.setLicenseKey("e3ec4d79d1fa1f36cc88ecffd4e68392T1JERVI6MzMyMjMsRVhQSVJZPTE2NjkzODUyMDIwMDAsS0VZVkVSU0lPTj0x");

const columns: GridColDef[] = [
    { field: 'time', headerName: '시간', width: 120, filterable : false},
    { field: 'description', headerName: '내용', width: 730, renderCell: renderCellExpand, filterable : false },
    { field: 'answer', headerName: '완료 답변', width: 150, editable : true, renderCell: renderCellExpand, filterable : false},
    { field: 'answerTime', headerName: '완료시간', width: 150, renderCell: renderCellExpand, filterable : false},
    { field: 'answerName', headerName: '답변인', width: 150, renderCell: renderCellExpand, filterable : false},
    { field: 'location', headerName: '장소', width: 100},
    { field: 'ip', headerName: 'IP', width: 150, renderCell: renderCellExpand, filterable : false},
    { field: 'block', headerName: '', width: 150, renderCell: renderCellExpand, filterable : false},

  ];

const WorkLoadToday : React.FC<any> = (props) => {
    const classes = useStyles2();
    const [rows, setRows] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [editRowsModel, setEditRowsModel] = React.useState({});

    const [update, setUpdate] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date().getHours() * 60 + new Date().getMinutes());

    useEffect(() => {
        setTimeout(()=>{
            setUpdate(Math.random());
        }, 40000);
    }, []);
    
    
    
    useEffect(() => {
        setLoading(true);

        setTimeout(()=>{
            setCurrentTime(new Date().getHours() * 60 + new Date().getMinutes());
        }, 20000)

        
        const start = async () => {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/report/work", {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        setLoading(false);
                        console.log(result);
                        const data = result.data;
                        const answers = result.answer;

                        data.sort(function(a : any,b : any){
                            return a.startTime-b.startTime;
                        });
                        console.log(data);

                        const newRows : any = [];

                        data.forEach((each: any, number : number) => {
                            const oneRow : any = {};
                            oneRow.id = each.id;
                            oneRow.time = `${Math.floor(each.startTime/60) < 10 ? "0" + Math.floor(each.startTime/60) : Math.floor(each.startTime/60)}:${each.startTime%60 < 10 ? "0" + each.startTime%60 : each.startTime%60}~${Math.floor(each.endTime/60) < 10 ? "0" + Math.floor(each.endTime/60) : Math.floor(each.endTime/60)}:${each.endTime%60 < 10 ? "0" + each.endTime%60 : each.endTime%60}`
                            oneRow.location = each.location;
                            oneRow.description = each.description;
                            oneRow.startTime = each.startTime;
                            oneRow.endTime = each.endTime;
                            oneRow.block = "--------------------------------------";
                            answers.forEach((answer : any)=>{
                                if(answer.workId === each.id){
                                    oneRow.answer = answer.answer;
                                    const answerDate = new Date(answer.answerTime);
                                    oneRow.answerTime = `${answerDate.getHours() < 10 ? "0"+answerDate.getHours() : answerDate.getHours()} : ${answerDate.getMinutes() < 10 ? "0"+answerDate.getMinutes() : answerDate.getMinutes()}`;
                                    oneRow.ip = answer.ip;
                                    oneRow.answerName = answer.answerUserName;
                                }
                            })
                            newRows.push(oneRow);
                        });

                        setRows([...newRows]);
                    })
            })
        }

        start();
    }, [update]);

    const handleCommit = async (e : any) => {
        console.log(e);
        const id = e.id;
        const field = e.field;
        const value = e.value;
        console.log(id, field, value);

        var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch(`https://peetsunbae.com/dashboard/report/work`, {
                method: "PATCH",
                headers: { "Authorization": token, "Content-Type" : "application/json" },
                credentials: "include",
                body : JSON.stringify({
                    id, field, value
                })
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);
                        setUpdate(Math.random());
                    })
            })
    }



    return (
        <div>
            <div className={styles.mysearchDate}>
                <div>
                    꼭! [업무 완료 후]에 처리사항 구체적으로 적어주세요.   
                </div>
                <div>
                    {new Date().getFullYear()}-{new Date().getMonth() + 1}-{new Date().getDate()}
                </div>
            </div>
            <div className={classes.root} style={{ height: 500, width: '100%', backgroundColor: "white" }}>
                <DataGridPro loading={loading} rows={rows} columns={columns}
                    density="compact"
                    components={{ Toolbar: GridToolbar }}
                    getRowClassName={(params: any) => {
                        if (!params.getValue(params.id, "answer")) {
                            if (params.getValue(params.id, "startTime") <= currentTime && params.getValue(params.id, "endTime") >= currentTime) {
                                return (
                                    "super-app-theme--확인"
                                )
                            } else {
                                return (
                                    "super-app-theme--미확인"
                                )
                            }
                        } else {
                            return (
                                "super-app-theme--처리완료"
                            )
                        }
                    }
                    }
                    onCellEditCommit={handleCommit}
                    disableSelectionOnClick={true}
                />
            </div>
            <div className={styles.mysearchDescription}>
                * 미완료 - 빨강색, 현재 할일 - 주황색, 완료 - 파랑색<br />
            </div>
        </div>
    )
}

export default WorkLoadToday;