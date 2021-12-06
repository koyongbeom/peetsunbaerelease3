import React, { useEffect, useState } from 'react';
// import { withStyles } from '@mui/styles';
// import styles from './styles';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import Box from '@mui/material/Box'
import { FormControl, FormHelperText, Modal, OutlinedInput } from '@mui/material';
import styles from './complete.module.css';

interface props {
    history: any;
}

declare global {
    interface Window {
        electron?: {
            sendMessageApi: {
                setToken(token: string): string;
                getToken(): string;
                notification(title: string, body: string): void;
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



const Complete: React.FC<props> = (props) => {

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





    return (
        <main className={styles.main}>
            <div className={styles.appbar}>
                <div>
                    <img className={styles.logo1} alt="logo" src="img/logo1.svg"></img>
                </div>
                <Link to="/">
                    <div className={styles.login}>
                        <img className={styles.avatar} alt="avatar" src="img/avatarG.svg"></img>
                        <div className={styles.loginText}>로그인</div>
                    </div>
                </Link>
            </div>

            <div className={styles.body}>
                <div className={styles.bodyDiv}>
                    <div className={styles.bodyTitle}>
                    ㆍ회원가입이 완료되었습니다.
                    </div>

                    <div className={styles.bodyDescription}>
                        <div className={styles.checkImage}>
                            <img src="img/check_black_24dp (2).svg" alt="check" />
                        </div>
                        <div className={styles.bodyDescriptionText}>
                            피트선배 회원가입이 완료되었습니다.
                        </div>
                        <div className={styles.bodyDescriptionText2}>
                            회원님은 피트선배의 모든 기능을 사용하 실 수 있습니다. 로그인 후 이용가능합니다.
                        </div>
                    </div>

                    <div className={styles.submitDiv}>
                        <button onClick={()=>{props.history.push("/");}} className={styles.submit}>로그인</button>
                    </div>
                </div>
            </div>




        </main>
    )
}

export default Complete;