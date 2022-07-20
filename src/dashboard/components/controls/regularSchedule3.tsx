import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "../../componentsStyle/regularSchedule2.module.css";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import HorizontalLinearStepper from "../data/horizontallinearstepper";

//학생용

const RegularSchedule3: React.FC<any> = (props) => {

    // const [month, setMonth] = useState<any>();
    const [data, setData] = useState<any>({
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        etc: ""
    });
    const [loading, setLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(-1); 
    const [errorStep, setErrorStep] = useState(-1);

    const [disabed, setDisabled] = useState(true);

    const [update, setUpdate] = useState(0);


    useEffect(() => {
        const date = new Date();
        // setMonth(date.getMonth() + 1);

        if(date.getDate() === 1){
            setDisabled(false);
        }

    }, []);

    useEffect(() => {
        if (props.month) {
            fetch("https://peetsunbae.com/dashboard/chart/regularSchedule/studentget?month=" + props.month, {
                method: "GET",
                credentials: "include"
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);
                        if(result.message === "success" && result.data.length > 0){
                            setData(result.data[0].data);
                            const data = result.data[0];
                            const parentpermit = data.parentpermit;
                            const staffpermit = data.staffpermit;

                            if(staffpermit === 1){
                                setActiveStep(1);
                            }
                            if(parentpermit === 1){
                                setActiveStep(2);
                            }
                            if(staffpermit === 0){
                                setActiveStep(0);
                            }
                            if(staffpermit === 2){
                                setActiveStep(0);
                                setErrorStep(1);
                            }
                            if(parentpermit === 2){
                                setActiveStep(1);
                                setErrorStep(2);
                            }
                        }
                    })
            });
        }

    }, [props.month, update]);

    const submit = (e: any) => {

        const date = new Date();
        if(date.getDate() !== 1){
            alert("정기일정은 각 월 1일에만\n수정/등록 가능합니다.");
            return;
        }


        setLoading(true);
        console.log(data);

        const body = {
            month : props.month, data
        }

        fetch(`https://peetsunbae.com/dashboard/chart/regularSchedule/studentwrite`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify(body)
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    setLoading(false);
                    if(result.message === "success"){
                        alert("저장 성공");
                        setUpdate(Math.random());
                    }
                })
        })


    }

    const handleChange = (e: any, kind: string) => {
        const newData = data;
        newData[kind] = e.target.value;
        setData({ ...newData });
    }

    return (
        <div className={styles.main}>
            <div className={styles.title}>
                <div>
                    {props.month && props.month}월 정기일정
                </div>
            </div>
            <div className={`${styles.eachdayDiv} ${styles.first}`}>
                <div className={styles.eachDayDivTitle}>
                    월
                </div>
                <div className={styles.eachDayDivTextform}>
                    <input placeholder="사유와 시간을 꼭 명시해주세요 :)" value={data.monday} onChange={(e: any) => { handleChange(e, "monday") }} type="text" className={styles.textForm} />
                </div>
            </div>
            <div className={`${styles.eachdayDiv} ${styles.first}`}>
                <div className={styles.eachDayDivTitle}>
                    화
                </div>
                <div className={styles.eachDayDivTextform}>
                    <input placeholder="예) 도수치료 받고 오후 12시 등원" value={data.tuesday} onChange={(e: any) => { handleChange(e, "tuesday") }} type="text" className={styles.textForm} />
                </div>
            </div>
            <div className={`${styles.eachdayDiv}`}>
                <div className={styles.eachDayDivTitle}>
                    수
                </div>
                <div className={styles.eachDayDivTextform}>
                    <input placeholder="예) 수학과외 오후 2시 퇴실 오후 5시 복귀" value={data.wednesday} onChange={(e: any) => { handleChange(e, "wednesday") }} type="text" className={styles.textForm} />
                </div>
            </div>
            <div className={`${styles.eachdayDiv}`}>
                <div className={styles.eachDayDivTitle}>
                    목
                </div>
                <div className={styles.eachDayDivTextform}>
                    <input placeholder="예) 시대인재 현강 수강 오후 7시 조퇴" value={data.thursday} onChange={(e: any) => { handleChange(e, "thursday") }} type="text" className={styles.textForm} />
                </div>
            </div>
            <div className={`${styles.eachdayDiv}`}>
                <div className={styles.eachDayDivTitle}>
                    금
                </div>
                <div className={styles.eachDayDivTextform}>
                    <input value={data.friday} onChange={(e: any) => { handleChange(e, "friday") }} type="text" className={styles.textForm} />
                </div>
            </div>
            <div className={`${styles.eachdayDiv}`}>
                <div className={styles.eachDayDivTitle}>
                    토
                </div>
                <div className={styles.eachDayDivTextform}>
                    <input value={data.saturday} onChange={(e: any) => { handleChange(e, "saturday") }} type="text" className={styles.textForm} />
                </div>
            </div>
            <div className={`${styles.eachdayDiv}`}>
                <div className={styles.eachDayDivTitle}>
                    기타
                </div>
                <div className={styles.eachDayDivTextform}>
                    <input placeholder="예) 1/17 가족모임으로 오후 6시 조퇴" value={data.etc} onChange={(e: any) => { handleChange(e, "etc") }} type="text" className={styles.textForm} />
                </div>
            </div>


            <div className={styles.submitBtnDiv}>
                <Button disabled={true} onClick={submit} variant="contained" fullWidth sx={{ height: "62px", backgroundColor: "#1b49af", color: "white", fontFamily: "Apple_B", fontSize: "18px", "&:hover": { backgroundColor: "rgb(35,93,221)" }, "@media (max-width : 1024px)": { fontSize: "16px", height: '55.5px' } }}>
                    정기일정 제출
                </Button>
            </div>

            <div className={styles.helperText}>
                *정기일정 제출 후 사감 승인, 학부모 승인 절차 이후에 정식으로 등록됩니다.<br></br>*정기일정은 각 월 1일에만 등록/수정 가능합니다.
            </div>

            <div className={styles.stepperDiv}>
                    <HorizontalLinearStepper activeStep={activeStep} errorStep={errorStep} />
            </div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default RegularSchedule3;