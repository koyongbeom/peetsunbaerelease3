import { Button } from "@mui/material";
import React, {useEffect, useState} from "react";
import styles from "../../componentsStyle/regularSchedule2.module.css";

const RegularSchedule2 : React.FC<any> = (props) => {
    
    const [month, setMonth] = useState<any>();

    useEffect(()=>{
        const date = new Date();
        setMonth(date.getMonth() + 1);
    }, []);

    const submit = (e : any) => {

    }

    return (
        <div className={styles.main}>
            <div className={styles.title}>
                {month && month}월 정기일정 {props.name && "(" + props.name + ")"}
            </div>
            <div className={`${styles.eachdayDiv} ${styles.first}`}>
                <div className={styles.eachDayDivTitle}>
                    월
                </div>
                <div className={styles.eachDayDivTextform}>
                    <input type="text" className={styles.textForm} />
                </div>
            </div>
            <div className={`${styles.eachdayDiv} ${styles.first}`}>
                <div className={styles.eachDayDivTitle}>
                    화
                </div>
                <div className={styles.eachDayDivTextform}>
                    <input type="text" className={styles.textForm} />
                </div>
            </div>
            <div className={`${styles.eachdayDiv}`}>
                <div className={styles.eachDayDivTitle}>
                    수
                </div>
                <div className={styles.eachDayDivTextform}>
                    <input type="text" className={styles.textForm} />
                </div>
            </div>
            <div className={`${styles.eachdayDiv}`}>
                <div className={styles.eachDayDivTitle}>
                    목
                </div>
                <div className={styles.eachDayDivTextform}>
                    <input type="text" className={styles.textForm} />
                </div>
            </div>
            <div className={`${styles.eachdayDiv}`}>
                <div className={styles.eachDayDivTitle}>
                    금
                </div>
                <div className={styles.eachDayDivTextform}>
                    <input type="text" className={styles.textForm} />
                </div>
            </div>
            <div className={`${styles.eachdayDiv}`}>
                <div className={styles.eachDayDivTitle}>
                    토
                </div>
                <div className={styles.eachDayDivTextform}>
                    <input type="text" className={styles.textForm} />
                </div>
            </div>
            <div className={`${styles.eachdayDiv}`}>
                <div className={styles.eachDayDivTitle}>
                    기타
                </div>
                <div className={styles.eachDayDivTextform}>
                    <input type="text" className={styles.textForm} />
                </div>
            </div>

            <div className={styles.submitBtnDiv}>
                    <Button onClick={submit} variant="contained" fullWidth sx={{ height: "62px", backgroundColor: "#1b49af", color: "white", fontFamily : "Apple_B",fontSize: "18px", "&:hover": { backgroundColor: "rgb(100,100,100)" }, "@media (max-width : 1024px)": {fontSize : "16px", height : '55.5px'} }}>
                        신청서 제출
                    </Button>
            </div>

            <div className={styles.helperText}>
                *정기일정 제출 후 사감 승인, 학부모 승인 절차 이후에 정식으로 등록됩니다.<br></br>*정기일정은 각 월 1일에만 등록/수정 가능합니다.
            </div>
        </div>
    );
}

export default RegularSchedule2;