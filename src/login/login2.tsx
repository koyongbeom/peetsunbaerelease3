import React, { useEffect, useState, useRef } from 'react';
// import { withStyles } from '@mui/styles';
// import styles from './styles';
import { Link } from 'react-router-dom';
import {useLocation} from 'react-router';
import Box from '@mui/material/Box'
import { Button, FormControl, FormHelperText, Modal, OutlinedInput } from '@mui/material';
import Typography from '@mui/material/Typography';
import { StringLiteralLike } from 'typescript';
import { send } from 'process';
import { ipcRenderer} from 'electron';
import styles from './login.module.css';
import { ReactComponent as LogoSvg } from '../svg/newlogo.svg';
import { ReactComponent as WhiteShapeLogoSvg } from '../svg/whiteshape.svg';

interface props {
    history: any;
}

declare global {
    interface Window {
        electron?: {
            sendMessageApi: {
                setToken(token: string): string;
                getToken(): string;
                notification(title : string, body : string) : void;
            }
        },
    }
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};



const Login2: React.FC<props> = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [certNumber, setCertNumber] = useState("");
    const [rePassword, setRePassword] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [verifiedNumberError, setVerifiedNumberError] = useState(false);
    const [rePasswordError, setRePasswordError] = useState(false);

    const [isCertSended, setIsCertNumberSended] = useState(false);
    const [isPasswordChanged, SetIsPasswordChanged] = useState(false);

    // const classes = props.classes;

    const location = useLocation<any>();
    const mobileAppbar = useRef<HTMLDivElement>(null);
    const loginBtn = useRef<any>(null);


    useEffect(()=>{
        console.log("width");
        console.log(mobileAppbar.current?.offsetWidth);
        if(mobileAppbar.current)
        mobileAppbar.current.style.height = `${mobileAppbar.current?.offsetWidth / 36 * 25 }px`;
    
        if(loginBtn.current)
        loginBtn.current.style.height = `${loginBtn.current?.offsetWidth / 36 * 5 }px`;
    });


    //로그인 창 처음 들어왔을때 토큰 있는지 확인해서 있으면 로그인창 스킵하고 바로 대시보드로 보내는 기능-----------
    useEffect(() => {

        var bool = true;

        if(location.state){
            if(location.state.from === "dashboard"){
                bool = false;
            }
        }

        async function send(){
            //일렉트론 이라면 토큰 가져오는 기능------------------------------------------------------
            var token : any = ""
            console.log("22222");
            if (window.electron) {
                console.log("111111");
                token = await window.electron.sendMessageApi.getToken();
            }
            //-------------------------------------------------------------------------------------

            // token = ipcRenderer.sendSync("getToken");

            fetch("https://peetsunbae.com/login/start", {
                method : "GET",
                headers : {"Authorization" : token},
                credentials : "include"
            }).then((response)=>{
                response.json()
                .then((result)=>{
                    if(result.message === "LOGIN"){
                        props.history.push("/dashboard/home");
                    }
                })
            })
        }

        if(bool){
        send();
        }
    }, [])
    //------------------------------------------------------------------------------------------------------


    //로그인 정보 제출----------------------------------------------------------------------------------
    const submit = (e: any) => {
        e.preventDefault();

        setEmailError(false);
        setPasswordError(false);

        fetch("https://peetsunbae.com/login/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email.split(" ").join(""),
                password: password,
            })
        }).then((response) => {
            response.json()
                .then((result) => {
                    console.log(result);

                    //로그인 성공 시--------------------------------------------------------------------------
                    if (result.message === "success") {
                        if (window.electron) {
                            console.log("electron");
                            const returnValue = window.electron.sendMessageApi.setToken(result.token);
                            // const returnValue2 = ipcRenderer.sendSync("setToken", result.token);
                            console.log(returnValue);
                            // console.log(returnValue2);
                        }
                        props.history.push("/wordtest");
                    }
                    //-----------------------------------------------------------------------------------
                    if (result.message === "fail") {
                        setPasswordError(true);
                    }
                    if (result.message === "emailfail") {
                        setEmailError(true);
                    }


                })
        }).catch((error) => {
            console.log(error);
        })

    }
    //--------------------------------------------------------------------------------------------------

    //모달 창 열때 일어나는 기능--------------------------------------------------------------------------
    const modal = () => {
        console.log("modal");
        setOpen(true);
    }
    //----------------------------------------------------------------------------------------------------

    //modal 창 닫을 때 일어나는 기능------------------------------------------------------------------------
    const handleClose = () => {
        setOpen(false);
        setIsCertNumberSended(false);
        setVerifiedNumberError(false);
        setRePasswordError(false);
        SetIsPasswordChanged(false);
    }
    //----------------------------------------------------------------------------------------------------


    //재설정 비밀번호 전송하는 기능---------------------------------------------------------------------------
    const sendRePassword = (e: any) => {
        e.preventDefault();
        setVerifiedNumberError(false);
        setRePasswordError(false);

        fetch("https://peetsunbae.com/signup/repassword", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                phoneNumber: phoneNumber,
                certNumber: certNumber,
                rePassword: rePassword
            })
        }).then((result) => {
            result.json()
                .then((body) => {
                    console.log(body);

                    if (body.message === "NOT_VALID_PASSWORD") {
                        setRePasswordError(true);
                    }
                    if (body.message === "NOT_COINCIDE_CERT") {
                        setVerifiedNumberError(true);
                    }
                    if (body.message === "CERT_IS_EXPIRED") {
                        setVerifiedNumberError(true);
                    }
                    if (body.message === "success") {
                        SetIsPasswordChanged(true);
                    }
                })
        }).catch((error) => {
            console.log(error);
        })
    }
    //-------------------------------------------------------------------------------------------

    //비밀번호 재설정 인증번호 요구하는 기능--------------------------------------------------------
    const sendCert = (e: any) => {
        e.preventDefault();
        setIsCertNumberSended(true);

        fetch("https://peetsunbae.com/signup/cert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                phoneNumber: phoneNumber
            })
        }).then((result) => {
            result.json()
                .then((body) => {
                    console.log(body);
                })
        }).catch((error) => {
            console.log(error);
        })
    }
    //-------------------------------------------------------------------------------------------

    return (
        <main className={styles.main}>
            <div className={`${styles.appbar} ${styles.onlyPc}`}>
                <div>
                    <LogoSvg className={styles.logo1} />
                </div>
                <Link to="/signup">
                    <div className={styles.login}>
                        <img className={styles.avatar} alt="avatar" src="img/avatarG.svg"></img>
                        <div className={styles.loginText}>회원가입</div>
                    </div>
                </Link>
            </div>

            <div ref={mobileAppbar} className={`${styles.appbar2} ${styles.onlyMobile}`}>
                <WhiteShapeLogoSvg className={styles.logo2} />
            </div>

            <div className={styles.body}>
                <div className={styles.loginTextBottom}>
                    단어테스트 로그인
                </div>

                <Box component="form" autoComplete="off">
                    <FormControl required fullWidth margin="normal">
                        <div className={styles.label}>이메일 주소</div>
                        <OutlinedInput sx={{"@media (max-width : 1024px)" : {fontSize : "2.5rem", height : "7rem"}}} required={true} error={emailError} onChange={(e) => { setEmail(e.currentTarget.value); }} placeholder="이메일 주소 입력" />
                        {emailError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB' }} error={true}>존재하지 않는 이메일 주소 입니다.</FormHelperText>}
                    </FormControl>

                    <FormControl required fullWidth margin="normal">
                        <div className={styles.label}>비밀번호</div>
                        <OutlinedInput sx={{"@media (max-width : 1024px)" : {fontSize : "2.5rem", height : "7rem"}}} required={true} error={passwordError} onChange={(e) => { setPassword(e.currentTarget.value); }} type="password" placeholder="8~20자 입력하세요" />
                        {passwordError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB' }} error={true}>잘못된 비밀번호 입니다.</FormHelperText>}
                    </FormControl>

                    
                    <button onClick={submit} className={styles.submit}>로그인</button>
                    

                    <div className={styles.lastText}>
                        <div className={styles.findPasswordText}>
                            <span onClick={modal}>
                                비밀번호가 생각나지 않으시나요?
                            </span>
                        </div>

                        수능선배가 처음이신가요? <Link to="/signup"><span className={styles.lastTextSpan}>회원가입</span></Link>
                    </div>
                </Box>
            </div>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.modal}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        "@media (max-width : 1024px)" : {width : "65%", borderRadius : "1.5rem"}
                    }}
                >
                    <Box component="form" autoComplete="off">
                        <div className={styles.modal_header}>
                            비밀번호 변경하기
                        </div>

                        <FormControl required fullWidth margin="normal">
                            <div className={styles.modal_label}>핸드폰 번호를 입력해주세요.</div>
                            <OutlinedInput id="phoneNumber" name="phoneNumber" sx={{ height: 40, fontSize: 14, "@media (max-width : 1024px)" : {fontSize : "2.2rem", height : "auto"} }} required={true} error={phoneNumberError} onChange={(e) => { setPhoneNumber(e.currentTarget.value) }} autoFocus={!isCertSended} placeholder="핸드폰 번호(-없이)" />
                        </FormControl>

                        {isCertSended &&

                            <div>
                                <FormControl required margin="normal">
                                    <div className={styles.modal_label}>수신한 인증번호를 입력해주세요.</div>
                                    <OutlinedInput id="certNumber" name="certNumber" sx={{ height: 40, fontSize: 14, "@media (max-width : 1024px)" : {fontSize : "2.2rem", height : "auto"} }} required={true} error={verifiedNumberError} onChange={(e) => { setCertNumber(e.currentTarget.value) }} autoFocus={isCertSended} placeholder="인증번호" />
                                    {verifiedNumberError && <FormHelperText sx={{ fontSize: "16px", marginLeft: 1, fontFamily: 'Apple_EB' }} error={true}>잘못된 인증번호 입니다.</FormHelperText>}
                                </FormControl>


                                <FormControl required fullWidth margin="normal">
                                    <div className={styles.modal_label}>변경할 비밀번호를 입력해주세요.</div>
                                    <OutlinedInput id="rePassword" name="rePassword" fullWidth type="password" sx={{ height: 40, fontSize: 14, "@media (max-width : 1024px)" : {fontSize : "2.2rem", height : "auto"} }} required={true} error={rePasswordError} onChange={(e) => { setRePassword(e.currentTarget.value) }} placeholder="변경할 비밀번호(8~20자리)" />
                                    {rePasswordError && <FormHelperText sx={{ fontSize: "16px", marginLeft: 1, fontFamily: 'Apple_EB' }} error={true}>8~20자 비밀번호를 입력해주세요.</FormHelperText>}
                                    {isPasswordChanged && <FormHelperText filled sx={{ fontSize: "16px", color: 'primary.main', marginLeft: 1, fontFamily: 'Apple_EB' }}>비밀번호가 변경되었습니다.</FormHelperText>}

                                </FormControl>

                            </div>
                        }

                        {!isCertSended &&
                            <div className={styles.modalBtnDiv}>
                                <button onClick={sendCert} className={styles.modalBtn}>확인</button>
                            </div>
                        }

                        {isCertSended &&
                            <div className={styles.modalBtnDiv}>
                                <button onClick={sendRePassword} className={styles.modalBtn}>변경</button>
                            </div>
                        }





                    </Box>
                </Box>
            </Modal>




        </main>
    )
}

export default Login2;