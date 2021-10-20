import React from 'react';
import styles from './styles';
import { withStyles } from '@mui/styles';
import Main from './components/main'

interface props {
    classes: any;
}

const Dashboard: React.FC<props> = (props) => {
    const classes = props.classes;

    return (
        <main className={classes.main}>
            <div className={classes.appBar}>
                <div className={classes.logoDiv}>
                    <img src="img/whitelogo.webp" alt="logo"></img>
                </div>
                <div className={classes.profileDiv}>
                    <div className={classes.profileConfig}>
                        프로필설정
                    </div>
                    <div className={classes.avatarCircle}>
                        <img className={classes.avatar} src="img/avatarG.svg" alt="avatar"></img>
                    </div>
                    <div className={classes.logout}>
                        로그아웃
                    </div>
                </div>
            </div>

            <div className={classes.body}>
                <div className={classes.sideMenu}>
                    <div className={classes.sideMenuProfile}>
                        <div className={classes.where}></div>
                        <div className={classes.sideMenuAvatar}></div>
                        <div className={classes.sideMenuName}></div>
                    </div>
                    <div className={classes.sideMenuList}>
                        
                    </div>
                </div>

                <Main></Main>
            </div>

        </main>
    )
}

export default withStyles(styles)(Dashboard);
