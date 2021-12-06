import { Alert, Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField'
import { ClassNames } from '@emotion/react';
import { Link } from 'react-router-dom';
import { RepeatOneSharp } from '@mui/icons-material';
import { Socket } from 'socket.io-client';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress'

import styles from "../../componentsStyle/upload.module.css";

interface props {
    socket : Socket;
}

const Upload: React.FC<props> = (props) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [files, setFiles] = useState<any>([]);
    const [filenames, setFileNames] = useState<string[]>([]);

    const [titleExist, setTitleExist] = useState(false);
    const [descriptionExist, setDescriptionExsit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadBool, setUploadBool] = useState(false);



    const writeTitle = (event: any) => {
        setTitle(event.target.value);
        setUploadBool(false);
        if(event.target.value){
            setTitleExist(true);
        }else{
            setTitleExist(false);
        }
    }

    const writeDescription = (event: any) => {
        setDescription(event.target.value);
        setUploadBool(false);
        if(event.target.value){
            setDescriptionExsit(true);
        }else{
            setDescriptionExsit(false);
        }
    }

    const fileOnChange = (event: any) => {
        if (event.target) {
            const length = event.target.files.length;
            var i;
            var newFilenames = filenames;
            var newFiles = files;
            for (i = 0; i < length; i++) {
                newFilenames = [...newFilenames, event.target.files[i].name];
                newFiles.push(event.target.files[i]);
            }
            setFiles(newFiles);
            setFileNames(newFilenames);
        }
    }

    const deleteImage = (event: any) => {
        if (event.target) {
            console.log(files.length);
            var newFilenames = filenames;
            var newFiles = files;
            newFilenames = newFilenames.filter((filename) => (filename !== event.target.dataset.name));
            newFiles = newFiles.filter((file: any) => (file.name !== event.target.dataset.name));
            setFileNames(newFilenames);
            setFiles(newFiles);
        }
    }

    const submit = (e : any) => {
        e.preventDefault();
        setLoading(true);

        var formData = new FormData();
        var message = { title: title, description: description };
        formData.append("message", JSON.stringify(message));

        files.forEach((file: any) => {
            formData.append('notification_picture', file);
        })

        var token = "";

        if (window.electron) {
            token = window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/notification/write", {
            method: "POST",
            headers: { "Authorization": token },
            credentials : "include",
            body: formData
        }).then((response) => {
            response.json()
                .then((response) => {
                    console.log(response);
                    setLoading(false);
                    if (response.message === "success") {
                        setTitle("");
                        setDescription("");
                        setFiles([]);
                        setFileNames([]);
                        setUploadBool(true);
                        setTitleExist(false);
                        setDescriptionExsit(false);
                        props.socket.emit("newNotification");


                    }
                })
        }).catch((error) => {
            console.log(error);
        })
    }





    return (
        <div>
            <form encType="multipart/formdata">

                <div>
                    <div className={styles.divStyle}>제목</div>
                    <TextField value={title} onChange={writeTitle} required sx={{ backgroundColor: "white", marginBottom: 3 }} id="title" fullWidth variant="outlined" placeholder="제목을 적어주세요" />
                </div>

                <div>
                    <div className={styles.divStyle}>게시글 본문</div>
                    <TextField value={description} onChange={writeDescription} required sx={{ backgroundColor: "white", marginBottom: 1 }} id="description" multiline rows={12} fullWidth variant="outlined" placeholder="내용을 적어주세요" />
                </div>

                <div className={styles.filenameDiv}>

                    <label htmlFor="file">
                        <img className={styles.imageStyle} src="img/images-light.svg" alt="images">
                        </img>
                    </label>
                    <div className={styles.filenameStyle}>
                        {filenames.map((filename) => (<div className={styles.filenameDivStyle} data-name={filename} key={filename}>{filename}<img onClick={(e) => { deleteImage(e); }} className={styles.times} data-name={filename} alt="cancel" src="img/times-light.svg"></img></div>))}
                    </div>
                    <input onChange={(e) => { fileOnChange(e) }} type="file" name="file" id="file" accept="image/*" multiple hidden />
                </div>


                {loading &&
                <Box sx={{width : '100%', marginTop : 3, marginBottom : 3}}>
                    <LinearProgress />
                </Box>
                }



                {uploadBool &&
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="info" sx={{ marginTop: 2, marginBottom: 2 }}><span className={styles.spanStyles2}>업로드 성공 !</span></Alert>
                    </Stack>
                }


                <div className={styles.buttonStyles}>
                    <Link to="/dashboard/home">
                        <Button sx={{ marginRight: 2 }} variant="outlined" size="large" component="label">
                            <span className={styles.spanStyles2}>닫기</span>
                        </Button>
                    </Link>
                    <Button disabled={!titleExist || !descriptionExist} onClick={(e : any)=>{submit(e);}} variant="outlined" size="large" component="label">
                        <span className={styles.spanStyles2}>내용 업로드</span>
                    </Button>
                </div>



            </form>
        </div>
    )
}

export default Upload;