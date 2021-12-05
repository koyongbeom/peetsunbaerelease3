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

const ProfileFourth: React.FC<any> = (props: any) => {
    const [loading, setLoading] = useState(false);
    const [answers, setAnswers] = useState<any>([]);
    const [currentMenu, setCurrentMenu] = useState("check");

    useEffect(()=>{
        const start = async () => {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/profile/fourth", {
                method: "GET",
                headers: {"Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(1);
                        if (result.data) {
                            const resultData = result.data.data;
                            setAnswers([...resultData]);
                        }
                    })
            })
        }

        start();
    }, [])

    const change = (e: any, kind : string) => {
        const currentAnswers = answers;
        const index = +kind.split("-")[1];
        currentAnswers[index] = e.target.value;
        setAnswers([...currentAnswers]);
    }

    const submit = async (e : any) => {
        console.log(answers);

        setLoading(true);

        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/profile/fourth", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": token },
            credentials: "include",
            body: JSON.stringify({
                message : answers
            })
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    setLoading(false);
                    console.log(result);
                    if(result.message === "success"){
                        props.history.push("/dashboard/home");
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
                <div className={`${styles.circle } ${currentMenu === "check" ? styles.active : ""}`}>
                    확인사항
                </div>
            </div>
            <div className={styles.description}>

            </div>

            <div className={styles.profileBoard}>
                <div className={styles.profileBoardDescription}>
                    <div className={styles.descriptionText}>
                        * 확인사항은 학원에서 제공하는 서비스에 대한 내용입니다.
                        <br></br> 
                        빠짐 없이 작성해주시면 감사하겠습니다.
                    </div>
                </div>
            </div>

            <div className={styles.wideProfileBoard}>
                <div className={styles.wideProfileBoardDescription}>
                    <div className={styles.wideTitle}>
                        피트선배 등록 확인사항
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div style={{marginBottom : "12px"}}>
                                <div>ㆍ</div>
                                <div>등록은 월 단위로 진행됩니다.</div>
                            </div>
                            <div style={{marginBottom : "12px"}}>
                                <div>ㆍ</div>
                                <div>첫 달 등록비 안내는 학원 등원 후 2~3일 이내로 안내됩니다.</div>
                            </div>
                            <div style={{marginBottom : "12px"}}>
                                <div>ㆍ</div>
                                <div>재등록비는 매월 개강 전주에 개별 안내문자가 발송됩니다.</div>
                            </div>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                    4월, 6월, 10월, 12월에는 대학교 시험 일정에는 재학생 선생님들이 담당하는 과외수업이 1주 중단되며 이는 등록비에 미반영됩니다.
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[0]}  onChange={e=>{change(e, "answers-0")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>확인했습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>이 시스템을 이해하지 못했습니다.(조교님께 다시 문의해주세요)</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                    [지정석 제공]등록하신 자리는 고정석으로 운영되며, 문의주시면 자리 변경 가능합니다.
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[1]}  onChange={e=>{change(e, "answers-1")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>확인했습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>이 시스템을 이해하지 못했습니다.(조교님께 다시 문의해주세요)</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                    [자리 변경]자리 변경을 원하시는 경우, 프로그램 '건의사항 보내기' 메뉴에서 글을 작성해주시면 가능합니다. (단, 최대 월 2회 이동 가능 / 조교 안내 하에 월요일 이동 가능)
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[2]}  onChange={e=>{change(e, "answers-2")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>확인했습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>이 시스템을 이해하지 못했습니다.(조교님께 다시 문의해주세요)</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                    [시간 관리 시스템] 평일 오전 9시~오후 10시까지 의무자습이 이루어집니다. 각 층 시간표에 따라 60분~80분 간격으로 학습시간 및 휴식시간이 운영되고, 학습시간에는 출입이 통제(화장실 제외) 됩니다.
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[3]}  onChange={e=>{change(e, "answers-3")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>확인했습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>이 시스템을 이해하지 못했습니다.(조교님께 다시 문의해주세요)</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                    [담임제 1:1 학습관리 시스템] 매주 30분 개인 담임 멘토와의 1:1 대면 상담이 진행됩니다. 커리큘럼 및 계획표 관리를 통해 일주일 간 인강 진도 및 과목별 복습 방법 등의 상담이 이뤄집니다. 담임 멘토 변경 원할 시 프로그램 내 '건의사항 보내기'로 글 작성해주시면 됩니다.
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[4]}  onChange={e=>{change(e, "answers-4")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>확인했습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>이 시스템을 이해하지 못했습니다.(조교님께 다시 문의해주세요)</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div style={{marginBottom : "6px"}}>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                    [질의응답 시스템] 질의응답은 두 가지 방법으로 신청하실 수 있습니다. 
                                </div>
                            </div>
                            <div style={{marginBottom : "6px"}}>
                                <div>
                                 
                                </div>
                                <div>
                                ① 대면 질의응답 - 각 과목별 백분위 99% 이상의 조교가 1:1로 진행 
                                </div>
                            </div>
                            <div>
                                <div>
                                 
                                </div>
                                <div>
                                ② 온라인 질의응답 - 프로그램 '질의응답 메뉴'를 통해 1인당 1일 1개씩 가능
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[5]}  onChange={e=>{change(e, "answers-5")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>확인했습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>이 시스템을 이해하지 못했습니다.(조교님께 다시 문의해주세요)</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                    [1:1 과외 시스템] 상위 0.1% 튜터를 통해 과외가 진행됩니다. 과외 신청 원하실 경우 프로그램 '건의사항 작성' 메뉴에 글을 작성하시면 담당 과목 튜터와 직접 상담 후 결정됩니다.
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[6]}  onChange={e=>{change(e, "answers-6")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>확인했습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>이 시스템을 이해하지 못했습니다.(조교님께 다시 문의해주세요)</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                    [의무 학습 시간] 자물쇠반 의무 학습시간은 월~금 9:00 am ~ 10:00 pm 입니다. 이 외 시간 학습은 자율이고, 자습실은 연중 무휴 24시간 개방됩니다.
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[7]}  onChange={e=>{change(e, "answers-7")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>확인했습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>이 시스템을 이해하지 못했습니다.(조교님께 다시 문의해주세요)</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div style={{marginBottom : "6px"}}>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                    [출석 체크] 각 층에 설치 된 지문인식기 혹은 NFC 카드 인식을 통해 출석체크를 합니다.
                                </div>
                            </div>
                            <div style={{marginBottom : "6px"}}>
                                <div>
                                 
                                </div>
                                <div>
                                ① 등원시간체크 - 정해진 등원시간보다 늦게 등원시 본인 지문인식이 정지되고 벌점 부과
                                </div>
                            </div>
                            <div style={{marginBottom : "6px"}}>
                                <div>
                                 
                                </div>
                                <div>
                                ② 하원시간체크 - 정해진 하원시간보다 일찍 하원시 본인 지문인식이 정지되고 벌점 부과
                                </div>
                            </div>
                            <div style={{marginBottom : "6px"}}>
                                <div>
                                 
                                </div>
                                <div>
                                ③ 외출시간체크 - 학습시간 중 15분, 식사시간 중 60분 이상 외출시 본인 지문인식이 정지되고 벌점 부과
                                </div>
                            </div>
                            <div>
                                <div>
                                 
                                </div>
                                <div>
                                ④ 반성문 작성 - 지문인식이 정지되면 조교님께 찾아가서 반성문 작성
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[8]}  onChange={e=>{change(e, "answers-8")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>확인했습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>이 시스템을 이해하지 못했습니다.(조교님께 다시 문의해주세요)</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                    지각/결석/외출/조퇴 해야되는 경우 프로그램 내 '지각/결석 사유 제출' 메뉴를 통해 사유 제출하면 됩니다. 사유 제출은 해당 당일에는 신청 불가합니다. 한달에 가능한 건수는 3건 입니다.
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[9]}  onChange={e=>{change(e, "answers-9")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>확인했습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>이 시스템을 이해하지 못했습니다.(조교님께 다시 문의해주세요)</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                    정기적인 일정이 있을 경우 조교님이나 담임선생님과 상담 후 해당 시간에는 출석체크 시간에서 빠질 수 있게 조치해드립니다.
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[24]}  onChange={e=>{change(e, "answers-24")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>확인했습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>이 시스템을 이해하지 못했습니다.(조교님께 다시 문의해주세요)</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                    평일 의무 자습시간에는 1일 3회 출석체크가 진행되고, 부재 시 조교가 개별연락드립니다. 
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[10]}  onChange={e=>{change(e, "answers-10")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>확인했습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>이 시스템을 이해하지 못했습니다.(조교님께 다시 문의해주세요)</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                    도시락은 프로그램 내 '도시락 신청'메뉴에서 신청하시면 각 식사시간에 배달이 옵니다. 도시락 신청 메뉴의 최대 보유 포인트 금액은 30,000원 입니다. 
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[23]}  onChange={e=>{change(e, "answers-23")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>확인했습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>이 시스템을 이해하지 못했습니다.(조교님께 다시 문의해주세요)</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                    프린트는 각 층 데스크의 프린트용 컴퓨터를 이용하시면 됩니다. 조교님이 개별 사용가능한 아이디, 패스워드를 만들어드립니다. 
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[11]}  onChange={e=>{change(e, "answers-11")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>확인했습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>이 시스템을 이해하지 못했습니다.(조교님께 다시 문의해주세요)</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                점심 및 저녁 식사는 정해진 식사 시간 내에 식사가능합니다. (1시간 내 외출 가능) 
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[12]}  onChange={e=>{change(e, "answers-12")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>확인했습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>이 시스템을 이해하지 못했습니다.(조교님께 다시 문의해주세요)</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                열람실 내 음료를 제외한 모든 음식 섭취를 금합니다. 음료를 제외한 모든 음식 섭취는는 휴게공간에서만 가능합니다. 
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[13]}  onChange={e=>{change(e, "answers-13")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>확인했습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>이 시스템을 이해하지 못했습니다.(조교님께 다시 문의해주세요)</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                [건의사항] 학원 내 모든 건의사항은 프로그램 내 "건의사항 보내기" 메뉴에서 작성해주시면 됩니다. 3일 내 답변을 원칙으로 합니다. 
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[14]}  onChange={e=>{change(e, "answers-14")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>확인했습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>이 시스템을 이해하지 못했습니다.(조교님께 다시 문의해주세요)</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div style={{marginBottom : "12px"}}>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                쉬는 시간 후 학습시간 종이 울리면 열람실 출입이 제한될 수도 있으니 제 시간에 입실 완료 해주시면 됩니다.
                                </div>
                            </div>
                            <div style={{marginBottom : "12px"}}>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                자습실 내에서는 소음이 발생하는 행동은 제한됩니다. (사진 촬영 금지, 3색 볼펜 사용 금지, 키보드/마우스 무소음만 허용)
                                </div>
                            </div>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                이 외 건의사항이 있으시면 프로그램 내 '건의사항 보내기'에 작성해주시면 쾌적한 자습실이 되도록 의견을 조정하도록 하겠습니다.
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[15]}  onChange={e=>{change(e, "answers-15")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>확인했습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>이 시스템을 이해하지 못했습니다.(조교님께 다시 문의해주세요)</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                각 층마다 지문등록을 하셨나요?
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[16]}  onChange={e=>{change(e, "answers-16")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>등록했습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>아니요.</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                등록비용 및 환불 규정을 안내 받으셨나요?
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[17]}  onChange={e=>{change(e, "answers-17")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>안내받았습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>아니요.</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                사물함을 배정 받았으며, 식사 관련하여 안내 받으셨나요?
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[18]}  onChange={e=>{change(e, "answers-18")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>안내받았습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>아니요.</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                각 층 시간표에 대해 안내받았으며 유의사항을 숙지하셨나요(시간표 및 유의사항이 적힌 종이 안내문도 받으셨나요)?
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[19]}  onChange={e=>{change(e, "answers-19")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>안내받았습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>아니요.</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                매주 30분씩 시행되는 1:1 담임 멘토와의 상담에 대해 안내받으셨나요? 담임 멘토가 맞지 않을 시 변경 가능함을 안내받으셨나요? (추후 팀장님께서 직접 개별 연락 드릴 예정)
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[20]}  onChange={e=>{change(e, "answers-20")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>안내받았습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>아니요.</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox}>
                        <div className={styles.text}>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                학원 내 온라인 및 오프라인 질의응답 신청 방법을 이해하셨나요?
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[21]}  onChange={e=>{change(e, "answers-21")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>안내받았습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>아니요.</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.checkBox} style={{marginBottom : "60px"}}>
                        <div className={styles.text}>
                            <div>
                                <div>
                                    ㆍ
                                </div>
                                <div>
                                과외 신청 및 취소는 상시 가능하며, 과외 신청 관련 상담을 신청할 수 있다는 점을 알고 계시나요?
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkBoxRadioDiv}>
                            <RadioGroup
                                aria-label="gender"
                                name="radio-buttons-group"
                                value={answers[22]}  onChange={e=>{change(e, "answers-22")}}
                            >
                                <FormControlLabel value="ok" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>안내받았습니다.</span>} />
                                <FormControlLabel value="no" control={<Radio sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 28,
                                    },
                                }} />} label={<span className={styles.radioText}>아니요.</span>} />
                            </RadioGroup>
                        </div>
                    </div>

                    <div className={styles.certifyDiv}>
                            <div onClick={submit} className={`${styles.nextBtn} ${styles.third}`}>
                                    {loading ? <CircularProgress style={{color : "white"}} /> : <div>저장 후 홈으로</div>}
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileFourth;