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
                            currentLectureHelperText[type] = "아이디 패스워드 확인 부탁드립니다";
                            setLectureHelperText({ ...currentLectureHelperText });

                        }
                        if (result.message === true) {
                            const currentLectureSuccess = lectureSuccess;
                            currentLectureSuccess[type] = true;
                            setLectureSuccess({ ...currentLectureSuccess });

                            const currentLectureHelperText = lectureHelperText;
                            currentLectureHelperText[type] = "올바른 아이디 패스워드 입니다.";
                            setLectureHelperText({ ...currentLectureHelperText });
                        }
                    })
            })
        } else {
            const currentLectureError = lectureError;
            currentLectureError[type] = true;
            setLectureError({ ...currentLectureError });

            const currentLectureHelperText = lectureHelperText;
            currentLectureHelperText[type] = "아이디 패스워드 확인 부탁드립니다.";
            setLectureHelperText({ ...currentLectureHelperText });
        }
    }

    const submit = async (e: any) => {
        
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
                <div className={`${styles.circle} ${currentMenu === "student" ? styles.active : ""}`}>
                    학생정보
                </div>
                <img src="img/chevron-right-profile.svg" />
                <div className={`${styles.circle}`}>
                    확인사항
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
                        *학생카드의 모든 항목은 담임 멘토와의 상담 시 참고될 항목들입니다.<br>
                        </br>
                        빠짐 없이 작성해주시면 감사하겠습니다.
                    </div>

                    <div className={styles.beforeUniversity}>
                        <div className={styles.beforeUniversityTitle}>
                            피트 정보
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                PEET 응시 횟수
                            </div>
                            <div className={styles.textField}>
                                <TextField value={peetNumber} onChange={e => { change(e, "peetNumber") }} fullWidth id="outlined-basic" placeholder="ex)3회" variant="outlined" />
                            </div>
                        </div>

                        <div className={`${styles.subtitle} ${styles.subtitle3}`}>
                            최근 PEET 점수(백분위)
                        </div>

                        <div className={styles.twoTextField2}>

                            <div className={styles.subtitle2}>
                                화학
                            </div>
                            <div className={styles.textField}>
                                <TextField style={{ marginRight: "35.7px" }} value={chemistryDegree} onChange={e => { change(e, "chemistryDegree") }} id="outlined-basic" variant="outlined" />
                            </div>


                            <div className={styles.subtitle2}>
                                유기
                            </div>
                            <div className={styles.textField}>
                                <TextField fullWidth value={organicDegree} onChange={e => { change(e, "organicDegree") }} id="outlined-basic" variant="outlined" />
                            </div>

                        </div>

                        <div className={styles.twoTextField2}>

                            <div className={styles.subtitle2}>
                                물리
                            </div>
                            <div className={styles.textField}>
                                <TextField style={{ marginRight: "35.7px" }} value={physicsDegree} onChange={e => { change(e, "physicsDegree") }} id="outlined-basic" variant="outlined" />
                            </div>


                            <div className={styles.subtitle2}>
                                생물
                            </div>
                            <div className={styles.textField}>
                                <TextField fullWidth value={biologyDegree} onChange={e => { change(e, "biologyDegree") }} id="outlined-basic" variant="outlined" />
                            </div>

                        </div>


                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                이전 공부 방법
                            </div>
                            <div className={styles.textField}>
                                <TextField value={previousStudyMethod} onChange={e => { change(e, "previousStudyMethod") }} fullWidth id="outlined-basic" placeholder="ex)종합반 or 인강독학" variant="outlined" />
                            </div>
                        </div>


                        <div className={`${styles.subtitle} ${styles.subtitle3}`}>
                            과목별 강사
                        </div>

                        <div className={styles.twoTextField2}>

                            <div className={styles.subtitle2}>
                                화학
                            </div>
                            <div className={styles.textField}>
                                <TextField style={{ marginRight: "35.7px" }} value={chemistryTeacher} onChange={e => { change(e, "chemistryTeacher") }} id="outlined-basic" variant="outlined" />
                            </div>


                            <div className={styles.subtitle2}>
                                유기
                            </div>
                            <div className={styles.textField}>
                                <TextField fullWidth value={organicTeacher} onChange={e => { change(e, "organicTeacher") }} id="outlined-basic" variant="outlined" />
                            </div>

                        </div>

                        <div className={styles.twoTextField2}>

                            <div className={styles.subtitle2}>
                                물리
                            </div>
                            <div className={styles.textField}>
                                <TextField style={{ marginRight: "35.7px" }} value={physicsTeacher} onChange={e => { change(e, "physicsTeacher") }} id="outlined-basic" variant="outlined" />
                            </div>


                            <div className={styles.subtitle2}>
                                생물
                            </div>
                            <div className={styles.textField}>
                                <TextField fullWidth value={biologyTeacher} onChange={e => { change(e, "biologyTeacher") }} id="outlined-basic" variant="outlined" />
                            </div>

                        </div>
                    </div>


                    <div className={styles.beforeUniversity}>
                        <div className={`${styles.beforeUniversityTitle} ${styles.beforeUniversityTitle2}`}>
                            과목별 진도 상황
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                화학
                            </div>
                            <div className={styles.textField}>
                                <TextField value={chemistryStatus} onChange={e => { change(e, "chemistryStatus") }} fullWidth id="outlined-basic" placeholder="ex)김준 필수이론 고체" variant="outlined" />
                            </div>
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                유기
                            </div>
                            <div className={styles.textField}>
                                <TextField value={organicStatus} onChange={e => { change(e, "organicStatus") }} fullWidth id="outlined-basic" placeholder="ex)김준 필수이론 고체" variant="outlined" />
                            </div>
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                물리
                            </div>
                            <div className={styles.textField}>
                                <TextField value={physicsStatus} onChange={e => { change(e, "physicsStatus") }} fullWidth id="outlined-basic" placeholder="ex)김준 필수이론 고체" variant="outlined" />
                            </div>
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                생물
                            </div>
                            <div className={styles.textField}>
                                <TextField value={biologyStatus} onChange={e => { change(e, "biologyStatus") }} fullWidth id="outlined-basic" placeholder="ex)김준 필수이론 고체" variant="outlined" />
                            </div>
                        </div>


                    </div>


                    <div className={styles.beforeUniversity}>
                        <div className={`${styles.beforeUniversityTitle} ${styles.beforeUniversityTitle2} ${styles.beforeUniversityTitle3}`}>
                            기타상담시 원하는 사항
                        </div>

                        <div className={styles.fullWidthText}>

                            <div className={styles.textField}>
                                <TextField value={counselRequest} onChange={e => { change(e, "counselRequest") }} fullWidth id="outlined-basic" variant="outlined" />
                            </div>
                        </div>
                    </div>

                    <div className={styles.beforeUniversity}>
                        <div className={`${styles.beforeUniversityTitle} ${styles.beforeUniversityTitle2} ${styles.beforeUniversityTitle3}`}>
                            인강사이트 정보
                        </div>

                        <div className={`${styles.descriptionText} ${styles.descriptionText2}`}>
                            * 인강 진도율을 받아오기 위해 필요합니다.<br>
                            </br>
                            사용중인 인강 사이트 정보만 적어주세요.
                            <br />
                            담임선생님이 비밀번호 조회는 불가능합니다.
                        </div>


                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                메가엠디 아이디
                            </div>
                            <div className={styles.textField}>
                                <TextField value={userInfo.megamdId} onChange={e => { change(e, "megamdId") }} fullWidth id="outlined-basic" variant="outlined" />
                            </div>

                        </div>

                        <div className={`${styles.fullWidthText} ${styles.passwordDiv}`}>

                            <div className={styles.subtitle}>
                                메가엠디 비밀번호
                            </div>
                            <div className={`${styles.textField} ${styles.password} ${lectureSuccess.megamd ? styles.active : ""}`}>
                                <TextField type="password" error={lectureError.megamd} helperText={<span className={`${lectureSuccess.megamd ? styles.successhelpertext : styles.failhelpertext}`}>{lectureHelperText.megamd}</span>} className={styles.inputRounded} value={userInfo.megamdPw} onChange={e => { change(e, "megamdPw") }} fullWidth id="outlined-basic" variant="outlined" />
                                <div className={`${styles.certifyButton}`} onClick={(e) => { certify(e, "megamd") }}>{lectureLoading.megamd ? <CircularProgress style={{ color: "white" }} /> : "확인하기"}</div>
                            </div>
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                엠디엔피 아이디
                            </div>
                            <div className={styles.textField}>
                                <TextField value={userInfo.mdnpId} onChange={e => { change(e, "mdnpId") }} fullWidth id="outlined-basic" variant="outlined" />
                            </div>

                        </div>

                        <div className={`${styles.fullWidthText} ${styles.passwordDiv}`}>

                            <div className={styles.subtitle}>
                                엠디엔피 비밀번호
                            </div>
                            <div className={`${styles.textField} ${styles.password} ${lectureSuccess.mdnp ? styles.active : ""}`}>
                                <TextField type="password" error={lectureError.mdnp} helperText={<span className={`${lectureSuccess.mdnp ? styles.successhelpertext : styles.failhelpertext}`}>{lectureHelperText.mdnp}</span>} className={styles.inputRounded} value={userInfo.mdnpPw} onChange={e => { change(e, "mdnpPw") }} fullWidth id="outlined-basic" variant="outlined" />
                                <div className={`${styles.certifyButton}`} onClick={(e) => { certify(e, "mdnp") }}>{lectureLoading.mdnp ? <CircularProgress style={{ color: "white" }} /> : "확인하기"}</div>
                            </div>
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                핏단기 아이디(이메일 주소)
                            </div>
                            <div className={styles.textField}>
                                <TextField value={userInfo.peetdangiId} onChange={e => { change(e, "peetdangiId") }} fullWidth id="outlined-basic" variant="outlined" />
                            </div>

                        </div>

                        <div className={styles.fullWidthText}>

                            <div className={styles.subtitle}>
                                핏단기 비밀번호
                            </div>
                            <div className={`${styles.textField} ${styles.password} ${lectureSuccess.peetdangi ? styles.active : ""}`}>
                                <TextField type="password" error={lectureError.peetdangi} helperText={<span className={`${lectureSuccess.peetdangi ? styles.successhelpertext : styles.failhelpertext}`}>{lectureHelperText.peetdangi}</span>} className={styles.inputRounded} value={userInfo.peetdangiPw} onChange={e => { change(e, "peetdangiPw") }} fullWidth id="outlined-basic" variant="outlined" />
                                <div className={`${styles.certifyButton}`} onClick={(e) => { certify(e, "peetdangi") }}>{lectureLoading.peetdangi ? <CircularProgress style={{ color: "white" }} /> : "확인하기"}</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.beforeUniversity}>
                        <div className={`${styles.beforeUniversityTitle} ${styles.beforeUniversityTitle2}`}>
                            학생정보
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                보호자 연락처
                            </div>
                            <div className={styles.textField}>
                                <TextField FormHelperTextProps={{className : `${styles.helperText} ${successNumberParentTelephone ? styles.active : ""}`}} value={parentTelephone} helperText={numberParentTelephone + "/11"} onChange={e => { change(e, "parentTelephone") }} fullWidth id="outlined-basic" placeholder="ex)01098800489(-없이)" variant="outlined" />
                            </div>
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={`${styles.subtitle} ${styles.subtitle5}`}>
                                피트선배를 선택한 가장 큰 이유
                            </div>

                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={whyPeetsunbae}  onChange={e=>{change(e, "whyPeetsunbae")}}
                            >
                                <FormControlLabel value="담임멘토" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>1:1 담임멘토</span>} />
                                <FormControlLabel value="생활관리" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>생활관리</span>} />
                                <FormControlLabel value="질의응답" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>질의응답 시스템</span>} />
                                <FormControlLabel value="같이 공부하는 수험생" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>같이 공부하는 수험생들과의 경쟁</span>} />
                                <FormControlLabel value="쾌적한 시설" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>쾌적한 시설</span>} />
                                <FormControlLabel value="일대일 과외 시스템" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>일대일 과외 시스템</span>} />

                            </RadioGroup>

                        </div>

                        <div className={`${styles.fullWidthText} ${styles.fullWidthText2}`}>
                            <div className={styles.subtitle}>
                                자물쇠반 이용 시작일
                            </div>
                            <div className={styles.textField}>
                                <TextField value={whenStart} onChange={e => { change(e, "whenStart") }} fullWidth id="outlined-basic" placeholder="ex)11월 25일" variant="outlined" />
                            </div>
                        </div>

                        <div className={`${styles.fullWidthText}`}>
                            <div className={styles.subtitle}>
                                과외수업
                            </div>
                            <RadioGroup row aria-label="gender" name="row-radio-buttons-group"
                            value={coaching}  onChange={e=>{change(e, "coaching")}}
                            >
                                
                                    <FormControlLabel value="coaching_yes" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>신청</span>} />
                                    <FormControlLabel value="coaching_no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>미신청</span>} />
                                    <FormControlLabel value="coaching_after" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>상담 후 결정</span>} />
                                
                            </RadioGroup>
                        </div>

                        <div className={`${styles.fullWidthText} ${styles.fullWidthText2}`}>
                            <div className={styles.subtitle}>
                                과외 신청 과목
                            </div>
                            <div className={styles.textField}>
                                <FormGroup>
                                    <div className={styles.radioRowDiv}>
                                        <FormControlLabel control={<Checkbox checked={whatSubjectCoaching[0]} onChange={(e) => { change(e, "whatSubjectCoaching-0") }} />} label={<div className={styles.formcontroldiv}>화학</div>} />
                                        <FormControlLabel control={<Checkbox checked={whatSubjectCoaching[1]} onChange={(e) => { change(e, "whatSubjectCoaching-1") }} />} label={<div className={styles.formcontroldiv}>유기</div>} />
                                        <FormControlLabel control={<Checkbox checked={whatSubjectCoaching[2]} onChange={(e) => { change(e, "whatSubjectCoaching-2") }} />} label={<div className={styles.formcontroldiv}>물리</div>} />
                                        <FormControlLabel control={<Checkbox checked={whatSubjectCoaching[3]} onChange={(e) => { change(e, "whatSubjectCoaching-3") }} />} label={<div className={styles.formcontroldiv}>생물</div>} />
                                    </div>
                                </FormGroup>
                            </div>
                        </div>

                        <div className={styles.nextBtnDiv}>
                            {/* <div onClick={submit} className={styles.nextBtn}>
                                    {loading ? <CircularProgress style={{color : "white"}} /> : <div>저장 후 다음</div>}
                            </div> */}
                        </div>

                    </div>
                </div>


            </div>


        </div>
    )
}

export default ChartProfileSecond;