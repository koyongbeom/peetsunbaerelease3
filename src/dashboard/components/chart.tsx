import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import styles from '../componentsStyle/chart.module.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface chartProps extends RouteComponentProps {
    activateMenuList: (curret: currentSideBarMenuList) => void;
}



const Chart: React.FC<chartProps> = (props) => {

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<any>();

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


    const change = (e: any, type: string) => {
        switch (type) {
            case "correctChemistry":
                setCorrectChemistry(e.target.value);
                break;
            case "correctOrganic":
                setCorrectOrganic(e.target.value);
                break;
            case "correctPhysics":
                setCorrectPhysics(e.target.value);
                break;
            case "correctBiology":
                setCorrectBiology(e.target.value);
                break;
            case "feedbackChemistry":
                setFeedbackChemistry(e.target.value);
                break;
            case "feedbackOrganic":
                setFeedbackOrganic(e.target.value);
                break;
            case "feedbackPhysics":
                setFeedbackPhysics(e.target.value);
                break;
            case "feedbackBiology":
                setFeedbackBiology(e.target.value);
                break;
            case "lectureChemistry":
                setLectureChemistry(e.target.value);
                break;
            case "lectureOrganic":
                setLectureOrganic(e.target.value);
                break;
            case "lecturePhysics":
                setLecturePhysics(e.target.value);
                break;
            case "lectureBiology":
                setLectureBiology(e.target.value);
                break;
            case "beforeWeekChemistry":
                setBeforeWeekChemistry(e.target.value);
                break;
            case "beforeWeekOrganic":
                setBeforeWeekOrganic(e.target.value);
                break;
            case "beforeWeekPhysics":
                setBeforeWeekPhysics(e.target.value);
                break;
            case "beforeWeekBiology":
                setBeforeWeekBiology(e.target.value);
                break;
            case "nextWeekChemistry":
                setNextWeekChemistry(e.target.value);
                break;
            case "nextWeekOrganic":
                setNextWeekOrganic(e.target.value);
                break;
            case "nextWeekPhysics":
                setNextWeekPhysics(e.target.value);
                break;
            case "nextWeekBiology":
                setNextWeekBiology(e.target.value);
                break;
            case "descriptionChemistry":
                setDescriptionChemistry(e.target.value);
                break;
            case "descriptionOrganic":
                setDescriptionOrganic(e.target.value);
                break;
            case "descriptionPhysics":
                setDescriptionPhysics(e.target.value);
                break;
            case "descriptionBiology":
                setDescriptionBiology(e.target.value);
                break;
        }
    }


    useEffect(() => {
        props.activateMenuList("chart");

        setLoading(true);
        console.log("---------");
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

        start();

    }, [])

    return (
        <div className={styles.main}>
            <div className={styles.title}>
                <img src="img/off/chart.svg" alt="chart" /> 상담일지 적기
            </div>
            <div className={styles.selectStudentText}>
                학생선택
            </div>
            <div className={styles.autocompleteDiv}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={users}
                    sx={{ width: 226 }}
                    renderInput={(params) => <TextField {...params} label="이름" />}
                />
            </div>
            <div className={styles.selectMenuDiv}>
                <div className={styles.selectMenu}>
                    #이전 상담일지
                </div>
                <div className={styles.selectMenu}>
                    #출석 기록
                </div>
                <div className={styles.selectMenu}>
                    #인강 수강 기록
                </div>
                <div className={styles.selectMenu}>
                    #정기 일정
                </div>
                <div className={styles.selectMenu}>
                    #학생 프로필
                </div>
            </div>
            <div className={styles.manageDiv}>
                <div className={styles.manageDivTitle}>
                    학습관리
                </div>
                <div className={styles.manageTable}>
                    <div className={styles.firstRow}>
                        <div>
                            과목
                        </div>
                        <div>
                            일반화학
                        </div>
                        <div>
                            유기화학
                        </div>
                        <div>
                            일반물리학
                        </div>
                        <div>
                            일반생물학
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
                                <input onChange={(e)=>{change(e, "correctChemistry")}} value={correctChemistry} className={styles.input} type="text" />
                            </div>
                            <div className={styles.TextFieldwithoutborderradius2}>
                                <textarea onChange={(e)=>{change(e, "feedbackChemistry")}} value={feedbackChemistry} className={styles.textarea} />
                            </div>
                        </div>
                        <div className={styles.secondRow_4}>
                            <div>
                                <input onChange={(e)=>{change(e, "correctOrganic")}} value={correctOrganic}  className={styles.input} type="text" />
                            </div>
                            <div>
                                <textarea onChange={(e)=>{change(e, "feedbackOrganic")}} value={feedbackOrganic}  className={styles.textarea} />
                            </div>
                        </div>
                        <div className={styles.secondRow_5}>
                            <div>
                                <input onChange={(e)=>{change(e, "correctPhysics")}} value={correctPhysics}  className={styles.input} type="text" />
                            </div>
                            <div>
                                <textarea onChange={(e)=>{change(e, "feedbackPhysics")}} value={feedbackPhysics}  className={styles.textarea} />
                            </div>
                        </div>
                        <div className={styles.secondRow_6}>
                            <div>
                                <input onChange={(e)=>{change(e, "correctBiology")}} value={correctBiology}  className={styles.input} type="text" />
                            </div>
                            <div>
                                <textarea onChange={(e)=>{change(e, "feedbackBiology")}} value={feedbackBiology}  className={styles.textarea} />
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
                                <input onChange={(e)=>{change(e, "lectureChemistry")}} value={lectureChemistry}  className={styles.input} type="text" />
                            </div>
                            <div>
                                <textarea onChange={(e)=>{change(e, "beforeWeekChemistry")}} value={beforeWeekChemistry}  className={styles.textarea} />
                            </div>
                            <div>
                                <input onChange={(e)=>{change(e, "nextWeekChemistry")}} value={nextWeekChemistry}  className={styles.input} type="text" />
                            </div>
                        </div>
                        <div className={styles.thirdRow_4}>
                            <div>
                                <input onChange={(e)=>{change(e, "lectureOrganic")}} value={lectureOrganic}  className={styles.input} type="text" />
                            </div>
                            <div>
                                <textarea onChange={(e)=>{change(e, "beforeWeekOrganic")}} value={beforeWeekOrganic}  className={styles.textarea} />
                            </div>
                            <div>
                                <input onChange={(e)=>{change(e, "nextWeekOrganic")}} value={nextWeekOrganic}  className={styles.input} type="text" />
                            </div>
                        </div>
                        <div className={styles.thirdRow_5}>
                            <div>
                                <input onChange={(e)=>{change(e, "lecturePhysics")}} value={lecturePhysics}  className={styles.input} type="text" />
                            </div>
                            <div>
                                <textarea onChange={(e)=>{change(e, "beforeWeekPhysics")}} value={beforeWeekPhysics}  className={styles.textarea} />
                            </div>
                            <div>
                                <input onChange={(e)=>{change(e, "nextWeekPhysics")}} value={nextWeekPhysics}  className={styles.input} type="text" />
                            </div>
                        </div>
                        <div className={styles.thirdRow_6}>
                            <div>
                                <input onChange={(e)=>{change(e, "lectureBiology")}} value={lectureBiology}  className={styles.input} type="text" />
                            </div>
                            <div>
                                <textarea onChange={(e)=>{change(e, "beforeWeekBiology")}} value={beforeWeekBiology}  className={styles.textarea} />
                            </div>
                            <div>
                                <input onChange={(e)=>{change(e, "nextWeekBiology")}} value={nextWeekBiology}  className={styles.input} type="text" />
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
                                <textarea onChange={(e)=>{change(e, "descriptionChemistry")}} value={descriptionChemistry}  className={styles.textarea} />
                            </div>
                        </div>
                        <div className={styles.fourthRow_3}>
                            <div>
                                <textarea onChange={(e)=>{change(e, "descriptionOrganic")}} value={descriptionOrganic}  className={styles.textarea} />
                            </div>
                        </div>
                        <div className={styles.fourthRow_4}>
                            <div>
                                <textarea onChange={(e)=>{change(e, "descriptionPhysics")}} value={descriptionPhysics}  className={styles.textarea} />
                            </div>
                        </div>
                        <div className={styles.fourthRow_5}>
                            <div>
                                <textarea onChange={(e)=>{change(e, "descriptionBiology")}} value={descriptionBiology}  className={styles.textarea} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chart;