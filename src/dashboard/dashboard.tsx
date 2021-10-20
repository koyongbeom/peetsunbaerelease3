import React, { useEffect, useState } from 'react';
import styles from './styles';
import { withStyles } from '@mui/styles';
import Main from './components/main'

interface props {
    classes: any;
    history : any;
}

interface user {
    name : string,
    value : string
}  

const Dashboard: React.FC<props> = (props) => {
    const classes = props.classes;

    const [user, setUser] = useState<user | null>();


    //처음 dashboard 진입 시 토큰 가지고 있는지랑 가지고 있다면 토큰 정보 받기-------
    useEffect(() => {

        async function start() {
            var token = "";
            //-----// 만약 electron 이라면 저장되어 있는 토큰 가져오는 기능----------
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }
            //------------------------------------------------------------------

            fetch("https://peetsunbae.com/dashboard/main/start", {
                method: "GET",
                credentials: "include",
                headers : {'Authorization' : token}
            }).then((response)=>{
                response.json()
                .then((result)=>{
                    console.log(result);
                    if(result.message === "LOGIN"){
                        setUser({
                            name : result.name,
                            value : result.value
                        })
                    }
                    if(result.message === "NOT_LOGIN"){
                        props.history.push("/");
                    }
                })
            }).catch(error => {
                console.log(error);
            })
        }

        start();
    }, []);
    //-----------------------------------------------------------------------

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
