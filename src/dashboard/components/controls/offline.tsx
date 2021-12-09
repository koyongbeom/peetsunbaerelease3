import React, { useEffect, useState } from 'react'
import styles from '../../componentsStyle/offline.module.css'
import { Button, CircularProgress } from "@mui/material";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import koLocale from 'date-fns/locale/ko'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import TimePicker from '@mui/lab/TimePicker';
import { AnySrvRecord, AnyTxtRecord } from 'dns';
import Alert from '@mui/material/Alert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import OfflineStatus from './offlinestatus';


const Offline: React.FC<any> = (props) => {
    const [loading, setLoading] = useState(false);

    const [isNull, setIsNull] = useState(false);

    const [currentId, setCurrentId] = useState(0);

    const [selectedMenu, setSelectedMenu] = useState("chemistry");
    const [openUpload, setOpenUpload] = useState(false);
    const [teacherName, setTeacherName] = useState("");
    const [uploadTeacherDescription, setUploadTeacherDescription] = useState("");
    const [uploadFile, setUploadFile] = useState();
    const [uploadFileName, setUploadFileName] = useState();
    const [uploadLoading, setUploadLoading] = useState(false);
    const [uploadBool, setUploadBool] = useState(false);
    const [uploadSubject, setUploadSubject] = useState("chemistry");
    const [date, setDate] = useState<any>(new Date());
    const [uploadTelephoneNumber, setUploadTelephoneNumber] = useState();
    const [startTime, setStartTime] = useState<any>(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 14));
    const [endTime, setEndTime] = useState<any>(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 14));

    const [teacher, setTeacher] = useState("");
    const [location, setLocation] = useState("");
    const [dateValue, setDateValue] = useState(new Date());
    const [availableDate, setAvailableDate] = useState<any>();
    const [calendarLoading, setCalendarLoading] = useState(false);
    const [enrolled, setEnrolled] = useState<any>();
    const [enrollStatus, setEnrollStatus] = useState<any>("");
    const [enrollLoading, setEnrollLoading] = useState(false);
    const [afterEnroll, setAfterEnroll] = useState(false);

    const [updateModalOpen, setUpdateModalOpen] = useState(false);

    const [updateBool, setUpdateBool] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);



    const handleUpdateModalOpen = () => {
        setUpdateModalOpen(true);
    }

    const handleUpdateModalClose = () => {
        setUpdateModalOpen(false);
    }

    const [data, setData] = useState<any>();

    const [random, setRandom] = useState(1);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const deleteQuestion = (event: any) => {
        setAnchorEl(null);
        event.preventDefault();

        var message = { id: currentId };

        var token = "";

        if (window.electron) {
            token = window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/question/offline/delete", {
            method: "POST",
            headers: { "Authorization": token, "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(message)
        }).then((response) => {
            response.json()
                .then((response) => {
                    console.log(response);
                    setUpdateLoading(false);
                    if (response.message === "success") {
                        alert("업로드 성공");
                        setRandom(Math.random());
                    }
                })
        }).catch((error) => {
            console.log(error);
        })
    }

    const changeTime = (event: any) => {
        handleUpdateModalOpen();
        setAnchorEl(null);
    }


    useEffect(() => {
        setLoading(true);
        const start = async () => {
            var token = "";
            setCalendarLoading(true);

            if (window.electron) {
                token = window.electron.sendMessageApi.getToken();
            }

            await fetch(`https://peetsunbae.com/dashboard/question/offline/get?subject=${selectedMenu}`, {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include"
            }).then((response) => {
                response.json()
                    .then((result) => {
                        console.log(result);
                        setCalendarLoading(false);
                        setData(result.data);
                        if (result.data.length > 0) {
                            setEnrolled([...result.enrolled]);
                            var newAvailableDate: any = [];
                            result.data.forEach((each: any) => {
                                newAvailableDate.push(new Date(each.targetDate));
                            })
                            console.log(newAvailableDate[0].getFullYear());
                            if (!afterEnroll) {
                                setDateValue(newAvailableDate[0]);
                                setCurrentId(result.data[0].id);
                                console.log(result.data[0].id);
                            }
                            setAvailableDate([...newAvailableDate]);
                            setLoading(false);
                        } else {
                            setCurrentId(0);
                            setIsNull(true);
                            var VOID: any;
                            setDateValue(VOID);
                            setLoading(false);
                        }
                    })
            })
        }

        if (!(selectedMenu === "status")) {
            setAvailableDate("");
            start();
        }

    }, [selectedMenu, random]);


    const selectMenu = (e: any, subject: string) => {
        setSelectedMenu(subject);
    }

    const handleCloseUpload = () => {
        setOpenUpload(false);
    }

    const selectSubject = (e: any, value: any) => {
        if (value && uploadFile && teacherName && uploadTelephoneNumber && uploadTeacherDescription && date && startTime && endTime && new Date(startTime).getTime() < new Date(endTime).getTime() && new Date(startTime).getMinutes() % 15 === 0 && new Date(endTime).getMinutes() % 15 === 0) {
            setUploadBool(true);
        } else {
            setUploadBool(false);
        }
        setUploadSubject(value);
        console.log(value);
    }

    const handleUploadTeacherName = (e: any) => {
        setTeacherName(e.target.value);

        if (uploadSubject && uploadFile && e.target.value && uploadTelephoneNumber && uploadTeacherDescription && date && startTime && endTime && new Date(startTime).getTime() < new Date(endTime).getTime() && new Date(startTime).getMinutes() % 15 === 0 && new Date(endTime).getMinutes() % 15 === 0) {
            setUploadBool(true);
        } else {
            setUploadBool(false);
        }
    }

    const handleUploadTeacherDescription = (e: any) => {
        setUploadTeacherDescription(e.target.value);

        if (uploadSubject && uploadFile && teacherName && e.target.value && uploadTelephoneNumber && date && startTime && endTime && new Date(startTime).getTime() < new Date(endTime).getTime() && new Date(startTime).getMinutes() % 15 === 0 && new Date(endTime).getMinutes() % 15 === 0) {
            setUploadBool(true);
        } else {
            setUploadBool(false);
        }
    }

    const handleUploadTelephoneNumber = (e: any) => {
        setUploadTelephoneNumber(e.target.value);

        if (uploadSubject && uploadFile && teacherName && uploadTeacherDescription && uploadTelephoneNumber && date && startTime && endTime && new Date(startTime).getTime() < new Date(endTime).getTime() && new Date(startTime).getMinutes() % 15 === 0 && new Date(endTime).getMinutes() % 15 === 0) {
            setUploadBool(true);
        } else {
            setUploadBool(false);
        }
    }


    const fileOnChange = (event: any) => {
        if (uploadSubject && event && event.target && uploadTelephoneNumber && event.target.files && event.target.files.length > 0 && teacherName && uploadTeacherDescription && date && startTime && endTime && new Date(startTime).getTime() < new Date(endTime).getTime() && new Date(startTime).getMinutes() % 15 === 0 && new Date(endTime).getMinutes() % 15 === 0) {
            setUploadBool(true);
        } else {
            setUploadBool(false);
        }

        if (event.target.files.length > 0) {
            console.log(event.target.files);
            console.log(event.target.files[0].name);

            if (event.target) {
                setUploadFile(event.target.files[0]);
                setUploadFileName(event.target.files[0].name);
            }
        }
    }


    const deleteFile = (event: any) => {
        var VOID;
        setUploadFile(VOID);
        setUploadFileName(VOID);
        setUploadBool(false);
    }

    const uploadSubmit = (e: any) => {
        e.preventDefault();
        setUploadLoading(true);

        var formData = new FormData();
        var message = { uploadSubject: uploadSubject, teacherName: teacherName, uploadTelephoneNumber: uploadTelephoneNumber, uploadTeacherDescription: uploadTeacherDescription, date: date, startTime: startTime, endTime: endTime };
        formData.append("message", JSON.stringify(message));
        console.log(uploadFile);

        if (uploadFile) {
            formData.append("teacher_picture", uploadFile);
        }

        var token = "";

        if (window.electron) {
            token = window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/question/offline/write", {
            method: "POST",
            headers: { "Authorization": token },
            credentials: "include",
            body: formData
        }).then((response) => {
            response.json()
                .then((response) => {
                    console.log(response);
                    setUploadLoading(false);
                    if (response.message === "success") {
                        alert("업로드 성공");
                        setTeacherName("");
                        setUploadTeacherDescription("");
                        var VOID;
                        setUploadFile(VOID);
                        setUploadFileName(VOID);
                        setUploadBool(false);
                    }
                    if (response.message === "DUPLICATE") {
                        alert("이미 해당 날에 해당 과목 질의응답 등록되어 있어 등록이 불가능합니다.");
                    }
                })
        }).catch((error) => {
            console.log(error);
        })
    }

    const updateSubmit = (e: any) => {
        e.preventDefault();
        setUpdateLoading(true);

        var message = { startTime: startTime, endTime: endTime, id: currentId };

        var token = "";

        if (window.electron) {
            token = window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/question/offline/update", {
            method: "POST",
            headers: { "Authorization": token, "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(message)
        }).then((response) => {
            response.json()
                .then((response) => {
                    console.log(response);
                    setUpdateLoading(false);
                    if (response.message === "success") {
                        setAfterEnroll(true);
                        alert("업로드 성공");
                        setRandom(Math.random());
                        setTimeout(() => {
                            setAfterEnroll(false);
                        }, 500);
                    }
                })
        }).catch((error) => {
            console.log(error);
        })
    }

    const isVoid = (date: any) => {
        if (availableDate) {
            var count = 0;
            availableDate.forEach((each: any) => {
                const available = each;
                if (available.getDate() === date.getDate() && available.getFullYear() === date.getFullYear() && available.getMonth() === date.getMonth()) {
                    count++;
                }
            })
            if (count > 0) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    const enrollQuestion = async (e: any) => {
        setEnrollLoading(true);

        console.log(e.target.dataset.questionid);
        console.log(e.target.dataset.time);

        var token = "";

        if (window.electron) {
            token = window.electron.sendMessageApi.getToken();
        }

        const message = { questionId: e.target.dataset.questionid, time: e.target.dataset.time }

        await fetch("https://peetsunbae.com/dashboard/question/offline/enroll", {
            method: "POST",
            headers: { "Authorization": token, "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                message: message
            })
        }).then((response) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    setEnrollStatus(result.message);
                    setTimeout(() => {
                        setEnrollStatus("");
                    }, 2000);
                    setAfterEnroll(true);
                    setTimeout(() => {
                        setAfterEnroll(false);
                    }, 500);

                    setRandom(Math.random());
                    setEnrollLoading(false);
                })
        })
    }

    const voidFunction = (e: any) => {

    }


    const styleCharge = {
        borderRadius: "6px",
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
    };

    const styleUpdateModal = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    return (

        <div className={styles.offlineBoard}>
            <div onClick={(e) => { setOpenUpload(false) }} className={styles.offlineBody}>
                <div className={styles.menuDiv}>
                    <div className={selectedMenu === "chemistry" ? styles.active : ""} onClick={(e) => { selectMenu(e, "chemistry") }}>화학</div>
                    <div className={selectedMenu === "organic" ? styles.active : ""} onClick={(e) => { selectMenu(e, "organic") }}>유기</div>
                    <div className={selectedMenu === "physics" ? styles.active : ""} onClick={(e) => { selectMenu(e, "physics") }}>물리</div>
                    <div className={selectedMenu === "biology" ? styles.active : ""} onClick={(e) => { selectMenu(e, "biology") }}>생물</div>
                    <div className={selectedMenu === "status" ? styles.active : ""} onClick={(e) => { selectMenu(e, "status") }}>신청현황</div>
                </div>
            </div>

            {(loading &&!(selectedMenu === "status")) &&
            <div className={styles.loading}>
                <CircularProgress />
            </div>
            }

            {(!(selectedMenu === "status") && !loading ) &&
                        <>
                        <div className={styles.teacherDiv}>
                            <div className={styles.teacherImg}>
                                {data && data.map((each: any) => {
                                    if (new Date(each.targetDate).getDate() === new Date(dateValue).getDate() && new Date(each.targetDate).getMonth() === new Date(dateValue).getMonth() && new Date(each.targetDate).getFullYear() === new Date(dateValue).getFullYear()) {
                                        return (
                                            <img className={styles.teacherImage} src={`https://peetsunbae.com/${each.src.split("/public/")[1]}`} alt="img"></img>
                                        );;
                                    }
                                })}
                            </div>
                            <div className={styles.teacherDescription}>
                                <div className={styles.teacherSubject}>
                                    {selectedMenu === "chemistry" ? "ㆍ 피트선배 화학 담당" : ""}
                                    {selectedMenu === "organic" ? "ㆍ 피트선배 유기화학 담당" : ""}
                                    {selectedMenu === "physics" ? "ㆍ 피트선배 물리 담당" : ""}
                                    {selectedMenu === "biology" ? "ㆍ 피트선배 생물 담당" : ""}
                                </div>
                                <div className={styles.teacherName}>
                                    {data && data.map((each: any) => {
                                        if (new Date(each.targetDate).getDate() === new Date(dateValue).getDate() && new Date(each.targetDate).getMonth() === new Date(dateValue).getMonth() && new Date(each.targetDate).getFullYear() === new Date(dateValue).getFullYear()) {
                                            return (
                                                `ㆍ ${each.teacherName}`
                                            );
                                        }
                                    })}
                                </div>
                                <div className={styles.location}>
                                    {data && data.map((each: any) => {
                                        if (new Date(each.targetDate).getDate() === new Date(dateValue).getDate() && new Date(each.targetDate).getMonth() === new Date(dateValue).getMonth() && new Date(each.targetDate).getFullYear() === new Date(dateValue).getFullYear()) {
                                            return (
                                                `ㆍ ${each.uploadTeacherDescription}`
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
        
                        <div className={styles.selectDiv}>
                            <LocalizationProvider locale={koLocale} dateAdapter={AdapterDateFns}>
                                <StaticDatePicker
                                    loading={calendarLoading}
                                    shouldDisableDate={isVoid}
                                    displayStaticWrapperAs="desktop"
                                    openTo="day"
                                    value={dateValue}
                                    disablePast
                                    onChange={(newValue: any) => {
                                        console.log(newValue);
                                        setDateValue(newValue);
                                        if (data) {
                                            data.map((each: any) => {
                                                if (new Date(each.targetDate).getDate() === new Date(newValue).getDate() && new Date(each.targetDate).getMonth() === new Date(newValue).getMonth() && new Date(each.targetDate).getFullYear() === new Date(newValue).getFullYear()) {
                                                    setCurrentId(each.id);
                                                    console.log("-------------");
                                                    console.log(each.id);
                                                }
                                            })
                                        }
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <div className={styles.timeSelect}>
                                <div className={styles.timeSelectTitle}>
                                    <div>시간선택</div>
                                    {props.user && (props.user.value === "teacher" || props.user.value === "staff") ?
                                        <div id="basic-button" onClick={handleClick}>
        
                                            <img className={styles.cog} src="img/cog-solid.svg" alt="setting" />
                                        </div> : ""}
                                </div>
                                <div className={styles.alert}>
                                    {enrollStatus === "ALREADY" && <Alert severity="error"><span className={styles.alertSpan}>이미 해당 날짜에 등록하셨습니다.</span></Alert>}
                                    {enrollStatus === "DUPLICATE" && <Alert severity="error"><span className={styles.alertSpan}>다른 학생이 예약한 시간입니다.</span></Alert>}
                                    {enrollStatus === "DELETED" && <Alert severity="info"><span className={styles.alertSpan}>해당 시간 예약이 취소되었습니다.</span></Alert>}
                                    {enrollStatus === "success" && <Alert severity="info"><span className={styles.alertSpan}>해당 시간 예약이 완료되었습니다.</span></Alert>}
                                </div>
                                {enrollLoading ?
                                    <div className={styles.enrollLoading}>
                                        <CircularProgress />
                                    </div>
                                    :
                                    <div className={styles.times}>
                                        {data && enrolled && data.map((each: any) => {
                                            if (new Date(each.targetDate).getDate() === new Date(dateValue).getDate() && new Date(each.targetDate).getMonth() === new Date(dateValue).getMonth() && new Date(each.targetDate).getFullYear() === new Date(dateValue).getFullYear()) {
        
                                                return (
                                                    each.availableTimes.map((one: any) => {
                                                        var status;
                                                        var count = 0;
                                                        enrolled.forEach((enrolledTime: any) => {
                                                            if ((+one.hours * 60 + +one.minutes) === +enrolledTime.questionTime && each.id === enrolledTime.questionId) {
                                                                status = "occupied"
                                                                if (+enrolledTime.userId === +props.user.id) {
                                                                    status = "mine"
                                                                }
                                                            }
                                                        })
        
                                                        return (
                                                            <div onClick={status === "occupied" ? voidFunction : enrollQuestion} data-questionid={each.id} data-time={+one.hours * 60 + +one.minutes} className={`${styles.timeDiv} ${status === "occupied" ? styles.occupied : ""} ${status === "mine" ? styles.mine : ""}`}>
                                                                {one.hours} : {one.minutes < 10 ? "0" + one.minutes : one.minutes}
                                                            </div>
                                                        )
                                                    })
                                                )
                                            }
                                        })}
                                    </div>}
                            </div>
                            <div className={styles.questionDescription}>
                                <div className={styles.questionDescriptionTitle}>
                                    질의 내용 전송(선택사항)
                                </div>
                                <div className={styles.questionDiscriptionDiv}>
                                    {data && data.map((each: any) => {
                                        if (new Date(each.targetDate).getDate() === new Date(dateValue).getDate() && new Date(each.targetDate).getMonth() === new Date(dateValue).getMonth() && new Date(each.targetDate).getFullYear() === new Date(dateValue).getFullYear()) {
                                            return (
                                                <div>
                                                    <div>
                                                        {each.telephoneNumber ? "선생님 전화번호" : ""}
                                                    </div>
                                                    <div>
                                                        {each.telephoneNumber ? each.telephoneNumber : ""}
                                                    </div>
                                                    <div>
                                                        {each.telephoneNumber ? "질의할 내용을 카톡이나 문자로 미리 전송해주시면 더 좋은 질의응답을 받을 수 있습니다." : ""}
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
        
                            </div>
                        </div>
        
        
        
        
                        {(props.user && (props.user.value === "teacher" || props.user.value === "staff")) &&
                            <div onClick={(e) => { setOpenUpload(true) }} className="qnaWrite">
                                <img src="./img/pencil.svg" alt="pencil" />
                                질의응답 등록
                            </div>
                        }
        
                        <Modal
                            open={openUpload}
                            onClose={handleCloseUpload}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={styleCharge}>
        
                                <form encType="multipart/formdata">
        
                                    <div onClick={(e) => { setOpenUpload(false) }} className={styles.chargeTitle}>
                                        오프라인 질의응답 업로드
                                    </div>
        
                                    <div className={styles.chargeBoard}>
        
                                        <FormControl sx={{ marginBottom: "0px" }} component="fieldset">
                                            <FormLabel component="legend" sx={{ fontFamily: "Apple_R", color: "black !important" }}><span className="radioTitle">과목 선택</span></FormLabel>
                                            <RadioGroup onChange={(e, value) => { selectSubject(e, value) }} row aria-label="gender" name="row-radio-buttons-group">
                                                <FormControlLabel value="chemistry" control={<Radio />} label={<span className="radio">화학</span>} />
                                                <FormControlLabel value="organic" control={<Radio />} label={<span className="radio">유기</span>} />
                                                <FormControlLabel value="physics" control={<Radio />} label={<span className="radio">물리</span>} />
                                                <FormControlLabel value="biology" control={<Radio />} label={<span className="radio">생물</span>} />
                                            </RadioGroup>
                                        </FormControl>
        
        
                                        <FormControl fullWidth>
                                            <div className={styles.chargeName}>선생님 이름</div>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                value={teacherName}
                                                onChange={handleUploadTeacherName}
                                            />
                                        </FormControl>
        
                                        <FormControl fullWidth>
                                            <div className={styles.chargeName}>선생님 전화번호</div>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                value={uploadTelephoneNumber}
                                                onChange={handleUploadTelephoneNumber}
                                            />
                                        </FormControl>
        
                                        <FormControl fullWidth>
                                            <div className={styles.chargeName}>질의응답 장소</div>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                value={uploadTeacherDescription}
                                                onChange={handleUploadTeacherDescription}
                                            />
                                        </FormControl>
        
                                        <div className={styles.datePicker}>
                                            <div className={styles.datePickerTitle}>날짜 선택</div>
                                            <LocalizationProvider locale={koLocale} dateAdapter={AdapterDateFns}>
                                                <DatePicker
        
                                                    value={date}
                                                    onChange={(newValue: any) => {
                                                        console.log(new Date(newValue).toString());
                                                        setDate(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
        
                                                <div className={styles.datePickerDiv}>
                                                    <div>
                                                        <div className={styles.datePickerTitle1}>시작 시간</div>
        
                                                        <TimePicker
                                                            value={startTime}
                                                            onChange={(newValue) => {
                                                                console.log(new Date(newValue).toString());
                                                                setStartTime(newValue);
                                                                if (uploadSubject && uploadFile && teacherName && uploadTelephoneNumber && uploadTeacherDescription && date && startTime && endTime && new Date(newValue).getTime() < new Date(endTime).getTime() && new Date(newValue).getMinutes() % 15 === 0 && new Date(endTime).getMinutes() % 15 === 0) {
                                                                    setUploadBool(true);
                                                                } else {
                                                                    setUploadBool(false);
                                                                }
        
                                                            }}
                                                            renderInput={(params) => <TextField className={styles.timePicker1} {...params} />}
                                                        />
                                                    </div>
        
                                                    <div>
                                                        <div className={styles.datePickerTitle2}>종료 시간</div>
        
                                                        <TimePicker
                                                            value={endTime}
                                                            onChange={(newValue) => {
                                                                if (uploadSubject && uploadFile && teacherName && uploadTelephoneNumber && uploadTeacherDescription && date && startTime && endTime && new Date(startTime).getTime() < new Date(newValue).getTime() && new Date(startTime).getMinutes() % 15 === 0 && new Date(newValue).getMinutes() % 15 === 0) {
                                                                    setUploadBool(true);
                                                                } else {
                                                                    setUploadBool(false);
                                                                }
                                                                setEndTime(newValue);
                                                            }}
                                                            renderInput={(params) => <TextField className={styles.timePicker2} {...params} />}
                                                        />
                                                    </div>
        
                                                </div>
                                                <div className={styles.addText}> * 00분, 15분, 30분, 45분 중 선택해주세요</div>
                                            </LocalizationProvider>
                                        </div>
        
        
                                        {
                                            uploadFile ?
                                                <div className="answerFile" style={{ marginTop: "16px" }}>
                                                    <div className="answerFileTitle">
                                                        <img className="uploadedFileClip" src="img/paperclip-light.svg" alt="file" />
                                                        <div>{uploadFileName}</div>
                                                    </div>
                                                    <div>
                                                        <img onClick={deleteFile} className="uploadedFileTrash" src="img/trash-alt-light.svg" alt="config" />
                                                    </div>
                                                </div> : ""
                                        }
        
        
                                        <div className={styles.uploadFileDiv}>
                                            <label htmlFor="file">
                                                <div className={styles.uploadFile}>
                                                    <img className="clip" src="img/paperclip-light.svg" alt="file" /><span></span>
                                                </div>
                                            </label>
                                            <input onChange={(e) => fileOnChange(e)} type="file" name="file" id="file" accept="image/*" hidden />
                                            <div className={styles.addText}> *1200px X 800px</div>
                                        </div>
        
        
                                    </div>
        
                                    <div className={styles.chargeBtnDiv}>
        
                                        {uploadLoading ?
                                            <div className="answerloading">
                                                <CircularProgress />
                                            </div> : ""
                                        }
                                        {uploadBool ?
                                            <div onClick={uploadSubmit} className={styles.chargeBtn}>
                                                업로드
                                            </div>
                                            :
                                            <div className={styles.disabledChargedBtn}>
                                                업로드
                                            </div>
                                        }
        
                                    </div>
                                </form>
                            </Box>
                        </Modal>
        
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleMenuClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={changeTime}>시간변경</MenuItem>
                            <div className={styles.blank}></div>
                            <MenuItem onClick={deleteQuestion} className={styles.deleteQuestionStyles}>글 삭제</MenuItem>
        
                        </Menu>
        
                        <Modal
                            open={updateModalOpen}
                            onClose={handleUpdateModalClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={styleUpdateModal}>
                                <LocalizationProvider locale={koLocale} dateAdapter={AdapterDateFns}>
                                    <div className={styles.datePickerDiv}>
                                        <div>
                                            <div className={styles.datePickerTitle1}>시작 시간</div>
                                            <TimePicker
                                                value={startTime}
                                                onChange={(newValue) => {
                                                    console.log(new Date(newValue).toString());
                                                    setStartTime(newValue);
                                                    if (startTime && endTime && new Date(newValue).getTime() < new Date(endTime).getTime() && new Date(newValue).getMinutes() % 15 === 0 && new Date(endTime).getMinutes() % 15 === 0) {
                                                        setUpdateBool(true);
                                                    } else {
                                                        setUpdateBool(false);
                                                    }
        
                                                }}
                                                renderInput={(params) => <TextField className={styles.timePicker1} {...params} />}
                                            />
                                        </div>
        
                                        <div>
                                            <div className={styles.datePickerTitle2}>종료 시간</div>
        
                                            <TimePicker
                                                value={endTime}
                                                onChange={(newValue) => {
                                                    if (startTime && endTime && new Date(startTime).getTime() < new Date(newValue).getTime() && new Date(startTime).getMinutes() % 15 === 0 && new Date(newValue).getMinutes() % 15 === 0) {
                                                        setUpdateBool(true);
                                                    } else {
                                                        setUpdateBool(false);
                                                    }
                                                    setEndTime(newValue);
                                                }}
                                                renderInput={(params) => <TextField className={styles.timePicker2} {...params} />}
                                            />
                                        </div>
        
                                    </div>
                                    <div className={styles.addText}> * 00분, 15분, 30분, 45분 중 선택해주세요</div>
                                </LocalizationProvider>
        
                                <div className={styles.chargeBtnDiv}>
        
                                    {updateLoading ?
                                        <div className="answerloading">
                                            <CircularProgress />
                                        </div> : ""
                                    }
                                    {updateBool ?
                                        <div onClick={updateSubmit} className={styles.chargeBtn}>
                                            업로드
                                        </div>
                                        :
                                        <div className={styles.disabledChargedBtn}>
                                            업로드
                                        </div>
                                    }
        
                                </div>
        
                            </Box>
                        </Modal>
        
                    </>
            }
            {
                selectedMenu === "status" &&
                <OfflineStatus user={props.user} />
            }

        </div>
    )
}

export default Offline;