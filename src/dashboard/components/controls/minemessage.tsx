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
    { field: 'fromUser', headerName: '받은사람', width: 120, filterable : false},
    { field: 'description', headerName: '내용', width: 730, renderCell: renderCellExpand, filterable : false },
    { field: 'answer', headerName: '답장', width: 150, renderCell: renderCellExpand, filterable : false},
    { field: 'time', headerName: '시간', width: 160, filterable : false},
  ];

const MineMessage : React.FC<any> = (props) => {
    const classes = useStyles2();
    const [rows, setRows] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [editRowsModel, setEditRowsModel] = React.useState({});

    const [update, setUpdate] = useState(0);

    
    useEffect(() => {
        setLoading(true);

        const start = async () => {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/envelope/minemessage", {
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
                            oneRow.fromUser = each.toUserName;
                            oneRow.time = `${createdAt.getMonth()+1}월${createdAt.getDate()}일 ${ampm} ${hours < 10 ? "0" + hours : hours}:${createdAt.getMinutes() < 10 ? "0" + createdAt.getMinutes() : createdAt.getMinutes()}`
                            oneRow.description = each.message;
                            oneRow.answer = each.answer;
                            newRows.push(oneRow);
                        })
                        console.log(11);
                        setRows([...newRows]);
                    })
            })
        }

        start();
    }, []);


  return (
    <div>
      <div className={styles.mysearchDate}>
        <div className={styles.caution}>
          학원에 대한 모든 건의사항, 요청사항은 '의견 보내기' 메뉴에서 보내주세요 !
        </div>
        <div>
          {new Date().getFullYear()}-{new Date().getMonth() + 1}-{new Date().getDate()}
        </div>
      </div>
      <div className={classes.root} style={{ height: 500, width: '100%', backgroundColor: "white" }}>
        <DataGridPro loading={loading} rows={rows} columns={columns}
          getRowClassName={(params) => {
            if(params.getValue(params.id, "answer")){
              return (
                `super-app-theme`
              )
            }else{
              return (
                `super-app-theme--처리완료`
              )
            }
          }
          }
        />
      </div>
      <div className={styles.mysearchDescription}>
        * 미답변 메세지 - 파랑색<br />
      </div>
    </div>
  )
}

export default MineMessage;