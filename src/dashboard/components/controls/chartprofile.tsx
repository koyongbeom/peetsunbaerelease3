import { CircularProgress, LinearProgress, TextField } from '@mui/material';
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

const ChartProfile : React.FC<any> = (props) =>{
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
            setLoading(true);
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch(`https://peetsunbae.com/dashboard/profile/chart/first?studentId=${props.selectedUser.id}`, {
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
                        setLoading(false);
                    })
            })
        }

        start();
    }, []);

    const change = (e: any, kind: string) => {
        
    }

    const submit = async (e : any) => {
        props.setModalMenu("profileSecond");
    } 


    return (
        <div className={styles.body}>
            <div className={styles.header}>
                ????????? ??????
            </div>
            <div className={styles.currentMenu}>
                <div className={`${styles.circle} ${currentMenu === "information" ? styles.active : ""}`}>
                    ????????????
                </div>
                <img src="img/chevron-right-profile.svg" />
                <div className={`${styles.circle}`}>
                    ????????????
                </div>
                <img src="img/chevron-right-profile.svg" />
                <div className={`${styles.circle}`}>
                    ????????????
                </div>
            </div>

            {loading &&
                <div className={styles.progressbar}>
                    <div>
                        <LinearProgress sx={{ width: "550px", marginTop: "6px" }} />
                    </div>
                </div>
            }


            <div className={styles.description}>

            </div>

            <div className={styles.profileBoard}>
                <div className={styles.profileBoardDescription}>
                    <div className={styles.descriptionText}>
                        *??????????????? ?????? ????????? ?????? ???????????? ?????? ??? ????????? ??????????????????.<br>
                        </br>
                        ?????? ?????? ?????????????????? ?????????????????????.
                    </div>
                    <div className={styles.beforeUniversity}>
                        <div className={styles.beforeUniversityTitle}>
                            ????????????
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                ???????????????
                            </div>
                            <div className={styles.textField}>
                                <TextField value={previousUniversity} onChange={e => { change(e, "previousUniversity") }} fullWidth id="outlined-basic" placeholder="ex)???????????????" variant="outlined" />
                            </div>
                        </div>
                        <div className={styles.twoTextField}>
                            <div className={styles.firstTextField}>
                                <div className={styles.subtitle}>
                                    ??????
                                </div>
                                <div className={styles.textField}>
                                    <TextField value={major} onChange={e => { change(e, "major") }} fullWidth id="outlined-basic" placeholder="??????????????????" variant="outlined" />
                                </div>
                            </div>
                            <div className={styles.secondTextField}>
                                <div className={styles.subtitle}>
                                    ????????????
                                </div>
                                <div className={styles.textField}>
                                    <TextField fullWidth value={semester} onChange={e => { change(e, "semester") }} id="outlined-basic" placeholder="2?????? 2??????" variant="outlined" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.twoTextField}>
                            <div className={styles.firstTextField}>
                                <div className={styles.subtitle}>
                                    ????????????
                                </div>
                                <div className={styles.textField}>
                                    <TextField fullWidth value={schoolStatus} onChange={e => { change(e, "schoolStatus") }} id="outlined-basic" placeholder="?????????" variant="outlined" />
                                </div>
                            </div>
                            <div className={styles.secondTextField}>
                                <div className={styles.subtitle}>
                                    ??????
                                </div>
                                <div className={styles.textField}>
                                    <TextField value={degree} onChange={e => { change(e, "degree") }} fullWidth id="outlined-basic" placeholder="4.2/4.5" variant="outlined" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.beforeUniversity} ${styles.secondDiv}`}>
                        <div className={styles.beforeUniversityTitle}>
                            ?????? ??? ????????????
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                ???????????? ??????
                            </div>
                            <div className={styles.textField}>
                                <TextField value={toeic} onChange={e=>{change(e, "toeic")}}   fullWidth id="outlined-basic" placeholder="?????? 850???" variant="outlined" />
                            </div>
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                ???????????? ?????? ?????? ??????
                            </div>
                            <div className={styles.textField}>
                                <TextField value={whenToeic} onChange={e=>{change(e, "whenToeic")}}  fullWidth id="outlined-basic" placeholder="2021.3" variant="outlined" />
                            </div>
                        </div>

                        <div className={styles.radioGroup}>
                            <div className={styles.subtitle}>
                                ???????????? ??????
                            </div>
                            <RadioGroup row aria-label="gender" name="row-radio-buttons-group" value={highschoolKind}  onChange={e=>{change(e, "highschoolKind")}} >
                                <FormControlLabel value="??????" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<div className={styles.radioText}>??????</div>} />
                                <FormControlLabel value="??????" control={<Radio
                                    sx={{
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 28,
                                        },
                                    }}
                                />} label={<div className={styles.radioText}>??????</div>} />
                                <FormControlLabel value="??????" control={<Radio
                                    sx={{
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 28,
                                        },
                                    }}
                                />} label={<div className={styles.radioText}>??????</div>} />
                            </RadioGroup>
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                ????????????
                            </div>
                            <div className={styles.textField}>
                                <TextField fullWidth id="outlined-basic" value={mathGrade} onChange={e=>{change(e, "mathGrade")}}  placeholder="2??????" variant="outlined" />
                            </div>
                        </div>

                        <div className={styles.radioDiv}>
                            <div className={styles.subtitle}>
                                ?????? ????????????
                            </div>
                            <div>
                                <FormGroup>
                                    <div className={styles.radiosetDiv}>
                                        <div className={`${styles.radioset} ${styles.radioset1}`}>
                                            <FormControlLabel control={<Checkbox value={whatScienceChecked[0]} checked={whatScienceChecked[0]} onChange={(e)=>{change(e, "whatScience-0")}} />} label={<div className={styles.formcontroldiv}>??????1</div>} />
                                            <TextField value={scienceGrade[0]} onChange={(e)=>{change(e, "scienceGrade-0")}} id="standard-basic" placeholder="??????" variant="standard" />
                                        </div>
                                        <div className={`${styles.radioset} ${styles.radioset2}`}>
                                            <FormControlLabel control={<Checkbox value={whatScienceChecked[1]}  checked={whatScienceChecked[1]} onChange={(e)=>{change(e, "whatScience-1")}} />} label={<div className={styles.formcontroldiv}>??????2</div>} />
                                            <TextField value={scienceGrade[1]} onChange={(e)=>{change(e, "scienceGrade-1")}}  id="standard-basic" placeholder="??????" variant="standard" />
                                        </div>
                                    </div>
                                    <div className={styles.radiosetDiv}>
                                        <div className={`${styles.radioset} ${styles.radioset1}`}>
                                            <FormControlLabel control={<Checkbox value={whatScienceChecked[2]} checked={whatScienceChecked[2]}  onChange={(e)=>{change(e, "whatScience-2")}} />} label={<div className={styles.formcontroldiv}>??????1</div>} />
                                            <TextField value={scienceGrade[2]} onChange={(e)=>{change(e, "scienceGrade-2")}}  id="standard-basic" placeholder="??????" variant="standard" />
                                        </div>
                                        <div className={`${styles.radioset} ${styles.radioset2}`}>
                                            <FormControlLabel control={<Checkbox value={whatScienceChecked[3]}  checked={whatScienceChecked[3]} onChange={(e)=>{change(e, "whatScience-3")}} />} label={<div className={styles.formcontroldiv}>??????2</div>} />
                                            <TextField value={scienceGrade[3]} onChange={(e)=>{change(e, "scienceGrade-3")}}  id="standard-basic" placeholder="??????" variant="standard" />
                                        </div>
                                    </div>
                                    <div className={styles.radiosetDiv}>
                                        <div className={`${styles.radioset} ${styles.radioset1}`}>
                                            <FormControlLabel control={<Checkbox value={whatScienceChecked[4]}  checked={whatScienceChecked[4]} onChange={(e)=>{change(e, "whatScience-4")}} />} label={<div className={styles.formcontroldiv}>??????1</div>} />
                                            <TextField value={scienceGrade[4]} onChange={(e)=>{change(e, "scienceGrade-4")}}  id="standard-basic" placeholder="??????" variant="standard" />
                                        </div>
                                        <div className={`${styles.radioset} ${styles.radioset2}`}>
                                            <FormControlLabel control={<Checkbox value={whatScienceChecked[5]}  checked={whatScienceChecked[5]} onChange={(e)=>{change(e, "whatScience-5")}} />} label={<div className={styles.formcontroldiv}>??????2</div>} />
                                            <TextField value={scienceGrade[5]} onChange={(e)=>{change(e, "scienceGrade-5")}}  id="standard-basic" placeholder="??????" variant="standard" />
                                        </div>
                                    </div>
                                    <div className={styles.radiosetDiv}>
                                        <div className={`${styles.radioset} ${styles.radioset1}`}>
                                            <FormControlLabel control={<Checkbox value={whatScienceChecked[6]}  checked={whatScienceChecked[6]} onChange={(e)=>{change(e, "whatScience-6")}} />} label={<div className={styles.formcontroldiv}>??????1</div>} />
                                            <TextField value={scienceGrade[6]} onChange={(e)=>{change(e, "scienceGrade-6")}}  id="standard-basic" placeholder="??????" variant="standard" />
                                        </div>
                                        <div className={`${styles.radioset} ${styles.radioset2}`}>
                                            <FormControlLabel control={<Checkbox value={whatScienceChecked[7]}  checked={whatScienceChecked[7]} onChange={(e)=>{change(e, "whatScience-7")}} />} label={<div className={styles.formcontroldiv}>??????2</div>} />
                                            <TextField  value={scienceGrade[7]} onChange={(e)=>{change(e, "scienceGrade-7")}} id="standard-basic" placeholder="??????" variant="standard" />
                                        </div>
                                    </div>
                                </FormGroup>
                            </div>
                        </div>

                        <div className={styles.nextBtnDiv}>
                            <div onClick={submit} className={styles.nextBtn}>
                                    {loading ? <CircularProgress style={{color : "white"}} /> : <div>??????</div>}
                            </div>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChartProfile;