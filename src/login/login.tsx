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



const Login: React.FC<props> = (props) => {

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


    //????????? ??? ?????? ??????????????? ?????? ????????? ???????????? ????????? ???????????? ???????????? ?????? ??????????????? ????????? ??????-----------
    useEffect(() => {

        var bool = true;

        if(location.state){
            if(location.state.from === "dashboard"){
                bool = false;
            }
        }

        async function send(){
            //???????????? ????????? ?????? ???????????? ??????------------------------------------------------------
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


    //????????? ?????? ??????----------------------------------------------------------------------------------
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

                    //????????? ?????? ???--------------------------------------------------------------------------
                    if (result.message === "success") {
                        if (window.electron) {
                            console.log("electron");
                            const returnValue = window.electron.sendMessageApi.setToken(result.token);
                            // const returnValue2 = ipcRenderer.sendSync("setToken", result.token);
                            console.log(returnValue);
                            // console.log(returnValue2);
                        }
                        props.history.push("/dashboard");
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

    //?????? ??? ?????? ???????????? ??????--------------------------------------------------------------------------
    const modal = () => {
        console.log("modal");
        setOpen(true);
    }
    //----------------------------------------------------------------------------------------------------

    //modal ??? ?????? ??? ???????????? ??????------------------------------------------------------------------------
    const handleClose = () => {
        setOpen(false);
        setIsCertNumberSended(false);
        setVerifiedNumberError(false);
        setRePasswordError(false);
        SetIsPasswordChanged(false);
    }
    //----------------------------------------------------------------------------------------------------


    //????????? ???????????? ???????????? ??????---------------------------------------------------------------------------
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

    //???????????? ????????? ???????????? ???????????? ??????--------------------------------------------------------
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
                        <div className={styles.loginText}>????????????</div>
                    </div>
                </Link>
            </div>

            <div ref={mobileAppbar} className={`${styles.appbar2} ${styles.onlyMobile}`}>
                <WhiteShapeLogoSvg className={styles.logo2} />
            </div>

            <div className={styles.body}>
                <div className={styles.loginTextBottom}>
                    ?????????
                </div>

                <Box component="form" autoComplete="off">
                    <FormControl required fullWidth margin="normal">
                        <div className={styles.label}>????????? ??????</div>
                        <OutlinedInput sx={{"@media (max-width : 1024px)" : {fontSize : "2.5rem", height : "7rem"}}} required={true} error={emailError} onChange={(e) => { setEmail(e.currentTarget.value); }} placeholder="????????? ?????? ??????" />
                        {emailError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB' }} error={true}>???????????? ?????? ????????? ?????? ?????????.</FormHelperText>}
                    </FormControl>

                    <FormControl required fullWidth margin="normal">
                        <div className={styles.label}>????????????</div>
                        <OutlinedInput sx={{"@media (max-width : 1024px)" : {fontSize : "2.5rem", height : "7rem"}}} required={true} error={passwordError} onChange={(e) => { setPassword(e.currentTarget.value); }} type="password" placeholder="8~20??? ???????????????" />
                        {passwordError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB' }} error={true}>????????? ???????????? ?????????.</FormHelperText>}
                    </FormControl>

                    
                    <button onClick={submit} className={styles.submit}>?????????</button>
                    

                    <div className={styles.lastText}>
                        <div className={styles.findPasswordText}>
                            <span onClick={modal}>
                                ??????????????? ???????????? ????????????????
                            </span>
                        </div>

                        ??????????????? ??????????????????? <Link to="/signup"><span className={styles.lastTextSpan}>????????????</span></Link>
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
                            ???????????? ????????????
                        </div>

                        <FormControl required fullWidth margin="normal">
                            <div className={styles.modal_label}>????????? ????????? ??????????????????.</div>
                            <OutlinedInput id="phoneNumber" name="phoneNumber" sx={{ height: 40, fontSize: 14, "@media (max-width : 1024px)" : {fontSize : "2.2rem", height : "auto"} }} required={true} error={phoneNumberError} onChange={(e) => { setPhoneNumber(e.currentTarget.value) }} autoFocus={!isCertSended} placeholder="????????? ??????(-??????)" />
                        </FormControl>

                        {isCertSended &&

                            <div>
                                <FormControl required margin="normal">
                                    <div className={styles.modal_label}>????????? ??????????????? ??????????????????.</div>
                                    <OutlinedInput id="certNumber" name="certNumber" sx={{ height: 40, fontSize: 14, "@media (max-width : 1024px)" : {fontSize : "2.2rem", height : "auto"} }} required={true} error={verifiedNumberError} onChange={(e) => { setCertNumber(e.currentTarget.value) }} autoFocus={isCertSended} placeholder="????????????" />
                                    {verifiedNumberError && <FormHelperText sx={{ fontSize: "16px", marginLeft: 1, fontFamily: 'Apple_EB' }} error={true}>????????? ???????????? ?????????.</FormHelperText>}
                                </FormControl>


                                <FormControl required fullWidth margin="normal">
                                    <div className={styles.modal_label}>????????? ??????????????? ??????????????????.</div>
                                    <OutlinedInput id="rePassword" name="rePassword" fullWidth type="password" sx={{ height: 40, fontSize: 14, "@media (max-width : 1024px)" : {fontSize : "2.2rem", height : "auto"} }} required={true} error={rePasswordError} onChange={(e) => { setRePassword(e.currentTarget.value) }} placeholder="????????? ????????????(8~20??????)" />
                                    {rePasswordError && <FormHelperText sx={{ fontSize: "16px", marginLeft: 1, fontFamily: 'Apple_EB' }} error={true}>8~20??? ??????????????? ??????????????????.</FormHelperText>}
                                    {isPasswordChanged && <FormHelperText filled sx={{ fontSize: "16px", color: 'primary.main', marginLeft: 1, fontFamily: 'Apple_EB' }}>??????????????? ?????????????????????.</FormHelperText>}

                                </FormControl>

                            </div>
                        }

                        {!isCertSended &&
                            <div className={styles.modalBtnDiv}>
                                <button onClick={sendCert} className={styles.modalBtn}>??????</button>
                            </div>
                        }

                        {isCertSended &&
                            <div className={styles.modalBtnDiv}>
                                <button onClick={sendRePassword} className={styles.modalBtn}>??????</button>
                            </div>
                        }





                    </Box>
                </Box>
            </Modal>




        </main>
    )
}

export default Login;