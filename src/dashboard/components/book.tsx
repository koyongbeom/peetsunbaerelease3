import React, { useEffect, useState, useRef } from 'react';
import { RouteComponentProps } from 'react-router';
import styles from '../componentsStyle/book.module.css';
import { LinearProgress, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface bookProps extends RouteComponentProps {
    activateMenuList: (curret: currentSideBarMenuList) => void;
    user: any;
}


const Book: React.FC<bookProps> = (props) => {

    const [loading, setLoading] = useState(false);

    const [correctChemistry, setCorrectChemistry] = useState("");
    const [correctOrganic, setCorrectOrganic] = useState("");
    const [correctPhysics, setCorrectPhysics] = useState("");
    const [correctBiology, setCorrectBiology] = useState("");

    const [feedbackChemistry, setFeedbackChemistry] = useState("");
    const [feedbackOrganic, setFeedbackOrganic] = useState("");
    const [feedbackPhysics, setFeedbackPhysics] = useState("");
    const [feedbackBiology, setFeedbackBiology] = useState("");

    const [lectureChemistry, setLectureChemistry] = useState("");
    const [lectureOrganic, setLectureOrganic] = useState("");
    const [lecturePhysics, setLecturePhysics] = useState("");
    const [lectureBiology, setLectureBiology] = useState("");

    const [beforeWeekChemistry, setBeforeWeekChemistry] = useState("");
    const [beforeWeekOrganic, setBeforeWeekOrganic] = useState("");
    const [beforeWeekPhysics, setBeforeWeekPhysics] = useState("");
    const [beforeWeekBiology, setBeforeWeekBiology] = useState("");

    const [nextWeekChemistry, setNextWeekChemistry] = useState("");
    const [nextWeekOrganic, setNextWeekOrganic] = useState("");
    const [nextWeekPhysics, setNextWeekPhysics] = useState("");
    const [nextWeekBiology, setNextWeekBiology] = useState("");

    const [descriptionChemistry, setDescriptionChemistry] = useState("");
    const [descriptionOrganic, setDescriptionOrganic] = useState("");
    const [descriptionPhysics, setDescriptionPhysics] = useState("");
    const [descriptionBiology, setDescriptionBiology] = useState("");

    const [addText, setAddText] = useState("");

    const [month, setMonth] = useState<any>();
    const [date, setDate] = useState<any>();
    const [teacherName, setTeacherName] = useState("");
    const [studentName, setStudentName] = useState("");
    const [index, setIndex] = useState(0);

    const [unit, setUnit] = useState("");

    const [users, setUsers] = useState<any>([]);
    const [filteredUsers, setFilteredUsers] = useState<any>([]);

    const [isNotReady, setIsNotReady] = useState(true);

    const [selectedUser, setSelectedUser] = useState<any>();

    const autoC = useRef<any>(null);

    const handleChange = (e: any) => {
        setStudentName("");
        setTeacherName("");
        setIndex(0);
        erase();
        setUnit(e.target.value);

        const ele = autoC.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0];
        if (ele) ele.click();

        if (e.target.value === "total"){
            setIsNotReady(false);
        }else{
            setIsNotReady(true);
        }


        if (users && e.target.value === "teacher") {
            const newUsers = users.filter((each: any) => {
                return (
                    (each.value === "teacher" || each.value === "staff")
                )
            })
            setFilteredUsers([...newUsers]);
        }

        if (users && e.target.value === "student"){
            const newUsers = users.filter((each: any) => {
                return (
                    (each.value === "student")
                )
            })
            setFilteredUsers([...newUsers]);
        }

        if (users && e.target.value === "total"){
            const newUsers = users.filter((each: any) => {
                return (
                    (each.value === "nothing")
                )
            })
            setFilteredUsers([...newUsers]);
        }

    }



    useEffect(() => {
        props.activateMenuList("book");

    }, []);

    const minus = (e: any) => {
        if (index === 0) {
            console.log(0);
            // alert("현재 가장 최근 상담일지입니다.")
        } else {
            const newIndex = index;
            setIndex(newIndex - 1);
            if(isNotReady === false)
            search("e", newIndex - 1);
        }
    }

    const plus = (e: any) => {
        console.log(index);
        const newIndex = index;
        setIndex(newIndex + 1);
        if(isNotReady === false)
        search("e", newIndex + 1);
    }



    useEffect(() => {

        if(!props.user){
            return;
        }

        console.log("---------");
        async function start() {
            setLoading(true);
            console.log(111);
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch(`https://peetsunbae.com/dashboard/chart/before?userId=${props.user ? props.user.id : ""}&index=${index}`, {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        if (result.message === "success") {
                            console.log(result);
                            setMonth(result.month);
                            setDate(result.date);
                            const information = result.data.information;
                            setCorrectChemistry(information.correctChemistry);
                            setCorrectOrganic(information.correctOrganic);
                            setCorrectPhysics(information.correctPhysics);
                            setCorrectBiology(information.correctBiology);
                            setFeedbackChemistry(information.feedbackChemistry);
                            setFeedbackOrganic(information.feedbackOrganic);
                            setFeedbackPhysics(information.feedbackPhysics);
                            setFeedbackBiology(information.feedbackBiology);
                            setLectureChemistry(information.lectureChemistry);
                            setLectureOrganic(information.lectureOrganic);
                            setLecturePhysics(information.lecturePhysics);
                            setLectureBiology(information.lectureBiology);
                            setBeforeWeekChemistry(information.beforeWeekChemistry);
                            setBeforeWeekOrganic(information.beforeWeekOrganic);
                            setBeforeWeekPhysics(information.beforeWeekPhysics);
                            setBeforeWeekBiology(information.beforeWeekBiology);
                            setNextWeekChemistry(information.nextWeekChemistry);
                            setNextWeekOrganic(information.nextWeekOrganic);
                            setNextWeekPhysics(information.nextWeekPhysics);
                            setNextWeekBiology(information.nextWeekBiology);
                            setDescriptionChemistry(information.descriptionChemistry);
                            setDescriptionOrganic(information.descriptionOrganic);
                            setDescriptionPhysics(information.descriptionPhysics);
                            setDescriptionBiology(information.descriptionBiology);
                            setAddText(information.addText);
                            setTeacherName(result.data.name);

                            setLoading(false);
                        } else if (result.message === "NOT") {
                            // alert("존재하지 않습니다.");
                            setLoading(false);
                        }
                        setLoading(false);
                    })
            })
        }

        if(props.user && (props.user.value === "student" || props.user.value === "parent")){
        start();
        }

    }, [index, props.user]);

    useEffect(() => {

        async function start() {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/chart/users", {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);
                        const rows: any = [];
                        result.data.forEach((each: any, index: number) => {
                            var data: any = {};
                            data.id = each.id;
                            data.label = each.name;
                            data.phoneNumber = each.phoneNumber;
                            data.value = each.value;
                            data.key = index;
                            rows.push(data);
                        })
                        setUsers([...rows]);
                        setLoading(false);

                    })
            })
        }

        if(props.user && (props.user.value === "teacher" || props.user.value === "staff")){
        start();
        }

    }, [props.user]);


    const change = (e: any, type: string) => {

    }

    const onchange = (e : any, value : any) =>{
        setStudentName("");
        setTeacherName("");
        setIndex(0);
        erase();
        console.log(value);
        setSelectedUser(value);
        if(value){
            setIsNotReady(false)
        }else{
            setIsNotReady(true);
        }
    }

    const search = async (e : any, pushedIndex : number) => {
        console.log(selectedUser);
        setLoading(true);

        if(props.user && (props.user.value === "teacher" || props.user.value === "staff")){


            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }



            fetch(`https://peetsunbae.com/dashboard/chart/search?userId=${selectedUser ? selectedUser.id : ""}&index=${pushedIndex}&type=${unit ? unit : ""}`, {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);
                        setLoading(false);
                        if(result.message === "NOT"){
                            setIndex(index-1);
                            setLoading(false);
                        }

                        if (result.message === "success") {
                            console.log(result);
                            setMonth(result.month);
                            setDate(result.date);
                            const information = result.data.information;
                            setCorrectChemistry(information.correctChemistry);
                            setCorrectOrganic(information.correctOrganic);
                            setCorrectPhysics(information.correctPhysics);
                            setCorrectBiology(information.correctBiology);
                            setFeedbackChemistry(information.feedbackChemistry);
                            setFeedbackOrganic(information.feedbackOrganic);
                            setFeedbackPhysics(information.feedbackPhysics);
                            setFeedbackBiology(information.feedbackBiology);
                            setLectureChemistry(information.lectureChemistry);
                            setLectureOrganic(information.lectureOrganic);
                            setLecturePhysics(information.lecturePhysics);
                            setLectureBiology(information.lectureBiology);
                            setBeforeWeekChemistry(information.beforeWeekChemistry);
                            setBeforeWeekOrganic(information.beforeWeekOrganic);
                            setBeforeWeekPhysics(information.beforeWeekPhysics);
                            setBeforeWeekBiology(information.beforeWeekBiology);
                            setNextWeekChemistry(information.nextWeekChemistry);
                            setNextWeekOrganic(information.nextWeekOrganic);
                            setNextWeekPhysics(information.nextWeekPhysics);
                            setNextWeekBiology(information.nextWeekBiology);
                            setDescriptionChemistry(information.descriptionChemistry);
                            setDescriptionOrganic(information.descriptionOrganic);
                            setDescriptionPhysics(information.descriptionPhysics);
                            setDescriptionBiology(information.descriptionBiology);
                            setAddText(information.addText);
                            setTeacherName(result.data.name);
                            if(result.data.studentName){
                                setStudentName(result.data.studentName);
                            }
                            setLoading(false);
                        } else if (result.message === "NOT") {
                            // alert("존재하지 않습니다.");
                            setLoading(false);
                        }
                    })
            })
        }
    }

    const erase = () => {
        setMonth(null);
        setDate(null);
        setCorrectChemistry("");
        setCorrectOrganic("");
        setCorrectPhysics("");
        setCorrectBiology("");
        setFeedbackChemistry("");
        setFeedbackOrganic("");
        setFeedbackPhysics("");
        setFeedbackBiology("");
        setLectureChemistry("");
        setLectureOrganic("");
        setLecturePhysics("");
        setLectureBiology("");
        setBeforeWeekChemistry("");
        setBeforeWeekOrganic("");
        setBeforeWeekPhysics("");
        setBeforeWeekBiology("");
        setNextWeekChemistry("");
        setNextWeekOrganic("");
        setNextWeekPhysics("");
        setNextWeekBiology("");
        setDescriptionChemistry("");
        setDescriptionOrganic("");
        setDescriptionPhysics("");
        setDescriptionBiology("");
        setAddText("");
        setTeacherName("");
    }

    return (
        <div className={styles.main}>
            <div className={styles.title}>
                <img src="img/off/chart.svg" alt="chart" /> 상담일지
            </div>

            {
                (props.user && (props.user.value === "student" || props.user.value === "parent")) &&
                <div className={styles.onlyStudent}>
                    <div>
                        <Box>
                            <Button onClick={plus} sx={{ minWidth: "46px", height: "46px", border: "1px solid #cfcfcf", color: "#6b6b6b", fontFamily: "Apple_R", backgroundColor: "white" }} variant="outlined"><img src="img/chevron-left.svg" alt="left"></img></Button>
                        </Box>
                    </div>
                    <div>
                        <Box>
                            <Button onClick={minus} sx={{ minWidth: "46px", height: "46px", marginLeft: "7px", border: "1px solid #cfcfcf", color: "#6b6b6b", fontFamily: "Apple_R", backgroundColor: "white" }} variant="outlined"><img src="img/chevron-right.svg" alt="right"></img></Button>
                        </Box>
                    </div>
                </div>
            }

            <div>
                {
                    (props.user && (props.user.value === "staff" || props.user.value === "teacher")) &&
                    <>
                        <div className={styles.direction}>
                            <div>
                                <Box sx={{ minWidth: "150px" }}>
                                    <FormControl fullWidth>
                                        <Select
                                            sx={{ height: "46px", backgroundColor: "white" }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={unit}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="student">학생별</MenuItem>
                                            <MenuItem value="teacher">담임별</MenuItem>
                                            <MenuItem value="total">전체</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>

                        </div>
                        <div className={styles.secondDirection}>
                            <div className={styles.autocompleteDiv}>
                                <Autocomplete
                                    onChange={onchange}
                                    disablePortal
                                    id="combo-box-demo"
                                    options={filteredUsers}
                                    ref={autoC}
                                    sx={{ width: "150px", backgroundColor: "white" }}
                                    renderInput={(params) => <TextField {...params}
                                        placeholder='이름' />}
                                />
                            </div>
                            <div>
                                <Button
                                sx={{
                                    width : "80px",
                                    height : "56px",
                                    marginLeft : "12px",
                                    color : "black",
                                    border : "1px solid rgb(180, 180, 180)",
                                    fontFamily : "Apple_B"
                                }}
                                onClick={(e)=>{search(e, 0)}}
                                variant="outlined"
                                disabled={isNotReady}
                                >검색</Button>
                            </div>
                            <div>
                                <Box>
                                    <Button onClick={plus} sx={{ minWidth: "56px", height: "56px", marginLeft: "24px", border: "1px solid #cfcfcf", color: "#6b6b6b", fontFamily: "Apple_R", backgroundColor: "white" }} variant="outlined"><img src="img/chevron-left.svg" alt="left"></img></Button>
                                </Box>
                            </div>
                            <div>
                                <Box>
                                    <Button onClick={minus} sx={{ minWidth: "56px", height: "56px", marginLeft: "7px", border: "1px solid #cfcfcf", color: "#6b6b6b", fontFamily: "Apple_R", backgroundColor: "white" }} variant="outlined"><img src="img/chevron-right.svg" alt="right"></img></Button>
                                </Box>
                            </div>
                        </div>
                    </>
                }
                

                <div className={styles.manageDivTitle}>
                    <div>학습관리({month && month}월 {date && date}일) {studentName && "-" + studentName}</div>
                    <div>담임선생님&nbsp;:&nbsp;{teacherName}</div>
                </div>
                <div className={styles.manageTable}>
                    {loading &&
                        <div className={styles.modalLinearProgress}>
                            <LinearProgress />
                        </div>
                    }
                    <div className={styles.firstRow}>
                        <div>
                            과목
                        </div>
                        <div>
                            국어
                        </div>
                        <div>
                            수학
                        </div>
                        <div>
                            영어
                        </div>
                        <div>
                            탐구
                        </div>
                    </div>
                    <div className={styles.secondRow}>
                        <div className={styles.secondRow_1}>
                            <div>
                                Weekly<br />ABC<br />test
                            </div>
                        </div>
                        <div className={styles.secondRow_2}>
                            <div>
                                맞은갯수/총갯수
                            </div>
                            <div>
                                피드백
                            </div>
                        </div>
                        <div className={styles.secondRow_3}>
                            <div className={styles.TextFieldwithoutborderradius}>
                                <input onChange={(e) => { change(e, "correctChemistry") }} value={correctChemistry} className={styles.input} type="text" />
                            </div>
                            <div className={styles.TextFieldwithoutborderradius2}>
                                <textarea onChange={(e) => { change(e, "feedbackChemistry") }} value={feedbackChemistry} className={styles.textarea} />
                            </div>
                        </div>
                        <div className={styles.secondRow_4}>
                            <div>
                                <input onChange={(e) => { change(e, "correctOrganic") }} value={correctOrganic} className={styles.input} type="text" />
                            </div>
                            <div>
                                <textarea onChange={(e) => { change(e, "feedbackOrganic") }} value={feedbackOrganic} className={styles.textarea} />
                            </div>
                        </div>
                        <div className={styles.secondRow_5}>
                            <div>
                                <input onChange={(e) => { change(e, "correctPhysics") }} value={correctPhysics} className={styles.input} type="text" />
                            </div>
                            <div>
                                <textarea onChange={(e) => { change(e, "feedbackPhysics") }} value={feedbackPhysics} className={styles.textarea} />
                            </div>
                        </div>
                        <div className={styles.secondRow_6}>
                            <div>
                                <input onChange={(e) => { change(e, "correctBiology") }} value={correctBiology} className={styles.input} type="text" />
                            </div>
                            <div>
                                <textarea onChange={(e) => { change(e, "feedbackBiology") }} value={feedbackBiology} className={styles.textarea} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.thirdRow}>
                        <div className={styles.thirdRow_1}>
                            <div>
                                수강진도
                            </div>
                        </div>
                        <div className={styles.thirdRow_2}>
                            <div>
                                수강강좌
                            </div>
                            <div>
                                전주 학습이행도
                            </div>
                            <div>
                                다음주 계획
                            </div>
                        </div>
                        <div className={styles.thirdRow_3}>
                            <div>
                                <input onChange={(e) => { change(e, "lectureChemistry") }} value={lectureChemistry} className={styles.input} type="text" />
                            </div>
                            <div>
                                <textarea onChange={(e) => { change(e, "beforeWeekChemistry") }} value={beforeWeekChemistry} className={styles.textarea} />
                            </div>
                            <div>
                                <input onChange={(e) => { change(e, "nextWeekChemistry") }} value={nextWeekChemistry} className={styles.input} type="text" />
                            </div>
                        </div>
                        <div className={styles.thirdRow_4}>
                            <div>
                                <input onChange={(e) => { change(e, "lectureOrganic") }} value={lectureOrganic} className={styles.input} type="text" />
                            </div>
                            <div>
                                <textarea onChange={(e) => { change(e, "beforeWeekOrganic") }} value={beforeWeekOrganic} className={styles.textarea} />
                            </div>
                            <div>
                                <input onChange={(e) => { change(e, "nextWeekOrganic") }} value={nextWeekOrganic} className={styles.input} type="text" />
                            </div>
                        </div>
                        <div className={styles.thirdRow_5}>
                            <div>
                                <input onChange={(e) => { change(e, "lecturePhysics") }} value={lecturePhysics} className={styles.input} type="text" />
                            </div>
                            <div>
                                <textarea onChange={(e) => { change(e, "beforeWeekPhysics") }} value={beforeWeekPhysics} className={styles.textarea} />
                            </div>
                            <div>
                                <input onChange={(e) => { change(e, "nextWeekPhysics") }} value={nextWeekPhysics} className={styles.input} type="text" />
                            </div>
                        </div>
                        <div className={styles.thirdRow_6}>
                            <div>
                                <input onChange={(e) => { change(e, "lectureBiology") }} value={lectureBiology} className={styles.input} type="text" />
                            </div>
                            <div>
                                <textarea onChange={(e) => { change(e, "beforeWeekBiology") }} value={beforeWeekBiology} className={styles.textarea} />
                            </div>
                            <div>
                                <input onChange={(e) => { change(e, "nextWeekBiology") }} value={nextWeekBiology} className={styles.input} type="text" />
                            </div>
                        </div>
                    </div>

                    <div className={styles.fourthRow}>
                        <div className={styles.fourthRow_1}>
                            <div>
                                학습내용<br />상세기입란
                            </div>
                        </div>
                        <div className={styles.fourthRow_2}>
                            <div>
                                <textarea onChange={(e) => { change(e, "descriptionChemistry") }} value={descriptionChemistry} className={styles.textarea} />
                            </div>
                        </div>
                        <div className={styles.fourthRow_3}>
                            <div>
                                <textarea onChange={(e) => { change(e, "descriptionOrganic") }} value={descriptionOrganic} className={styles.textarea} />
                            </div>
                        </div>
                        <div className={styles.fourthRow_4}>
                            <div>
                                <textarea onChange={(e) => { change(e, "descriptionPhysics") }} value={descriptionPhysics} className={styles.textarea} />
                            </div>
                        </div>
                        <div className={styles.fourthRow_5}>
                            <div>
                                <textarea onChange={(e) => { change(e, "descriptionBiology") }} value={descriptionBiology} className={styles.textarea} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.fifthRow}>
                        <div className={styles.fifthRow_1}>
                            <div>
                                추가사항<br />
                            </div>
                        </div>
                        <div className={styles.fifthRow_2}>
                            <div>
                                <textarea value={addText} className={styles.textarea} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Book;