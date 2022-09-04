import React, { useEffect, useState } from "react";
import styles from "../../componentsStyle/questionListStyle.module.css";
import { GridRenderCellParams, DataGridPro, GridRowsProp, GridColDef, GridToolbar, LicenseInfo, useGridApiRef, GridEditRowsModel, GridFilterModel, GridSelectionModel } from '@mui/x-data-grid-pro';
import { createStyles, makeStyles } from '@mui/styles';
import renderCellExpand from "../data/rendercellexpand";
import { createTheme, darken, lighten } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { Button, TextField } from "@mui/material";


LicenseInfo.setLicenseKey("e3ec4d79d1fa1f36cc88ecffd4e68392T1JERVI6MzMyMjMsRVhQSVJZPTE2NjkzODUyMDIwMDAsS0VZVkVSU0lPTj0x");


const defaultTheme = createTheme();
const useStyles2 = makeStyles(
    (theme) => {
        const getBackgroundColor = (color: any) =>
            theme.palette.mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

        const getHoverBackgroundColor = (color: any) =>
            theme.palette.mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

        return {
            root: {
                '& .super-app-theme--처리완료': {
                    color: "red",
                },
                '& .super-app-theme--Filled': {
                    backgroundColor: getBackgroundColor(theme.palette.success.main),
                    '&:hover': {
                        backgroundColor: getHoverBackgroundColor(theme.palette.success.main),
                    },
                },
                '& .super-app-theme--확인': {
                    color: "blue",
                },
                '& .super-app-theme--미확인': {
                    backgroundColor: getBackgroundColor(theme.palette.error.main),
                    '&:hover': {
                        backgroundColor: getHoverBackgroundColor(theme.palette.error.main),
                    },
                },
                '& .timeout': {
                    color: theme.palette.error.main,
                },
            },
        };
    },
    { defaultTheme },
);


const columns: GridColDef[] = [
    // { field: 'number', headerName: 'NO', width: 80, filterable: true },
    { field: 'number2', headerName: 'NO', width: 60, filterable: true },
    { field: 'category', headerName: '분류 (중단원명 > 소단원명)', width: 200, filterable: true },
    { field: 'from', headerName: '시험 출처', width: 250, filterable: true },
    { field: 'score', headerName: '배점', width: 100, filterable: true },
    { field: 'percent', headerName: '정답률', width: 100, filterable: true },
    { field: 'lastSubmit', headerName: '마지막 출제일', width: 120, filterable: true },
    { field: 'first', headerName: '첫번째 시도', width: 120, filterable: true, editable : true },
    { field: 'second', headerName: '두번째 시도', width: 120, filterable: true, editable : true },
    { field: 'third', headerName: '세번째 시도', width: 120, filterable: true, editable : true },

    { field: 'answer', headerName: '정답', width: 100, filterable: true },
];


