import { Button, Divider, fabClasses, FormControl, FormControlLabel, FormHelperText, OutlinedInput, Radio, RadioGroup } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { withStyles } from '@mui/styles'
import styles from './styles';
import Box from '@mui/material/Box'
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { red } from '@mui/material/colors';

const React = require("react");

const theme = createTheme({
    palette: {
        primary: {
            main: '#ff4400'
        }
    }
})

interface props {
    classes: any,
    history : any,
}

const SignUp: React.FC<props> = (props) => {
    const { classes } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verifiedNumber, setVerifiedNumber] = useState("");
    const [value, setValue] = useState<any>("student");
    const [studentPhoneNumber, setStudentPhoneNumber] = useState("");
    const [forStaffPassword, setForStaffPassword] = useState("");

    const [isParent, setIsParent] = useState(false);
    const [isTeacher, setIsTeacher] = useState(false);
    
    const [emailError, setEmailError] = useState(false);
    const [duplicatedEmailError, setDuplicatedEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [verifyPasswordError, setVerifyPasswordError] = useState(false);
    const [nameError, setNameError ] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [verifiedNumberError, setVerifiedNumberError] = useState(false);
    const [expiredVerifyNumberError, setExpiredVerifyNumberError] = useState(false);
    const [studentPhoneNumberError, setStudentPhoneNumberError] = useState(false);
    const [forStaffPasswordError, setForStaffPasswordError] = useState(false);

    const [sendCertBool, setSendCertBool] = useState(false);


    //가입하기 버튼 눌렀을 때 서버로 데이터 전송------------------------------------------//
    const submit = (e: any) => {
        e.preventDefault();

        setEmailError(false);
        setPasswordError(false);
        setVerifyPasswordError(false);
        setNameError(false);
        setPhoneNumberError(false);
        setVerifiedNumberError(false);
        setDuplicatedEmailError(false);
        setExpiredVerifyNumberError(false);
        setStudentPhoneNumberError(false);
        setForStaffPasswordError(false);


        fetch("https://peetsunbae.com/signup/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password,
                verifyPassword: verifyPassword,
                name: name,
                phoneNumber: phoneNumber,
                verifiedNumber: verifiedNumber,
                value : value,
                studentPhoneNumber : studentPhoneNumber,
                forStaffPassword : forStaffPassword,
            })
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    //invalid email 일 경우 --------------------------------------------------------
                    if (result.message === "NOT_VALID_EMAIL") {
                        setEmailError(true);
                    }
                    //------------------------------------------------------------------------------
                    //중복된 email 적었을 경우-------------------------------------------------------
                    if (result.message === "DUP_EMAIL_ADDRESS") {
                        setDuplicatedEmailError(true);
                    }
                    //-----------------------------------------------------------------------------
                    //8자리 미만 비밀번호 적었을 경우-------------------------------------------------
                    if (result.message === "NOT_VALID_PASSWORD") {
                        setPasswordError(true);
                    }
                    //-------------------------------------------------------------------------------
                    //비밀번호 확인이랑 비밀번호 같지 않을 경우-----------------------------------------
                    if (result.message === "NOT_COINCIDE_PASSWORD") {
                        setVerifyPasswordError(true);
                    }
                    //-------------------------------------------------------------------------------
                    //이름 안적었을 때 처리-------------------------------------------------------------
                    if (result.message === "NOT_VALID_NAME"){
                        setNameError(true);
                    }
                    //---------------------------------------------------------------------------------
                    //폰번호에 - 포함되어있을 때 처리--------------------------------------------------
                    if (result.message === "NOT_VALID_PHONENUMBER") {
                        setPhoneNumberError(true);
                    }
                    //-------------------------------------------------------------------------------
                    //전송한 인증번호랑 같지 않을 때 처리-----------------------------------------------
                    if (result.message === "NOT_COINCIDE_CERT" || result.message === "GET_CERT_NUMBER") {
                        setVerifiedNumberError(true);
                    }
                    //--------------------------------------------------------------------------------
                    //인증번호 유효시간 지났을 때 처리--------------------------------------------------
                    if (result.message === "CERT_IS_EXPIRED") {
                        setExpiredVerifyNumberError(true);
                    }
                    //---------------------------------------------------------------------------------
                    //학부모일 경우 학생 핸드폰 번호 있는지 확인------------------------------------------
                    if (result.message === "NO_STUDENT_PHONENUMBER"){
                        setStudentPhoneNumberError(true);
                    }
                    //--------------------------------------------------------------------------------
                    //담임선생님일 경우 비밀번호 맞는지 확인---------------------------------------------
                    if(result.message === "NOT_CORRECT_PASSWORD"){
                        setForStaffPasswordError(true);
                    }
                    //------------------------------------------------------------------------------
                    //회원가입 성공했을 경우 로그인 페이지로 이동---------------------------------------
                    if(result.message === "success"){
                        props.history.push("/login")
                    }
                    //--------------------------------------------------------------------------------
                })
        }).catch((error: any) => {
            console.log(error);
        })
    }
    //-----------------------------------------------------------------

    //인증번호 요청----------------------------------------------------------------------------

    const sendCert = (e: any) => {
        e.preventDefault();
        setSendCertBool(true);

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

    //-----------------------------------------------------------------------------------------

    //라디오버튼 눌렀을 때 처리-------------------------------------------------------------------
    const handleChange = (event: any) => {
        setIsParent(false);
        setIsTeacher(false);

        setValue(event.target.value);
        if (event.target.value === "parent") {
            setIsParent(true);
        }
        if (event.target.value === "teacher") {
            setIsTeacher(true);
        }
    };
    //------------------------------------------------------------------------------------------

    return (
        <main className={classes.main}>
            <div className={classes.appbar}>
                <div>
                    <img className={classes.logo1} alt="logo" src="img/logo1.svg"></img>
                </div>
                <Link to="/">
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
                            <OutlinedInput required={true} error={emailError} onChange={(e) => { setEmail(e.currentTarget.value); }} autoFocus placeholder="이메일 주소 입력" />
                            {emailError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB'  }} error={true}>올바른 이메일 주소를 적어주세요.</FormHelperText>}
                            {duplicatedEmailError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB'  }} error={true}>중복된 이메일 주소입니다.</FormHelperText>}
                        </FormControl>

                        <FormControl required fullWidth margin="normal">
                            <div className={classes.label}>비밀번호</div>
                            <OutlinedInput required={true} error={passwordError} onChange={(e) => { setPassword(e.currentTarget.value); }} type="password" autoFocus placeholder="8~20자 입력하세요" />
                            {passwordError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB'  }} error={true}>8자리 이상 적어주세요.</FormHelperText>}
                        </FormControl>

                        <FormControl required fullWidth margin="normal">
                            <div className={classes.label}>비밀번호 확인</div>
                            <OutlinedInput required={true} error={verifyPasswordError} onChange={(e) => { setVerifyPassword(e.currentTarget.value); }} type="password" autoFocus placeholder="비밀번화 확인 입력" />
                            {verifyPasswordError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB'  }} error={true}>비밀번호와 같지 않아요.</FormHelperText>}
                        </FormControl>

                        <FormControl required fullWidth margin="normal">
                            <div className={classes.label}>이름</div>
                            <OutlinedInput required={true} onChange={(e) => { setName(e.currentTarget.value); }} autoFocus placeholder="이름 입력" />
                            {nameError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB'  }} error={true}>이름을 적어주세요.</FormHelperText>}
                        </FormControl>

                        <FormControl required margin="normal">
                            <div className={classes.label}>핸드폰 번호</div>
                            <div className={classes.phone}>
                                <OutlinedInput required={true} error={phoneNumberError} onChange={(e) => { setPhoneNumber(e.currentTarget.value); }} sx={{ width: '278px' }} autoFocus placeholder="핸드폰 번호 입력(-없이)" />
                                <button onClick={sendCert} className={classes.phoneCert}>인증번호</button>
                            </div>
                            {phoneNumberError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB'  }} error={true}>- 없이 적어주세요.</FormHelperText>}
                            {verifiedNumberError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB'  }} error={true}>인증번호가 맞지 않습니다.</FormHelperText>}

                        </FormControl>

                        {sendCertBool && <FormControl required fullWidth margin="normal">
                            <div className={classes.label}>인증번호</div>
                            <OutlinedInput required={true} error={verifiedNumberError} onChange={(e) => { setVerifiedNumber(e.currentTarget.value); }} autoFocus placeholder="인증번호 입력" />
                            {expiredVerifyNumberError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB'  }} error={true}>인증번호 유효시간 만료되었습니다.</FormHelperText>}
                        </FormControl>}

                        <FormControl margin="normal" fullWidth>
                            <RadioGroup value={value} onChange={handleChange} row aria-label="job" name="row-radio-buttons-group" sx={{ width: "80%", display: "flex", justifyContent: "space-between" }}>
                                <FormControlLabel value="student" control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 29 }, '&.Mui-checked': { color: "#3d50b0" }, }} />} label={<span className={classes.radioLabel}>{"학생"}</span>} />
                                <FormControlLabel value="parent" control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 29 }, '&.Mui-checked': { color: "#3d50b0" }, }} />} label={<span className={classes.radioLabel}>{"학부모"}</span>} />
                                <FormControlLabel value="teacher" control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 29 }, '&.Mui-checked': { color: "#3d50b0" }, }} />} label={<span className={classes.radioLabel}>{"담임선생님"}</span>} />
                            </RadioGroup>
                        </FormControl>

                        {isParent && <FormControl required fullWidth margin="normal">
                            <div className={classes.label}>학생 핸드폰 번호</div>
                            <OutlinedInput required={true} error={studentPhoneNumberError} onChange={(e) => { setStudentPhoneNumber(e.currentTarget.value); }} placeholder="학생 핸드폰 번호 입력(-없이)" />
                            {studentPhoneNumberError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB'  }} error={true}>등록되지 않은 학생 번호입니다.</FormHelperText>}
                        </FormControl>}

                        {isTeacher && <FormControl required fullWidth margin="normal">
                            <div className={classes.label}>직원 가입 비밀번호</div>
                            <OutlinedInput type="password" required={true} error={forStaffPasswordError} onChange={(e) => { setForStaffPassword(e.currentTarget.value); }} placeholder="직원용 비밀번호 입력" />
                            {forStaffPasswordError && <FormHelperText sx={{ fontSize: "20px", marginLeft: 1, fontFamily: 'Apple_EB'  }} error={true}>잘못된 비밀번호 입니다.</FormHelperText>}
                        </FormControl>}



                        <button onClick={submit} className={classes.submit}>가입하기</button>
                        <div className={classes.lastText}>
                            이미 가입하셨나요? <Link to="/"><span>로그인</span></Link>
                        </div>

                    </Box>

                </div>
            </div>
        </main>
    )
}

export default withStyles(styles)(SignUp);