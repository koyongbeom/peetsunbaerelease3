import { CircularProgress, Divider } from "@mui/material";
import React, {useEffect, useState} from "react";
import GradeCard from "../../etc/gradecard";
import styles from "../componentsStyle/testresult.module.css";


const TestResult : React.FC<any> = (props) => {

    const [pushed, setPushed] = useState(false);
    const [records, setRecords] = useState<any>();
    const [random, setRandom] = useState(0);

    const [loading, setLoading] = useState(false);

    const update = () => {
        setRandom(Math.random());
    }

    useEffect(() => {

        setLoading(true);

        fetch("https://peetsunbae.com/dashboard/avatar/examRecords?studentId=" + props.selectedUser.id, {
            method : "GET",
            credentials : "include",
        }).then((response : any) => {
            response.json()
            .then((result : any) => {
                console.log(result.data);
                setRecords(result.data);
                setLoading(false);
            })
        })

    }, [random]);


    const handlePlus = (e : any) => {

        setPushed(true);

        const newRecord = {
            studentId : props.selectedUser.id,
            examId : 0,
            data : {
                first: "",
                second: "",
                third: "",
                fourth: "",
                fifth: "",
                sixth: "",
                seventh: "",
                eighth: "",
                ninth: "",
                tenth: "",
                eleventh: "",
                twelveth: "",
                thirteenth: "",
                fourteenth: "",
                fifteenth: "",
                sixteenth: "",
                seventeenth: "",
                eighteenth: "",
                ninteenth: "",
                twentyth: "",
                twentyfirst: ""
            }
        }

        const newRecords = records;
        newRecords.unshift(newRecord);

        console.log(newRecords);

        setRecords([...newRecords]);
    }

    
    return (
        <div className={styles.gradeCardDiv}>
            {
                loading &&
                <div className={styles.addDiv}>
                    <CircularProgress />
                </div>
            }

            {
                (!pushed && !loading) &&
                <div className={styles.addDiv} onClick={handlePlus}>
                    <img className={styles.plus} src="img/circle-plus-light.svg" />
                    <div className={styles.plusText}>
                        추가하기
                    </div>
                </div>

            }

            {
                (records && !loading) && records.map((eachRecord : any, index : number) => {
                    return (
                        <div key={eachRecord.id ? eachRecord.id : 0}>
                            <Divider />
                            <GradeCard name={props.name} id={eachRecord.id} studentId={eachRecord.studentId} examId={eachRecord.examId} data={eachRecord.data} update={update} />
                        </div>
                    )
                })
            }


            {/* <Divider />
            <GradeCard /> */}
            {/* <Divider />
            <GradeCard /> */}
        </div>
    )
}

export default TestResult;
