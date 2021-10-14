import { Button, Divider, fabClasses, FormControl, FormHelperText, OutlinedInput } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { withStyles } from '@mui/styles'
import styles from './styles';
import Box from '@mui/material/Box'
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';

const React = require("react");

const theme = createTheme({
    palette : {
        primary : {
            main : '#ff4400'
        }
    }
})

interface props {
    classes: any,
}

const SignUp: React.FC<props> = (props) => {
    const { classes } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verifiedNumber, setVerifiedNumber] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [verifyPasswordError, setVerifyPasswordError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [verifiedNumberError, setVerifiedNumberError] = useState(false);


    //가입하기 버튼 눌렀을 때 서버로 데이터 전송------------------------------------------//
    const submit = (e : any) => {
        e.preventDefault();

        setEmailError(false);
        setPasswordError(false);
        setVerifyPasswordError(false);
        setPhoneNumberError(false);
        setVerifiedNumberError(false);

        fetch("https://peetsunbae.com/signup/submit", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({
                email : email,
                password : password,
                verifyPassword : verifyPassword,
                name : name,
                phoneNumber : phoneNumber,
                verifiedNumber : verifiedNumber,
            })
        }).then((response : any)=>{
            response.json()
            .then((result : any)=>{
                console.log(result);
                //invalid email 일 경우 --------------------------------------------------------
                if(result.message === "NOT_VALID_EMAIL"){
                    setEmailError(true);
                }
                //------------------------------------------------------------------------------
            })
        }).catch((error : any)=>{
            console.log(error);
        })
    }
    //-----------------------------------------------------------------

    //인증번호 요청----------------------------------------------------------------------------

    const sendCert = (e : any) => {
        e.preventDefault();

        fetch("https://peetsunbae.com/signup/cert", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({
                phoneNumber : phoneNumber
            })
        }).then((result)=>{
            result.json()
            .then((body)=>{
                console.log(body);
            })
        }).catch((error)=>{
            console.log(error);
        })
    }

    //-----------------------------------------------------------------------------------------

    return (
        <main className={classes.main}>
            <div className={classes.appbar}>
                <div>
                    <img className={classes.logo1} alt="logo" src="img/logo1.svg"></img>
                </div>
                <Link to="/login">
                <div className={classes.login}>
                    <img className={classes.avatar} alt="avatar" src="img/avatar.svg"></img>
                    <div className={classes.loginText}>로그인</div>
                </div>
                </Link>
            </div>

            <div className={classes.body}>
                <div className={classes.signUpText}>
                    회원가입
                </div>
                <div>

                    <Box
                        component="form"
                        autoComplete="off"
                    >
                        <FormControl required fullWidth margin="normal">
                            <div className={classes.label}>이메일 주소</div>
                            <OutlinedInput error={emailError} onChange={(e)=>{setEmail(e.currentTarget.value);}} autoFocus placeholder="이메일 주소 입력" />
                            {emailError && <FormHelperText sx={{fontSize : "20px"}} error={true}>유효한 이메일 주소를 적어주세요.</FormHelperText>}
                        </FormControl>

                        <FormControl required fullWidth margin="normal">
                            <div className={classes.label}>비밀번호</div>
                            <OutlinedInput error={passwordError} onChange={(e)=>{setPassword(e.currentTarget.value);}} type="password" autoFocus placeholder="8~20자 입력하세요" />
                            {passwordError && <FormHelperText sx={{fontSize : "20px"}} error={true}>8자리 이상 적어주세요.</FormHelperText>} 
                        </FormControl>

                        <FormControl required fullWidth margin="normal">
                            <div className={classes.label}>비밀번호 확인</div>
                            <OutlinedInput error={verifyPasswordError} onChange={(e)=>{setVerifyPassword(e.currentTarget.value);}} type="password" autoFocus placeholder="비밀번화 확인 입력" />
                            {verifyPasswordError && <FormHelperText sx={{fontSize : "20px"}} error={true}>비밀번호와 같지 않아요.</FormHelperText>} 
                        </FormControl>

                        <FormControl required fullWidth margin="normal">
                            <div className={classes.label}>이름</div>
                            <OutlinedInput onChange={(e)=>{setName(e.currentTarget.value);}} autoFocus placeholder="이름 입력" />
                        </FormControl>
  
                        <FormControl required margin="normal">
                            <div className={classes.label}>핸드폰 번호</div>
                            <div className={classes.phone}>
                            <OutlinedInput error={phoneNumberError} onChange={(e)=>{setPhoneNumber(e.currentTarget.value);}} sx={{width : '278px'}} autoFocus placeholder="핸드폰 번호 입력(-없이)" />
                            <button onClick={sendCert} className={classes.phoneCert}>인증번호</button>
                            </div>
                            {phoneNumberError && <FormHelperText sx={{fontSize : "20px"}} error={true}>- 없이 적어주세요.</FormHelperText>} 

                        </FormControl>

                        <FormControl required fullWidth margin="normal">
                            <div className={classes.label}>인증번호</div>
                            <OutlinedInput error={verifiedNumberError} onChange={(e)=>{setVerifiedNumber(e.currentTarget.value);}} autoFocus placeholder="인증번호 입력" />                           
                            {verifiedNumberError && <FormHelperText sx={{fontSize : "20px"}} error={true}>인증번호가 맞지 않습니다.</FormHelperText>}
                        </FormControl>

                        <button onClick={submit} className={classes.submit}>가입하기</button>
                        <div className={classes.lastText}>
                            이미 가입하셨나요? <Link to="/login"><span>로그인</span></Link>
                        </div>
                        
                    </Box>

                </div>
            </div>
        </main>
    )
}

export default withStyles(styles)(SignUp);