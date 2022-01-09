import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import koLocale from 'date-fns/locale/ko'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { GridRenderCellParams, DataGridPro, GridRowsProp, GridColDef, GridToolbar, LicenseInfo, GridFilterModel, useGridApiRef, GridEditRowsModel } from '@mui/x-data-grid-pro';
import { eachDayOfInterval } from 'date-fns';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { createStyles, makeStyles } from '@mui/styles';
import styles from '../../componentsStyle/upload.module.css';
import { createTheme, darken, lighten } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

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
  { field: 'my', headerName: 'MY', width: 40, filterable: true },
  { field: 'time', headerName: '보낸시간', width: 160, filterable: false },
  { field: 'fromUser', headerName: '보낸사람', width: 120, filterable: true },
  { field: 'toUser', headerName: '받는사람', width: 120, filterable: true },
  { field: 'description', headerName: '내용', width: 730, renderCell: renderCellExpand, filterable: false },
  { field: 'answer', headerName: '답변', width: 150, editable: true, renderCell: renderCellExpand, filterable: false },
  { field: 'answerTime', headerName: '답변시간', width: 160, editable: true, renderCell: renderCellExpand, filterable: false },
];

const TotalMessage: React.FC<any> = (props) => {
  const classes = useStyles2();
  const [rows, setRows] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [editRowsModel, setEditRowsModel] = React.useState({});
  const [alignment, setAlignment] = React.useState('all');

  const [update, setUpdate] = useState(0);

  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [
    ],
  });

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);

    switch (newAlignment) {
      case "all":
        setFilterModel({
          items: []
        });
        break;
      case "my":
        setFilterModel({
          items: [
            { id: 1, columnField: 'my', operatorValue: 'contains', value: 'O' },
          ],
        });
        break;
    }
  };


  useEffect(() => {
    setLoading(true);

    const start = async () => {
      var token = "";
      if (window.electron) {
        token = await window.electron.sendMessageApi.getToken();
      }

      fetch("https://peetsunbae.com/dashboard/envelope/totalmessage", {
        method: "GET",
        headers: { "Authorization": token },
        credentials: "include",
      }).then((response: any) => {
        response.json()
          .then((result: any) => {
            setLoading(false);
            console.log(result);
            const newRows: any = [];
            result.data.forEach((each: any) => {
              const oneRow: any = {};
              const createdAt = new Date(each.createdAt);
              if (each.answerTime) {
                const answerTime = new Date(each.answerTime);
                var ampm2: string;
                var hours2: number;
                if (answerTime.getHours() >= 12) {
                  ampm2 = "오후";
                  hours2 = answerTime.getHours() - 12;
                  if (hours2 === 0) {
                    hours2 = 12;
                  }
                } else {
                  ampm2 = "오전";
                  hours2 = answerTime.getHours()
                }

                oneRow.answerTime = `${answerTime.getFullYear()}-${answerTime.getMonth() + 1}-${answerTime.getDate()} ${ampm2} ${hours2 < 10 ? "0" + hours2 : hours2}:${answerTime.getMinutes() < 10 ? "0" + answerTime.getMinutes() : answerTime.getMinutes()}`

              }
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
              if (each.mine && each.mine === "yes") {
                oneRow.my = "O"
              }

              oneRow.id = each.id;
              oneRow.fromUser = each.fromUserName;
              oneRow.toUser = each.toUserName;
              oneRow.time = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}-${createdAt.getDate()} ${ampm} ${hours < 10 ? "0" + hours : hours}:${createdAt.getMinutes() < 10 ? "0" + createdAt.getMinutes() : createdAt.getMinutes()}`
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

    fetch(`https://peetsunbae.com/dashboard/envelope/message`, {
      method: "PATCH",
      headers: { "Authorization": token, "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        id, field, value
      })
    }).then((response: any) => {
      response.json()
        .then((result: any) => {
          console.log(result);
        })
    })
  }



  return (
    <div>
      <div className={styles.mysearchDate}>
        <div className={styles.caution}>
          <br></br>
          꼭! 메세지 확인 후 '답변 보내기'에 답변 보내주세요.(수월한 업무처리 도와주세요!)
        </div>
        <div>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="all">ALL</ToggleButton>
            <ToggleButton value="my">MY</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <div className={classes.root} style={{ height: 500, width: '100%', backgroundColor: "white" }}>
        <DataGridPro loading={loading} rows={rows} columns={columns}
          density='compact'
          components={{ Toolbar: GridToolbar }}
          filterModel={filterModel}
          onFilterModelChange={(model) => setFilterModel(model)}
          onCellEditCommit={handleCommit}
          disableSelectionOnClick={true}
          getRowClassName={(params) => {
            if (params.getValue(params.id, "answer")) {
              return (
                `super-app-theme--처리완료`
              )
            } else {
              return (
                `super-app-theme--확인`
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

export default TotalMessage;