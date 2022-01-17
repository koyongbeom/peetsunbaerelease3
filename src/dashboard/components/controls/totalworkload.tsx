import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import koLocale from 'date-fns/locale/ko'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { GridRenderCellParams, GridFilterModel, DataGridPro, GridRowsProp, GridColDef, GridToolbar, LicenseInfo, useGridApiRef, GridEditRowsModel } from '@mui/x-data-grid-pro';
import { eachDayOfInterval } from 'date-fns';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { createStyles, makeStyles } from '@mui/styles';
import styles from '../../componentsStyle/upload.module.css';
import { createTheme, darken, lighten } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
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
        '& .timeout': {
          color: theme.palette.error.main,
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
  { field: 'time', headerName: '시간', width: 120, filterable: false },
  { field: 'description', headerName: '내용', width: 730, renderCell: renderCellExpand, filterable: true },
  { field: 'answer', headerName: '완료 답변', width: 150, renderCell: renderCellExpand, filterable: false },
  { field: 'answerTime', headerName: '완료시간', width: 150, renderCell: renderCellExpand, filterable: false },
  { field: 'answerName', headerName: '답변인', width: 150, renderCell: renderCellExpand, filterable: true },
  { field: 'location', headerName: '장소', width: 100 },
  { field: 'ip', headerName: 'IP', width: 150, renderCell: renderCellExpand, filterable: false },
  { field: 'block', headerName: '', width: 150, renderCell: renderCellExpand, filterable: false },

];


const columns2: GridColDef[] = [
  { field: 'day', headerName: '요일', width: 80, filterable: true },
  { field: 'time', headerName: '시간', width: 120, filterable: true },
  { field: 'description', headerName: '내용', width: 730, renderCell: renderCellExpand, filterable: true },
  { field: 'location', headerName: '장소', width: 100 },
];

