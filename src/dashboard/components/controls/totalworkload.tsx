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

const columns2: GridColDef[] = [
    { field: 'day', headerName: '요일', width: 80, filterable : true},
    { field: 'time', headerName: '시간', width: 120, filterable : true},
    { field: 'description', headerName: '내용', width: 730, renderCell: renderCellExpand, filterable : true },
    { field: 'location', headerName: '장소', width: 100},
  ];

const TotalWorkLoad : React.FC<any> = (props) => {
    const classes = useStyles2();
    const [rows2, setRows2] = useState<any>([]);
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

            fetch("https://peetsunbae.com/dashboard/report/totalwork", {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        setLoading(false);
                        console.log(result);
                        const data = result.data;

                        data.sort(function(a : any,b : any){
                            if(a.startTime > b.startTime){
                                return 1;
                            }
                            if(a.startTime === b.startTime){
                                if(a.endTime >= b.endTime){
                                    return 1;
                                }else{
                                    return -1;
                                }
                            }
                            if(a.startTime < b.startTime){
                                return -1;
                            }
                        });

                        console.log(data);

                        const newRows: any = [];

                        data.forEach((each: any, number: number) => {
                            each.day.forEach((boolean: Boolean, index: number) => {
                                if (boolean) {
                                    const oneRow: any = {};
                                    oneRow.id = Math.random();
                                    oneRow.time = `${Math.floor(each.startTime / 60) < 10 ? "0" + Math.floor(each.startTime / 60) : Math.floor(each.startTime / 60)}:${each.startTime % 60 < 10 ? "0" + each.startTime % 60 : each.startTime % 60}~${Math.floor(each.endTime / 60) < 10 ? "0" + Math.floor(each.endTime / 60) : Math.floor(each.endTime / 60)}:${each.endTime % 60 < 10 ? "0" + each.endTime % 60 : each.endTime % 60}`
                                    oneRow.location = each.location;
                                    oneRow.description = each.description;
                                    oneRow.startTime = each.startTime;
                                    oneRow.endTime = each.endTime;
                                    switch (index) {
                                        case 0:
                                            oneRow.day = "일";
                                            break;
                                        case 1:
                                            oneRow.day = "월";
                                            break;
                                        case 2:
                                            oneRow.day = "화";
                                            break;
                                        case 3:
                                            oneRow.day = "수";
                                            break;
                                        case 4:
                                            oneRow.day = "목";
                                            break;
                                        case 5:
                                            oneRow.day = "금";
                                            break;
                                        case 6:
                                            oneRow.day = "토";
                                            break;
                                    }


                                    oneRow.block = "--------------------------------------";
                                    newRows.push(oneRow);
                                }
                            })
                        });

                        setRows2([...newRows]);
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

        if(!e.value){
          e.value = "";
        }

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
                <DataGridPro loading={loading} rows={rows2} columns={columns2}
                    density="compact"
                    components={{ Toolbar: GridToolbar }}
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

export default TotalWorkLoad;