import React, { useEffect, useState } from "react";
import styles from "../dashboard/componentsStyle/testresult.module.css";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";


function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const GradeCard: React.FC<any> = (props) => {

    const [examList, setExamList] = useState<any>();
    const [selectedExam, setSelectedExam] = useState(0);
    const [data, setData] = useState<any>({
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
    })

    useEffect(()=>{
        console.log(props.data);
        setData(props.data);
        setSelectedExam(props.examId);
    }, [])

    useEffect(() => {
        fetch("https://peetsunbae.com/dashboard/avatar/examList", {
            method: "GET",
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    result.data.unshift({
                        id : 0,
                        name : "시험을 선택하세요"
                    })

                    setExamList(result.data);
                })
        })
    }, [])

    const handleChange = (e: any) => {

        if (examList) {
            console.log(e.target.value);
            setSelectedExam(e.target.value);
        }
    }

    const handletype = (e: any, kind: string) => {
        const newData: any = data;
        newData[kind] = e.target.value;
        setData({ ...newData });
        console.log(data);
    }

    const handleSave = (e : any) => {

        if(selectedExam === 0){
            alert("시험을 선택해주세요");
            return;
        }

        fetch("https://peetsunbae.com/dashboard/avatar/examRecord", {
            method : "post",
            credentials : "include",
            headers : {"content-type" : "application/json"},
            body : JSON.stringify({
                studentId : props.studentId,
                examId : selectedExam,
                data: data
            })
        }).then((response : any) => {
            response.json()
            .then((result : any) => {
                console.log(result);
                if(result.message === "success"){
                    alert("성적표를 저장했습니다.");
                    props.update();
                }
            })
        })

    }


    const handleDelete = (e: any) => {

        if (!props.id) {
            alert("삭제할 성적표가 없습니다.");
            return;
        }

        if (window.confirm("정말로 삭제하시겠습니까?")) {

            fetch("https://peetsunbae.com/dashboard/avatar/examRecord", {
                method: "delete",
                credentials: "include",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    id : props.id
                })
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);
                        if(result.message === "success"){
                            alert("성적표를 삭제했습니다.");
                            props.update();
                        }
                    })
            })

        }

    }

    const handleUpdate = (e : any) => {

        if (!props.id) {
            alert("수정할 성적표가 없습니다.");
            return;
        }

        if(selectedExam === 0){
            alert("시험을 선택해주세요");
            return;
        }

        if (window.confirm("정말로 수정하시겠습니까?")) {

            fetch("https://peetsunbae.com/dashboard/avatar/examRecord", {
                method: "put",
                credentials: "include",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    id : props.id,
                    examId : selectedExam,
                    data : data
                })
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);
                        if(result.message === "success"){
                            alert("성적표를 수정했습니다.");
                            props.update();
                        }
                    })
            })

        }

    }

    return (
        <div className={styles.main}>

            <div style={{ height: "50px" }}>
            </div>

            <div className={styles.select}>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl sx={{ width: "420px" }}>
                        {/* <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            시험 종류 선택
                        </InputLabel> */}
                        <NativeSelect
                            // defaultValue={0}
                            sx={{ textAlign: "center" }}
                            onChange={(e: any) => { handleChange(e) }}
                            value={selectedExam}
                        >
                            {
                                examList && examList.map((eachExam: any, index: number) => {
                                    return (
                                        <option key={eachExam.id} value={eachExam.id}>
                                            {eachExam.name}
                                        </option>
                                    )
                                })
                            }
                        </NativeSelect>
                    </FormControl>
                </Box>
                <div className={styles.name}>
                    {props.name && props.name}
                </div>
            </div>
            <div className={styles.gradeCard}>
                <div className={styles.gradeCardBox}>
                    <div className={styles.gradeCardHeader}>
                        <div className={styles.headerCol1}>
                            구&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;분
                        </div>
                        <div className={styles.headerCol2}>
                            한국사 영역
                        </div>
                        <div className={styles.headerCol3}>
                            국어 영역
                        </div>
                        <div className={styles.headerCol4}>
                            <div className={styles.headerCol4_1}>
                                수학 영역
                            </div>
                            <div className={styles.headerCol4_2}>
                                <input type="text" className={styles.input} value={data.first} onChange={(e: any) => { handletype(e, "first") }}></input>
                            </div>
                        </div>
                        <div className={styles.headerCol5}>
                            영어 영역
                        </div>
                        <div className={styles.headerCol6}>
                            <div className={styles.headerCol6_1}>
                                과학탐구 영역
                            </div>
                            <div className={styles.headerCol6_2}>
                                <div className={styles.headerCol6_2_1}>
                                    <input type="text" className={styles.input} value={data.second} onChange={(e: any) => { handletype(e, "second") }}></input>
                                </div>
                                <div className={styles.headerCol6_2_2}>
                                    <input type="text" className={styles.input} value={data.third} onChange={(e: any) => { handletype(e, "third") }}></input>
                                </div>
                            </div>
                        </div>
                        <div className={styles.headerCol7}>
                            <div className={styles.headerCol7_1}>
                                제2외국어<br></br>/한문 영역
                            </div>
                            <div className={styles.headerCol7_2}>
                                <input type="text" className={styles.input} value={data.fourth} onChange={(e: any) => { handletype(e, "fourth") }}></input>
                            </div>
                        </div>
                    </div>
                    <div className={styles.gradeCardRow}>
                        <div className={styles.gradeCardRow_1}>
                            표준점수
                        </div>
                        <div className={styles.gradeCardRow_2} style={{ backgroundColor: "#ebebeb" }}>
                            -
                        </div>
                        <div className={styles.gradeCardRow_3}>
                            <input type="text" className={styles.input} value={data.fifth} onChange={(e: any) => { handletype(e, "fifth") }}></input>
                        </div>
                        <div className={styles.gradeCardRow_4}>
                            <input type="text" className={styles.input} value={data.sixth} onChange={(e: any) => { handletype(e, "sixth") }}></input>
                        </div>
                        <div className={styles.gradeCardRow_5} style={{ backgroundColor: "#ebebeb" }}>
                            -
                        </div>
                        <div className={styles.gradeCardRow_6}>
                            <input type="text" className={styles.input} value={data.seventh} onChange={(e: any) => { handletype(e, "seventh") }}></input>
                        </div>
                        <div className={styles.gradeCardRow_7}>
                            <input type="text" className={styles.input} value={data.eighth} onChange={(e: any) => { handletype(e, "eighth") }}></input>
                        </div>
                        <div className={styles.gradeCardRow_8}>
                            <input type="text" className={styles.input} value={data.ninth} onChange={(e: any) => { handletype(e, "ninth") }}></input>
                        </div>
                    </div>
                    <div className={styles.gradeCardRow}>
                        <div className={styles.gradeCardRow_1}>
                            백분위
                        </div>
                        <div className={styles.gradeCardRow_2} style={{ backgroundColor: "#ebebeb" }}>
                            -
                        </div>
                        <div className={styles.gradeCardRow_3}>
                            <input type="text" className={styles.input} value={data.tenth} onChange={(e: any) => { handletype(e, "tenth") }}></input>
                        </div>
                        <div className={styles.gradeCardRow_4}>
                            <input type="text" className={styles.input} value={data.eleventh} onChange={(e: any) => { handletype(e, "eleventh") }}></input>
                        </div>
                        <div className={styles.gradeCardRow_5} style={{ backgroundColor: "#ebebeb" }}>
                            -
                        </div>
                        <div className={styles.gradeCardRow_6}>
                            <input type="text" className={styles.input} value={data.twelveth} onChange={(e: any) => { handletype(e, "twelveth") }}></input>
                        </div>
                        <div className={styles.gradeCardRow_7}>
                            <input type="text" className={styles.input} value={data.thirteenth} onChange={(e: any) => { handletype(e, "thirteenth") }}></input>
                        </div>
                        <div className={styles.gradeCardRow_8}>
                            <input type="text" className={styles.input} value={data.fourteenth} onChange={(e: any) => { handletype(e, "fourteenth") }}></input>
                        </div>
                    </div>
                    <div className={styles.gradeCardRow}>
                        <div className={styles.gradeCardRow_1}>
                            등급
                        </div>
                        <div className={styles.gradeCardRow_2}>
                            <input type="text" className={styles.input} value={data.fifteenth} onChange={(e: any) => { handletype(e, "fifteenth") }}></input>
                        </div>
                        <div className={styles.gradeCardRow_3}>
                            <input type="text" className={styles.input} value={data.sixteenth} onChange={(e: any) => { handletype(e, "sixteenth") }}></input>
                        </div>
                        <div className={styles.gradeCardRow_4}>
                            <input type="text" className={styles.input} value={data.seventeenth} onChange={(e: any) => { handletype(e, "seventeenth") }}></input>
                        </div>
                        <div className={styles.gradeCardRow_5}>
                            <input type="text" className={styles.input} value={data.eighteenth} onChange={(e: any) => { handletype(e, "eighteenth") }}></input>
                        </div>
                        <div className={styles.gradeCardRow_6}>
                            <input type="text" className={styles.input} value={data.nineteenth} onChange={(e: any) => { handletype(e, "nineteenth") }}></input>
                        </div>
                        <div className={styles.gradeCardRow_7}>
                            <input type="text" className={styles.input} value={data.twentyth} onChange={(e: any) => { handletype(e, "twentyth") }}></input>
                        </div>
                        <div className={styles.gradeCardRow_8}>
                            <input type="text" className={styles.input} value={data.twentyfirst} onChange={(e: any) => { handletype(e, "twentyfirst") }}></input>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.btnDiv}>
                {
                    props.id &&
                    <Button onClick={handleDelete} variant="contained" color="inherit" sx={{ marginRight: "20px" }}>삭제하기</Button>
                }
                {
                    props.id &&
                    <Button onClick={handleUpdate} variant="contained" color="inherit">저장하기</Button>
                }
                {
                    !props.id &&
                    <Button onClick={handleSave} variant="contained">저장하기</Button>
                }
            </div>

            <div style={{ height: "50px" }}>

            </div>
        </div>
    )
}

export default GradeCard;