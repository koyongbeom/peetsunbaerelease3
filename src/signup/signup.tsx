import { Button, Divider, fabClasses, FormControl, OutlinedInput } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { withStyles } from '@mui/styles'
import styles from './styles';
import Box from '@mui/material/Box'
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';

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

    const submit = () => {

    }

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
                            <OutlinedInput onChange={(e)=>{setEmail(e.currentTarget.value);}} autoFocus placeholder="이메일 주소 입력" />
                        </FormControl>

                        <FormControl required fullWidth margin="normal">
                            <div className={classes.label}>비밀번호</div>
                            <OutlinedInput onChange={(e)=>{setPassword(e.currentTarget.value);}} type="password" autoFocus placeholder="8~20자 입력하세요" />
                        </FormControl>

                        <FormControl required fullWidth margin="normal">
                            <div className={classes.label}>비밀번호 확인</div>
                            <OutlinedInput onChange={(e)=>{setVerifyPassword(e.currentTarget.value);}} type="password" autoFocus placeholder="비밀번화 확인 입력" />
                        </FormControl>

                        <FormControl required fullWidth margin="normal">
                            <div className={classes.label}>이름</div>
                            <OutlinedInput onChange={(e)=>{setName(e.currentTarget.value);}} autoFocus placeholder="이름 입력" />
                        </FormControl>
  
                        <FormControl required margin="normal">
                            <div className={classes.label}>핸드폰 번호</div>
                            <div className={classes.phone}>
                            <OutlinedInput onChange={(e)=>{setPhoneNumber(e.currentTarget.value);}} sx={{width : '278px'}} autoFocus placeholder="핸드폰 번호 입력" />
                            <button className={classes.phoneCert}>인증번호</button>
                            </div>
                        </FormControl>

                        <FormControl required fullWidth margin="normal">
                            <div className={classes.label}>인증번호</div>
                            <OutlinedInput onChange={(e)=>{setVerifiedNumber(e.currentTarget.value);}} autoFocus placeholder="인증번호 입력" />
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