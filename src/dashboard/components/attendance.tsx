import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import styles from "../componentsStyle/attendance.module.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from "@mui/material/TextField";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import LinearProgress from '@mui/material/LinearProgress';
import { Alert, Stack } from '@mui/material';
import WorkLoadToday from './controls/workloadtoday';
import TotalWorkLoad from './controls/totalworkload';
import koLocale from 'date-fns/locale/ko'
import TotalAttendance from './controls/totalattendance';
import Mobile from './controls/mobile';


type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface attendanceProps extends RouteComponentProps {
    activateMenuList: (curret: currentSideBarMenuList) => void;
    user: any;
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Attendance: React.FC<attendanceProps> = (props) => {

    const [loading, setLoading] = useState(false);
    const [uploadBool, setUploadBool] = useState(false);

    const [searchMenu, setSearchMenu] = useState("write");
    const [open, setOpen] = React.useState(false);
    const [startTime, setStartTime] = useState<any>();
    const [endTime, setEndTime] = useState<any>();

    const [location, setLocation] = useState([false, false, false]);
    const [day, setDay] = useState([false, false, false, false, false, false, false]);
    const [description, setDescription] = useState("");
    const [show, setShow] = useState("no");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const change = (e: any, type: string) => {
        const parsedType = type.split("-")[0];
        const index = +(type.split("-")[1] ? type.split("-")[1] : 99);
        console.log(parsedType);

        switch (parsedType) {
            case "location":
                const newLocation = location;
                newLocation[index] = e.target.checked;
                setLocation([...newLocation]);
                break;
            case "day":
                const newDay = day;
                newDay[index] = e.target.checked;
                setDay([...newDay]);
                break;
            case "description":
                setDescription(e.target.value);
                break;
            case "show":
                setShow(e.target.value);
                break;
        }



    }

    const submit = async (e: any) => {
        setLoading(true);
        const message = {
            location, day, startTime, endTime, description, show
        }

        console.log(message);

        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/report/work", {
            method: "POST",
            headers: { "Authorization": token, "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(message)
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    setLoading(false);
                    if(result.message === "success"){
                        setUploadBool(true);
                        setTimeout(()=>{
                            setUploadBool(false);
                        }, 1000);
                    }
                })
        })
    }


    useEffect(() => {
        props.activateMenuList("attendance");

        const date = new Date();

        setStartTime(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9));
        setEndTime(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9));

    }, [])

    return (
        <div className={styles.main}>

            <div className={styles.mainBoard}>
                <div className={styles.title}>
                    <img src="img/off/chart.svg" alt="chart" /> 업무 관리
                </div>

                <div className={styles.searchMenu}>
                    <div onClick={(e) => { setSearchMenu("write") }} className={`${styles.searchMenuDiv} ${searchMenu === "write" ? styles.active : ""}`}>
                        오늘 업무보고
                    </div>
                    <div onClick={(e) => { setSearchMenu("watch") }} className={`${styles.searchMenuDiv} ${searchMenu === "watch" ? styles.active : ""}`}>
                        전체 업무보고
                    </div>
                    <div onClick={(e) => { setSearchMenu("attendance") }} className={`${styles.searchMenuDiv} ${searchMenu === "attendance" ? styles.active : ""}`}>
                        출결버스
                    </div>
                    <div onClick={(e) => { setSearchMenu("message") }} className={`${styles.searchMenuDiv} ${searchMenu === "message" ? styles.active : ""}`}>
                        휴대폰 관리
                    </div>
                </div>

                {
                    searchMenu === "write" &&
                    <WorkLoadToday />
                }
                {
                    searchMenu === "watch" &&
                    <TotalWorkLoad />
                }
                {
                    searchMenu === "attendance" &&
                    <TotalAttendance />
                }
                {
                    searchMenu === "message" &&
                    <Mobile />
                }


            </div>

            <div onClick={handleOpen} className="qnaWrite">
                <img src="./img/pencil.svg" alt="pencil" />
                업무 추가하기
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={styles.blockDiv}>
                        <div>위치</div>
                        <FormGroup row>
                            <FormControlLabel control={<Checkbox checked={location[0]} onChange={(e) => { change(e, "location-0") }} />} label={<span className={styles.text}>2호점</span>} />
                            <FormControlLabel control={<Checkbox checked={location[1]} onChange={(e) => { change(e, "location-1") }} />} label={<span className={styles.text}>6층</span>} />
                            <FormControlLabel control={<Checkbox checked={location[2]} onChange={(e) => { change(e, "location-2") }} />} label={<span className={styles.text}>4층</span>} />
                        </FormGroup>
                    </div>
                    <div className={styles.blockDiv}>
                        <div>요일</div>
                        <FormGroup row>
                            <FormControlLabel control={<Checkbox checked={day[1]} onChange={(e) => { change(e, "day-1") }} />} label={<span className={styles.text}>월</span>} />
                            <FormControlLabel control={<Checkbox checked={day[2]} onChange={(e) => { change(e, "day-2") }} />} label={<span className={styles.text}>화</span>} />
                            <FormControlLabel control={<Checkbox checked={day[3]} onChange={(e) => { change(e, "day-3") }} />} label={<span className={styles.text}>수</span>} />
                            <FormControlLabel control={<Checkbox checked={day[4]} onChange={(e) => { change(e, "day-4") }} />} label={<span className={styles.text}>목</span>} />
                            <FormControlLabel control={<Checkbox checked={day[5]} onChange={(e) => { change(e, "day-5") }} />} label={<span className={styles.text}>금</span>} />
                            <FormControlLabel control={<Checkbox checked={day[6]} onChange={(e) => { change(e, "day-6") }} />} label={<span className={styles.text}>토</span>} />
                            <FormControlLabel control={<Checkbox checked={day[0]} onChange={(e) => { change(e, "day-0") }} />} label={<span className={styles.text}>일</span>} />
                        </FormGroup>
                    </div>
                    <div className={styles.blockDiv}>
                        <div className={styles.timeDiv}>수행 시간</div>
                        <div className={styles.timeSelect}>
                            <div>
                                <LocalizationProvider locale={koLocale} dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                        value={startTime}
                                        onChange={(newValue: any) => {
                                            console.log(newValue);
                                            setStartTime(newValue);
                                        }}
                                        renderInput={(params) => <TextField sx={{ width: "160px" }} {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className={styles.dash}>
                                ~
                            </div>
                            <div>
                                <LocalizationProvider locale={koLocale} dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                        value={endTime}
                                        onChange={(newValue: any) => {
                                            console.log(newValue);
                                            setEndTime(newValue);
                                        }}
                                        renderInput={(params) => <TextField sx={{ width: "160px" }} {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                        </div>
                    </div>
                    <div className={styles.blockDiv}>
                        <div className={styles.workDescription}>
                            업무내용
                        </div>
                        <div>
                            <TextField value={description} onChange={(e) => { change(e, "description") }} fullWidth id="outlined-basic" variant="outlined" />
                        </div>
                    </div>
                    <div className={styles.blockDiv}>
                        <div>
                            학생 노출
                        </div>
                        <div>
                            <RadioGroup value={show} onChange={(e) => { change(e, "show") }} row aria-label="gender" name="row-radio-buttons-group">
                                <FormControlLabel value="yes" control={<Radio />} label={<span className={styles.text}>YES</span>} />
                                <FormControlLabel value="no" control={<Radio />} label={<span className={styles.text}>NO</span>} />
                            </RadioGroup>
                        </div>
                    </div>
                    <div className={styles.submit}>
                        <div onClick={submit} className={styles.submitBtn}>
                            제출하기
                        </div>
                    </div>

                    {loading &&
                        <Box sx={{ width: '100%', marginTop: 3, marginBottom: 3 }}>
                            <LinearProgress />
                        </Box>
                    }



                    {uploadBool &&
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="info" sx={{ marginTop: 2, marginBottom: 2 }}><span className={styles.spanStyles2}>업로드 성공 !</span></Alert>
                        </Stack>
                    }
                </Box>
            </Modal>


        </div>
    )
}

export default Attendance;