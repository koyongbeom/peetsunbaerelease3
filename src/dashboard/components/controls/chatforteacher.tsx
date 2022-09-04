import { Alert, Autocomplete, Avatar, Box, Button, LinearProgress, Modal, Stack, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import styles from '../../componentsStyle/chatforteacher.module.css';



const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "24px",
    boxShadow: 24,
    p: 3,
    paddingLeft: 5,
    paddingRight: 5
};




const ChatForTeacher: React.FC<any> = (props) => {

    const [searchMenu, setSearchMenu] = useState("write");
    const [open, setOpen] = React.useState(false);
    const [selectedUser, setSelectedUser] = useState<any>();
    const [active, setActive] = useState(true);
    const [users, setUsers] = useState<any>();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploadBool, setUploadBool] = useState(false);
    const [update, setUpdate] = useState(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => { setActive(true); setOpen(false); }

    useEffect(() => {
        console.log(99999999999999999999);
    }, [])


    useEffect(() => {

        async function start() {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/chart/users", {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);
                        const rows: any = [];
                        if (result.data) {
                            result.data.forEach((each: any, index: number) => {
                                var data: any = {};
                                data.id = each.id;
                                data.label = each.name;
                                data.phoneNumber = each.phoneNumber;
                                data.value = each.value;
                                data.key = index;
                                if (data.value === "student") {
                                    rows.push(data);
                                }
                            })
                            setUsers([...rows]);
                        }
                    })
            })
        }

        start();

    }, [props.user]);

    const onchange = (e: any, value: any) => {
        console.log(value);
        setSelectedUser(value);
        if (value) {
            setActive(false);
        } else {
            setActive(true);
        }
    }




    return (
        <div className={styles.main}>
            <div className={styles.mainBoard}>
                <div className={styles.title}>
                    <img src="img/off/envelope.svg" alt="envelope" />
                    나에게 온 메세지
                </div>

                <div className={styles.searchMenu}>
                    <div onClick={(e) => { setSearchMenu("write") }} className={`${styles.searchMenuDiv} ${searchMenu === "write" ? styles.active : ""}`}>
                        메세지함
                    </div>
                    <div onClick={(e) => { setSearchMenu("watch") }} className={`${styles.searchMenuDiv} ${searchMenu === "watch" ? styles.active : ""}`}>
                        전체 메세지
                    </div>
                </div>

                <div className={styles.chatroomListDiv}>
                    <div className={styles.chatRoomList}>
                        <div className={styles.eachChatRoomList}>
                            <div className={styles.innerEachChatRoomList}>
                                <div className={styles.item_info}>
                                    <span className={styles.wrap_thumb}>
                                        <Avatar sx={{ bgcolor: "#b0dbf1" }}><img src="img/user-solid.svg" alt="user" className="avatarImg" /></Avatar>
                                    </span>
                                    <strong className={styles.tit_info}>
                                        <span className={styles.txt_name}>임동기</span>
                                        <span className={styles.num_round}>1</span>
                                    </strong>
                                    <div className={styles.bubble_g}>
                                        <p className={styles.txt_info}>안녕하세요 공요범입니다안녕하세요 공요범입니다안녕하세요 공요범입니다안녕하세요 공요범입니다안녕하세요 공요범입니다안녕하세요 공요범입니다</p>
                                        <span className={styles.ico_arr}>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span className={styles.txt_date}><span>7월 5일</span></span>
                        </div>



                        <div className={styles.eachChatRoomList}>
                            <div className={styles.innerEachChatRoomList}>
                                <div className={styles.item_info}>
                                    <span className={styles.wrap_thumb}>
                                        <Avatar sx={{ bgcolor: "#b0dbf1" }}><img src="img/user-solid.svg" alt="user" className="avatarImg" /></Avatar>
                                    </span>
                                    <strong className={styles.tit_info}>
                                        <span className={styles.txt_name}>임동기</span>
                                    </strong>
                                    <div className={styles.bubble_g}>
                                        <p className={styles.txt_info}>넵!</p>
                                        <span className={styles.ico_arr}>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span className={styles.txt_date}><span>7월 5일</span></span>
                        </div><div className={styles.eachChatRoomList}>
                            <div className={styles.innerEachChatRoomList}>
                                <div className={styles.item_info}>
                                    <span className={styles.wrap_thumb}>
                                        <Avatar sx={{ bgcolor: "#b0dbf1" }}><img src="img/user-solid.svg" alt="user" className="avatarImg" /></Avatar>
                                    </span>
                                    <strong className={styles.tit_info}>
                                        <span className={styles.txt_name}>임동기</span>
                                    </strong>
                                    <div className={styles.bubble_g}>
                                        <p className={styles.txt_info}>넵!</p>
                                        <span className={styles.ico_arr}>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span className={styles.txt_date}><span>7월 5일</span></span>
                        </div><div className={styles.eachChatRoomList}>
                            <div className={styles.innerEachChatRoomList}>
                                <div className={styles.item_info}>
                                    <span className={styles.wrap_thumb}>
                                        <Avatar sx={{ bgcolor: "#b0dbf1" }}><img src="img/user-solid.svg" alt="user" className="avatarImg" /></Avatar>
                                    </span>
                                    <strong className={styles.tit_info}>
                                        <span className={styles.txt_name}>임동기</span>
                                    </strong>
                                    <div className={styles.bubble_g}>
                                        <p className={styles.txt_info}>넵!</p>
                                        <span className={styles.ico_arr}>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span className={styles.txt_date}><span>7월 5일</span></span>
                        </div><div className={styles.eachChatRoomList}>
                            <div className={styles.innerEachChatRoomList}>
                                <div className={styles.item_info}>
                                    <span className={styles.wrap_thumb}>
                                        <Avatar sx={{ bgcolor: "#b0dbf1" }}><img src="img/user-solid.svg" alt="user" className="avatarImg" /></Avatar>
                                    </span>
                                    <strong className={styles.tit_info}>
                                        <span className={styles.txt_name}>임동기</span>
                                    </strong>
                                    <div className={styles.bubble_g}>
                                        <p className={styles.txt_info}>넵!</p>
                                        <span className={styles.ico_arr}>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span className={styles.txt_date}><span>7월 5일</span></span>
                        </div><div className={styles.eachChatRoomList}>
                            <div className={styles.innerEachChatRoomList}>
                                <div className={styles.item_info}>
                                    <span className={styles.wrap_thumb}>
                                        <Avatar sx={{ bgcolor: "#b0dbf1" }}><img src="img/user-solid.svg" alt="user" className="avatarImg" /></Avatar>
                                    </span>
                                    <strong className={styles.tit_info}>
                                        <span className={styles.txt_name}>임동기</span>
                                    </strong>
                                    <div className={styles.bubble_g}>
                                        <p className={styles.txt_info}>넵!</p>
                                        <span className={styles.ico_arr}>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span className={styles.txt_date}><span>7월 5일</span></span>
                        </div><div className={styles.eachChatRoomList}>
                            <div className={styles.innerEachChatRoomList}>
                                <div className={styles.item_info}>
                                    <span className={styles.wrap_thumb}>
                                        <Avatar sx={{ bgcolor: "#b0dbf1" }}><img src="img/user-solid.svg" alt="user" className="avatarImg" /></Avatar>
                                    </span>
                                    <strong className={styles.tit_info}>
                                        <span className={styles.txt_name}>임동기</span>
                                    </strong>
                                    <div className={styles.bubble_g}>
                                        <p className={styles.txt_info}>넵!</p>
                                        <span className={styles.ico_arr}>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span className={styles.txt_date}><span>7월 5일</span></span>
                        </div><div className={styles.eachChatRoomList}>
                            <div className={styles.innerEachChatRoomList}>
                                <div className={styles.item_info}>
                                    <span className={styles.wrap_thumb}>
                                        <Avatar sx={{ bgcolor: "#b0dbf1" }}><img src="img/user-solid.svg" alt="user" className="avatarImg" /></Avatar>
                                    </span>
                                    <strong className={styles.tit_info}>
                                        <span className={styles.txt_name}>임동기</span>
                                    </strong>
                                    <div className={styles.bubble_g}>
                                        <p className={styles.txt_info}>넵!</p>
                                        <span className={styles.ico_arr}>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span className={styles.txt_date}><span>7월 5일</span></span>
                        </div><div className={styles.eachChatRoomList}>
                            <div className={styles.innerEachChatRoomList}>
                                <div className={styles.item_info}>
                                    <span className={styles.wrap_thumb}>
                                        <Avatar sx={{ bgcolor: "#b0dbf1" }}><img src="img/user-solid.svg" alt="user" className="avatarImg" /></Avatar>
                                    </span>
                                    <strong className={styles.tit_info}>
                                        <span className={styles.txt_name}>임동기</span>
                                    </strong>
                                    <div className={styles.bubble_g}>
                                        <p className={styles.txt_info}>넵!</p>
                                        <span className={styles.ico_arr}>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span className={styles.txt_date}><span>7월 5일</span></span>
                        </div><div className={styles.eachChatRoomList}>
                            <div className={styles.innerEachChatRoomList}>
                                <div className={styles.item_info}>
                                    <span className={styles.wrap_thumb}>
                                        <Avatar sx={{ bgcolor: "#b0dbf1" }}><img src="img/user-solid.svg" alt="user" className="avatarImg" /></Avatar>
                                    </span>
                                    <strong className={styles.tit_info}>
                                        <span className={styles.txt_name}>임동기</span>
                                    </strong>
                                    <div className={styles.bubble_g}>
                                        <p className={styles.txt_info}>넵!</p>
                                        <span className={styles.ico_arr}>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span className={styles.txt_date}><span>7월 5일</span></span>
                        </div><div className={styles.eachChatRoomList}>
                            <div className={styles.innerEachChatRoomList}>
                                <div className={styles.item_info}>
                                    <span className={styles.wrap_thumb}>
                                        <Avatar sx={{ bgcolor: "#b0dbf1" }}><img src="img/user-solid.svg" alt="user" className="avatarImg" /></Avatar>
                                    </span>
                                    <strong className={styles.tit_info}>
                                        <span className={styles.txt_name}>임동기</span>
                                    </strong>
                                    <div className={styles.bubble_g}>
                                        <p className={styles.txt_info}>넵!</p>
                                        <span className={styles.ico_arr}>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span className={styles.txt_date}><span>7월 5일</span></span>
                        </div><div className={styles.eachChatRoomList}>
                            <div className={styles.innerEachChatRoomList}>
                                <div className={styles.item_info}>
                                    <span className={styles.wrap_thumb}>
                                        <Avatar sx={{ bgcolor: "#b0dbf1" }}><img src="img/user-solid.svg" alt="user" className="avatarImg" /></Avatar>
                                    </span>
                                    <strong className={styles.tit_info}>
                                        <span className={styles.txt_name}>임동기</span>
                                    </strong>
                                    <div className={styles.bubble_g}>
                                        <p className={styles.txt_info}>넵!</p>
                                        <span className={styles.ico_arr}>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span className={styles.txt_date}><span>7월 5일</span></span>
                        </div><div className={styles.eachChatRoomList}>
                            <div className={styles.innerEachChatRoomList}>
                                <div className={styles.item_info}>
                                    <span className={styles.wrap_thumb}>
                                        <Avatar sx={{ bgcolor: "#b0dbf1" }}><img src="img/user-solid.svg" alt="user" className="avatarImg" /></Avatar>
                                    </span>
                                    <strong className={styles.tit_info}>
                                        <span className={styles.txt_name}>임동기</span>
                                    </strong>
                                    <div className={styles.bubble_g}>
                                        <p className={styles.txt_info}>넵!</p>
                                        <span className={styles.ico_arr}>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span className={styles.txt_date}><span>7월 5일</span></span>
                        </div><div className={styles.eachChatRoomList}>
                            <div className={styles.innerEachChatRoomList}>
                                <div className={styles.item_info}>
                                    <span className={styles.wrap_thumb}>
                                        <Avatar sx={{ bgcolor: "#b0dbf1" }}><img src="img/user-solid.svg" alt="user" className="avatarImg" /></Avatar>
                                    </span>
                                    <strong className={styles.tit_info}>
                                        <span className={styles.txt_name}>임동기</span>
                                    </strong>
                                    <div className={styles.bubble_g}>
                                        <p className={styles.txt_info}>넵!</p>
                                        <span className={styles.ico_arr}>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span className={styles.txt_date}><span>7월 5일</span></span>
                        </div>




                    </div>
                </div>
            </div>



            <div onClick={handleOpen} className={`${styles.message} qnaWrite`}>
                <img src="./img/pencil.svg" alt="pencil" />
                채팅방 열기
            </div>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={styles.messageTitle}>
                        채팅방 열기
                    </div>
                    <div className={styles.autocompleteDiv}>
                        <Autocomplete
                            onChange={onchange}
                            disablePortal
                            id="combo-box-demo"
                            options={users}
                            sx={{ width: "100%", borderRadius: "40px !important" }}
                            renderInput={(params) => <TextField {...params} sx={{ borderRadius: "24px" }} label={<span className={styles.nameText}>이름</span>} />}
                        />
                    </div>
                    {/* <div className={styles.textfieldDiv}>
                        <TextField value={message} onChange={(e) => { changeMessage(e) }} fullWidth id="outlined-basic" label={<span className={styles.nameText}>메세지</span>} variant="outlined" />
                    </div> */}


                    {loading &&
                        <Box sx={{ width: '100%', marginTop: 3, marginBottom: 3 }}>
                            <LinearProgress />
                        </Box>
                    }



                    {uploadBool &&
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert severity="info" sx={{ marginTop: 2, marginBottom: 2 }}><span className={styles.spanStyles2}>업로드 성공 !</span></Alert>
                        </Stack>
                    }

                    <div className={styles.buttonDiv}>
                        <Button disabled={active} variant="contained"><span className={styles.buttonText}>시작하기</span></Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default ChatForTeacher;