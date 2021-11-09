import { Alert, Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField'
import { ClassNames } from '@emotion/react';
import { Link } from 'react-router-dom';
import { RepeatOneSharp } from '@mui/icons-material';
import { Socket } from 'socket.io-client';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import "../../componentsStyle/questionupload.css"

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress'

interface props {
    socket: Socket;
}

const Upload: React.FC<props> = (props) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [subject, setSubject] = useState<String>("");

    const [files, setFiles] = useState<any>([]);
    const [filenames, setFileNames] = useState<string[]>([]);

    const [subjectExist, setSubjectExist] = useState(false);
    const [titleExist, setTitleExist] = useState(false);
    const [descriptionExist, setDescriptionExsit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadBool, setUploadBool] = useState(false);

    const buttonStyles = {
        display: "flex",
        justifyContent: "flex-end",
    }

    const spanStyles = {
        fontFamily: "Apple_R",
        fontSize: "14px"
    }

    const spanStyles2 = {
        fontFamily: "Apple_B",
        fontSize: "14px"
    }

    const imageBox = {

    }

    const divStyle = {
        marginBottom: "12px",
        fontFamily : "Apple_R"
    }

    const imageStyle = {
        width: "32px",
        marginLeft: "6px",
        cursor: "pointer"
    }

    const filenameDiv = {
        display: "flex",
        alignItems: "center",

    }

    const filenameStyle = {
        display: "flex",
        alignItems: "center",
        marginLeft: "12px",
        marginBottom: "6px",
    }

    const filenameDivStyle = {
        fontFamily: "Apple_R"
    }

    const times = {
        width: "12px",
        marginRight: "16px",
        verticalAlign: "text-bottom",
        marginLeft: "6px",
        cursor: "pointer"
    }

    const selectSubject = (event : any, value : String) => {
        setSubject(value);
        setUploadBool(false);
        if(value){
            setSubjectExist(true);
        }else{
            setSubjectExist(false);
        }
    }

    const writeTitle = (event: any) => {
        setTitle(event.target.value);
        setUploadBool(false);
        if (event.target.value) {
            setTitleExist(true);
        } else {
            setTitleExist(false);
        }
    }

    const writeDescription = (event: any) => {
        setDescription(event.target.value);
        setUploadBool(false);
        if (event.target.value) {
            setDescriptionExsit(true);
        } else {
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

    const submit = (e: any) => {
        e.preventDefault();
        setLoading(true);

        var formData = new FormData();
        var message = { subject : subject, title: title, description: description };
        formData.append("message", JSON.stringify(message));

        files.forEach((file: any) => {
            formData.append('question_picture', file);
        })

        var token = "";

        if (window.electron) {
            token = window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/question/write", {
            method: "POST",
            headers: { "Authorization": token },
            credentials: "include",
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

                    }
                })
        }).catch((error) => {
            console.log(error);
        })
    }





    return (
        <div>
            <FormControl sx={{marginBottom : "12px"}} component="fieldset">
                <FormLabel component="legend" sx={{ fontFamily : "Apple_R", color : "black !important"}}><span className="radioTitle">과목 선택</span></FormLabel>
                <RadioGroup onChange={(e, value)=>{selectSubject(e, value)}} row aria-label="gender" name="row-radio-buttons-group">
                    <FormControlLabel value="chemistry" control={<Radio />} label={<span className="radio">화학</span>} />
                    <FormControlLabel value="organic" control={<Radio />} label={<span className="radio">유기</span>} />
                    <FormControlLabel value="physics" control={<Radio />} label={<span className="radio">물리</span>} />
                    <FormControlLabel value="biology" control={<Radio />} label={<span className="radio">생물</span>} />
                </RadioGroup>
            </FormControl>

            <form encType="multipart/formdata">

                <div>
                    <div style={divStyle}>제목</div>
                    <TextField value={title} onChange={writeTitle} required sx={{ backgroundColor: "white", marginBottom: 3 }} id="title" fullWidth variant="outlined" placeholder="제목을 적어주세요" />
                </div>

                <div>
                    <div style={divStyle}>게시글 본문</div>
                    <TextField value={description} onChange={writeDescription} required sx={{ backgroundColor: "white", marginBottom: 1 }} id="description" multiline rows={12} fullWidth variant="outlined" placeholder="내용을 적어주세요" />
                </div>

                <div style={filenameDiv}>

                    <label htmlFor="file">
                        <img style={imageStyle} src="img/images-light.svg" alt="images">
                        </img>
                    </label>
                    <div style={filenameStyle}>
                        {filenames.map((filename) => (<div style={filenameDivStyle} data-name={filename} key={filename}>{filename}<img onClick={(e) => { deleteImage(e); }} style={times} data-name={filename} alt="cancel" src="img/times-light.svg"></img></div>))}
                    </div>
                    <input onChange={(e) => { fileOnChange(e) }} type="file" name="file" id="file" accept="image/*" multiple hidden />
                </div>


                {loading &&
                    <Box sx={{ width: '100%', marginTop: 3, marginBottom: 3 }}>
                        <LinearProgress />
                    </Box>
                }



                {uploadBool &&
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert severity="info" sx={{ marginTop: 2, marginBottom: 2 }}><span style={spanStyles2}>업로드 성공 !</span></Alert>
                    </Stack>
                }


                <div style={buttonStyles}>
                    <Link to="/dashboard/question">
                        <Button sx={{ marginRight: 2 }} variant="outlined" size="large" component="label">
                            <span style={spanStyles2}>닫기</span>
                        </Button>
                    </Link>
                    <Button disabled={!titleExist || !descriptionExist || !subjectExist} onClick={(e: any) => { submit(e); }} variant="outlined" size="large" component="label">
                        <span style={spanStyles2}>내용 업로드</span>
                    </Button>
                </div>



            </form>
        </div>
    )
}

export default Upload;