const TotalWorkLoad: React.FC<any> = (props) => {
  const classes = useStyles2();
  const [alignment, setAlignment] = React.useState('all');
  const [rows, setRows] = useState<any>([]);
  const [rows2, setRows2] = useState<any>([]);
  const [loading2, setLoading2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [count, setCount] = useState(1);

  const [update, setUpdate] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date().getHours() * 60 + new Date().getMinutes());

  const [targetdate, setTargetdate] = useState<any>();

  useEffect(() => {
    const date = new Date();
    const yesterdayTime = date.setDate(date.getDate() - 1);
    const yesterday = new Date(yesterdayTime);
    setTargetdate(yesterday);
  }, [])



  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [
    ],
  });

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    console.log(newAlignment);
    setAlignment(newAlignment);

    switch (newAlignment) {
      case "all":
        setFilterModel({
          items: []
        });
        break;
      case "six":
        setFilterModel({
          items: [
            { id: 1, columnField: 'location', operatorValue: 'contains', value: '6층' },
          ],
        });
        break;
      case "four":
        setFilterModel({
          items: [
            { id: 1, columnField: 'location', operatorValue: 'contains', value: '4층' },
          ],
        });
        break;
      case "second":
        setFilterModel({
          items: [
            { id: 1, columnField: 'location', operatorValue: 'contains', value: '2호점' },
          ],
        });
        break;
    }

  };



  const getList = async (count : number) => {
    setLoading2(true);
    var token = "";
    if (window.electron) {
      token = await window.electron.sendMessageApi.getToken();
    }

    fetch(`https://peetsunbae.com/dashboard/report/totalworkday?count=${count}`, {
      method: "GET",
      headers: { "Authorization": token },
      credentials: "include",
    }).then((response: any) => {
      response.json()
        .then((result: any) => {
          console.log(result);
          setLoading2(false);
          const newRows: any = [];
          result.data.forEach((each: any) => {
            const oneRow: any = {};
            oneRow.id = each.id;
            oneRow.time = `${Math.floor(each.startTime / 60) < 10 ? "0" + Math.floor(each.startTime / 60) : Math.floor(each.startTime / 60)}:${each.startTime % 60 < 10 ? "0" + each.startTime % 60 : each.startTime % 60}~${Math.floor(each.endTime / 60) < 10 ? "0" + Math.floor(each.endTime / 60) : Math.floor(each.endTime / 60)}:${each.endTime % 60 < 10 ? "0" + each.endTime % 60 : each.endTime % 60}`
            oneRow.description = each.description;
            oneRow.location = each.location;
            oneRow.startTime = each.startTime;
            oneRow.endTime = each.endTime;
            if (each.answer.answer) {
              oneRow.answer = each.answer.answer;
              const answerDate = new Date(each.answer.answerTime);
              oneRow.answerTime = `${answerDate.getHours() < 10 ? "0" + answerDate.getHours() : answerDate.getHours()} : ${answerDate.getMinutes() < 10 ? "0" + answerDate.getMinutes() : answerDate.getMinutes()}`;
              oneRow.answerName = each.answer.answerUserName;
              oneRow.ip = each.answer.ip;
            }
            newRows.push(oneRow);
          })
          setRows([...newRows]);
        })
    })
  }


  useEffect(() => {
    setLoading(true);

    getList(1);

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

            data.sort(function (a: any, b: any) {
              if (a.startTime > b.startTime) {
                return 1;
              }
              if (a.startTime === b.startTime) {
                if (a.endTime >= b.endTime) {
                  return 1;
                } else {
                  return -1;
                }
              }
              if (a.startTime < b.startTime) {
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
  }, []);

  const previousDay = (e : any) => {
    const newCount = count + 1;
    getList(newCount);
    setCount(newCount);

    if(targetdate){
    const newDate = new Date(targetdate.setDate(targetdate.getDate()-1));
    setTargetdate(newDate);
    }
  }

  const nextDay = (e: any) => {
    if (count > 1) {
      const newCount = count - 1;
      getList(newCount);
      setCount(newCount);

      if (targetdate) {
        const newDate = new Date(targetdate.setDate(targetdate.getDate() + 1));
        setTargetdate(newDate);
      }
    }
  }


  return (
    <div>
      <div className={styles.mysearchDate}>
        <div>

        </div>
        <div>
          {new Date().getFullYear()}-{new Date().getMonth() + 1}-{new Date().getDate()}
        </div>
      </div>
      <div className={classes.root} style={{ height: 500, width: '100%', backgroundColor: "white" }}>
        <DataGridPro loading={loading} rows={rows2} columns={columns2}
          density="compact"
          components={{ Toolbar: GridToolbar }}
          disableSelectionOnClick={true}
        />
      </div>
      <div style={{ marginTop: "64px", marginBottom: "6px", display: "flex", justifyContent: "space-between" }}>
        <div>
          <div>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button onClick={previousDay}>◁</Button>
              <Button onClick={nextDay}>▷</Button>
            </ButtonGroup>
          </div>
          <div className={styles.targetdate}>
            {targetdate &&
              `${targetdate.getFullYear()}-${targetdate.getMonth() + 1}-${targetdate.getDate()}`
            }
          </div>
        </div>
        <div>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="all">ALL</ToggleButton>
            <ToggleButton value="six">6층</ToggleButton>
            <ToggleButton value="four">4층</ToggleButton>
            <ToggleButton value="second">2호</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>

      <div className={classes.root} style={{ height: 500, width: '100%', backgroundColor: "white" }}>
        <DataGridPro loading={loading2} rows={rows} columns={columns}
          density="compact"
          components={{ Toolbar: GridToolbar }}
          filterModel={filterModel}
          onFilterModelChange={(model) => setFilterModel(model)}
          disableSelectionOnClick={false}
          getRowClassName={(params: any) => {
            if (!params.getValue(params.id, "answer")) {
              return (
                "super-app-theme--미확인"
              )
            } else {
              return (
                "super-app-theme--처리완료"
              )
            }
          }
          }
          getCellClassName={(params: any) => {
            if (params.field != "answerTime") {
              return '';
            } else if (!params.value) {
              return '';
            } else {
              const hours = +(params.value.split(":")[0]);
              const minutes = +(params.value.split(":")[1]);
              const answerTimeValue = hours * 60 + minutes;
              console.log(params);
              return (params.row.startTime > answerTimeValue || params.row.endTime < answerTimeValue) ? "timeout" : "";
            }
          }}
        />
      </div>

      <div className={styles.mysearchDescription}>
        * 미완료 - 빨강색, 완료 - 파랑색<br />
      </div>
    </div>
  )
}

export default TotalWorkLoad;