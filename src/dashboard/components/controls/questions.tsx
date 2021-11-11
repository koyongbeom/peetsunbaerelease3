import React, { useEffect, useRef, useState } from "react"
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { emitKeypressEvents } from "readline";
import { CircularProgress } from "@mui/material";


const Questions: React.FC<any> = (props) => {

    const [answerloading, setAnswerloading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [questionResults, setQuestionResults] = useState<any>();
    const [open, setOpen] = React.useState(false);
    const [src, setSrc] = useState("");
    const [update, setUpdate] = useState(1);
    const [rows, setRows] = useState([1, 1, 1, 1, 1, 1, 1, 1]);
    const [activate, setActivate] = useState([false, false, false, false, false, false, false, false, false, false]);
    const [answerValue, setAnswerValue] = useState(["", "", "", "", "", "", "", "", "", "", "", "", "",]);
    const [memoryRow, setMemoryRow] = useState([3, 3, 3, 3, 3, 3, 3, 3, 3, 3]);
    const [inputValue, setInputValue] = useState(["", "", "", "", "", "", "", "", "", "", "", ""]);
    const answerRefs = useRef<any>([]);
    answerRefs.current = [];

    const [answerFileNames, setAnswerFileNames] = useState<any>([]);
    const [answerFiles, setAnswerFiles] = useState<any>([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const textStyle = {
        fontFamily: "Apple_B"
    }


    const show = (e: any) => {
        console.log(e.target.dataset.src);
        setOpen(true);
        setSrc(`https://peetsunbae.com/${e.target.dataset.src.split("/public/")[1]}`);
    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: '#f5f5f5',
        border: '1px solid #000',
        p: 1,
        width: "1200px",
        height: "800px",
        display: "flex",
        justifyContent: "center",
    };


    //질의응답 게시판 가져오는 기능----------------------------------------------------------------
    useEffect(() => {
        async function start() {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch(`https://peetsunbae.com/dashboard/question/get?subject=${props.subject}&page=${props.page}`, {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include"
            }).then((response) => {
                response.json()
                    .then((result) => {
                        console.log(result.message);
                        setQuestionResults(result.message);
                    })
            }).catch((error) => {
                console.log(error);
            })
        }
        start();

    }, [props.subject, props.page, update]);
    //----------------------------------------------------------------------------------------------

    //본인 글 삭제하는 기능------------------------------------------------------------------------
    const deleteMyQuesiton = async (e: any) => {
        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch(`https://peetsunbae.com/dashboard/question/delete?id=${e.target.dataset.id}`, {
            method: "DELETE",
            headers: { "Authorization": token },
            credentials: "include"
        }).then((response) => {
            response.json()
                .then((result) => {
                    console.log(result.message);
                    if (result.message === "success") {
                        const random = Math.floor(Math.random() * 999999);
                        setUpdate(random);
                    }
                })
        }).catch((error) => {
            console.log(error);
        })
    }
    //---------------------------------------------------------------------------------------------


    //이해했어요 기능----------------------------------------------
    const understand = async (e: any, questionId: number, userId : number) => {
        if(userId != props.user.id){
            return;
        }

        console.log(questionId);

        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch(`https://peetsunbae.com/dashboard/question/understand`, {
            method: "POST",
            headers: { "Authorization": token, "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                questionId: questionId,
                userId: props.user.id
            })
        }).then((response) => {
            response.json()
                .then((result) => {
                    console.log(result.message);
                    const random = Math.floor(Math.random() * 999999);
                    setUpdate(random);
                })
        }).catch((error) => {
            console.log(error);
        })
    }
    //----------------------------------------------------------

    //댓글 내용 기억하는 기능, 댓글 길이에 따라 칸 늘려주는 기능----------------------------------------------------
    const getTextField = (e: any, index: number) => {
        console.log(e.target.value);
        console.log(11);
        const value = e.target.value;
        const newAnswerValue = answerValue;
        newAnswerValue[index] = value;
        setAnswerValue([...newAnswerValue]);

        const newInputValue = inputValue;
        newInputValue[index] = value;
        setInputValue([...newInputValue]);

        if (newAnswerValue[index].length % 74 === 0) {
            if (Math.floor(newAnswerValue[index].length / 74) != 0) {
                const newRows = rows;
                newRows[index]++;
                setRows([...newRows]);
            }

            // const newRows = rows;
            // newRows[index] = Math.floor(newAnswerValue[index].length/74) + 3;
            // setRows([...newRows]);
        }
    }
    //-------------------------------------------------------------------------------------------------

    //글 foucs 될때 줄 늘려주는 기능-----------------------------------
    const activateTextField = (e: any, index: number) => {
        if (e.target.value.length === 0) {
            const newActivate = activate;
            const newRows = rows;
            newActivate[index] = true;
            newRows[index] = 3;
            setActivate([...newActivate]);
            setRows([...newRows]);
        }
    }
    //-----------------------------------------------------------------

    //댓글 blur 될때 다시 줄 줄여주는 기능----------------------------
    const blurTextField = (e: any, index: number) => {
        if (e.target.value.length === 0) {
            console.log(33);
            const newActivate = activate;
            const newRows = rows;
            newActivate[index] = false;
            newRows[index] = 1;
            setRows([...newRows]);
            setActivate([...newActivate]);
        }
    }
    //------------------------------------------------------------

    //엔터 누르면 한줄 늘어나는 기능-----------------------------------------------
    const keypress = (ev: any, index: number) => {
        console.log(44);
        if (ev.key === "Enter") {
            const newRows = rows;
            newRows[index]++;
            setRows([...newRows]);
        }
    }
    //---------------------------------------------------------------------------

    //답변에 사진 올리기 기능-----------------------------------------------------------
    const fileOnChange = (event: any, index: number) => {
        if (event.target.files.length > 0) {
            console.log(event.target.files);
            console.log(event.target.files[0].name);
            const newAnswerFiles: any = answerFiles;
            const newAnswerFileNames: any = answerFileNames;
            newAnswerFiles[index] = event.target.files[0];
            newAnswerFileNames[index] = event.target.files[0].name;

            if (event.target) {
                setAnswerFiles([...newAnswerFiles]);
                setAnswerFileNames([...newAnswerFileNames]);
            }
        }
    }
    //-----------------------------------------------------------------------

    const deleteFile = (index: number) => {
        var VOID;

        if (answerFiles[index]) {
            const newAnswerFiles: any = answerFiles;
            const newAnswerFileNames: any = answerFileNames;
            newAnswerFiles[index] = VOID;
            newAnswerFileNames[index] = VOID;
            setAnswerFiles([...newAnswerFiles]);
            setAnswerFileNames([...newAnswerFileNames]);
        }

    }



    const submit = (event: any, questionId: number, index: number) => {
        event.preventDefault();
        setAnswerloading(true);

        var formData = new FormData();
        var message = { message: answerValue[index], questionId: questionId, author: props.user.name, userId: props.user.id };
        formData.append("message", JSON.stringify(message));

        answerFiles.forEach((file: any) => {
            formData.append("answer_picture", file);
        })

        console.log(message);

        var token = "";

        if (window.electron) {
            token = window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/question/answer/write", {
            method: "POST",
            headers: { "Authorization": token },
            credentials: "include",
            body: formData
        }).then((response) => {
            response.json()
                .then((response) => {
                    console.log(response);
                    if (response.message === "success") {

                        const newAnswerValue = answerValue;
                        newAnswerValue[index] = "";
                        setAnswerValue([...newAnswerValue]);

                        const newInputValue = inputValue;
                        newInputValue[index] = "";
                        setInputValue([...newInputValue]);

                        deleteFile(index);
                        const newActivate = activate;
                        const newRows = rows;
                        newActivate[index] = false;
                        newRows[index] = 1;
                        setRows([...newRows]);
                        setActivate([...newActivate]);
                        setAnswerloading(false);

                        const random = Math.floor(Math.random() * 999999);
                        setUpdate(random);
                    }
                })
        }).catch((error) => {
            console.log(error);
        })

    }



    return (
        <div className="questions">
            {
                questionResults && questionResults.map((each: any, index: number) => {
                    return (
                        <div className="questionDiv">
                            <div className="questionheader">
                                <div className="avatar">
                                    <Avatar sx={{ bgcolor: "#b0dbf1" }}><img src="img/user-solid.svg" alt="user" className="avatarImg" /></Avatar>
                                    <div className="email">{each.email}</div>
                                </div>
                                <div className="config" data-id={each.id} onClick={deleteMyQuesiton}>
                                    {each.userId === props.user.id ? <img data-id={each.id} className="trash" src="img/trash-alt-light.svg" alt="config" /> : ""}
                                </div>
                            </div>
                            <div className="questionBody">
                                <div className="bodyTitle">
                                    {each.title}
                                </div>
                                <div className="bodyDescription">
                                    {each.description}
                                </div>
                                {
                                    each.images.length === 1 ?
                                        <div className="imgBox">
                                            <div className="imgBoxCover">
                                                <div className="imgBoxCoverTitle">
                                                    {each.images[0].split("/question/")[1]}
                                                </div>
                                                <div className="imgBoxCoverDescription" data-src={each.images[0]} onClick={show}>
                                                    사진 미리보기
                                                </div>
                                            </div>
                                            <img className="img" src={`https://peetsunbae.com/${each.images[0].split("/public/")[1]}`} />
                                        </div> :
                                        ""
                                }
                                {
                                    each.images.length > 1 ?
                                        <div className="imgList">
                                            {each.images.map((image: any, index: number) => {
                                                return (
                                                    <div className="imgListElement">
                                                        <div className="imgListElement_left">
                                                            <div className="imgListElement_img">
                                                                <img className="fileImage" src="img/file-image-solid.svg" alt="file" />
                                                            </div>
                                                            <div className="imgListElement_name">
                                                                <div className="imgListElement_namedetail">
                                                                    {image.split("/question/")[1]}
                                                                </div>
                                                                <div className="letshow" data-src={image} onClick={show}>
                                                                    파일 미리보기
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="imgElement_right">

                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        :
                                        ""
                                }
                                <div onClick={(e) => { understand(e, each.id, each.userId) }} className={`likeicon ${each.userId === props.user.id ? "mine" : ""}`}>
                                    {each.isUnderStand ? 
                                    <>
                                    <img src='img/likeiconactivate.svg' alt="like" /><div className="liketext activate">+1 이해됐어요</div> 
                                    </>
                                     :
                                    <>
                                    <img src='img/likeicon.svg' alt="like" /><div className="liketext">이해됐어요</div> 
                                    </>
                                }
                                </div>

                                <form encType="multipart/formdata">
                                    <div className="answerTextFieldDiv">
                                        <div className="answerTextField">
                                            <Paper
                                                elevation={0}
                                                component="form"
                                                sx={{ p: '2px 4px', display: 'flex', flexDirection: "column", width: "100%", border: "1px solid #d9d9d9" }}
                                            >
                                                <InputBase
                                                    value={inputValue[index]}
                                                    ref={(element) => { answerRefs.current[index] = element; }}
                                                    onKeyPress={(ev) => { keypress(ev, index); }}
                                                    rows={rows[index]}
                                                    onFocus={(e) => { activateTextField(e, index) }}
                                                    onBlur={(e) => { blurTextField(e, index) }}
                                                    multiline={true}
                                                    sx={{ ml: 1, flex: 1, fontFamily: "Apple_R", paddingLeft: "2px", paddingTop: "8px", paddingRight: "15px" }}
                                                    placeholder="메시지를 입력하세요"
                                                    inputProps={{ 'aria-label': 'search google maps' }}
                                                    onChange={(e) => { getTextField(e, index) }}
                                                />

                                                {activate[index] ?
                                                    <>
                                                        {answerloading ?
                                                            <div className="answerloading">
                                                                <CircularProgress />
                                                            </div> : ""
                                                        }
                                                        {answerFiles[index] ?
                                                            <div className="answerFile">
                                                                <div className="answerFileTitle">
                                                                    <img className="uploadedFileClip" src="img/paperclip-light.svg" alt="file" />
                                                                    <div>{answerFileNames[index]}</div>
                                                                </div>
                                                                <div>
                                                                    <img onClick={(e) => { deleteFile(index) }} data-id={each.id} className="uploadedFileTrash" src="img/trash-alt-light.svg" alt="config" />
                                                                </div>
                                                            </div> : ""
                                                        }
                                                        <div className="answerSubmit">
                                                            <label htmlFor="file">
                                                                <div className="fileupload">
                                                                    <img className="clip" src="img/paperclip-light.svg" alt="file" />
                                                                </div>
                                                            </label>
                                                            <input onChange={(e) => fileOnChange(e, index)} type="file" name="file" id="file" accept="image/*" hidden />
                                                            <div onClick={(e) => { submit(e, each.id, index); }} className={`answerSubmitText ${answerValue[index].length > 0 ? "active" : ""}`}>
                                                                전송
                                                            </div>
                                                        </div>
                                                    </> : ""
                                                }

                                            </Paper>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    );
                })
            }



            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <img className="modalImg" src={src} alt="question" />
                </Box>
            </Modal>
        </div>
    )
}

export default Questions;