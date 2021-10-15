import React from 'react';
import { withStyles } from '@mui/styles';
import styles from './styles';
import {Link} from 'react-router-dom';

interface props {
    classes : any,
}

const Login : React.FC<props> = (props) => {

    const classes = props.classes;

    return (
        <main>
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
        </main>
    )
}

export default withStyles(styles)(Login);