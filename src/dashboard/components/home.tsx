import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@mui/styles';
// import styles from '../componentsStyle/homeStyles'
import { Avatar, Skeleton } from '@mui/material';
import styles from "../componentsStyle/home.module.css";
import useNotifications from './use/usenotification';
import { notificationResult, notification } from './use/usenotification';
import { RouteComponentProps } from 'react-router';

import { Socket } from 'socket.io-client';

import "../componentsStyle/home.css"

type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";


interface socketProps extends RouteComponentProps{
    // classes : any;
    socket : Socket;
    newNotification : number;
    activateMenuList : (curret : currentSideBarMenuList) => void;
}


const Home: React.FC<socketProps> = (props) => {
    // const classes = props.classes;

    useEffect(()=>{
        props.activateMenuList("home");
    }, [])


    //바로 업데이트 필요한 기능들 use로 모아 놓는 곳-------------------------------------

    //-----//공지사항 업데이트 하는 기능------------------------------------------------
    const { notificationResults, loading } = useNotifications(props.newNotification);
    //-----//-----------------------------------------------------------------------

    //-------------------------------------------------------------------------------

    const notificationDetail = (e : any) => {
        const id = e.target.dataset.id;
        console.log(e.target.dataset.id);
        props.history.push({
            pathname : "/dashboard/notificationdetail",
            state : {id : id, history : props.history}
        })
    }




    return (
        <div className={`${styles.main}`}>
            <div className={styles.attendanceBoard}>
                <div className={styles.attendanceBoardWeek}>
                    <div className={styles.attendanceBoardTitle}>
                        <div className={styles.attendanceBoardTitle_1}>
                            이번주 공부 시간
                        </div>
                        <div className={styles.attendanceBoardTitle_2}>
                            #자세히
                        </div>
                    </div>
                    <div className={styles.attendanceBoardDescription}>
                        <div className={styles.attendanceBoardDescription_1}>
                            <div className={styles.attendanceBoardDescription_1_1}>
                                총 공부시간
                            </div>
                            <div className={styles.attendanceBoardDescription_1_2}>
                                <span className={styles.attendanceBoardDescriptionHour}>21</span>
                                <span>시간</span>
                                <span className={styles.attendanceBoardDescriptionMinute}>30</span>
                                <span>분</span>
                            </div>
                        </div>

                        <div className={styles.attendanceBoardDescription_1}>
                            <div className={styles.attendanceBoardDescription_1_1}>
                                지각/결석
                            </div>
                            <div className={styles.attendanceBoardDescription_1_2}>
                                <span className={styles.attendanceBoardDescriptionHour}>3 / 1</span>
                                <span>회</span>
                            </div>
                        </div>

                        <div className={styles.attendanceBoardDescription_1}>
                            <div className={styles.attendanceBoardDescription_1_1}>
                                공부 시간 등수
                            </div>
                            <div className={styles.attendanceBoardDescription_1_2}>
                                <span className={styles.attendanceBoardDescriptionHour}>21/172</span>
                                <span>등</span>
                            </div>
                        </div>

                    </div>
                </div>





                <div className={styles.attendanceBoardToday}>
                    <div className={styles.attendanceBoardTitle}>
                        <div className={styles.attendanceBoardTitle_1}>
                            오늘 공부 시간
                        </div>
                        <div className={styles.attendanceBoardTitle_2}>
                            #자세히
                        </div>
                    </div>
                    <div className={styles.attendanceBoardDescription}>
                        <div className={styles.attendanceBoardDescription_1}>
                            <div className={styles.attendanceBoardDescription_1_1}>
                                총 공부시간
                            </div>
                            <div className={styles.attendanceBoardDescription_1_2}>
                                <span className={styles.attendanceBoardDescriptionHour}>21</span>
                                <span>시간</span>
                                <span className={styles.attendanceBoardDescriptionMinute}>30</span>
                                <span>분</span>
                            </div>
                        </div>

                        <div className={styles.attendanceBoardDescription_1}>
                            <div className={styles.attendanceBoardDescription_1_1}>
                                지각/결석
                            </div>
                            <div className={styles.attendanceBoardDescription_1_2}>
                                <span className={styles.attendanceBoardDescriptionHour}>0 / 0</span>
                                <span>회</span>
                            </div>
                        </div>

                        <div className={styles.attendanceBoardDescription_1}>
                            <div className={styles.attendanceBoardDescription_1_1}>
                                공부 시간 등수
                            </div>
                            <div className={styles.attendanceBoardDescription_1_2}>
                                <span className={styles.attendanceBoardDescriptionHour}>21/172</span>
                                <span>등</span>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div className={styles.notificationDiv}>
                <div className={styles.notificationTitle}>최근 공지사항</div>

                <div className={styles.notifications}>

                    {
                        notificationResults &&
                        notificationResults.map((each: any, index : number) => {
                            if (each.images.length > 0) {
                                return (
                                    <div onClick={notificationDetail} data-id={each.id} key={each.title + Math.random()} className={`${styles.notification} ${(index === 2 || index === 3) ? styles.tabletnone : ""}`}>
                                        <div data-id={each.id}  className={styles.notification_imageDiv} style={{ width: "277px", height: "140px", backgroundSize: "cover", backgroundImage: `url("https://peetsunbae.com/${each.images[0].split("/public/")[1]}")` }}>
                                        </div>
                                        <div data-id={each.id} className={styles.notification_description}>
                                            <div data-id={each.id} className={styles.notification_description1}>
                                                <div data-id={each.id} className={styles.notification_description1_1}>
                                                    {each.title}
                                                </div>
                                                <div data-id={each.id} className={styles.notification_description1_2}>
                                                    <Avatar>{each.author[0]}</Avatar>
                                                </div>
                                            </div>
                                            <div data-id={each.id} className={styles.notification_description2}>
                                                
                                                <div data-id={each.id} className={styles.notification_description2_2}>
                                                    {!each.isRead ? <div className={styles.new}>NEW</div> : ""}
                                                </div>
                                                <div data-id={each.id} className={styles.notification_description2_1}>
                                                    {each.createdAt.year + "." + each.createdAt.month + "." + each.createdAt.date}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            else {
                                return (
                                    <div onClick={notificationDetail} data-id={each.id} key={each.title+ Math.random()} className={`${styles.notification} ${(index === 2 || index === 3) ? styles.tabletnone : ""}`}>

                                        <div data-id={each.id} className={styles.notification_description_text}>
                                            <div  data-id={each.id} className={styles.notification_description1}>
                                                <div  data-id={each.id} className={styles.notification_description1_1}>
                                                    {each.title}
                                                </div>
                                                <div  data-id={each.id} className={styles.notification_description1_2}>
                                                    <Avatar><span className={styles.avatarText}>{each.author[0]}</span></Avatar>
                                                </div>
                                            </div>
                                            <div  data-id={each.id} className={styles.eachDescription}>
                                                {each.description}
                                            </div>
                                            <div  data-id={each.id} className={styles.notification_description2}>
                                                <div  data-id={each.id} className={styles.notification_description2_2}>
                                                    {!each.isRead ? <div className={styles.new}>NEW</div> : ""}
                                                </div>
                                                <div  data-id={each.id} className={styles.notification_description2_1}>{each.createdAt.year + "." + each.createdAt.month + "." + each.createdAt.date}</div>

                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        }
                        )
                    }

                </div>

            </div>
        </div>
    )
}

export default Home;