const QuestionList: React.FC<any> = (props) => {
    const classes = useStyles2();
    const [rows, setRows] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [answerLoading, setAnswerLoading] = useState(false);
    const [alignment, setAlignment] = React.useState('one');
    const [number, setNumber] = useState<any>();
    const [category, setCategory] = useState<any>();
    const [from, setFrom] = useState<any>();
    const [score, setScore] = useState<any>();
    const [last, setLast] = useState<any>();
    const apiRef = useGridApiRef();
    const [active, setAcitve] = useState(false);

    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
    const [realSelectionModel, setRealSelectionModel] = useState<any>([]);

    const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
        items: [
            { id: 2, columnField: 'number', operatorValue: 'equals', value: "" },
            { id: 3, columnField: 'category', operatorValue: 'contains', value: "" },
            { id: 4, columnField: 'from', operatorValue: 'contains', value: "" },
            { id: 5, columnField: 'score', operatorValue: 'contains', value: "" },
            { id: 6, columnField: 'lastSubmit', operatorValue: 'contains', value: "" },
        ],
    });

    const getAnswers = async () => {
        if(selectionModel.length === 0){
            console.log("noSelected");
            return;
        }

        if(selectionModel.length > 60){
            alert("60문제 이하로 답 가져오세요");
            return;
        }

        setAnswerLoading(true);
        fetch(`https://peetsunbae.com/questions/answers?questions=${JSON.stringify(selectionModel)}`, {
            method : "GET",
            credentials : "include"
        }).then((response : any)=>{
            response.json()
            .then((result : any)=>{
                if(result.message !== "success"){
                    console.log("error");
                    return;
                }
                console.log(result.message);
                console.log(result.data);
                console.log(selectionModel);
                const answers = result.data;
                const newRows = rows;
                
                selectionModel.forEach((eachSelection : any, index : number)=>{
                    newRows.forEach((eachRow : any, rowIndex : number)=>{
                        if(+eachRow.id === +eachSelection){
                            console.log("true");
                            
                            switch (answers[index]) {
                                case "①":
                                    answers[index] = 1;
                                    break;
                                case "②":
                                    answers[index] = 2;
                                    break;
                                case "③":
                                    answers[index] = 3;
                                    break;
                                case "④":
                                    answers[index] = 4;
                                    break;
                                case "⑤":
                                    answers[index] = 5;
                                    break;
                            }

                            eachRow.answer = answers[index];
                            console.log(answers[index]);
                        }
                    })
                });

                setRows([...newRows]);
            })
        })
    }


    const start = async () => {
        if(!alignment){
            return;
        }


        setLoading(true);
        setRows([]);
        fetch(`https://peetsunbae.com/questions/questionList?subject=${alignment}&studentId=${(props.selectedUser && props.selectedUser.id) ? props.selectedUser.id : ""}`, {
            method: "GET",
            credentials : "include"
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    if (result.message === "success") {
                        const data = result.data;
                        const newRows: any = []
                        data.forEach((each: any, index : number) => {
                            if (each.score) {
                                const oneRow: any = {};
                                oneRow.id = +each.questionNumber;
                                // oneRow.number = each.id;
                                oneRow.number = +each.questionNumber;
                                oneRow.number2 = index - 3;
                                oneRow.category = each.category;
                                oneRow.from = each.where;
                                if(alignment === "four"){
                                    oneRow.from = oneRow.from.replace("Ⅰ", "1");
                                    oneRow.from = oneRow.from.replace("Ⅱ", "2");
                                }
                                oneRow.score = each.score;
                                oneRow.percent = each.percent;
                                oneRow.order = index+1;
                                newRows.push(oneRow);
                            }
                        })
                        const studentReport = result.studentReport;
                        if (studentReport) {
                            studentReport.forEach((eachData: any) => {
                                newRows.forEach((eachRow: any) => {
                                    if (eachData.questionNumber === eachRow.id) {
                                        const date = new Date(eachData.lastSubmitDate);
                                        const dateString = `${date.getFullYear()}.${date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) :  date.getMonth() + 1}.${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
                                        eachRow.lastSubmit = dateString;
                                        eachRow.first = eachData.firstTry;
                                        eachRow.second = eachData.secondTry;
                                        eachRow.third = eachData.thirdTry;
                                    }
                                })
                            })
                        }

                        setRows(newRows);
                        setLoading(false);
                    } else {

                    }
                })
        })
    }

    // useEffect(()=>{
    //     getReport();
    // }, [props.selectedUser]);


    const getReport = () => {
        if(!props.selectedUser){
            console.log("noUserSelected");
            return;
        }

        fetch(`https://peetsunbae.com/questions/studentReport?studentId=${props.selectedUser.id}`, {
            method : "GET",
            credentials : "include"
        }).then((response : any)=>{
            response.json()
            .then((result : any)=>{
                console.log(result);
                const data = result.data;
                if(!rows){
                    console.log("noQuestion");
                    return;
                }

                const newRows = rows;

                data.forEach((eachData : any)=>{
                    newRows.forEach((eachRow : any)=>{
                        if(eachData.questionNumber === eachRow.id){
                            console.log("equal");
                            const date = new Date(eachData.lastSubmitDate);
                            const dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
                            eachRow.lastSubmit = dateString;
                            eachRow.first = eachData.firstTry;
                            eachRow.second = eachData.secondTry;
                            eachRow.third = eachData.thirdTry;
                        }
                    })
                });

                setRows([...newRows]);
            })
        })
    }


    const handleChange = (e : any, newAlignment : string) => {
        setAlignment(newAlignment);
    }

    const textFieldChange = (e : any, kind : string) => {
        switch (kind){
            case "number" : 
                console.log(filterModel);
                setNumber(e.target.value);
                const newFilterModel1 = filterModel;
                newFilterModel1.items.forEach((each : any)=>{
                    if(each.id === 2){
                        each.value = e.target.value;
                    }
                });
                console.log(newFilterModel1);
                setFilterModel({items : [...newFilterModel1.items]});
                break;
            case "category" :
                setCategory(e.target.value);
                const newFilterModel2 = filterModel;
                newFilterModel2.items.forEach((each : any)=>{
                    if(each.id === 3){
                        each.value = e.target.value;
                    }
                });
                console.log(newFilterModel2);
                setFilterModel({items : [...newFilterModel2.items]});
                break;
            case "from" :
                setFrom(e.target.value);
                const newFilterModel3 = filterModel;
                newFilterModel3.items.forEach((each : any)=>{
                    if(each.id === 4){
                        each.value = e.target.value;
                    }
                });
                console.log(newFilterModel3);
                setFilterModel({items : [...newFilterModel3.items]});
                break;
            case "score" :
                setScore(e.target.value);
                const newFilterModel4 = filterModel;
                newFilterModel4.items.forEach((each : any)=>{
                    if(each.id === 5){
                        each.value = e.target.value;
                    }
                });
                console.log(newFilterModel4);
                setFilterModel({items : [...newFilterModel4.items]});
                break;
            case "last" :
                setLast(e.target.value);
                const newFilterModel5 = filterModel;
                newFilterModel5.items.forEach((each : any)=>{
                    if(each.id === 6){
                        each.value = e.target.value;
                    }
                });
                console.log(newFilterModel5);
                setFilterModel({items : [...newFilterModel5.items]});
                break;
        }
    }

    const compare = (a : any, b : any) => {
        if(a.order < b.order){
            return -1;
        }
        if(a.order > b.order){
            return 1;
        }
        return 0;
    }

    useEffect(()=>{
        console.log(apiRef.current.getSelectedRows());
        const data = apiRef.current.getSelectedRows();
        console.log(2);
        const arrayData : any = []
        data.forEach((each)=>{
            arrayData.push(each);
        })
        arrayData.sort(compare);
        const realData : any = [];
        arrayData.forEach((each : any)=>{
            realData.push(each.id)
        })
        setRealSelectionModel([...realData]);

    }, [selectionModel])


    useEffect(() => {
        start();
    }, [alignment, props.selectedUser]);

    useEffect(()=>{
        console.log(props.selectedUser);
        if(props.selectedUser){
            setAcitve(true);
        }else{
            setAcitve(false);
        }

    }, [props.selectedUser]);


    const handleCommit = (e : any) => {
        if(!props.selectedUser){
            alert("학생을 먼저 선택하세요");
            return;
        }

        if(!apiRef.current.getCellValue(e.id, "lastSubmit")){
            alert("출제하지 않은 문제입니다. 서버에 저장되지 않았습니다");
            return;
        }



        console.log(e);
        
        const studentId = props.selectedUser.id;
        const questionNumber = e.id;
        var description = e.value;
        const kind = e.field;

        if (!description) {
            description = "";
          }

        console.log(studentId);
        console.log(questionNumber);
        console.log(description);
        console.log(kind);

        fetch("https://peetsunbae.com/questions/studentTry", {
            method : "POST",
            credentials : "include",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({
                studentId,
                questionNumber,
                description,
                kind
            })
        }).then((response : any)=>{
            response.json()
            .then((result : any)=>{
                console.log(result);
            })
        })
    }

    return (
        <div>
            <div>
                <div style={{ marginTop: "16px", fontFamily: "Apple_B", marginBottom : "6px" }}>
                    문제 출제
                </div>
                <div>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                    >
                        <ToggleButton value="one"><span style={{ fontFamily: "Apple_B" }}>국어</span></ToggleButton>
                        <ToggleButton value="two"><span style={{ fontFamily: "Apple_B" }}>수학</span></ToggleButton>
                        <ToggleButton value="three"><span style={{ fontFamily: "Apple_B" }}>영어</span></ToggleButton>
                        <ToggleButton value="four"><span style={{ fontFamily: "Apple_B" }}>과탐</span></ToggleButton>
                        <ToggleButton value="five"><span style={{ fontFamily: "Apple_B" }}>사탐</span></ToggleButton>
                    </ToggleButtonGroup>

                    {/* <Box sx={{ minWidth: 120, maxWidth : 200, marginTop : 2 }}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                과목
                            </InputLabel>
                            <NativeSelect
                                value={alignment}
                                inputProps={{
                                    name: 'age',
                                    id: 'uncontrolled-native',
                                }}
                                onChange={handleChange}
                            >
                                <option value={"one"}>국어</option>
                                <option value={"two"}>수학</option>
                                <option value={"three"}>영어</option>
                                <option value={"four"}>물리1</option>
                                <option value={"five"}>물리2</option>
                            </NativeSelect>
                        </FormControl>
                    </Box> */}
                </div>
                <div className={styles.textFieldDiv}>
                    <div className={styles.textFieldBox}>
                        <TextField value={number} onChange={(e : any)=>{textFieldChange(e, "number")}} variant="standard" placeholder="번호" />
                    </div>
                    <div className={styles.textFieldBox}>
                        <TextField value={category} onChange={(e : any)=>{textFieldChange(e, "category")}} variant="standard" placeholder="분류" />
                    </div>
                    <div className={styles.textFieldBox}>
                        <TextField value={from} onChange={(e : any)=>{textFieldChange(e, "from")}} variant="standard" placeholder="시험 출처" />
                    </div>
                    <div className={styles.textFieldBox}>
                        <TextField value={score} onChange={(e : any)=>{textFieldChange(e, "score")}} variant="standard" placeholder="배점" />
                    </div>
                    <div className={styles.textFieldBox}>
                        <TextField value={last} onChange={(e : any)=>{textFieldChange(e, "last")}} variant="standard" placeholder="마지막 출제일" />
                    </div>
                </div>
                <div className={classes.root} style={{ height: 500, width: 1150, backgroundColor: "white", marginTop: "8px" }}>
                    <DataGridPro loading={loading} rows={rows} columns={columns}
                        density='compact'
                        components={{ Toolbar: GridToolbar }}
                        checkboxSelection={true}
                        filterModel={filterModel}
                        onFilterModelChange={(model : any) => setFilterModel(model)}
                        selectionModel={selectionModel}
                        onSelectionModelChange={(newSelectionModel : any, abc : any)=>{
                            console.log(newSelectionModel);
                            // const information : any = [];
                            // newSelectionModel.forEach((each : any)=>{
                            //     rows.forEach((eachRow : any)=>{
                            //         if(+each === +eachRow.id){
                            //             const oneSelectionModel : any = {};
                            //             oneSelectionModel.order = eachRow.order;
                            //             oneSelectionModel.questionNumber = each;
                            //             information.push(oneSelectionModel); 
                            //         }
                            //     })
                            // })
                            // console.log(information);
                            setSelectionModel(newSelectionModel);
                        }}
                        apiRef={apiRef}
                        onCellEditCommit={handleCommit}
                    />
                </div>
                <div className={styles.btnDiv}>

                </div>
                <div className={styles.answerBtnDiv} onClick={getAnswers}>
                    정답 보기
                </div>

                <div className={styles.submitDiv}>
                    {active &&
                        <a href={`https://peetsunbae.com/questions?pros=${JSON.stringify(realSelectionModel)}&studentId=${props.selectedUser ? props.selectedUser.id : ""}&studentName=${props.selectedUser ? props.selectedUser.label : ""}`} target="_blank">
                            <div className={styles.submit}>
                                문제보기
                                <img src="img/navigate_next.svg" alt="right"></img>
                            </div>
                        </a>
                    }
                    {!active &&
                        <div className={styles.disabledSubmit}>
                            학생 선택하세요
                            <img src="img/navigate_next.svg" alt="right"></img>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default QuestionList;