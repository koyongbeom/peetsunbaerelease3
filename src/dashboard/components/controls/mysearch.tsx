import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import koLocale from 'date-fns/locale/ko'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { GridRenderCellParams,DataGridPro, GridRowsProp, GridSelectionModel, GridColDef, GridToolbar, LicenseInfo, useGridApiRef } from '@mui/x-data-grid-pro';
import { eachDayOfInterval } from 'date-fns';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { createStyles, makeStyles } from '@mui/styles';
import styles from '../../componentsStyle/upload.module.css';
import { createTheme, darken, lighten } from '@mui/material/styles';
import { Button, Modal } from '@mui/material';

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



const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const columns: GridColDef[] = [
    { field: 'name', headerName: '신청자', width: 100},
    { field: 'kind', headerName: '종류', width: 100},
    { field: 'description', headerName: '내용', width: 150, renderCell: renderCellExpand },
    { field: 'date', headerName: '신청일', width: 120},
    { field: 'status', headerName: '처리현황', width: 100 },
    { field: 'firstReply', headerName: '확인답변', width: 150, renderCell: renderCellExpand },
    { field: 'secondReply', headerName: '완료답변', width: 150, renderCell: renderCellExpand },
    { field: 'over', headerName: '경과일', width: 100  },
];

const Mysearch: React.FC<any> = (props) => {
    const classes = useStyles2();
    const [rows, setRows] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    useEffect(() => {
        setLoading(true);
        async function start() {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch(`https://peetsunbae.com/dashboard/search/myopinion`, {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);
                        if (result.data) {
                            const newRows : any = [];
                            result.data.forEach((each: any) => {
                                const oneRow: any = {}
                                oneRow.id = each.id;
                                oneRow.name = each.named === "named" ? each.name : "익명";
                                switch (each.kindValue) {
                                    case "live":
                                        oneRow.kind = "생활";
                                        break;
                                    case "change":
                                        oneRow.kind = "자리변경";
                                        break;
                                    case "consult":
                                        oneRow.kind = "담임상담";
                                        break;
                                    case "question":
                                        oneRow.kind = "질의응답";
                                        break;
                                    case "coaching":
                                        oneRow.kind = "과외";
                                        break;
                                    case "ceo":
                                        oneRow.kind = "대표에게";
                                        break;
                                    case "etc":
                                        oneRow.kind = "기타";
                                        break;
                                }
                                oneRow.description = each.description;
                                const date = new Date(each.createdAt);
                                oneRow.date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
                                oneRow.status = each.status;
                                oneRow.firstReply = each.firstReply;
                                oneRow.secondReply = each.secondReply;
                                oneRow.over = Math.floor((new Date().getTime() - new Date(each.createdAt).getTime())/86400000) + "일"
                                newRows.push(oneRow);
                            });
                            setRows([...newRows]);
                        }
                        setLoading(false);
                    })
            })
        }

        start();
    }, []);

    const deleteOpinion = async (e : any) => {
        setLoading(true);

        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/search/myopinion", {
            method: "DELETE",
            headers: { "Authorization": token, "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                id : selectionModel
            })
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    setLoading(false);
                    if (result.message === "success") {
                        const newRows = rows.filter((each : any)=> !selectionModel.includes(each.id));
                        setRows([...newRows]);
                    }
                })
        })
    }



    return (
        <div>
            <div className={styles.mysearchDate}>
                <div>
                    {new Date().getFullYear()}-{new Date().getMonth() + 1}-{new Date().getDate()}
                </div>
            </div>
            <div className={classes.root} style={{ height: 500, width: '100%', backgroundColor : "white" }}>
                <DataGridPro density="compact" loading={loading} rows={rows} columns={columns}
                checkboxSelection
                onSelectionModelChange={(newSelectionModel)=>{
                    setSelectionModel(newSelectionModel);
                    console.log(newSelectionModel);
                }} 
                getRowClassName={(params) =>
                    `super-app-theme--${params.getValue(params.id, 'status')}`
                  }
                />
            </div>
            <div className={styles.bottomDiv}>
                <div className={styles.mysearchDescription}>
                    * 처리현황은 (미확인, 확인, 처리완료) 세단계로 표기됩니다.<br />
                    * 경과일은 작성시간 기준 24시간마다 1일이 증가합니다.
                </div>
                <div className={styles.trash}>
                  <img onClick={deleteOpinion} className={styles.trashImg} src="img/trash-alt-light.svg" alt="trash" />
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default Mysearch;