import React, { useState, useEffect } from 'react';
import styles from '../../componentsStyle/attendance.module.css';
import { GridRenderCellParams, DataGridPro, GridRowsProp, GridColDef, GridToolbar, LicenseInfo, useGridApiRef, GridEditRowsModel } from '@mui/x-data-grid-pro';
import renderCellExpand from '../data/rendercellexpand';
import { createStyles, makeStyles } from '@mui/styles';
import { createTheme, darken, lighten } from '@mui/material/styles';


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
                    color : "blue",
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
                    color : "black"
                },
                '& .super-app-theme--미확인': {
                    color : "red",
                    '&:hover': {
                        backgroundColor: getHoverBackgroundColor(theme.palette.error.main),
                    },
                },
            },
        };
    },
    { defaultTheme },
);



const columns: GridColDef[] = [
    { field: 'date', headerName: '날짜', width: 100, filterable: false },
    { field: 'time', headerName: '시간', width: 80, renderCell: renderCellExpand, filterable: false },
    { field: 'number', headerName: '번호', width: 150, editable: true, renderCell: renderCellExpand, filterable: false },
    { field: 'description', headerName: '내용', width: 730, filterable: false, renderCell : renderCellExpand }, 
];

const Mobile: React.FC<any> = (props) => {
    const classes = useStyles2();
    const [rows, setRows] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState("");

    const connect = async (e: any, where: string) => {
        setRows([]);
        setLoading(true);


        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        var port;
        if (where === "second") {
            port = 3100;
        }
        if (where === "six") {
            port = 3101;
        }
        if (where === "four") {
            port = 3102;
        }

        setCurrent(where);


        fetch(`https://peetsunbae.com/dashboard/report/mobile?where=${where}`, {
            method: "GET",
            headers: { "Authorization": token },
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    console.log(result.data);
                    const rows : any = [];
                    const defaultRow : any = {id : Math.random() ,date : "--------------", time : "-----------", number : "--------------------", description : "-------------------------------------------------------------------------------------------------------------------------------------------------------------------------", from : "blank"}
                    result.data.forEach((each : any)=>{
                        each.fullMessages.reverse();
                        each.fullMessages.forEach((message : any)=>{
                            const oneRow : any = {};
                            oneRow.id = Math.random();
                            oneRow.number = each.number;
                            oneRow.description = message.text;
                            oneRow.from = message.from;
                            const spliter = message.time.split(" ");
                            oneRow.date = spliter.length === 1 ? "오늘" : spliter[0];
                            oneRow.time = spliter.length === 1 ? spliter[0] : spliter[1];
                            rows.push(oneRow);

                        })
                        rows.push(defaultRow);
                    })
                    setRows([...rows]);
                    setLoading(false);
                })
        })
    }

    return (
        <div>
            <div className={styles.mobiletitle}>
                문자 내역 가져오기<br></br>
                (현재 개발 단계 : 문자 가져오기, 개발 계획 : 문자 보내기 기능 추가 예정)
            </div>
            <div className={styles.board}>
                <div className={`${styles.phoneBoard} ${current === "four" ? styles.active : ""}`} onClick={(e) => { connect(e, "four") }}>
                    <div className={styles.phoneImage}>
                        <img className={styles.phone} src="img/mobile-duotone.svg" alt="phone" />
                    </div>
                    <div className={styles.phoneTitle}>
                        4층폰
                    </div>
                </div>
                <div className={`${styles.phoneBoard} ${current === "six" ? styles.active : ""}`} onClick={(e) => { connect(e, "six") }}>
                    <div className={styles.phoneImage}>
                        <img className={styles.phone} src="img/mobile-duotone.svg" alt="phone" />
                    </div>
                    <div className={styles.phoneTitle}>
                        6층폰
                    </div>

                </div>
                <div className={`${styles.phoneBoard} ${current === "second" ? styles.active : ""}`} onClick={(e) => { connect(e, "second") }}>
                    <div className={styles.phoneImage}>
                        <img className={styles.phone} src="img/mobile-duotone.svg" alt="phone" />
                    </div>
                    <div className={styles.phoneTitle}>
                        2호점
                    </div>
                </div>
            </div>
            <div className={classes.root} style={{ height: 500, width: '100%', backgroundColor: "white", marginTop : "24px" }}>
                <DataGridPro loading={loading} rows={rows} columns={columns}
                    density='compact'
                    disableSelectionOnClick={true}
                    getRowClassName={(params) => {
                        if(params.getValue(params.id, "from") === "me" || params.getValue(params.id, "from") === "me_file"){
                          return (
                            `super-app-theme--미확인`
                          )
                        }else if(params.getValue(params.id, "from") === "blank"){
                            return (
                              `super-app-theme--확인`
                            )
                        }
                        else{
                          return (
                            `super-app-theme--처리완료`
                          )
                        }
                      }
                      }
                />
            </div>
            <div className={styles.messageLaw}>
                <div className={styles.messageLawTitle}>
                    [메세지 전송 가이드라인]
                </div>
                <div className={styles.messageLawText}>
                    <ul>
                        <li>메세지 보내기 전 전화는 <span className={styles.bold}>소리샘 안내</span>가 나올때까지 대기하고 받으면 잘 맞춰서 와달라는 내용 포함해서 얘기하기</li>
                        <li>
                            처음 메세지는 <span className={styles.bold}>'학생 이름/위반 내용/규정 준수 바람/답장 바람'</span>을 포함해서 보내기 - (출석에 신경을 많이 쓰고 있다는 것을 보이게 하는 것이 포인트)<br></br>
                            (ex)<br></br> 민수님 정기일정에 11시까지 등원하시기로 되있는데 아직 등원 안하셔서 연락드립니다.<br></br>
                            등원 시간 잘 지켜주시길 바랍니다.
                            <br></br>
                            보시면 전화나 문자 바로 부탁드립니다.
                        </li>
                        <li>
                            학생이 답장오면 <span className={styles.bold}>한번 더 잘 지켜주길 당부</span>하는 식으로 답장<br></br>
                            (ex)<br></br>
                            (학생) - 늦잠 때문에 늦었어요.
                            <br></br>
                            (학원) - 민수님 다음부터는 출석 시간 꼭 잘 지켜주시길 부탁드릴게요. 있다 봬요!
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Mobile;