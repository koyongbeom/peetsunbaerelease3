import { Alert, LinearProgress, Stack } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import styles from '../../componentsStyle/chart.module.css';

const PreviousChart: React.FC<any> = (props) => {

    const [index, setIndex] = useState(0);

    const [loading, setLoading] = useState(false);
    const [uploadBool, setUploadBool] = useState(false);
    const [users, setUsers] = useState<any>();
    const [selectedUser, setSelectedUser] = useState<any>();
    const componentRef = useRef(null);
    const [active, setActive] = useState(false);

    const [month, setMonth] = useState<any>();
    const [date, setDate] = useState<any>();

    const [sendTime, setSendTime] = useState<any>();

    const [teacherName, setTeacherName] = useState("");

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

    const minus = (e : any) =>{
        if(index === 0){
            // alert("?????? ?????? ?????? ?????????????????????.")
        }else{
            const newIndex = index;
            setIndex(newIndex - 1);
        }
    }

    const plus = (e : any) => {
        const newIndex = index;
        setIndex(newIndex + 1);
    }


    useEffect(() => {
        setLoading(true);
        
        console.log("---------");
        async function start() {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch(`https://peetsunbae.com/dashboard/chart/before?userId=${props.selectedUser.id}&index=${index}`, {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        if(result.message === "success"){
                        console.log(result);
                        setMonth(result.month);
                        setDate(result.date);
                        const information = result.data.information;
                        
                        const sendTimeString = result.data.sendTime;
                        console.log("gogogogogoo");
                        if(sendTimeString){
                            console.log("ggogo");
                            const sendDate = new Date(sendTimeString);
                            const sendString = `${sendDate.getFullYear()}??? ${sendDate.getMonth()+1}??? ${sendDate.getDate()}??? ????????? ?????? ??????`;
                            setSendTime(sendString);
                        }else{
                            setSendTime("");
                        }

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
                        }else if(result.message === "NOT"){
                            // alert("???????????? ????????????.");
                            setLoading(false);
                        }
                    })
            })
        }

        start();
    }, [index]);



    return (
        <div className={styles.mainModal}>
            <div className={styles.manageModalDivTitle}>
                <div>????????????({month ? month : ""}??? {date ? date : ""}???) - {teacherName} ??????????????? </div>
                <div>{props.selectedUser && props.selectedUser.label}</div>
            </div>
            <div className={styles.manageTableModalDiv}>
                <img onClick={plus} src="img/chevron-circle-left-light.svg" alt="left" className={styles.modalChevron} />
                <div className={styles.manageModalTable}>
                    <div className={styles.firstRow}>
                        <div>
                            ??????
                        </div>
                        <div>
                            ??????
                        </div>
                        <div>
                            ??????
                        </div>
                        <div>
                            ??????
                        </div>
                        <div>
                            ??????
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
                                ????????????/?????????
                            </div>
                            <div>
                                ?????????
                            </div>
                        </div>
                        <div className={styles.secondRow_3}>
                            <div className={styles.TextFieldwithoutborderradius}>
                                <input value={correctChemistry} className={styles.input} type="text" />
                            </div>
                            <div className={styles.TextFieldwithoutborderradius2}>
                                <textarea  value={feedbackChemistry} className={styles.textarea} />
                            </div>
                        </div>
                        <div className={styles.secondRow_4}>
                            <div>
                                <input  value={correctOrganic} className={styles.input} type="text" />
                            </div>
                            <div>
                                <textarea  value={feedbackOrganic} className={styles.textarea} />
                            </div>
                        </div>
                        <div className={styles.secondRow_5}>
                            <div>
                                <input  value={correctPhysics} className={styles.input} type="text" />
                            </div>
                            <div>
                                <textarea  value={feedbackPhysics} className={styles.textarea} />
                            </div>
                        </div>
                        <div className={styles.secondRow_6}>
                            <div>
                                <input  value={correctBiology} className={styles.input} type="text" />
                            </div>
                            <div>
                                <textarea  value={feedbackBiology} className={styles.textarea} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.thirdRow}>
                        <div className={styles.thirdRow_1}>
                            <div>
                                ????????????
                            </div>
                        </div>
                        <div className={styles.thirdRow_2}>
                            <div>
                                ????????????
                            </div>
                            <div>
                                ?????? ???????????????
                            </div>
                            <div>
                                ????????? ??????
                            </div>
                        </div>
                        <div className={styles.thirdRow_3}>
                            <div>
                                <input  value={lectureChemistry} className={styles.input} type="text" />
                            </div>
                            <div>
                                <textarea  value={beforeWeekChemistry} className={styles.textarea} />
                            </div>
                            <div>
                                <input  value={nextWeekChemistry} className={styles.input} type="text" />
                            </div>
                        </div>
                        <div className={styles.thirdRow_4}>
                            <div>
                                <input  value={lectureOrganic} className={styles.input} type="text" />
                            </div>
                            <div>
                                <textarea  value={beforeWeekOrganic} className={styles.textarea} />
                            </div>
                            <div>
                                <input  value={nextWeekOrganic} className={styles.input} type="text" />
                            </div>
                        </div>
                        <div className={styles.thirdRow_5}>
                            <div>
                                <input  value={lecturePhysics} className={styles.input} type="text" />
                            </div>
                            <div>
                                <textarea  value={beforeWeekPhysics} className={styles.textarea} />
                            </div>
                            <div>
                                <input  value={nextWeekPhysics} className={styles.input} type="text" />
                            </div>
                        </div>
                        <div className={styles.thirdRow_6}>
                            <div>
                                <input  value={lectureBiology} className={styles.input} type="text" />
                            </div>
                            <div>
                                <textarea  value={beforeWeekBiology} className={styles.textarea} />
                            </div>
                            <div>
                                <input  value={nextWeekBiology} className={styles.input} type="text" />
                            </div>
                        </div>
                    </div>

                    <div className={styles.fourthRow}>
                        <div className={styles.fourthRow_1}>
                            <div>
                                ????????????<br />???????????????
                            </div>
                        </div>
                        <div className={styles.fourthRow_2}>
                            <div>
                                <textarea  value={descriptionChemistry} className={styles.textarea} />
                            </div>
                        </div>
                        <div className={styles.fourthRow_3}>
                            <div>
                                <textarea  value={descriptionOrganic} className={styles.textarea} />
                            </div>
                        </div>
                        <div className={styles.fourthRow_4}>
                            <div>
                                <textarea  value={descriptionPhysics} className={styles.textarea} />
                            </div>
                        </div>
                        <div className={styles.fourthRow_5}>
                            <div>
                                <textarea  value={descriptionBiology} className={styles.textarea} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.fifthRow}>
                        <div className={styles.fifthRow_1}>
                            <div>
                                ????????????<br />
                            </div>
                        </div>
                        <div className={styles.fifthRow_2}>
                            <div>
                                <textarea value={addText} className={styles.textarea} />
                            </div>
                        </div>
                    </div>
                </div>
                <img onClick={minus} src="img/chevron-circle-right-light.svg" alt="left" className={styles.modalChevron} />
            </div>

            {loading &&
                <div className={styles.modalLinearProgress}>
                    <LinearProgress />
                </div>
            }
            {(uploadBool) &&
                <Stack sx={{ width: '91%', marginLeft : "58px" }} spacing={2}>
                    <Alert severity="info" sx={{ marginTop: 2, marginBottom: 2 }}><span>?????? ?????? !</span></Alert>
                </Stack>
            }

            {/* <div className={styles.modalLastDiv}>
                <div onClick={submit} className={styles.submit}>
                    ????????????
                    <img src="img/navigate_next.svg" alt="right"></img>
                </div>
            </div> */}
        </div>
    )
}

export default PreviousChart;