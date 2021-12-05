import { CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import styles from "../../componentsStyle/profileStyles.module.css";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import { display } from '@mui/system';
import Button from '@mui/material/Button';
import { Subject } from '@mui/icons-material';

const ProfileFirst: React.FC<any> = (props: any) => {
    const [loading, setLoading] = useState(false);

    const [currentMenu, setCurrentMenu] = useState("information");

    const [previousUniversity, setPreviousUniversity] = useState("");
    const [major, setMajor] = useState("");
    const [semester, setSemester] = useState("");
    const [schoolStatus, setSchoolStatus]= useState("");
    const [degree, setDegree] = useState("");
    const [toeic, setToeic] = useState("");
    const [whenToeic, setWhenToeic] = useState("");
    const [highschoolKind, setHighschoolKind] = useState("");
    const [mathGrade, setMathGrade] = useState("");

    
    const [whatScienceChecked, setWhatScienceChecked] = useState([false, false, false, false, false, false, false, false])
    const [scienceGrade, setScienceGrade] = useState(["", "", "", "", "", "", "", ""])

    useEffect(() => {
        const start = async () => {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/profile/first", {
                method: "GET",
                headers: {"Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        if (result.data) {
                            const data = result.data;
                            console.log(data);
                            setPreviousUniversity(data.previousUniversity);
                            setMajor(data.major);
                            setDegree(data.degree);
                            setSemester(data.semester);
                            setSchoolStatus(data.schoolStatus);
                            setToeic(data.toeic);
                            setWhenToeic(data.whenToeic);
                            setHighschoolKind(data.highschoolKind);
                            setMathGrade(data.mathGrade);
                            const currentWhatScienceChecked = [false, false, false, false, false, false, false, false];
                            const currentScienceGrade = ["", "", "", "", "", "", "", ""];
                            data.whatScience.forEach((each: any) => {
                                switch (each.subject) {
                                    case "physicsone":
                                        currentWhatScienceChecked[0] = true;
                                        currentScienceGrade[0] = each.grade;
                                        break;
                                    case "physicstwo":
                                        currentWhatScienceChecked[1] = true;
                                        currentScienceGrade[1] = each.grade;
                                        break;
                                    case "chemistryone":
                                        currentWhatScienceChecked[2] = true;
                                        currentScienceGrade[2] = each.grade;
                                        break;
                                    case "chemistrytwo":
                                        currentWhatScienceChecked[3] = true;
                                        currentScienceGrade[3] = each.grade;
                                        break;
                                    case "earthone":
                                        currentWhatScienceChecked[4] = true;
                                        currentScienceGrade[4] = each.grade;
                                        break;
                                    case "earthtwo":
                                        currentWhatScienceChecked[5] = true;
                                        currentScienceGrade[5] = each.grade;
                                        break;
                                    case "biologyone":
                                        currentWhatScienceChecked[6] = true;
                                        currentScienceGrade[6] = each.grade;
                                        break;
                                    case "biologytwo":
                                        currentWhatScienceChecked[7] = true;
                                        currentScienceGrade[7] = each.grade;
                                        break;
                                }
                            })
                            console.log(currentWhatScienceChecked);
                            setWhatScienceChecked([...currentWhatScienceChecked]);
                            setScienceGrade([...currentScienceGrade]);
                        }
                    })
            })
        }

        start();
    }, []);

    const change = (e: any, kind: string) => {
        switch (kind) {
            case "previousUniversity":
                setPreviousUniversity(e.target.value);
                break;
            case "major":
                setMajor(e.target.value);
                break;
            case "semester":
                setSemester(e.target.value);
                break;
            case "schoolStatus":
                setSchoolStatus(e.target.value);
                break;
            case "degree":
                setDegree(e.target.value);
                break;
            case "toeic":
                setToeic(e.target.value);
                break;
            case "whenToeic":
                setWhenToeic(e.target.value);
                break;
            case "highschoolKind":
                setHighschoolKind(e.target.value);
                break;
            case "mathGrade":
                setMathGrade(e.target.value);
                break;
        }


        if(kind.includes("whatScience")){
            console.log(e.target.checked);
            const whatScience = kind.split("-")[1];
            const currentWhatScienceChecked = whatScienceChecked;
            currentWhatScienceChecked[+whatScience] = e.target.checked;
            console.log(currentWhatScienceChecked);
            setWhatScienceChecked([...currentWhatScienceChecked]);
        }
        if(kind.includes("scienceGrade")){
            console.log(1);
            const whatScienceGrade = kind.split("-")[1];
            const currentScienceGrade = scienceGrade;
            currentScienceGrade[+whatScienceGrade] = e.target.value;
            console.log(currentScienceGrade);
            setScienceGrade([...currentScienceGrade]);
        }

    }

    const submit = async (e : any) => {
        setLoading(true);

        const whatScience : any = [];

        whatScienceChecked.forEach((each : Boolean, index : number)=>{
            if (each === true) {
                const information: any = {};
                switch (index) {
                    case 0:
                        information.subject = "physicsone";
                        information.grade = scienceGrade[index];
                        break;
                    case 1:
                        information.subject = "physicstwo";
                        information.grade = scienceGrade[index];
                        break;
                    case 2:
                        information.subject = "chemistryone";
                        information.grade = scienceGrade[index];
                        break;
                    case 3:
                        information.subject = "chemistrytwo";
                        information.grade = scienceGrade[index];
                        break;
                    case 4:
                        information.subject = "earthone";
                        information.grade = scienceGrade[index];
                        break;
                    case 5:
                        information.subject = "earthtwo";
                        information.grade = scienceGrade[index];
                        break;
                    case 6:
                        information.subject = "biologyone";
                        information.grade = scienceGrade[index];
                        break;
                    case 7:
                        information.subject = "biologytwo";
                        information.grade = scienceGrade[index];
                        break;
                }
                whatScience.push(information);
            }
        })


        const message = {
            previousUniversity,
            major,
            semester,
            schoolStatus,
            degree,
            toeic,
            whenToeic,
            highschoolKind,
            mathGrade,
            whatScience
        }

        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/profile/first", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": token },
            credentials: "include",
            body: JSON.stringify({
                message
            })
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    setLoading(false);
                    console.log(result);
                    if(result.message === "success"){
                        props.changeProfilePage("second");
                    }
                })
        })
    } 


    return (
        <div className={styles.body}>
            <div className={styles.header}>
                프로필 설정
            </div>
            <div className={styles.currentMenu}>
                <div className={`${styles.circle} ${currentMenu === "information" ? styles.active : ""}`}>
                    학습정보
                </div>
                <img src="img/chevron-right-profile.svg" />
                <div className={`${styles.circle}`}>
                    학생정보
                </div>
                <img src="img/chevron-right-profile.svg" />
                <div className={`${styles.circle}`}>
                    확인사항
                </div>
            </div>
            <div className={styles.description}>

            </div>

            <div className={styles.profileBoard}>
                <div className={styles.profileBoardDescription}>
                    <div className={styles.descriptionText}>
                        *학생카드의 모든 항목은 담임 멘토와의 상담 시 참고될 항목들입니다.<br>
                        </br>
                        빠짐 없이 작성해주시면 감사하겠습니다.
                    </div>
                    <div className={styles.beforeUniversity}>
                        <div className={styles.beforeUniversityTitle}>
                            전적대학
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                전적대학교
                            </div>
                            <div className={styles.textField}>
                                <TextField value={previousUniversity} onChange={e => { change(e, "previousUniversity") }} fullWidth id="outlined-basic" placeholder="ex)한양대학교" variant="outlined" />
                            </div>
                        </div>
                        <div className={styles.twoTextField}>
                            <div className={styles.firstTextField}>
                                <div className={styles.subtitle}>
                                    학과
                                </div>
                                <div className={styles.textField}>
                                    <TextField value={major} onChange={e => { change(e, "major") }} fullWidth id="outlined-basic" placeholder="컴퓨터공학과" variant="outlined" />
                                </div>
                            </div>
                            <div className={styles.secondTextField}>
                                <div className={styles.subtitle}>
                                    이수학기
                                </div>
                                <div className={styles.textField}>
                                    <TextField fullWidth value={semester} onChange={e => { change(e, "semester") }} id="outlined-basic" placeholder="2학년 2학기" variant="outlined" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.twoTextField}>
                            <div className={styles.firstTextField}>
                                <div className={styles.subtitle}>
                                    학력상태
                                </div>
                                <div className={styles.textField}>
                                    <TextField fullWidth value={schoolStatus} onChange={e => { change(e, "schoolStatus") }} id="outlined-basic" placeholder="휴학중" variant="outlined" />
                                </div>
                            </div>
                            <div className={styles.secondTextField}>
                                <div className={styles.subtitle}>
                                    학점
                                </div>
                                <div className={styles.textField}>
                                    <TextField value={degree} onChange={e => { change(e, "degree") }} fullWidth id="outlined-basic" placeholder="4.2/4.5" variant="outlined" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.beforeUniversity} ${styles.secondDiv}`}>
                        <div className={styles.beforeUniversityTitle}>
                            영어 및 고등학교
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                공인영어 점수
                            </div>
                            <div className={styles.textField}>
                                <TextField value={toeic} onChange={e=>{change(e, "toeic")}}   fullWidth id="outlined-basic" placeholder="토익 850점" variant="outlined" />
                            </div>
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                공인영어 점수 취득 날짜
                            </div>
                            <div className={styles.textField}>
                                <TextField value={whenToeic} onChange={e=>{change(e, "whenToeic")}}  fullWidth id="outlined-basic" placeholder="2021.3" variant="outlined" />
                            </div>
                        </div>

                        <div className={styles.radioGroup}>
                            <div className={styles.subtitle}>
                                고등학교 계열
                            </div>
                            <RadioGroup row aria-label="gender" name="row-radio-buttons-group" value={highschoolKind}  onChange={e=>{change(e, "highschoolKind")}} >
                                <FormControlLabel value="이과" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<div className={styles.radioText}>이과</div>} />
                                <FormControlLabel value="문과" control={<Radio
                                    sx={{
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 28,
                                        },
                                    }}
                                />} label={<div className={styles.radioText}>문과</div>} />
                                <FormControlLabel value="기타" control={<Radio
                                    sx={{
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 28,
                                        },
                                    }}
                                />} label={<div className={styles.radioText}>기타</div>} />
                            </RadioGroup>
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                수학등급
                            </div>
                            <div className={styles.textField}>
                                <TextField fullWidth id="outlined-basic" value={mathGrade} onChange={e=>{change(e, "mathGrade")}}  placeholder="2등급" variant="outlined" />
                            </div>
                        </div>

                        <div className={styles.radioDiv}>
                            <div className={styles.subtitle}>
                                과탐 선택과목
                            </div>
                            <div>
                                <FormGroup>
                                    <div className={styles.radiosetDiv}>
                                        <div className={`${styles.radioset} ${styles.radioset1}`}>
                                            <FormControlLabel control={<Checkbox value={whatScienceChecked[0]} checked={whatScienceChecked[0]} onChange={(e)=>{change(e, "whatScience-0")}} />} label={<div className={styles.formcontroldiv}>물리1</div>} />
                                            <TextField value={scienceGrade[0]} onChange={(e)=>{change(e, "scienceGrade-0")}} id="standard-basic" placeholder="등급" variant="standard" />
                                        </div>
                                        <div className={`${styles.radioset} ${styles.radioset2}`}>
                                            <FormControlLabel control={<Checkbox value={whatScienceChecked[1]}  checked={whatScienceChecked[1]} onChange={(e)=>{change(e, "whatScience-1")}} />} label={<div className={styles.formcontroldiv}>물리2</div>} />
                                            <TextField value={scienceGrade[1]} onChange={(e)=>{change(e, "scienceGrade-1")}}  id="standard-basic" placeholder="등급" variant="standard" />
                                        </div>
                                    </div>
                                    <div className={styles.radiosetDiv}>
                                        <div className={`${styles.radioset} ${styles.radioset1}`}>
                                            <FormControlLabel control={<Checkbox value={whatScienceChecked[2]} checked={whatScienceChecked[2]}  onChange={(e)=>{change(e, "whatScience-2")}} />} label={<div className={styles.formcontroldiv}>화학1</div>} />
                                            <TextField value={scienceGrade[2]} onChange={(e)=>{change(e, "scienceGrade-2")}}  id="standard-basic" placeholder="등급" variant="standard" />
                                        </div>
                                        <div className={`${styles.radioset} ${styles.radioset2}`}>
                                            <FormControlLabel control={<Checkbox value={whatScienceChecked[3]}  checked={whatScienceChecked[3]} onChange={(e)=>{change(e, "whatScience-3")}} />} label={<div className={styles.formcontroldiv}>화학2</div>} />
                                            <TextField value={scienceGrade[3]} onChange={(e)=>{change(e, "scienceGrade-3")}}  id="standard-basic" placeholder="등급" variant="standard" />
                                        </div>
                                    </div>
                                    <div className={styles.radiosetDiv}>
                                        <div className={`${styles.radioset} ${styles.radioset1}`}>
                                            <FormControlLabel control={<Checkbox value={whatScienceChecked[4]}  checked={whatScienceChecked[4]} onChange={(e)=>{change(e, "whatScience-4")}} />} label={<div className={styles.formcontroldiv}>지학1</div>} />
                                            <TextField value={scienceGrade[4]} onChange={(e)=>{change(e, "scienceGrade-4")}}  id="standard-basic" placeholder="등급" variant="standard" />
                                        </div>
                                        <div className={`${styles.radioset} ${styles.radioset2}`}>
                                            <FormControlLabel control={<Checkbox value={whatScienceChecked[5]}  checked={whatScienceChecked[5]} onChange={(e)=>{change(e, "whatScience-5")}} />} label={<div className={styles.formcontroldiv}>지학2</div>} />
                                            <TextField value={scienceGrade[5]} onChange={(e)=>{change(e, "scienceGrade-5")}}  id="standard-basic" placeholder="등급" variant="standard" />
                                        </div>
                                    </div>
                                    <div className={styles.radiosetDiv}>
                                        <div className={`${styles.radioset} ${styles.radioset1}`}>
                                            <FormControlLabel control={<Checkbox value={whatScienceChecked[6]}  checked={whatScienceChecked[6]} onChange={(e)=>{change(e, "whatScience-6")}} />} label={<div className={styles.formcontroldiv}>생물1</div>} />
                                            <TextField value={scienceGrade[6]} onChange={(e)=>{change(e, "scienceGrade-6")}}  id="standard-basic" placeholder="등급" variant="standard" />
                                        </div>
                                        <div className={`${styles.radioset} ${styles.radioset2}`}>
                                            <FormControlLabel control={<Checkbox value={whatScienceChecked[7]}  checked={whatScienceChecked[7]} onChange={(e)=>{change(e, "whatScience-7")}} />} label={<div className={styles.formcontroldiv}>생물2</div>} />
                                            <TextField  value={scienceGrade[7]} onChange={(e)=>{change(e, "scienceGrade-7")}} id="standard-basic" placeholder="등급" variant="standard" />
                                        </div>
                                    </div>
                                </FormGroup>
                            </div>
                        </div>

                        <div className={styles.nextBtnDiv}>
                            <div onClick={submit} className={styles.nextBtn}>
                                    {loading ? <CircularProgress style={{color : "white"}} /> : <div>저장 후 다음</div>}
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileFirst;