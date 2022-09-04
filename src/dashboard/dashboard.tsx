import React, { useEffect, useRef, useState } from 'react';

// import styles from './styles';
// import { withStyles } from '@mui/styles';

import styles from "./dashboard.module.css"
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
import { ReactComponent as LogoSvg } from '../svg/newlogowhite.svg';
import { ReactComponent as ShapeLogoSvg } from '../svg/onlyshape.svg';

import menulist from './components/menulist'
import { forEachChild } from 'typescript';

import { Route, HashRouter as Router, Link, Switch } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import QuestionWrite from './components/questionwrite';
import Profile from './components/profile';
import NotificationDetail from './components/controls/notificationdetail';
import TemporaryDrawer from './components/drawer';
import Text from './components/test';
// import { ipcRenderer } from 'electron';





interface props {
    // classes: any;
    history: any;
    location: any;
    socket : Socket;
}

interface user {
    name: string;
    value: "student" | "teacher" | "parent" | "staff";
    id: number;
}

type currentSideBarMenuList = "avatar" | "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고" | "text";



const Dashboard: React.FC<props> = (props) => {
    // const classes = props.classes;
    const socket = props.socket;
    const [count, setCount] = useState(0);
    const [user, setUser] = useState<user | null>();
    const [location, setLocation] = useState<string>("");
    const [sideBarMenuList, setSideBarMenuList] = useState<any>();
    const [currentSideBarMenuList, setCurrentSideBarMenuList] = useState<currentSideBarMenuList>("home");

    const [newNotification, setNewNotification] = useState(1);
    const [newLocation, setNewLocation] = useState(1);

    useEffect(() => {
        console.log(props.location.pathname);
    })

    //답장 안한 message 갯수 물어보는 기능
    const unreadMessage = async () => {
        var token = "";
            //-----// 만약 electron 이라면 저장되어 있는 토큰 가져오는 기능----------
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }
            //------------------------------------------------------------------

            fetch("https://peetsunbae.com/dashboard/envelope/number", {
                method: "GET",
                credentials: "include",
                headers: { 'Authorization': token }
            }).then((response) => {
                response.json()
                    .then((result) => {
                        console.log("------------");
                        console.log(result);
                        setCount(result.data);
                    })
            }).catch(error => {
                console.log(error);
            })
    }


    //처음 dashboard 진입 시 토큰 가지고 있는지랑 가지고 있다면 토큰 정보 받기-------
    useEffect(() => {

        unreadMessage();

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
                                value: result.value,
                                id: result.id
                            });
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
        if (window.electron) {
            const result = await window.electron.sendMessageApi.setToken("logOut");
            console.log(result);
        }

        // ipcRenderer.send("signOut");

        //-----------------------------------------------------------------------

        //쿠키 삭제 위해 서버로 fetch 보냄-----------------------------------------
        fetch("https://peetsunbae.com/login/logout", {
            method: "GET",
            credentials: "include"
        }).then((response) => {
            response.json()
                .then((result) => {
                    console.log(result);
                    props.history.push({
                        pathname : "/",
                        state : {from : "dashboard"}
                    });
                })
        }).catch((err) => {
            console.log(err);
        })
        //--------------------------------------------------------------------------

        //-------------------------------------------------------------------
    }
    //-----------------------------------------------------------------------

    //dashboard 처음 진입 시 외출 중인지 내원 중인지 가져오는 기능-------------------------------
    useEffect(() => {


        async function start() {
            var token = "";
            //-----// 만약 electron 이라면 저장되어 있는 토큰 가져오는 기능----------
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }
            //------------------------------------------------------------------

            fetch("https://peetsunbae.com/dashboard/where", {
                method: "GET",
                credentials: "include",
                headers: { 'Authorization': token }
            }).then((response) => {
                response.json()
                    .then((result) => {
                        console.log(result);
                        if (result.message === "inside") {
                            setLocation("out");
                        }
                        if (result.message === "outside") {
                            setLocation("in");
                        }
                    })
            }).catch(error => {
                console.log(error);
            })
        }

        start();
    }, []);
    //-----------------------------------------------------------------------------------------


    //소켓이 자기 방 알려주는 곳-----------------------------------------------------------------
    useEffect(() => {
        if (user) {
            socket.emit("myRoom", user.id);
            console.log("myRoom");
            if(user.value === "teacher" || user.value === "staff"){
                console.log("teacherRoom");
                socket.emit("teacherRoom");
            }

        }

    }, [user]);
    //---------------------------------------------------------------------------------------------

    //socket이 실시간 업데이트 시행하는 곳----------------------------------------------------------
    useEffect(() => {



        //-----//새로운 공지사항 왔을때 공지사항 업데이트 하는 기능---------------------------
        socket.on("newNotification", () => {
            const randomNumber = Math.floor(Math.random() * (99999 - 10000) + 10000);
            setNewNotification(randomNumber);
        })
        //-----//--------------------------------------------------------------------------

        //-----//유저 위치 변경 됬을 때 업데이트 하는 기능-------------------------------

        socket.on("newLocation", (direction: string) => {
            console.log('users new direction is ' + direction);
            if (direction === "inside") {
                setLocation("out");
            }
            if (direction === "outside") {
                setLocation("in");
            }
        });
        //-----//---------------------------------------------------------------------

        //-----------------------------------------------------------------------------

        //새로운 답변 달렸을 때 알림 받는 기능--------------------------------------------
        socket.on("newAnswer", (answerUserName)=>{
            console.log(answerUserName);
            console.log("newAnswerBySocket");
            new window.Notification("답변이 달렸습니다.", {body : `${answerUserName}님이 답변을 다셨습니다.`});
        })
        
        //--------------------------------------------------------------------------------

        //새로운 메세지 받았을 때
        socket.on("newMessage", (messageUserName)=>{
            console.log("----------");
            console.log("newMessage");
            unreadMessage();
            new window.Notification("새로운 메세지가 왔습니다.", {body : `${messageUserName}님이 메세지를 보냈습니다.`});
        })

        return function cleanup() {socket.off("newAnswer");}

    }, []);
    //--------------------------------------------------------------------------------------------


    //활성화된 메뉴에 따라 메뉴 하이라이트 되는 기능-------------------------------------------------
    const activateMenuList = (current: currentSideBarMenuList) => {
        setCurrentSideBarMenuList(current);
    }
    //----------------------------------------------------------------------------------------



    return (
        <Router>
            <main className={styles.main}>
                <div className={`${styles.appBar} ${styles.notablet}`}>
                    <div className={styles.logoDiv}>
                        <LogoSvg className={styles.logoSvg} />
                    </div>
                    <div className={styles.profileDiv}>
                        <Link to="/dashboard/profile">
                            <div className={styles.profileConfig}>
                                프로필설정
                            </div>
                        </Link>
                        <div className={styles.avatarCircle} onClick={logOut}>
                            <img className={styles.avatar} src="img/avatarG.svg" alt="avatar"></img>
                        </div>
                        <div className={styles.logout} onClick={logOut}>
                            로그아웃
                        </div>
                    </div>
                </div>

                <div className={styles.body}>
                    <div className={`${styles.sideMenu} ${styles.notablet}`}>
                        <div className={styles.sideMenuProfile}>
                            <div className={styles.where}>
                                {
                                    location === "in" &&
                                    <>
                                        <img className={styles.inside} src="img/inside.svg" alt="outside"></img>
                                        <div className={styles.outsideText}>등원중</div>
                                    </>
                                }
                                {
                                    location === "out" &&
                                    <>
                                        <img className={styles.outside} src="img/outside.svg" alt="outside"></img>
                                        <div className={styles.outsideText}>외출중</div>
                                    </>
                                }

                            </div>
                            <div className={styles.sideMenuAvatar}>
                                <ShapeLogoSvg className={styles.logo2} />
                            </div>
                            <div className={styles.sideMenuName}>
                                수능선배<span> </span>
                                {user && user.name}
                            </div>
                        </div>
                        <div className={styles.sideMenuListDiv}>
                            <ul className={styles.sideMenuList}>
                                {user &&
                                    menulist.map((each) => {
                                        if (each.value.includes(user.value)) {
                                            if (each.name !== currentSideBarMenuList) {
                                                return (
                                                    <Link key={each.name} to={"/dashboard/" + each.name}>
                                                        <li className={styles.sideMenuListSection}>
                                                            <div className={styles.menuimgcontainer}>
                                                                <img src={"img/off/" + each.name + ".svg"} alt={each.name} className={styles.sideMenuListImg}></img>
                                                            </div>
                                                            <div className={styles.sideMenuListText}>
                                                                {each.description}
                                                            </div>
                                                            <div className={`${styles.sideMenuListText} ${styles.mobile}`}>

                                                                {
                                                                    each.description === "지각/결석 사유 제출" ? "사유 제출" : ""
                                                                }
                                                                {
                                                                    each.description === "나에게 온 메시지" ? "메시지" : ""
                                                                }
                                                                {
                                                                    each.description === "상담일지 적기" ? "일지 적기" : ""
                                                                }
                                                                {
                                                                    (each.description != "지각/결석 사유 제출" && each.description != "나에게 온 메시지" && each.description != "상담일지 적기") ? each.description : ""
                                                                }
                                                            </div>
                                                            {
                                                                    (each.name === "envelope" && count > 0) ?
                                                                    <div className={styles.noticeNumber}>{count} +</div> : ""
                                                            }
                                                        </li>
                                                    </Link>
                                                )
                                            }else{
                                                return(
                                                    <Link key={each.name} to={"/dashboard/" + each.name}>
                                                        <li className={styles.sideMenuListSection}>
                                                            <div className={styles.menuimgcontainer}>
                                                                <img src={"img/on/" + each.name + ".svg"} alt={each.name} className={styles.sideMenuListImg}></img>
                                                            </div>
                                                            <div className={styles.sideMenuListTextActive}>
                                                                {each.description}
                                                            </div>
                                                            <div className={`${styles.sideMenuListTextActive} ${styles.mobile}`}>

                                                                {
                                                                    each.description === "지각/결석 사유 제출" ? "사유 제출" : ""
                                                                }
                                                                {
                                                                    each.description === "나에게 온 메시지" ? "메시지" : ""
                                                                }
                                                                {
                                                                    each.description === "상담일지 적기" ? "일지 적기" : ""
                                                                }
                                                                {
                                                                    (each.description != "지각/결석 사유 제출" && each.description != "나에게 온 메시지" && each.description != "상담일지 적기") ? each.description : ""
                                                                }
                                                            </div>
                                                            {
                                                                    (each.name === "envelope" && count > 0) ?
                                                                    <div className={styles.noticeNumber}>{count} +</div> : ""
                                                            }
                                                        </li>
                                                    </Link>
                                                )
                                            }
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <Switch>
                        <Route exact path="/dashboard/" render={(props) => <Home activateMenuList={activateMenuList} socket={socket} newNotification={newNotification} {...props} />} />
                        <Route path="/dashboard/home" render={(props) => <Home activateMenuList={activateMenuList} socket={socket} newNotification={newNotification} {...props} />} />
                        <Route path="/dashboard/alarm" render={(props) => <Alarm activateMenuList={activateMenuList} user={user} {...props}  />} />
                        <Route path="/dashboard/text" render={(props) => <Text activateMenuList={activateMenuList} user={user} {...props}  />} />
                        <Route path="/dashboard/attendance" render={(props) => <Attendance user={user} activateMenuList={activateMenuList} {...props}  />} />
                        <Route path="/dashboard/avatar" render={(props) => <Avatar activateMenuList={activateMenuList} {...props}  />} />
                        <Route path="/dashboard/book" render={(props) => <Book activateMenuList={activateMenuList} user={user} {...props}  />} />
                        <Route path="/dashboard/chart" render={(props) => <Chart activateMenuList={activateMenuList} user={user} {...props}  />} />
                        <Route path="/dashboard/edit" render={(props) => <Edit user={user} activateMenuList={activateMenuList} {...props}  />} />
                        <Route path="/dashboard/envelope" render={(props) => <Envelope unreadMessage={unreadMessage} socket={socket} user={user} activateMenuList={activateMenuList} {...props}  />} />
                        <Route exact path="/dashboard/notification" render={(props) => <Notification user={user} activateMenuList={activateMenuList} {...props} />} />
                        <Route exact path="/dashboard/question" render={(props) => <Question user={user} activateMenuList={activateMenuList} {...props} socket={socket} />} />
                        <Route path="/dashboard/report" render={(props) => <Report activateMenuList={activateMenuList} {...props}  />} />
                        <Route path="/dashboard/restaurant" render={(props) => <Restaurant user={user} activateMenuList={activateMenuList} socket={socket} {...props}  />} />
                        <Route path="/dashboard/search" render={(props) => <Search activateMenuList={activateMenuList} user={user} {...props}  />} />
                        <Route path="/dashboard/notification/write" render={(props) => <NotificationWrite activateMenuList={activateMenuList} socket={socket} {...props} />} />
                        <Route path="/dashboard/question/write" render={(props) => <QuestionWrite activateMenuList={activateMenuList} socket={socket} {...props} />} />
                        <Route path="/dashboard/profile" render={(props) => <Profile {...props} />} />
                        <Route path="/dashboard/notificationdetail" render={(props) => <NotificationDetail user={user} {...props} />} />
                    </Switch>
                </div>

            </main>

        </Router>
    )
}

export default Dashboard;
