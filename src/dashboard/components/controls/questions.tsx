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
import { SportsRugbySharp } from "@mui/icons-material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "1350px",
    height: "850px",
    bgcolor: '#303030',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    cursor: "grab",
    "@media (max-width : 1024px)" : {
        "@media (orientation : landscape)" : {
            width : "1000px",
            height : "650px"
        },
        "@media (orientation : portrait)" : {
            width : "1150px"
        }
    }
};




const Questions: React.FC<any> = (props) => {

    const [loading, setLoading] = useState(false);

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

    const dragRef = useRef<HTMLDivElement>(null);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [startScrollLeft, setStartScrollLeft] = useState(0);
    const [startScrollTop, setStartScrollTop] = useState(0);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [percent, setPercent] = useState(100);
    const [isLandscape, setIsLandScape] = useState(true);
    const [modalImgStyle, setModalImageStyle] = useState<any>({ width: "auto", height: "auto", transform: "rotate(0deg)" });
    const [walkx, setWalkx] = useState(0);
    const [walky, setWalky] = useState(0);
    const handleOpen = () => { setOpen(true); }
    const handleClose = () => { setOpen(false); setIsMouseDown(false); }

    const textStyle = {
        fontFamily: "Apple_B"
    }


    const show = (e: any, index: number) => {
        console.log(e.target.dataset.src);
        setPercent(100);
        setOpen(true);
        setSrc(`https://peetsunbae.com/${e.target.dataset.src.split("/public/")[1]}`);
        const img = new Image();
        img.src = `https://peetsunbae.com/${e.target.dataset.src.split("/public/")[1]}`;
        img.onload = function () {
            console.log(img.width);
            console.log(img.height);
            if (img.width > 1.5 * img.height) {
                console.log(1);
                setIsLandScape(true);
                setModalImageStyle(
                    (prevStyle: any) => {
                        return {
                            ...prevStyle,
                            width: "1200px",
                            transform: "rotate(0deg)"
                        }
                    }
                )
            } else {
                setIsLandScape(false);
                console.log(2);
                setModalImageStyle(
                    (prevStyle: any) => {
                        return {
                            ...prevStyle,
                            height: "800px",
                            transform: "rotate(0deg)"
                        }
                    }
                )
            }

        }
    }

    const letsPlus = () => {
        const newPercent = percent + 10;
        if (isLandscape) {
            console.log(+modalImgStyle.width.split("px")[0]);
            const newWidth = +modalImgStyle.width.split("px")[0] * 1.1;

            setModalImageStyle(
                (prevStyle: any) => {
                    return {
                        ...prevStyle,
                        height: "auto",
                        width: `${newWidth}px`,
                    }
                }
            )

            setPercent(newPercent);
        } else {
            console.log(modalImgStyle.width);
            console.log(+modalImgStyle.height.split("px")[0]);
            const newHeight = +modalImgStyle.height.split("px")[0] * 1.1;

            setModalImageStyle(
                (prevStyle: any) => {
                    return {
                        ...prevStyle,
                        width: "auto",
                        height: `${newHeight}px`,
                    }
                }
            )
            setPercent(newPercent);
        }
    }

    const letsMaximize = () => {
        if (isLandscape) {
            setModalImageStyle(
                (prevStyle: any) => {
                    return {
                        ...prevStyle,
                        width: "1200px",
                        height: "auto"
                    }
                }
            )
            setPercent(100);
        } else {
            setModalImageStyle(
                (prevStyle: any) => {
                    return {
                        ...prevStyle,
                        height: "800px",
                        width: "auto"
                    }
                }
            )
            setPercent(100);
        }
    }

    const letsMinus = () => {
        const newPercent = percent - 10;
        if (isLandscape) {
            console.log(+modalImgStyle.width.split("px")[0]);
            const newWidth = +modalImgStyle.width.split("px")[0] * 0.9;

            setModalImageStyle(
                (prevStyle: any) => {
                    return {
                        ...prevStyle,
                        width: `${newWidth}px`,
                    }
                }
            )
            setPercent(newPercent);
        } else {
            console.log(modalImgStyle.width);
            console.log(+modalImgStyle.height.split("px")[0]);
            const newHeight = +modalImgStyle.height.split("px")[0] * 0.9;

            setModalImageStyle(
                (prevStyle: any) => {
                    return {
                        ...prevStyle,
                        height: `${newHeight}px`,
                    }
                }
            )
            setPercent(newPercent);
        }
    }

    const letsRotate = () => {
        var newDegree = modalImgStyle.transform;
        newDegree = newDegree.replace("rotate(", "");
        newDegree = +newDegree.replace("deg)", "");
        newDegree -= 90;

        setModalImageStyle(
            (prevStyle: any) => {
                return {
                    ...prevStyle,
                    transform: `rotate(${newDegree}deg)`,
                }
            }
        )

    }


    //질의응답 게시판 가져오는 기능----------------------------------------------------------------
    useEffect(() => {

        setLoading(true);

        // webFrame.setZoomFactor(3);

        async function start() {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch(`https://peetsunbae.com/dashboard/question/get?subject=${props.subject}&page=${props.page}&alignment=${props.alignment}`, {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include"
            }).then((response) => {
                response.json()
                    .then((result: any) => {

                        console.log(result.message);
                        setQuestionResults(result.message);
                        setLoading(false);
                    })
            }).catch((error) => {
                console.log(error);
            })
        }
        start();

    }, [props.subject, props.page, props.alignment, update]);
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
    const understand = async (e: any, questionId: number, userId: number) => {
        if (userId != props.user.id) {
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



    const submit = (event: any, questionId: number, index: number, questionUserId: number) => {
        event.preventDefault();
        setAnswerloading(true);

        var formData = new FormData();
        var message = { message: inputValue[index], questionId: questionId, author: props.user.name, userId: props.user.id };
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
                        console.log("----------------")
                        console.log(props.user.id);
                        props.socket.emit("newAnswer", questionUserId, props.user.id);
                    }
                })
        }).catch((error) => {
            console.log(error);
        })

    }



    const handleDown = (e: any) => {
        if (!dragRef.current?.contains(e.target)) {
            return;
        }
        setIsMouseDown(true);
        setStartX(e.pageX - dragRef.current.offsetLeft);
        setStartY(e.pageY - dragRef.current.offsetTop);
        setStartScrollLeft(dragRef.current.scrollLeft);
        setStartScrollTop(dragRef.current.scrollTop);

    }

    const handleMove = (e: any) => {

        if (isMouseDown) {
            e.preventDefault();

            const mouseX = e.pageX - dragRef.current!.offsetLeft;
            const mouseY = e.pageY - dragRef.current!.offsetTop;
            // Distance of the mouse from the origin of the last mousedown event
            const walkX = mouseX - startX;
            const walkY = mouseY - startY;
            // Set element scroll
            setWalkx(walkX);
            setWalky(walkY);
            dragRef.current!.scrollLeft = startScrollLeft - walkX;
            dragRef.current!.scrollTop = startScrollTop - walkY;
        }
    }

    const handleMouseUp = (e: any) => {
        console.log("mouseup");
        setIsMouseDown(false);
    }


    const reviewDelete = async (e: any) => {
        console.log(e.target.dataset.id);

        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch(`https://peetsunbae.com/dashboard/question/review/delete?id=${e.target.dataset.id}`, {
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




    return (
        <div className="questions">
            {
                loading &&
                <div className="questionsLoading">
                    <CircularProgress />
                </div>
            }
            {
                (!loading && questionResults) && questionResults.map((each: any, index: number) => {



                    return (
                        <div className="questionDiv" key={each.description}>
                            <div className="questionheader">
                                <div className="avatar">
                                    <Avatar sx={{ bgcolor: "#b0dbf1" }}><img src="img/user-solid.svg" alt="user" className="avatarImg" /></Avatar>
                                    <div className="emailDiv">
                                        <div className="email">
                                            {each.email}
                                        </div>
                                        <div className="questionDate">
                                            {`${each.createdAt.year}/${each.createdAt.month}/${each.createdAt.date} ${each.createdAt.hours > 12 ? each.createdAt.hours - 12 : each.createdAt.hours}:${each.createdAt.minutes}  ${each.createdAt.hours >= 12 ? "PM" : "AM"}`}
                                        </div>
                                    </div>
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
                                                <div className="imgBoxCoverDescription" data-src={each.images[0]} onClick={(e) => { show(e, index) }}>
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
                                                    <div key={image} className="imgListElement">
                                                        <div className="imgListElement_left">
                                                            <div className="imgListElement_img">
                                                                <img className="fileImage" src="img/file-image-solid.svg" alt="file" />
                                                            </div>
                                                            <div className="imgListElement_name">
                                                                <div className="imgListElement_namedetail">
                                                                    {image.split("/question/")[1]}
                                                                </div>
                                                                <div className="letshow" data-src={image} onClick={(e) => { show(e, index) }}>
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

                                {
                                    each.reviews.map((review: any, reviewIndex: number) => {
                                        return (
                                            <div key={reviewIndex} className="review">
                                                <div className="reviewAvatar">
                                                    {(review.value === "teacher" || review.value === "staff") ?
                                                        <Avatar sx={{ bgcolor: "#3d50b0" }}><img src="img/user-tie-solid.svg" alt="user" className="avatarImg" /></Avatar>
                                                        :
                                                        <Avatar sx={{ bgcolor: "#b0dbf1" }}><img src="img/user-solid.svg" alt="user" className="avatarImg" /></Avatar>
                                                    }

                                                </div>
                                                <div className="reviewDescriptionDiv">
                                                    <div className="reviewAuthor">
                                                        {review.userName}
                                                    </div>
                                                    <div className="reviewDescription">
                                                        {<p>{review.description}</p>}
                                                    </div>
                                                    {review.src ?
                                                        <div>
                                                            <div className="imgBox answerImageBox">
                                                                <div className="imgBoxCover">
                                                                    <div className="imgBoxCoverTitle">
                                                                        {each.images[0].split("/question/")[1]}
                                                                    </div>
                                                                    <div className="imgBoxCoverDescription" data-src={review.src} onClick={(e) => { show(e, index) }}>
                                                                        사진 미리보기
                                                                    </div>
                                                                </div>
                                                                <img className="img answerImg" src={`https://peetsunbae.com/${review.src.split("/public/")[1]}`} />
                                                            </div>
                                                        </div>
                                                        :
                                                        ""
                                                    }
                                                    <div className="answerDate">
                                                        {`${review.createdAt.year}/${review.createdAt.month}/${review.createdAt.date} ${review.createdAt.hours > 12 ? review.createdAt.hours - 12 : review.createdAt.hours}:${review.createdAt.minutes}  ${review.createdAt.hours >= 12 ? "PM" : "AM"}`}
                                                    </div>
                                                </div>
                                                <div className="reviewTrashDiv" onClick={reviewDelete} data-id={review.reviewId}>
                                                    {review.userId === props.user.id ? <img data-id={review.reviewId} className="reviewTrash" src="img/trash-alt-light.svg" alt="delete" /> : ""}
                                                </div>

                                            </div>
                                        )
                                    })
                                }

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
                                                    placeholder="메시지를 입력하세요 (ENTER로 줄바꿈이 가능합니다)"
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
                                                            <div onClick={(e) => { submit(e, each.id, index, each.userId); }} className={`answerSubmitText ${answerValue[index].length > 0 ? "active" : ""}`}>
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
                disableScrollLock={true}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    <Box sx={style} ref={dragRef} onMouseMove={handleMove} onMouseUp={handleMouseUp} onMouseDown={handleDown}>
                        <div className="modalDiv" ref={dragRef} onMouseMove={handleMove} onMouseUp={handleMouseUp} onMouseDown={handleDown}>

                            <div className="imageWrapper">
                                <img style={modalImgStyle} className="modalImg" src={src} alt="question" />
                            </div>





                        </div>
                    </Box>
                    <div className="imgOperator">
                        <img onClick={letsMinus} className="minus" src="img/minus-circle-light.svg" alt="minus" />
                        <div className="percentDiv">
                            {percent}%
                        </div>
                        <img onClick={letsPlus} className="plus" src="img/plus-circle-light.svg" alt="plus" />
                        <img onClick={letsMaximize} className="maximize" src="img/expand-arrows-light.svg" alt="maximize" />
                        <img onClick={letsRotate} className="rotate" src="img/undo-light.svg" alt="rotate" />
                    </div>
                </>
            </Modal>
        </div>
    )
}

export default Questions;