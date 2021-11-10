import React, { useEffect, useState } from "react"
import Avatar from '@mui/material/Avatar';
import { fontFamily } from "@mui/system";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const Questions: React.FC<any> = (props) => {

    const [loading, setLoading] = useState(false);
    const [questionResults, setQuestionResults] = useState<any>();
    const [open, setOpen] = React.useState(false);
    const [src, setSrc] = useState("");
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
        width : "1200px",
        height : "800px",
        display : "flex",
        justifyContent : "center",
      };



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
                setLoading(false);
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

    }, [props.subject, props.page]);

    return (
        <div className="questions">
            {
                questionResults && questionResults.map((each: any) => {
                    return (
                        <div className="questionDiv">
                            <div className="questionheader">
                                <div className="avatar">
                                    <Avatar sx={{ bgcolor: "#b0dbf1" }}><img src="img/user-solid.svg" alt="user" className="avatarImg" /></Avatar>
                                    <div className="email">{each.email}</div>
                                </div>
                                <div className="config">
                                    <img src="img/dotdotdot.svg" alt="config" />
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