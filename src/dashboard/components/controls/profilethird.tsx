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

const ProfileThird: React.FC<any> = (props: any) => {
    const [loading, setLoading] = useState(false);

    const [currentMenu, setCurrentMenu] = useState("check");

    const [checked, setChecked] = useState("checked");
 

    const change = (e: any) => {
        setChecked(e.target.value);
    }

    const submit = (e : any) => {
        props.changeProfilePage("fourth");
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
                        피트선배 등록비 안내
                    </div>

                    <div className={styles.eachPriceDiv}>
                        <div className={styles.eachPriceTitle}>
                            독학 관리반
                        </div>
                        <div className={styles.eachPriceBox}>
                            <div className={styles.eachPriceBoxTitle}>
                                <div>
                                    자물쇠반
                                </div>
                            </div>
                            <div className={styles.eachPriceBoxDescription}>
                                <div className={styles.eachPriceBoxDescription_1}>
                                    <div>
                                        6층 일반석
                                    </div>
                                    <div>
                                        <span>350,000원</span>/월
                                    </div>
                                </div>
                                <div className={styles.eachPriceBoxDescription_1}>
                                    <div>
                                        4층 일반석
                                    </div>
                                    <div>
                                        <span>420,000원</span>/월
                                    </div>
                                </div>
                                <div className={styles.eachPriceBoxDescription_1}>
                                    <div>
                                        4층 컴퓨터석
                                    </div>
                                    <div>
                                        <span>450,000원</span>/월
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.eachPriceDiv} ${styles.second}`}>
                        <div className={styles.eachPriceTitle}>
                            과외수업
                        </div>
                        <div className={`${styles.eachPriceBox} ${styles.second}`}>
                            <div className={styles.eachPriceBoxTitle}>
                                <div>
                                    1:1 과외
                                </div>
                            </div>
                            <div className={styles.eachPriceBoxDescription}>
                                <div className={styles.eachCoachingPrice}>
                                    <div>부원장</div>
                                    <div>60분</div>
                                    <div>
                                        <span>250,000원</span>/월
                                    </div>
                                </div>
                                <div className={styles.eachCoachingPrice}>
                                    <div></div>
                                    <div>120분</div>
                                    <div>
                                        <span>500,000원</span>/월
                                    </div>
                                </div>
                                <div className={styles.eachCoachingPrice}>
                                    <div>일반선생님</div>
                                    <div>60분</div>
                                    <div>
                                        <span>180,000원</span>/월
                                    </div>
                                </div>
                                <div className={styles.eachCoachingPrice}>
                                    <div></div>
                                    <div>120분</div>
                                    <div>
                                        <span>360,000원</span>/월
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.priceDescriptionTextDiv}>
                        <div className={styles.priceDescriptionText}>
                            - 자물쇠반 4층과 6층은 시설 부분의 차이가 있기 때문에 가격 차이가 있고 학습관리 시스템은 동일합니다.
                        </div>
                        <div className={styles.priceDescriptionText}>
                            - 자물쇠반 1일 무료 체험 가능합니다.
                        </div>
                        <div className={styles.priceDescriptionText}>
                            - 과외 수업 1회 수강 후 불만족 시, 1회 수강료 차감 없이 100% 환불 처리해드립니다.
                        </div>
                    </div>

                    <div className={styles.radioWrapDiv}>
                        <RadioGroup value={checked} row aria-label="gender" name="row-radio-buttons-group"
                            onChange={e => { change(e) }}
                        >

                            <FormControlLabel value="checked" control={<Radio sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 28,
                                },
                            }} />} label={<span className={styles.radioText}>확인했습니다</span>} />
                            <FormControlLabel value="notChecked" control={<Radio sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 28,
                                },
                            }} />} label={<span className={styles.radioText}>이해하지 못했어요</span>} />

                        </RadioGroup>
                    </div>

                    <div className={styles.certifyDiv}>
                            <div onClick={submit} className={`${styles.nextBtn} ${styles.third}`}>
                                    {loading ? <CircularProgress style={{color : "white"}} /> : <div>저장 후 다음</div>}
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileThird;