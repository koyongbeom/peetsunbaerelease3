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

const ProfileSecond: React.FC<any> = (props: any) => {
    const [loading, setLoading] = useState(false);

    const [currentMenu, setCurrentMenu] = useState("student");

    const [peetNumber, setPeetNumber] = useState("");
    const [chemistryDegree, setChemistryDegree] = useState("");
    const [organicDegree, setOrganicDegree] = useState("");

    const [megamdPw, setMegamdPw] = useState("");
    const [megamdId, setMegamdId] = useState("");

    useEffect(() => {
        const start = async () => {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/profile/second", {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        const data = result.data;
                    })
            })
        }

        start();
    }, []);

    const change = (e: any, kind: string) => {
        switch (kind) {
            case "megamdPw" : 
                setMegamdPw(e.target.value);
                break;
            case "megamdId" :
                setMegamdId(e.target.value);
                break;
        }

    }

    const submit = async (e: any) => {
        setLoading(true);


        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/profile/second", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": token },
            credentials: "include",
            body: JSON.stringify({

            })
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    setLoading(false);
                    console.log(result);
                    if (result.message === "success") {
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
                <div className={`${styles.circle} ${currentMenu === "student" ? styles.active : ""}`}>
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
                                <TextField style={{ marginRight: "35.7px" }} value={chemistryDegree} onChange={e => { change(e, "major") }} id="outlined-basic" variant="outlined" />
                            </div>


                            <div className={styles.subtitle2}>
                                유기
                            </div>
                            <div className={styles.textField}>
                                <TextField fullWidth value={organicDegree} onChange={e => { change(e, "semester") }} id="outlined-basic" variant="outlined" />
                            </div>

                        </div>

                        <div className={styles.twoTextField2}>

                            <div className={styles.subtitle2}>
                                물리
                            </div>
                            <div className={styles.textField}>
                                <TextField style={{ marginRight: "35.7px" }} value={chemistryDegree} onChange={e => { change(e, "major") }} id="outlined-basic" variant="outlined" />
                            </div>


                            <div className={styles.subtitle2}>
                                생물
                            </div>
                            <div className={styles.textField}>
                                <TextField fullWidth value={organicDegree} onChange={e => { change(e, "semester") }} id="outlined-basic" variant="outlined" />
                            </div>

                        </div>


                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                이전 공부 방법
                            </div>
                            <div className={styles.textField}>
                                <TextField value={peetNumber} onChange={e => { change(e, "peetNumber") }} fullWidth id="outlined-basic" placeholder="ex)종합반 or 인강독학" variant="outlined" />
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
                                <TextField style={{ marginRight: "35.7px" }} value={chemistryDegree} onChange={e => { change(e, "major") }} id="outlined-basic" variant="outlined" />
                            </div>


                            <div className={styles.subtitle2}>
                                유기
                            </div>
                            <div className={styles.textField}>
                                <TextField fullWidth value={organicDegree} onChange={e => { change(e, "semester") }} id="outlined-basic" variant="outlined" />
                            </div>

                        </div>

                        <div className={styles.twoTextField2}>

                            <div className={styles.subtitle2}>
                                물리
                            </div>
                            <div className={styles.textField}>
                                <TextField style={{ marginRight: "35.7px" }} value={chemistryDegree} onChange={e => { change(e, "major") }} id="outlined-basic" variant="outlined" />
                            </div>


                            <div className={styles.subtitle2}>
                                생물
                            </div>
                            <div className={styles.textField}>
                                <TextField fullWidth value={organicDegree} onChange={e => { change(e, "semester") }} id="outlined-basic" variant="outlined" />
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
                                <TextField value={peetNumber} onChange={e => { change(e, "peetNumber") }} fullWidth id="outlined-basic" placeholder="ex)김준 필수이론 고체" variant="outlined" />
                            </div>
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                유기
                            </div>
                            <div className={styles.textField}>
                                <TextField value={peetNumber} onChange={e => { change(e, "peetNumber") }} fullWidth id="outlined-basic" placeholder="ex)김준 필수이론 고체" variant="outlined" />
                            </div>
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                물리
                            </div>
                            <div className={styles.textField}>
                                <TextField value={peetNumber} onChange={e => { change(e, "peetNumber") }} fullWidth id="outlined-basic" placeholder="ex)김준 필수이론 고체" variant="outlined" />
                            </div>
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={styles.subtitle}>
                                생물
                            </div>
                            <div className={styles.textField}>
                                <TextField value={peetNumber} onChange={e => { change(e, "peetNumber") }} fullWidth id="outlined-basic" placeholder="ex)김준 필수이론 고체" variant="outlined" />
                            </div>
                        </div>


                    </div>


                    <div className={styles.beforeUniversity}>
                        <div className={`${styles.beforeUniversityTitle} ${styles.beforeUniversityTitle2} ${styles.beforeUniversityTitle3}`}>
                            기타상담시 원하는 사항
                        </div>

                        <div className={styles.fullWidthText}>

                            <div className={styles.textField}>
                                <TextField value={peetNumber} onChange={e => { change(e, "peetNumber") }} fullWidth id="outlined-basic" variant="outlined" />
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
                                <TextField value={peetNumber} onChange={e => { change(e, "peetNumber") }} fullWidth id="outlined-basic" placeholder="ex)01098800489" variant="outlined" />
                            </div>

                            <div className={styles.subtitle}>
                                메가엠디 아이디
                            </div>
                            <div className={styles.textField}>
                                <TextField value={megamdId} onChange={e => { change(e, "megamdId") }} fullWidth id="outlined-basic" placeholder="ex)01098800489" variant="outlined" />
                            </div>

                            <div className={styles.subtitle}>
                                메가엠디 비밀번호
                            </div>
                            <div className={`${styles.textField} ${styles.password}`}>
                                <TextField type="password" className={styles.inputRounded} value={megamdPw} onChange={e => { change(e, "megamdPw") }} fullWidth id="outlined-basic" placeholder="ex)01098800489" variant="outlined" />
                                <div className={styles.certifyButton}>확인하기</div>
                            </div>
                        </div>

                        <div className={styles.fullWidthText}>
                            <div className={`${styles.subtitle} ${styles.subtitle5}` }>
                                피트선배를 선택한 가장 큰 이유
                            </div>

                            <RadioGroup
                                aria-label="gender"
                                defaultValue="female"
                                name="radio-buttons-group"
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

                    </div>
                </div>


            </div>


        </div>
    )
}

export default ProfileSecond;