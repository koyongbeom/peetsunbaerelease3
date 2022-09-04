import { Chip, CircularProgress, Divider, TextareaAutosize, TextField } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import styles from "../../componentsStyle/envelope.module.css";
import Picker from "emoji-picker-react";

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { ReactComponent as ShapeLogoSvg } from '../../../svg/onlyshape.svg';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'white',
    outline: "none",
    borderRadius: "8px",
    boxShadow: "0 3px 25px -5px rgba(0,0,0,.35)"
};



const Chat: React.FC<any> = (props) => {

    const [data, setData] = useState<any>();
    const [message, setMessage] = useState("");

    const [update, setUpdate] = useState(0);

    const [isFocus, setIsFoucs] = useState(false);

    const [rows, setRows] = useState(1);

    const [showPicker, setShowPicker] = useState(false);

    const [fileName, setFileName] = useState<any>("");
    const [file, setFile] = useState<any>();

    const [link, setLink] = useState("");

    const [imgLoading, setImgLoading] = useState(false);
    const [imgSrc, setImgSrc] = useState("");
    const [imgId, setImgId] = useState(0);

    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = useState(false);

    const [index, setIndex] = useState(0);

    const chatRef = useRef<any>();

    const handleOpen = () => setOpen(true);
    const handleOpen2 = () => setOpen2(true);
    const handleClose = () => setOpen(false);
    const handleClose2 = () => {setOpen2(false); setLink("");}

    useEffect(() => {
        fetch("https://peetsunbae.com/dashboard/envelope/messages?index=" + index, {
            method : "GET",
            credentials : "include",
        }).then((response : any) => {
            response.json()
            .then((result : any) => {
                const data = result.data;
                if (result.data.length > 0) {
                    const newData = [];
                    const newDate = new Date(result.data[0].createdAt);
                    var newDateDay = "";
                    switch (newDate.getDay()) {
                        case 0:
                            newDateDay = "일";
                            break;
                        case 1:
                            newDateDay = "월";
                            break;
                        case 2:
                            newDateDay = "화";
                            break;
                        case 3:
                            newDateDay = "수";
                            break;
                        case 4:
                            newDateDay = "목";
                            break;
                        case 5:
                            newDateDay = "금";
                            break;
                        case 6:
                            newDateDay = "토";
                            break;
                    }

                    const newDateString = `${newDate.getFullYear()}년 ${newDate.getMonth()+1}월 ${newDate.getDate()}일 ${newDateDay}요일`;

                    const newDateRow = {
                        kind : "date", date : newDateString
                    }

                    newData.push(newDateRow);

                    var previousDate = newDateString;

                    result.data.forEach((eachData : any) => {

                        const newDate2 = new Date(eachData.createdAt);
                        var newDateDay2 = "";
                        switch (newDate2.getDay()) {
                            case 0:
                                newDateDay2 = "일";
                                break;
                            case 1:
                                newDateDay2 = "월";
                                break;
                            case 2:
                                newDateDay2 = "화";
                                break;
                            case 3:
                                newDateDay2 = "수";
                                break;
                            case 4:
                                newDateDay2 = "목";
                                break;
                            case 5:
                                newDateDay2 = "금";
                                break;
                            case 6:
                                newDateDay2 = "토";
                                break;
                        }
    
                        const newDateString2 = `${newDate2.getFullYear()}년 ${newDate2.getMonth()+1}월 ${newDate2.getDate()}일 ${newDateDay2}요일`;
    
                        const newDateRow2 = {
                            kind : "date", date : newDateString2
                        }
                        
                        if(previousDate !== newDateString2){
                            newData.push(newDateRow2);
                            previousDate = newDateString2;
                        }

                        newData.push(eachData);
    
                    })
                    console.log(newData);
                    setData(newData);
                }else{
                    setData(result.data);
                }
                console.log(result);
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
            })
        });

    }, [index, update]);



    const handleFocus = (e: any) => {
        console.log("gogo");
        console.log(e);
        setIsFoucs(true);
    }

    const handleBlur = (e: any) => {
        console.log("bye");
        setIsFoucs(false);
    }

    const handleChange = (e: any) => {
        setMessage(e.target.value);

        // const height = e.target.scrollHeight;
        // const rowHeight = 22;
        // const trows = Math.ceil(height/rowHeight) - 1;

        // console.log(height, rowHeight, trows);

        // if(trows&&rows){
        //     setRows(trows);
        // }
    }

    const handleEmojiClick = (e: any, emojiObject: any) => {
        e.stopPropagation();
        setMessage((prevMessage: any) => prevMessage + emojiObject.emoji);
        setShowPicker(false);
    }

    const handleEmojiOpen = (e: any) => {
        e.stopPropagation();
        setShowPicker(!showPicker);
    }

    const mainClick = (e: any) => {
        setShowPicker(false);
        console.log(111);
    }

    const handleKeydown = (e: any) => {

        const keyCode = e.which || e.keyCode;

        if (keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            console.log(1);
            handleSubmit("e", "text");
        }

    }

    const fileOnChange = (e: any) => {
        console.log("gogogogogo");
        if (e.target && e.target.files.length > 0) {
            console.log(e.target.files);
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);

            setImgLoading(true);

            var formData = new FormData();
            formData.append("chat_img", e.target.files[0]);

            setOpen(true);

            fetch("https://peetsunbae.com/dashboard/envelope/img", {
                method: "post",
                credentials: "include",
                body: formData
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);
                        if (result.message === "success") {
                            setImgSrc(result.src);
                            setImgId(result.imgId);
                        }
                        setImgLoading(false);
                    })
            })

        }
    }

    const handleImgDelete = (e: any) => {

        setOpen(false);

        fetch("https://peetsunbae.com/dashboard/envelope/img", {
            method: "delete",
            headers: { "content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                imgId: imgId
            })
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                })
        })

    }


    const handleLinkChange = (e : any) => {
        setLink(e.target.value);
    }

    const handleSubmit = (e : any, kind : string) => {

        var sendMessage = "";
        var toUserId = 0;

        if(props.user.value === "teacher" || props.user.value === "staff"){
            if(!props.selectedUserId){
                alert("학생을 선택한 후에 전송하세요");
                return;
            }
            toUserId = props.selectedUserId;
        }

        switch (kind) {
            case "text" :
                sendMessage = message;
                setMessage("");
                break;
            case "img" :
                sendMessage = imgSrc;
                setImgSrc("");
                setOpen(false);
                break;
            case "link" :
                sendMessage = link;
                setLink("");
                setOpen2(false);
                break;
            default :
                console.log("noMessage");
                return;
        }

        if(!sendMessage){
            console.log("noMessage2");
            return;
        }

        fetch("https://peetsunbae.com/dashboard/envelope/messages", {
            method: "post",
            headers: { "content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                kind : kind,
                message : sendMessage,
                toUserId : toUserId
            })
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    if(result.message === "success"){
                        setUpdate(Math.random());
                    }
                })
        })
    }


    return (
        <div ref={chatRef} className={styles.chatMain} onClick={mainClick}>
            <div className={styles.chatBody}>
                {
                    data &&
                    data.map((eachData: any) => {

                        const newDate = new Date(eachData.createdAt);
                        const dateString = `${newDate.getFullYear()}년 ${newDate.getMonth()+1}월 ${newDate.getDate()}일`;
                        const timestring = `${newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours()}:${newDate.getMinutes() < 10 ? "0" + newDate.getMinutes() : newDate.getMinutes()}`

                        if (eachData.kind !== "date") {
                            return (
                                <div key={eachData.id} className={styles.eachMessage}>
                                    {
                                        eachData.direction === "student" &&
                                        <>
                                            <div className={styles.profileAnchor}>
                                                <div className={styles.profileContainer}>
                                                    <ShapeLogoSvg className={styles.shapeLogo} />
                                                </div>
                                                <span className={styles.userName}>
                                                    수능선배
                                                </span>
                                            </div>
                                            <div className={styles.msg_container}>
                                                <div className={styles.msg_item}>
                                                    {
                                                        eachData.kind === "text" &&
                                                        <span className={styles.msg_text_box}>
                                                            {eachData.message}
                                                        </span>
                                                    }
                                                    {
                                                        eachData.kind === "img" &&
                                                        <img src={`https://peetsunbae.com/${eachData.message.split("/public/")[1]}`} className={styles.msg_img}>
                                                        </img>
                                                    }
                                                    {
                                                        eachData.kind === "link" &&
                                                        <a href={eachData.message}>
                                                            {eachData.message}
                                                        </a>
                                                    }
                                                </div>
                                                <div className={styles.msg_extra}>
                                                    <div className={styles.msg_extra_action}>
                                                        {timestring}
                                                    </div>
                                                </div>
                                            </div>

                                        </>
                                    }
                                    {
                                        eachData.direction === "teacher" &&
                                        <>
                                            <div className={styles.profileAnchor}>
                                                <div className={`${styles.profileContainer} ${styles.ofStudent}`}>
                                                    <img src="img/user-solid.svg" alt="user" className={styles.avatar} />
                                                </div>
                                                <span className={styles.userName}>
                                                    {eachData.name}
                                                </span>
                                            </div>
                                            <div className={styles.msg_container}>
                                                <div className={`${styles.msg_item} ${styles.ofStudent}`}>
                                                    <span className={styles.msg_text_box}>
                                                    {
                                                        eachData.kind === "text" &&
                                                        <span className={styles.msg_text_box}>
                                                            {eachData.message}
                                                        </span>
                                                    }
                                                    {
                                                        eachData.kind === "img" &&
                                                        <img src={`https://peetsunbae.com/${eachData.message.split("/public/")[1]}`} className={styles.msg_img}>
                                                        </img>
                                                    }
                                                    {
                                                        eachData.kind === "link" &&
                                                        <a href={eachData.message} target="_blank">
                                                            {eachData.message}
                                                        </a>
                                                    }
                                                    </span>
                                                </div>
                                                <div className={styles.msg_extra}>
                                                    <div className={styles.msg_extra_action}>
                                                        {timestring}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                            )
                        }else{
                            return (
                                <div className={styles.divider}>
                                    <Divider light={true}>
                                        <Chip label={eachData.date} />
                                    </Divider>
                                </div>
                            )
                        }
                    })
                }

            </div>

            <div className={styles.chatFooter}>
                <div className={`${styles.inputDiv} ${isFocus ? styles.focus : ""}`}>
                    <div className={styles.messageDiv}>
                        {/* <textarea value={message} onChange={handleChange} rows={rows} className={styles.textarea} onFocus={handleFocus} onBlur={handleBlur} /> */}
                        <TextareaAutosize
                            placeholder="메시지를 입력하세요 (Shift + Enter로 줄바꿈이 가능합니다)"
                            className={styles.textarea}
                            value={message}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onKeyDown={handleKeydown}
                        />
                    </div>
                    <div className={styles.messageBtns}>
                        <div className={styles.emoticons}>
                            <div className={styles.smile}>
                                <img onClick={handleEmojiOpen} src="img/face-smile-light.svg" className={styles.smileFace} />
                            </div>
                            <div className={styles.clip}>
                                <form encType="multipart/formdata">
                                    <label htmlFor="file">
                                        <img src="img/paperclip-light.svg" className={styles.clipImg} />
                                    </label>
                                    <input onChange={(e: any) => { fileOnChange(e) }} type="file" name="file" id="file" accept="image/*" hidden />
                                </form>
                            </div>
                            <div className={styles.link}>
                                <img src="img/link-simple-light.svg" className={styles.linkImg} onClick={handleOpen2} />
                            </div>
                        </div>
                        <div onClick={(e : any) => {handleSubmit(e, "text")}} className={`${styles.sendBtn} ${message ? styles.active : ""}`}>
                            전송
                        </div>
                    </div>
                    {
                        showPicker &&
                        <div className={styles.emojiBox} onClick={(e: any) => { e.stopPropagation(); }}>
                            <Picker
                                onEmojiClick={handleEmojiClick}
                                pickerStyle={{ width: "100%" }}
                            />
                        </div>
                    }

                </div>
            </div>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={styles.modalTitle}>
                        사진 보내기
                    </div>
                    <div className={styles.modalBody}>
                        <div className={styles.modalBodyImg}>
                            {
                                imgLoading &&
                                <div className={styles.imgLoadingDiv}>
                                    <CircularProgress />
                                </div>
                            }
                            {
                                (imgSrc && !imgLoading) &&
                                <div>
                                    <img className={styles.messageImg} alt="notificationImg" src={`https://peetsunbae.com/${imgSrc.split("/public/")[1]}`}></img>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={styles.modalFooter}>
                        <div onClick={handleImgDelete} className={styles.cancelBtn}>
                            취소
                        </div>
                        <div onClick={(e : any) => {handleSubmit(e, "img")}} className={styles.uploadBtn}>
                            업로드
                        </div>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={open2}
                onClose={handleClose2}
            >
                <Box sx={style}>
                    <div className={styles.modalTitle}>
                        링크 보내기
                    </div>
                    <div className={styles.modalBody}>
                        <TextField value={link} onChange={handleLinkChange} placeholder="링크를 적으세요" fullWidth />
                    </div>
                    <div className={styles.modalFooter}>
                        <div onClick={handleClose2} className={styles.cancelBtn}>
                            취소
                        </div>
                        <div onClick={(e : any) => {handleSubmit(e, "link")}} className={styles.uploadBtn}>
                            보내기
                        </div>
                    </div>
                </Box>
            </Modal>

        </div>
    )
}

export default Chat;