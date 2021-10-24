import React, { useEffect, useRef, useState } from 'react';

import styles from './styles';
import { withStyles } from '@mui/styles';

import Home from './components/home';
import Alarm from './components/alarm';
import Attendance from './components/attendance';
import Avatar from './components/avatar';
import Book from './components/book';
import Chart from './components/chart';
import Edit from './components/edit';
import Envelope from './components/envelope';
import Notification from './components/notification';
import Question from './components/question';
import Report from './components/report';
import Restaurant from './components/restaurant';
import Search from './components/search';
import NotificationWrite from './components/notificationwrite';


import menulist from './components/menulist'
import { forEachChild } from 'typescript';

import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";
import {io} from "socket.io-client";


interface props {
    classes: any;
    history: any;
}

interface user {
    name: string,
    value: string
}



const Dashboard: React.FC<props> = (props) => {
    const classes = props.classes;

    const [user, setUser] = useState<user | null>();
    const [sideBarMenuList, setSideBarMenuList] = useState<any>();

    const socket = useRef<any>();   //소켓 연결

    const [newNotification, setNewNotification] = useState(1);


    //처음 dashboard 진입 시 토큰 가지고 있는지랑 가지고 있다면 토큰 정보 받기-------
    useEffect(() => {

        async function start() {
            var token = "";
            //-----// 만약 electron 이라면 저장되어 있는 토큰 가져오는 기능----------
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }
            //------------------------------------------------------------------

            fetch("https://peetsunbae.com/dashboard/home/start", {
                method: "GET",
                credentials: "include",
                headers: { 'Authorization': token }
            }).then((response) => {
                response.json()
                    .then((result) => {
                        console.log(result);
                        if (result.message === "LOGIN") {
                            setUser({
                                name: result.name,
                                value: result.value
                            })
                        }
                        if (result.message === "NOT_LOGIN") {
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

    //로그아웃 시키는 기능-----------------------------------------------------
    const logOut = async () => {
        //일렉트론 이라면 저장된 토큰 삭제-----------------------------------------------------
        if(window.electron){
            const result = await window.electron.sendMessageApi.setToken("logOut");
            console.log(result);
        }
        //-----------------------------------------------------------------------

        //쿠키 삭제 위해 서버로 fetch 보냄-----------------------------------------
        fetch("https://peetsunbae.com/login/logout", {
            method : "GET",
            credentials : "include"
        }).then((response)=>{
            response.json()
            .then((result)=>{
                console.log(result);
                props.history.push("/");
            })
        }).catch((err)=>{
            console.log(err);
        })
        //--------------------------------------------------------------------------
       
        //-------------------------------------------------------------------
    }
    //-----------------------------------------------------------------------

    //socket이 실시간 업데이트 시행하는 곳----------------------------------------------------------
    useEffect(()=>{
        socket.current = io("https://peetsunbae.com");

        socket.current.on("newNotification", ()=>{
            const randomNumber = Math.floor(Math.random()*(99999 - 10000) + 10000);
            setNewNotification(randomNumber);
        })
    }, [])
    //--------------------------------------------------------------------------------------------



    return (
        <Router>
            <main className={classes.main}>
                <div className={classes.appBar}>
                    <div className={classes.logoDiv}>
                        <img src="img/whitelogo.webp" alt="logo"></img>
                    </div>
                    <div className={classes.profileDiv}>
                        <div className={classes.profileConfig}>
                            프로필설정
                        </div>
                        <div className={classes.avatarCircle} onClick={logOut}>
                            <img className={classes.avatar} src="img/avatarG.svg" alt="avatar"></img>
                        </div>
                        <div className={classes.logout} onClick={logOut}>
                            로그아웃
                        </div>
                    </div>
                </div>

                <div className={classes.body}>
                    <div className={classes.sideMenu}>
                        <div className={classes.sideMenuProfile}>
                            <div className={classes.where}>
                                <img className={classes.outside} src="img/outside.svg" alt="outside"></img>
                                <div className={classes.outsideText}>외출중</div>
                            </div>
                            <div className={classes.sideMenuAvatar}>
                                <img className={classes.logo2} src="img/logo2.webp" alt="logo"></img>
                            </div>
                            <div className={classes.sideMenuName}>
                                피트선배<span> </span>
                                {user && user.name}
                            </div>
                        </div>
                        <div className={classes.sideMenuListDiv}>
                            <ul className={classes.sideMenuList}>
                                {user &&
                                    menulist.map((each) => {
                                        if (each.value.includes(user.value)) {
                                            return (
                                                <Link key={each.name} to={"/dashboard/" + each.name}>
                                                    <li className={classes.sideMenuListSection}>
                                                        <img src={"img/off/" + each.name + ".svg"} alt={each.name} className={classes.sideMenuListImg}></img>
                                                        <div className={classes.sideMenuListText}>{each.description}</div>
                                                    </li>
                                                </Link>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <Switch>
                        

                        <Route exact path="/dashboard/" render={(props)=><Home socket={socket.current} newNotification={newNotification} {...props} /> } />
                        <Route path="/dashboard/home" render={(props)=><Home socket={socket.current} newNotification={newNotification} {...props} /> } />
                        <Route path="/dashboard/alarm" component={Alarm} />
                        <Route path="/dashboard/attendance" component={Attendance} />
                        <Route path="/dashboard/avatar" component={Avatar} />
                        <Route path="/dashboard/book" component={Book} />
                        <Route path="/dashboard/chart" component={Chart} />
                        <Route path="/dashboard/edit" component={Edit} />
                        <Route path="/dashboard/envelope" component={Envelope} />
                        <Route exact path="/dashboard/notification" component={Notification} />
                        <Route path="/dashboard/question" component={Question} />
                        <Route path="/dashboard/report" component={Report} />
                        <Route path="/dashboard/restaurant" component={Restaurant} />
                        <Route path="/dashboard/search" component={Search} />
                        <Route path="/dashboard/notification/write" render={(props)=> <NotificationWrite socket={socket.current} {...props}/>} />
                    </Switch>
                </div>

            </main>
        </Router>
    )
}

export default withStyles(styles)(Dashboard);
