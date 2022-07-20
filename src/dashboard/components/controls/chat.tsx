import { TextareaAutosize } from "@mui/material";
import React, {useEffect, useState} from "react";
import styles from "../../componentsStyle/envelope.module.css";

const Chat : React.FC<any> = (props) => {

    const [data, setData] = useState([
        {id : 1, direction : "teacher", message : "안녕하세요", }
    ]);
    const [message, setMessage] = useState("");

    const [isFocus, setIsFoucs] = useState(false);

    const [rows, setRows] = useState(1);


    const handleFocus = (e : any) => {
        console.log("gogo");
        console.log(e);
        setIsFoucs(true);
    }

    const handleBlur = (e : any) => {
        console.log("bye");
        setIsFoucs(false);
    }

    const handleChange = (e : any) => {
        setMessage(e.target.value);

        // const height = e.target.scrollHeight;
        // const rowHeight = 22;
        // const trows = Math.ceil(height/rowHeight) - 1;

        // console.log(height, rowHeight, trows);

        // if(trows&&rows){
        //     setRows(trows);
        // }
    }

    return (
        <div>
            Hello World !

            <div className={styles.chatFooter}>
                <div className={`${styles.inputDiv} ${isFocus ? styles.focus : ""}`}>
                    <div className={styles.messageDiv}>
                        {/* <textarea value={message} onChange={handleChange} rows={rows} className={styles.textarea} onFocus={handleFocus} onBlur={handleBlur} /> */}
                        <TextareaAutosize
                        className={styles.textarea}
                        value={message}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        />
                    </div>
                    <div className={styles.messageBtns}>
                        <div className={styles.emoticons}>
                            <div className={styles.smile}>
                                <img src="img/face-smile-light.svg" className={styles.smileFace} />
                            </div>
                            <div className={styles.clip}>
                                <img src="img/paperclip-light.svg" className={styles.clipImg} />
                            </div>
                        </div>
                        <div className={`${styles.sendBtn} ${message ? styles.active : ""}`}>
                            전송
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;