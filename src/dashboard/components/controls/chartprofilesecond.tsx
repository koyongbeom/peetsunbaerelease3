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

const ChartProfileSecond: React.FC<any> = (props: any) => {
    const [loading, setLoading] = useState(false);

    const [currentMenu, setCurrentMenu] = useState("student");

    const [peetNumber, setPeetNumber] = useState("");
    const [chemistryDegree, setChemistryDegree] = useState("%");
    const [organicDegree, setOrganicDegree] = useState("%");
    const [physicsDegree, setPhysicsDegree] = useState("%");
    const [biologyDegree, setBiologyDegree] = useState("%");
    const [previousStudyMethod, setPreviousStudyMethod] = useState("");
    const [chemistryTeacher, setChemistryTeacher] = useState("");
    const [organicTeacher, setOrganicTeacher] = useState("");
    const [physicsTeacher, setPhysicsTeacher] = useState("");
    const [biologyTeacher, setBiologyTeacher] = useState("");
    const [chemistryStatus, setChemistryStatus] = useState("");
    const [organicStatus, setOrganicStatus] = useState("");
    const [physicsStatus, setPhysicsStatus] = useState("");
    const [biologyStatus, setBiologyStatus] = useState("");
    const [counselRequest, setCounselRequest] = useState("");
    const [parentTelephone, setParentTelephone] = useState("");
    const [numberParentTelephone, setNumberParentTelephone] = useState(0);
    const [successNumberParentTelephone, setSuccessNumberParentTelephone] = useState(false);
    const [whyPeetsunbae, setWhyPeetsunbae] = useState("");
    const [whenStart, setWhenStart] = useState("");
    const [coaching, setCoaching]= useState("");
    const [whatSubjectCoaching, setWhatSubjectCoaching] = useState([false, false, false, false]);

    const [userInfo, setUserInfo] = useState<any>({ megamdId: "", megamdPw: "", mdnpId: "", mdnpPw: "", peetdangiId: "", peetdangiPw: "" })
    const [lectureError, setLectureError] = useState<any>({ megamd: false, mdnp: false, peetdangi: false })
    const [lectureHelperText, setLectureHelperText] = useState<any>({ megamd: "", mdnp: "", peetdangi: "" });
    const [lectureSuccess, setLectureSuccess] = useState<any>({ megamd: false, mdnp: false, peetdangi: false });
    const [lectureLoading, setLectureLoading] = useState<any>({ megamd: false, mdnp: false, peetdangi: false });

    useEffect(() => {
        const start = async () => {
            setLoading(true);
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch(`https://peetsunbae.com/dashboard/profile/chart/second?studentId=${props.selectedUser.id}`, {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then(async (result: any) => {
                        if (result.data) {
                            const data = result.data;
                            console.log(data);
                            setPeetNumber(data.peetNumber);
                            setChemistryDegree(data.chemistryDegree);
                            setOrganicDegree(data.organicDegree);
                            setPhysicsDegree(data.physicsDegree);
                            setBiologyDegree(data.biologyDegree);
                            setPreviousStudyMethod(data.previousStudyMethod);
                            setChemistryTeacher(data.chemistryTeacher);
                            setOrganicTeacher(data.organicTeacher);
                            setPhysicsTeacher(data.physicsTeacher);
                            setBiologyTeacher(data.biologyTeacher);
                            setChemistryStatus(data.chemistryStatus);
                            setOrganicStatus(data.organicStatus);
                            setPhysicsStatus(data.physicsStatus);
                            setBiologyStatus(data.biologyStatus);
                            setCounselRequest(data.counselRequest);
                            setParentTelephone(data.parentTelephone);
                            setNumberParentTelephone(data.parentTelephone.length);
                            if (data.parentTelephone.length === 11) {
                                setSuccessNumberParentTelephone(true);
                            } else {
                                setSuccessNumberParentTelephone(false);
                            }
                            setWhyPeetsunbae(data.whyPeetsunbae);
                            setWhenStart(data.whenStart);
                            setCoaching(data.coaching);
                            setWhatSubjectCoaching([...data.whatSubjectCoaching]);
                            setUserInfo({ ...data.userInfo });
                        }
                        setLoading(false);
                    })
            })
        }

        start();
    }, []);

    const change = (e: any, kind: string) => {

    }

    const certify = async (event: any, type: string) => {

        console.log(type);

        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        if (userInfo[type + "Id"] && userInfo[type + "Pw"]) {

            const currentLectureLoading = lectureLoading;
            currentLectureLoading[type] = true;
            setLectureLoading({ ...currentLectureLoading });

            fetch("https://peetsunbae.com/dashboard/profile/" + type, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": token },
                credentials: "include",
                body: JSON.stringify({
                    id: userInfo[type + "Id"],
                    pw: userInfo[type + "Pw"]
                })
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);

                        const currentLectureLoading = lectureLoading;
                        currentLectureLoading[type] = false;
                        setLectureLoading({ ...currentLectureLoading });

                        if (result.message === false) {

                            const currentLectureError = lectureError;
                            currentLectureError[type] = true;
                            setLectureError({ ...currentLectureError });

                            const currentLectureHelperText = lectureHelperText;
                            currentLectureHelperText[type] = "????????? ???????????? ?????? ??????????????????";
                            setLectureHelperText({ ...currentLectureHelperText });

                        }
                        if (result.message === true) {
                            const currentLectureSuccess = lectureSuccess;
                            currentLectureSuccess[type] = true;
                            setLectureSuccess({ ...currentLectureSuccess });

                            const currentLectureHelperText = lectureHelperText;
                            currentLectureHelperText[type] = "????????? ????????? ???????????? ?????????.";
                            setLectureHelperText({ ...currentLectureHelperText });
                        }
                    })
            })
        } else {
            const currentLectureError = lectureError;
            currentLectureError[type] = true;
            setLectureError({ ...currentLectureError });

            const currentLectureHelperText = lectureHelperText;
            currentLectureHelperText[type] = "????????? ???????????? ?????? ??????????????????.";
            setLectureHelperText({ ...currentLectureHelperText });
        }
    }

    const submit = async (e: any) => {
        
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
                <div className={`${styles.circle} ${currentMenu === "student" ? styles.active : ""}`}>
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
                            ?????? ??????
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                PEET ?????? ??????
                            </div>
                            <div className={styles.textField}>
                                <TextField value={peetNumber} onChange={e => { change(e, "peetNumber") }} fullWidth id="outlined-basic" placeholder="ex)3???" variant="outlined" />
                            </div>
                        </div>

                        <div className={`${styles.subtitle} ${styles.subtitle3}`}>
                            ?????? PEET ??????(?????????)
                        </div>

                        <div className={styles.twoTextField2}>

                            <div className={styles.subtitle2}>
                                ??????
                            </div>
                            <div className={styles.textField}>
                                <TextField style={{ marginRight: "35.7px" }} value={chemistryDegree} onChange={e => { change(e, "chemistryDegree") }} id="outlined-basic" variant="outlined" />
                            </div>


                            <div className={styles.subtitle2}>
                                ??????
                            </div>
                            <div className={styles.textField}>
                                <TextField fullWidth value={organicDegree} onChange={e => { change(e, "organicDegree") }} id="outlined-basic" variant="outlined" />
                            </div>

                        </div>

                        <div className={styles.twoTextField2}>

                            <div className={styles.subtitle2}>
                                ??????
                            </div>
                            <div className={styles.textField}>
                                <TextField style={{ marginRight: "35.7px" }} value={physicsDegree} onChange={e => { change(e, "physicsDegree") }} id="outlined-basic" variant="outlined" />
                            </div>


                            <div className={styles.subtitle2}>
                                ??????
                            </div>
                            <div className={styles.textField}>
                                <TextField fullWidth value={biologyDegree} onChange={e => { change(e, "biologyDegree") }} id="outlined-basic" variant="outlined" />
                            </div>

                        </div>


                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                ?????? ?????? ??????
                            </div>
                            <div className={styles.textField}>
                                <TextField value={previousStudyMethod} onChange={e => { change(e, "previousStudyMethod") }} fullWidth id="outlined-basic" placeholder="ex)????????? or ????????????" variant="outlined" />
                            </div>
                        </div>


                        <div className={`${styles.subtitle} ${styles.subtitle3}`}>
                            ????????? ??????
                        </div>

                        <div className={styles.twoTextField2}>

                            <div className={styles.subtitle2}>
                                ??????
                            </div>
                            <div className={styles.textField}>
                                <TextField style={{ marginRight: "35.7px" }} value={chemistryTeacher} onChange={e => { change(e, "chemistryTeacher") }} id="outlined-basic" variant="outlined" />
                            </div>


                            <div className={styles.subtitle2}>
                                ??????
                            </div>
                            <div className={styles.textField}>
                                <TextField fullWidth value={organicTeacher} onChange={e => { change(e, "organicTeacher") }} id="outlined-basic" variant="outlined" />
                            </div>

                        </div>

                        <div className={styles.twoTextField2}>

                            <div className={styles.subtitle2}>
                                ??????
                            </div>
                            <div className={styles.textField}>
                                <TextField style={{ marginRight: "35.7px" }} value={physicsTeacher} onChange={e => { change(e, "physicsTeacher") }} id="outlined-basic" variant="outlined" />
                            </div>


                            <div className={styles.subtitle2}>
                                ??????
                            </div>
                            <div className={styles.textField}>
                                <TextField fullWidth value={biologyTeacher} onChange={e => { change(e, "biologyTeacher") }} id="outlined-basic" variant="outlined" />
                            </div>

                        </div>
                    </div>


                    <div className={styles.beforeUniversity}>
                        <div className={`${styles.beforeUniversityTitle} ${styles.beforeUniversityTitle2}`}>
                            ????????? ?????? ??????
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                ??????
                            </div>
                            <div className={styles.textField}>
                                <TextField value={chemistryStatus} onChange={e => { change(e, "chemistryStatus") }} fullWidth id="outlined-basic" placeholder="ex)?????? ???????????? ??????" variant="outlined" />
                            </div>
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                ??????
                            </div>
                            <div className={styles.textField}>
                                <TextField value={organicStatus} onChange={e => { change(e, "organicStatus") }} fullWidth id="outlined-basic" placeholder="ex)?????? ???????????? ??????" variant="outlined" />
                            </div>
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                ??????
                            </div>
                            <div className={styles.textField}>
                                <TextField value={physicsStatus} onChange={e => { change(e, "physicsStatus") }} fullWidth id="outlined-basic" placeholder="ex)?????? ???????????? ??????" variant="outlined" />
                            </div>
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                ??????
                            </div>
                            <div className={styles.textField}>
                                <TextField value={biologyStatus} onChange={e => { change(e, "biologyStatus") }} fullWidth id="outlined-basic" placeholder="ex)?????? ???????????? ??????" variant="outlined" />
                            </div>
                        </div>


                    </div>


                    <div className={styles.beforeUniversity}>
                        <div className={`${styles.beforeUniversityTitle} ${styles.beforeUniversityTitle2} ${styles.beforeUniversityTitle3}`}>
                            ??????????????? ????????? ??????
                        </div>

                        <div className={styles.fullWidthText}>

                            <div className={styles.textField}>
                                <TextField value={counselRequest} onChange={e => { change(e, "counselRequest") }} fullWidth id="outlined-basic" variant="outlined" />
                            </div>
                        </div>
                    </div>

                    <div className={styles.beforeUniversity}>
                        <div className={`${styles.beforeUniversityTitle} ${styles.beforeUniversityTitle2} ${styles.beforeUniversityTitle3}`}>
                            ??????????????? ??????
                        </div>

                        <div className={`${styles.descriptionText} ${styles.descriptionText2}`}>
                            * ?????? ???????????? ???????????? ?????? ???????????????.<br>
                            </br>
                            ???????????? ?????? ????????? ????????? ???????????????.
                            <br />
                            ?????????????????? ???????????? ????????? ??????????????????.
                        </div>


                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                ???????????? ?????????
                            </div>
                            <div className={styles.textField}>
                                <TextField value={userInfo.megamdId} onChange={e => { change(e, "megamdId") }} fullWidth id="outlined-basic" variant="outlined" />
                            </div>

                        </div>

                        <div className={`${styles.fullWidthText} ${styles.passwordDiv}`}>

                            <div className={styles.subtitle}>
                                ???????????? ????????????
                            </div>
                            <div className={`${styles.textField} ${styles.password} ${lectureSuccess.megamd ? styles.active : ""}`}>
                                <TextField type="password" error={lectureError.megamd} helperText={<span className={`${lectureSuccess.megamd ? styles.successhelpertext : styles.failhelpertext}`}>{lectureHelperText.megamd}</span>} className={styles.inputRounded} value={userInfo.megamdPw} onChange={e => { change(e, "megamdPw") }} fullWidth id="outlined-basic" variant="outlined" />
                                <div className={`${styles.certifyButton}`} onClick={(e) => { certify(e, "megamd") }}>{lectureLoading.megamd ? <CircularProgress style={{ color: "white" }} /> : "????????????"}</div>
                            </div>
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                ???????????? ?????????
                            </div>
                            <div className={styles.textField}>
                                <TextField value={userInfo.mdnpId} onChange={e => { change(e, "mdnpId") }} fullWidth id="outlined-basic" variant="outlined" />
                            </div>

                        </div>

                        <div className={`${styles.fullWidthText} ${styles.passwordDiv}`}>

                            <div className={styles.subtitle}>
                                ???????????? ????????????
                            </div>
                            <div className={`${styles.textField} ${styles.password} ${lectureSuccess.mdnp ? styles.active : ""}`}>
                                <TextField type="password" error={lectureError.mdnp} helperText={<span className={`${lectureSuccess.mdnp ? styles.successhelpertext : styles.failhelpertext}`}>{lectureHelperText.mdnp}</span>} className={styles.inputRounded} value={userInfo.mdnpPw} onChange={e => { change(e, "mdnpPw") }} fullWidth id="outlined-basic" variant="outlined" />
                                <div className={`${styles.certifyButton}`} onClick={(e) => { certify(e, "mdnp") }}>{lectureLoading.mdnp ? <CircularProgress style={{ color: "white" }} /> : "????????????"}</div>
                            </div>
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                ????????? ?????????(????????? ??????)
                            </div>
                            <div className={styles.textField}>
                                <TextField value={userInfo.peetdangiId} onChange={e => { change(e, "peetdangiId") }} fullWidth id="outlined-basic" variant="outlined" />
                            </div>

                        </div>

                        <div className={styles.fullWidthText}>

                            <div className={styles.subtitle}>
                                ????????? ????????????
                            </div>
                            <div className={`${styles.textField} ${styles.password} ${lectureSuccess.peetdangi ? styles.active : ""}`}>
                                <TextField type="password" error={lectureError.peetdangi} helperText={<span className={`${lectureSuccess.peetdangi ? styles.successhelpertext : styles.failhelpertext}`}>{lectureHelperText.peetdangi}</span>} className={styles.inputRounded} value={userInfo.peetdangiPw} onChange={e => { change(e, "peetdangiPw") }} fullWidth id="outlined-basic" variant="outlined" />
                                <div className={`${styles.certifyButton}`} onClick={(e) => { certify(e, "peetdangi") }}>{lectureLoading.peetdangi ? <CircularProgress style={{ color: "white" }} /> : "????????????"}</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.beforeUniversity}>
                        <div className={`${styles.beforeUniversityTitle} ${styles.beforeUniversityTitle2}`}>
                            ????????????
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                ????????? ?????????
                            </div>
                            <div className={styles.textField}>
                                <TextField FormHelperTextProps={{className : `${styles.helperText} ${successNumberParentTelephone ? styles.active : ""}`}} value={parentTelephone} helperText={numberParentTelephone + "/11"} onChange={e => { change(e, "parentTelephone") }} fullWidth id="outlined-basic" placeholder="ex)01098800489(-??????)" variant="outlined" />
                            </div>
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={`${styles.subtitle} ${styles.subtitle5}`}>
                                ??????????????? ????????? ?????? ??? ??????
                            </div>

                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={whyPeetsunbae}  onChange={e=>{change(e, "whyPeetsunbae")}}
                            >
                                <FormControlLabel value="????????????" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>1:1 ????????????</span>} />
                                <FormControlLabel value="????????????" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>????????????</span>} />
                                <FormControlLabel value="????????????" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>???????????? ?????????</span>} />
                                <FormControlLabel value="?????? ???????????? ?????????" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>?????? ???????????? ?????????????????? ??????</span>} />
                                <FormControlLabel value="????????? ??????" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>????????? ??????</span>} />
                                <FormControlLabel value="????????? ?????? ?????????" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>????????? ?????? ?????????</span>} />

                            </RadioGroup>

                        </div>

                        <div className={`${styles.fullWidthText} ${styles.fullWidthText2}`}>
                            <div className={styles.subtitle}>
                                ???????????? ?????? ?????????
                            </div>
                            <div className={styles.textField}>
                                <TextField value={whenStart} onChange={e => { change(e, "whenStart") }} fullWidth id="outlined-basic" placeholder="ex)11??? 25???" variant="outlined" />
                            </div>
                        </div>

                        <div className={`${styles.fullWidthText}`}>
                            <div className={styles.subtitle}>
                                ????????????
                            </div>
                            <RadioGroup row aria-label="gender" name="row-radio-buttons-group"
                            value={coaching}  onChange={e=>{change(e, "coaching")}}
                            >
                                
                                    <FormControlLabel value="coaching_yes" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>??????</span>} />
                                    <FormControlLabel value="coaching_no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>?????????</span>} />
                                    <FormControlLabel value="coaching_after" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>?????? ??? ??????</span>} />
                                
                            </RadioGroup>
                        </div>

                        <div className={`${styles.fullWidthText} ${styles.fullWidthText2}`}>
                            <div className={styles.subtitle}>
                                ?????? ?????? ??????
                            </div>
                            <div className={styles.textField}>
                                <FormGroup>
                                    <div className={styles.radioRowDiv}>
                                        <FormControlLabel control={<Checkbox checked={whatSubjectCoaching[0]} onChange={(e) => { change(e, "whatSubjectCoaching-0") }} />} label={<div className={styles.formcontroldiv}>??????</div>} />
                                        <FormControlLabel control={<Checkbox checked={whatSubjectCoaching[1]} onChange={(e) => { change(e, "whatSubjectCoaching-1") }} />} label={<div className={styles.formcontroldiv}>??????</div>} />
                                        <FormControlLabel control={<Checkbox checked={whatSubjectCoaching[2]} onChange={(e) => { change(e, "whatSubjectCoaching-2") }} />} label={<div className={styles.formcontroldiv}>??????</div>} />
                                        <FormControlLabel control={<Checkbox checked={whatSubjectCoaching[3]} onChange={(e) => { change(e, "whatSubjectCoaching-3") }} />} label={<div className={styles.formcontroldiv}>??????</div>} />
                                    </div>
                                </FormGroup>
                            </div>
                        </div>

                        <div className={styles.nextBtnDiv}>
                            {/* <div onClick={submit} className={styles.nextBtn}>
                                    {loading ? <CircularProgress style={{color : "white"}} /> : <div>?????? ??? ??????</div>}
                            </div> */}
                        </div>

                    </div>
                </div>


            </div>


        </div>
    )
}

export default ChartProfileSecond;