import React, { useEffect, useState } from 'react'
import styles from '../../componentsStyle/offline.module.css'
import { Autocomplete, Button, CircularProgress, Divider } from "@mui/material";
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

    const [selectedUploadTeacher, setSelectedUploadTeacher] = useState<any>();

    const [selectedMenu, setSelectedMenu] = useState("enroll");
    const [openUpload, setOpenUpload] = useState(false);
    const [teacherName, setTeacherName] = useState("");
    const [uploadTeacherDescription, setUploadTeacherDescription] = useState("");
    const [uploadFile, setUploadFile] = useState();
    const [uploadFileName, setUploadFileName] = useState();
    const [uploadLoading, setUploadLoading] = useState(false);
    const [uploadBool, setUploadBool] = useState(false);
    const [uploadSubject, setUploadSubject] = useState("");
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

    const [descriptionLoading, setDescriptionLoading] = useState(false);

    const [questionValue, setQuestionValue] = useState(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);

    const [fileNames, setFileNames] = useState([[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]);
    const [files, setFiles] = useState([[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]);

    const [targetQuestionId, setTargetQuestionId] = useState(0);

    const handleUpdateModalOpen = () => {
        setUpdateModalOpen(true);
    }

    const handleUpdateModalClose = () => {
        setUpdateModalOpen(false);
    }

    const [data, setData] = useState<any>();

    const [random, setRandom] = useState(1);

    const [teachersList, setTeachersList] = useState<any>([]);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any, targetId : number) => {
        console.log(targetId);
        setTargetQuestionId(targetId);
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const deleteQuestion = (event: any) => {
        setAnchorEl(null);
        event.preventDefault();

        var message = { id: targetQuestionId };

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
                        alert("삭제 성공");
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
        const start = async () => {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/avatar/teachers", {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result.data);
                        const teacherListData = result.data;
                        const newTeacherList: any = [];
                        teacherListData.forEach((each: any) => {
                            const oneTeacher: any = {};
                            oneTeacher.id = each.id;
                            oneTeacher.label = each.name;
                            newTeacherList.push(oneTeacher);
                        })
                        console.log(newTeacherList);
                        setTeachersList([...newTeacherList]);
                    })
            })
        }

        if (props.user && props.user.value === "teacher") {
            start();
        }

    }, [props.user]);


    useEffect(() => {
        setLoading(true);
        const start = async () => {
            var token = "";
            setCalendarLoading(true);

            if (window.electron) {
                token = window.electron.sendMessageApi.getToken();
            }

            await fetch(`https://peetsunbae.com/dashboard/question/offline/get`, {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include"
            }).then((response) => {
                response.json()
                    .then((result) => {
                        console.log(result);
                        setCalendarLoading(false);
                        var sortedData = result.data;
                        if (sortedData) {
                            sortedData.sort(function (a: any, b: any) {
                                const aTargetTime = new Date(a.targetDate).getTime();
                                const bTargetTime = new Date(b.targetDate).getTime();
                                console.log(aTargetTime);

                                if (aTargetTime > bTargetTime) {
                                    return 1;
                                }
                                if (aTargetTime === bTargetTime) {
                                    return 0;
                                }
                                if (aTargetTime < bTargetTime) {
                                    return -1;
                                }
                            });
                        }

                        console.log(sortedData);

                        setData(sortedData);
                        if (sortedData.length > 0) {
                            setEnrolled([...result.enrolled]);
                            var newAvailableDate: any = [];
                            sortedData.forEach((each: any) => {
                                newAvailableDate.push(new Date(each.targetDate));
                            })
                            console.log(newAvailableDate[0].getFullYear());
                            if (!afterEnroll) {
                                setDateValue(newAvailableDate[0]);
                                setCurrentId(sortedData[0].id);
                                console.log(sortedData[0].id);
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



    //선생님 목록 가져오는 기능---------------------------------




    //---------------------------------------------------------


    const selectMenu = (e: any, subject: string) => {
        setSelectedMenu(subject);
    }

    const handleCloseUpload = () => {
        setOpenUpload(false);
    }

    const selectSubject = (e: any) => {
        if (e.target.value && selectedUploadTeacher && uploadTeacherDescription && date && startTime && endTime && new Date(startTime).getTime() < new Date(endTime).getTime() && new Date(startTime).getMinutes() % 15 === 0 && new Date(endTime).getMinutes() % 15 === 0) {
            setUploadBool(true);
        } else {
            setUploadBool(false);
        }
        setUploadSubject(e.target.value);
    }

    // const handleUploadTeacherName = (e: any) => {
    //     setTeacherName(e.target.value);

    //     if (uploadSubject && uploadFile && e.target.value && uploadTelephoneNumber && uploadTeacherDescription && date && startTime && endTime && new Date(startTime).getTime() < new Date(endTime).getTime() && new Date(startTime).getMinutes() % 15 === 0 && new Date(endTime).getMinutes() % 15 === 0) {
    //         setUploadBool(true);
    //     } else {
    //         setUploadBool(false);
    //     }
    // }

    const handleUploadTeacherDescription = (e: any) => {
        setUploadTeacherDescription(e.target.value);

        if (uploadSubject && e.target.value && selectedUploadTeacher && date && startTime && endTime && new Date(startTime).getTime() < new Date(endTime).getTime() && new Date(startTime).getMinutes() % 15 === 0 && new Date(endTime).getMinutes() % 15 === 0) {
            setUploadBool(true);
        } else {
            setUploadBool(false);
        }
    }

    // const handleUploadTelephoneNumber = (e: any) => {
    //     setUploadTelephoneNumber(e.target.value);

    //     if (uploadSubject && uploadFile && teacherName && uploadTeacherDescription && uploadTelephoneNumber && date && startTime && endTime && new Date(startTime).getTime() < new Date(endTime).getTime() && new Date(startTime).getMinutes() % 15 === 0 && new Date(endTime).getMinutes() % 15 === 0) {
    //         setUploadBool(true);
    //     } else {
    //         setUploadBool(false);
    //     }
    // }


    const fileOnChange = (event: any) => {

        console.log("fileChange1");

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


    const fileOnChange2 = (event: any, index: number) => {

        console.log("fileChange2");


        if (event.target) {
            const newFileNames = fileNames;
            const newFiles = files;

            const fileNameArray: any = [];
            const fileArray: any = [];


            for (var i = 0; i < event.target.files.length; i++) {
                fileNameArray.push(event.target.files[i].name);
                fileArray.push(event.target.files[i]);
            }

            console.log(fileNameArray);
            console.log(fileArray);

            newFileNames[index] = fileNameArray;
            newFiles[index] = fileArray;

            setFileNames([...newFileNames]);
            setFiles([...newFiles]);
        }
    }


    const deleteFile = (event: any) => {
        var VOID;
        setUploadFile(VOID);
        setUploadFileName(VOID);
        setUploadBool(false);
    }

    const deleteFile2 = (event: any) => {
        if (event.target) {
            const newFileNames = fileNames;
            const newFiles = files;

            const fileNameArray: any = newFileNames[event.target.dataset.index].filter((fileName: string) => (fileName !== event.target.dataset.name));
            const fileArray: any = newFiles[event.target.dataset.index].filter((file: any) => (file.name !== event.target.dataset.name));

            newFileNames[event.target.dataset.index] = fileNameArray;
            newFiles[event.target.dataset.index] = fileArray;

            setFileNames([...newFileNames]);
            setFiles([...newFiles]);
        }
    }

    const uploadSubmit = (e: any) => {
        e.preventDefault();
        setUploadLoading(true);

        // var formData = new FormData();
        // formData.append("message", JSON.stringify(message));
        // console.log(uploadFile);

        // if (uploadFile) {
        //     formData.append("teacher_picture", uploadFile);
        // }
        if(!selectedUploadTeacher){
            return;
        }

        const message = { uploadSubject: uploadSubject, teacherName: selectedUploadTeacher.label, teacherId : selectedUploadTeacher.id, uploadTeacherDescription: uploadTeacherDescription, date: date, startTime: startTime, endTime: endTime };


        var token = "";

        if (window.electron) {
            token = window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/question/offline/write2", {
            method: "POST",
            headers: { "content-type" : "application/json" },
            credentials: "include",
            body: JSON.stringify({
                message
            })
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

        var message = { startTime: startTime, endTime: endTime, id: targetQuestionId };

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
                        alert("시간 변경 성공");
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

    const isVoid = (date: any, targetDate: any) => {
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
                    const message = result.message;
                    if (message === "ALREADY") {
                        alert("이미 해당 날짜에 등록하셨습니다.")
                    }
                    if (message === "DUPLICATE") {
                        alert("다른 학생이 예약한 시간입니다.")
                    }
                    if (message === "DELETED") {
                        alert("해당 시간 예약이 취소되었습니다.")
                    }
                    if (message === "success") {
                        alert("해당 시간 예약이 완료되었습니다.")
                    }

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

    const descriptionSubmit = (id: number, teacherId : number, dataIndex: number, month: number, date: number, dayString: string, enrolledId : number,enrolledQuestionTime: number) => {
        setDescriptionLoading(true);

        if (!questionValue[dataIndex]) {
            alert("질의응답 내용을 적은 후 전송해주세요");
        }

        console.log(id, teacherId, dataIndex, month, date, dayString, enrolledId,enrolledQuestionTime);
        console.log(questionValue[dataIndex]);
        console.log(files[dataIndex]);

        const submitFiles = files[dataIndex];

        var formData = new FormData();
        var message = { questionId : id, teacherId, month, date, dayString, enrolledId, enrolledQuestionTime, questionValue: questionValue[dataIndex] };
        formData.append("message", JSON.stringify(message));
        submitFiles.forEach((submitFile: any) => {
            formData.append("question_picture", submitFile);
        });

        fetch("https://peetsunbae.com/dashboard/question/offlinequestion/write", {
            method: "POST",
            credentials: "include",
            body: formData
        }).then((response) => {
            response.json()
                .then((response) => {
                    setDescriptionLoading(false);
                    if (response.message === "success") {
                        console.log("success");
                        alert("질문이 성공적으로 전송되었습니다.");

                        const newFileNames = fileNames;
                        const newFiles = files;
                        const newQuestionValue = questionValue;

                        newFileNames[dataIndex] = [];
                        newFiles[dataIndex] = [];
                        newQuestionValue[dataIndex] = "";

                        setFileNames([...newFileNames]);
                        setFiles([...newFiles]);
                        setQuestionValue([...newQuestionValue]);

                    }else{
                        alert("에러가 났습니다. 관리자에게 문의하세요.")
                    }
                })
        }).catch((error) => {
            console.log(error);
        })
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
                    <div className={selectedMenu === "enroll" ? styles.active : ""} onClick={(e) => { selectMenu(e, "enroll") }}>질의응답 신청</div>
                    {/* <div className={selectedMenu === "organic" ? styles.active : ""} onClick={(e) => { selectMenu(e, "organic") }}>유기</div>
                    <div className={selectedMenu === "physics" ? styles.active : ""} onClick={(e) => { selectMenu(e, "physics") }}>물리</div>
                    <div className={selectedMenu === "biology" ? styles.active : ""} onClick={(e) => { selectMenu(e, "biology") }}>생물</div> */}
                    <div className={selectedMenu === "status" ? styles.active : ""} onClick={(e) => { selectMenu(e, "status") }}>신청현황</div>
                </div>
            </div>

            {(loading && !(selectedMenu === "status")) &&
                <div className={styles.loading}>
                    <CircularProgress />
                </div>
            }

            {(!(selectedMenu === "status") && !loading) &&
                <>
                    {
                        data && data.map((each: any, dataIndex: number) => {
                            const targetDate = new Date(each.targetDate);
                            const currentDate = new Date();
                            var today = false;
                            var currentTiming = 0;

                            var enrolledQuestionTime = 0;
                            var enrolledId = 0;

                            const month = targetDate.getMonth() + 1;
                            const date = targetDate.getDate();

                            if (targetDate.getFullYear() === currentDate.getFullYear() && targetDate.getMonth() === currentDate.getMonth() && targetDate.getDate() === currentDate.getDate()) {
                                today = true;
                                const endDate = new Date(each.endTime);
                                const endDateTiming = endDate.getHours() * 60 + endDate.getMinutes();
                                const currentDateTiming = currentDate.getHours() * 60 + currentDate.getMinutes();
                                currentTiming = currentDateTiming;

                                if (currentDateTiming + 15 >= endDateTiming) {
                                    return (
                                        <div>

                                        </div>
                                    )
                                }
                            }


                            const dateString = `${targetDate.getMonth() + 1}월 ${targetDate.getDate()}일`
                            var dayString = "";
                            switch (targetDate.getDay()) {
                                case 0:
                                    dayString = "일요일"
                                    break;
                                case 1:
                                    dayString = "월요일"
                                    break;
                                case 2:
                                    dayString = "화요일"
                                    break;
                                case 3:
                                    dayString = "수요일"
                                    break;
                                case 4:
                                    dayString = "목요일"
                                    break;
                                case 5:
                                    dayString = "금요일"
                                    break;
                                case 6:
                                    dayString = "토요일"
                                    break;
                            }

                            return (
                                <div key={each.id}>
                                    <div className={styles.teacherDiv}>
                                        <div className={styles.teacherImg}>
                                            <img className={styles.teacherImage} src={`https://peetsunbae.com/img/questionteacherimage/${each.teacherName.split(" ")[0]}.webp`} alt="img"></img>
                                        </div>
                                        <div className={styles.teacherDescription}>
                                            <div className={styles.teacherSubject}>
                                                {dateString} {dayString}
                                            </div>
                                            <div className={styles.teacherName} style={{ color: "black" }}>
                                                {each.subject}
                                            </div>
                                            <div className={styles.teacherName}>
                                                {each.teacherName}
                                            </div>
                                            <div className={styles.location}>
                                                {each.uploadTeacherDescription}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.selectDiv}>
                                        <LocalizationProvider locale={koLocale} dateAdapter={AdapterDateFns}>
                                            <StaticDatePicker
                                                loading={calendarLoading}
                                                shouldDisableDate={(date: any) => {
                                                    const targetDate = new Date(each.targetDate);
                                                    if (targetDate.getFullYear() === date.getFullYear() && targetDate.getMonth() === date.getMonth() && targetDate.getDate() === date.getDate()) {
                                                        return false
                                                    } else {
                                                        return true;
                                                    }
                                                }}
                                                displayStaticWrapperAs="desktop"
                                                openTo="day"
                                                value={new Date(each.targetDate)}
                                                disablePast
                                                onChange={(newValue: any) => {
                                                    return;
                                                    // console.log(newValue);
                                                    // setDateValue(newValue);
                                                    // if (data) {
                                                    //     data.map((each: any) => {
                                                    //         if (new Date(each.targetDate).getDate() === new Date(newValue).getDate() && new Date(each.targetDate).getMonth() === new Date(newValue).getMonth() && new Date(each.targetDate).getFullYear() === new Date(newValue).getFullYear()) {
                                                    //             setCurrentId(each.id);
                                                    //             console.log("-------------");
                                                    //             console.log(each.id);
                                                    //         }
                                                    //     })
                                                    // }
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                        {/* <div style={{width : "320px"}}>

                                    </div> */}
                                        <div className={styles.timeSelect}>
                                            <div className={styles.timeSelectTitle}>
                                                <div>시간선택 (2개까지 가능)</div>
                                                {props.user && (props.user.value === "teacher" || props.user.value === "staff") ?
                                                    <div id="basic-button" onClick={(e)=>{handleClick(e, each.id)}}>

                                                        <img className={styles.cog} src="img/cog-solid.svg" alt="setting" />
                                                    </div> : ""}
                                            </div>
                                            {/* <div className={styles.alert}>
                                            {enrollStatus === "ALREADY" && <Alert severity="error"><span className={styles.alertSpan}>이미 해당 날짜에 등록하셨습니다.</span></Alert>}
                                            {enrollStatus === "DUPLICATE" && <Alert severity="error"><span className={styles.alertSpan}>다른 학생이 예약한 시간입니다.</span></Alert>}
                                            {enrollStatus === "DELETED" && <Alert severity="info"><span className={styles.alertSpan}>해당 시간 예약이 취소되었습니다.</span></Alert>}
                                            {enrollStatus === "success" && <Alert severity="info"><span className={styles.alertSpan}>해당 시간 예약이 완료되었습니다.</span></Alert>}
                                        </div> */}
                                            {(enrollLoading || !props.user) ?
                                                <div className={styles.enrollLoading}>
                                                    <CircularProgress />
                                                </div>
                                                :
                                                <div className={styles.times}>
                                                    {   
                                                        each.availableTimes.map((one: any) => {
                                                            var status;
                                                            var count = 0;
                                                            enrolled.forEach((enrolledTime: any) => {
                                                                if ((+one.hours * 60 + +one.minutes) === +enrolledTime.questionTime && each.id === enrolledTime.questionId) {
                                                                    status = "occupied"
                                                                    if (+enrolledTime.userId === +props.user.id) {
                                                                        status = "mine";
                                                                        //첫번째 등록한 시간 기준으로 카톡가게 하려고
                                                                        if(!enrolledQuestionTime){
                                                                        enrolledQuestionTime = (+one.hours * 60 + +one.minutes);
                                                                        }
                                                                        if(!enrolledId){
                                                                        enrolledId = enrolledTime.id;
                                                                        }
                                                                        //--------------------------------------------------
                                                                    }
                                                                }
                                                            })

                                                            if (today && currentTiming - 14 > (+one.hours * 60 + +one.minutes)) {
                                                                return <></>
                                                            }

                                                            return (
                                                                <div key={+one.hours * 60 + +one.minutes} onClick={status === "occupied" ? voidFunction : enrollQuestion} data-questionid={each.id} data-time={+one.hours * 60 + +one.minutes} className={`${styles.timeDiv} ${status === "occupied" ? styles.occupied : ""} ${status === "mine" ? styles.mine : ""}`}>
                                                                    {one.hours} : {one.minutes < 10 ? "0" + one.minutes : one.minutes}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>}
                                        </div>
                                        <div className={styles.questionDescription}>
                                            <div className={styles.questionDescriptionTitle}>
                                                질의 내용 전송 (★권장사항)
                                            </div>
                                            <div className={styles.questionDiscriptionDiv}>
                                                {/* <div>
                                                            <div>
                                                                {each.telephoneNumber ? "선생님 전화번호" : ""}
                                                            </div>
                                                            <div>
                                                                {each.telephoneNumber ? each.telephoneNumber : ""}
                                                            </div>
                                                            <div>
                                                                {each.telephoneNumber ? "질의할 내용을 카톡이나 문자로 미리 전송해주시면 더 좋은 질의응답을 받을 수 있습니다." : ""}
                                                            </div>
                                                        </div> */}
                                                <div className={styles.questionDescriptionTextFieldDiv}>
                                                    <form encType="multipart/formdata" id="form2">
                                                        <TextField
                                                            fullWidth
                                                            variant='outlined'
                                                            placeholder='내용을 적어주세요.(ENTER로 줄바꿈)'
                                                            rows={6}
                                                            multiline={true}
                                                            value={questionValue[dataIndex]}
                                                            onChange={(e) => {
                                                                const newQuestionValue = questionValue;
                                                                newQuestionValue[dataIndex] = e.target.value;
                                                                setQuestionValue([...newQuestionValue]);
                                                            }}
                                                        />
                                                        {/* {
                                                            files[dataIndex].length > 0 ?
                                                                
                                                                <div className="answerFile" style={{ marginTop: "16px" }}>
                                                                    <div className="answerFileTitle">
                                                                        <img className="uploadedFileClip" src="img/paperclip-light.svg" alt="file" />
                                                                        <div>{uploadFileName}</div>
                                                                    </div>
                                                                    <div>
                                                                        <img onClick={deleteFile} className="uploadedFileTrash" src="img/trash-alt-light.svg" alt="config" />
                                                                    </div>
                                                                </div> : ""
                                                        } */}
                                                        <div className={styles.fileUploadDivWrapper}>
                                                            <div className={styles.fileNameDivWrapper}>
                                                                {
                                                                    fileNames[dataIndex].map((eachFileName: string, fileNameIndex: number) => {

                                                                        var string = ""
                                                                        if (fileNames[dataIndex].length > 2) {
                                                                            string = " ..."
                                                                        }

                                                                        return (
                                                                            <div key={fileNameIndex} className={styles.eachFileNameDiv} style={{ marginTop: "0px" }}>
                                                                                <div className={styles.eachFileName} style={{ marginTop: "0px", display: "flex", alignItems: "center" }}>
                                                                                    {eachFileName} <img onClick={deleteFile2} style={{ marginLeft: "8px" }} data-name={eachFileName} data-index={dataIndex} className="uploadedFileTrash" src="img/trash-alt-light.svg" alt="config" /> {fileNameIndex === 1 ? string : ""}
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })
                                                                }
                                                            </div>
                                                            <div className={styles.uploadFileDiv} style={{ marginTop: "0px" }}>
                                                                <label htmlFor={`fileDescription${dataIndex}`}>
                                                                    <div className={styles.uploadFile} style={{ marginTop: "8px" }}>
                                                                        <img className="clip" src="img/paperclip-light.svg" alt="file" /><span></span>
                                                                    </div>
                                                                </label>
                                                                <input onChange={(e) => { fileOnChange2(e, dataIndex) }} type="file" name={`fileDescription${dataIndex}`} id={`fileDescription${dataIndex}`} accept="image/*" multiple hidden />
                                                            </div>
                                                        </div>
                                                        <div className={styles.questionDescriptionSubmitDiv}>
                                                            <Button onClick={(e) => { if (!enrolledQuestionTime) { alert("\'질의응답 시간 선택\'을 먼저 하신 후 \'질의 내용을 전송\'해 주세요"); return; }; descriptionSubmit(each.id, each.teacherId, dataIndex, month, date, dayString, enrolledId,enrolledQuestionTime); }} variant='contained'>
                                                                {
                                                                    descriptionLoading &&
                                                                    <CircularProgress color='inherit' size={28} />
                                                                }
                                                                {
                                                                    !descriptionLoading &&
                                                                    <span className={styles.justText}>
                                                                        보내기
                                                                    </span>
                                                                }

                                                            </Button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Divider sx={{ marginTop: "80px", marginBottom: "80px" }} />
                                </div>
                            )
                        })
                    }

                    {/* <div className={styles.teacherDiv}>
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
                    </div> */}




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

                            <form encType="multipart/formdata" id="form1">

                                <div onClick={(e) => { setOpenUpload(false) }} className={styles.chargeTitle}>
                                    오프라인 질의응답 업로드
                                </div>

                                <div className={styles.chargeBoard}>

                                    {/* <FormControl sx={{ marginBottom: "0px" }} component="fieldset">
                                            <FormLabel component="legend" sx={{ fontFamily: "Apple_R", color: "black !important" }}><span className="radioTitle">과목 선택</span></FormLabel>
                                            <RadioGroup onChange={(e, value) => { selectSubject(e, value) }} row aria-label="gender" name="row-radio-buttons-group">
                                                <FormControlLabel value="chemistry" control={<Radio />} label={<span className="radio">화학</span>} />
                                                <FormControlLabel value="organic" control={<Radio />} label={<span className="radio">유기</span>} />
                                                <FormControlLabel value="physics" control={<Radio />} label={<span className="radio">물리</span>} />
                                                <FormControlLabel value="biology" control={<Radio />} label={<span className="radio">생물</span>} />
                                            </RadioGroup>
                                        </FormControl> */}

                                    <FormControl fullWidth>
                                        <div className={styles.chargeName}>질의응답 과목</div>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            value={uploadSubject}
                                            onChange={selectSubject}
                                        />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <div className={styles.chargeName}>선생님 선택</div>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={teachersList}
                                            value={selectedUploadTeacher}
                                            onChange={(event : any, newValue : any)=>{

                                                if (uploadSubject && uploadTeacherDescription && newValue && date && startTime && endTime && new Date(startTime).getTime() < new Date(endTime).getTime() && new Date(startTime).getMinutes() % 15 === 0 && new Date(endTime).getMinutes() % 15 === 0) {
                                                    setUploadBool(true);
                                                } else {
                                                    setUploadBool(false);
                                                }

                                                console.log(newValue);
                                                setSelectedUploadTeacher(newValue);
                                            }}
                                            fullWidth
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </FormControl>


                                    {/* <FormControl fullWidth>
                                        <div className={styles.chargeName}>선생님 이름</div>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            value={teacherName}
                                            onChange={handleUploadTeacherName}
                                        />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <div className={styles.chargeName}>선생님 전화번호('-' 없이)</div>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            value={uploadTelephoneNumber}
                                            onChange={handleUploadTelephoneNumber}
                                        />
                                    </FormControl> */}

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
                                                renderInput={(params) => <TextField fullWidth {...params} />}
                                            />

                                            <div className={styles.datePickerDiv}>
                                                <div>
                                                    <div className={styles.datePickerTitle1}>시작 시간</div>

                                                    <TimePicker
                                                        value={startTime}
                                                        onChange={(newValue) => {
                                                            console.log(new Date(newValue).toString());
                                                            setStartTime(newValue);
                                                            if (uploadSubject && selectedUploadTeacher && uploadTeacherDescription && date && startTime && endTime && new Date(newValue).getTime() < new Date(endTime).getTime() && new Date(newValue).getMinutes() % 15 === 0 && new Date(endTime).getMinutes() % 15 === 0) {
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
                                                            if (uploadSubject && selectedUploadTeacher && uploadTeacherDescription && date && startTime && endTime && new Date(startTime).getTime() < new Date(newValue).getTime() && new Date(startTime).getMinutes() % 15 === 0 && new Date(newValue).getMinutes() % 15 === 0) {
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


                                    {/* {
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
                                    } */}


                                    {/* <div className={styles.uploadFileDiv}>
                                        <label htmlFor="file">
                                            <div className={styles.uploadFile}>
                                                <img className="clip" src="img/paperclip-light.svg" alt="file" /><span></span>
                                            </div>
                                        </label>
                                        <input onChange={(e) => fileOnChange(e)} type="file" name="file" id="file" accept="image/*" hidden />
                                        <div className={styles.addText}> *1200px X 800px</div>
                                    </div> */}


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