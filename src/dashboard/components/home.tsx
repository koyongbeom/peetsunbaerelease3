import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@mui/styles';
import styles from '../componentsStyle/homeStyles'
import { Avatar, Skeleton } from '@mui/material';

import useNotifications from './use/usenotification';
import { notificationResult, notification } from './use/usenotification';
import { RouteComponentProps } from 'react-router';

import { Socket } from 'socket.io-client';


interface socketProps extends RouteComponentProps{
    classes : any;
    socket : Socket;
    newNotification : number;
}


const Home: React.FC<socketProps> = (props) => {
    const classes = props.classes;



    //바로 업데이트 필요한 기능들 use로 모아 놓는 곳-------------------------------------

    //-----//공지사항 업데이트 하는 기능------------------------------------------------
    const { notificationResults, loading } = useNotifications(props.newNotification);
    //-----//-----------------------------------------------------------------------

    //-------------------------------------------------------------------------------






    return (
        <div className={classes.main}>
            <div className={classes.attendanceBoard}>
                <div className={classes.attendanceBoardWeek}>
                    <div className={classes.attendanceBoardTitle}>
                        <div className={classes.attendanceBoardTitle_1}>
                            이번주 공부 시간
                        </div>
                        <div className={classes.attendanceBoardTitle_2}>
                            #자세히
                        </div>
                    </div>
                    <div className={classes.attendanceBoardDescription}>
                        <div className={classes.attendanceBoardDescription_1}>
                            <div className={classes.attendanceBoardDescription_1_1}>
                                총 공부시간
                            </div>
                            <div className={classes.attendanceBoardDescription_1_2}>
                                <span className={classes.attendanceBoardDescriptionHour}>21</span>
                                <span>시간</span>
                                <span className={classes.attendanceBoardDescriptionMinute}>30</span>
                                <span>분</span>
                            </div>
                        </div>

                        <div className={classes.attendanceBoardDescription_1}>
                            <div className={classes.attendanceBoardDescription_1_1}>
                                지각/결석
                            </div>
                            <div className={classes.attendanceBoardDescription_1_2}>
                                <span className={classes.attendanceBoardDescriptionHour}>3 / 1</span>
                                <span>회</span>
                            </div>
                        </div>

                        <div className={classes.attendanceBoardDescription_1}>
                            <div className={classes.attendanceBoardDescription_1_1}>
                                공부 시간 등수
                            </div>
                            <div className={classes.attendanceBoardDescription_1_2}>
                                <span className={classes.attendanceBoardDescriptionHour}>21/172</span>
                                <span>등</span>
                            </div>
                        </div>

                    </div>
                </div>





                <div className={classes.attendanceBoardToday}>
                    <div className={classes.attendanceBoardTitle}>
                        <div className={classes.attendanceBoardTitle_1}>
                            오늘 공부 시간
                        </div>
                        <div className={classes.attendanceBoardTitle_2}>
                            #자세히
                        </div>
                    </div>
                    <div className={classes.attendanceBoardDescription}>
                        <div className={classes.attendanceBoardDescription_1}>
                            <div className={classes.attendanceBoardDescription_1_1}>
                                총 공부시간
                            </div>
                            <div className={classes.attendanceBoardDescription_1_2}>
                                <span className={classes.attendanceBoardDescriptionHour}>21</span>
                                <span>시간</span>
                                <span className={classes.attendanceBoardDescriptionMinute}>30</span>
                                <span>분</span>
                            </div>
                        </div>

                        <div className={classes.attendanceBoardDescription_1}>
                            <div className={classes.attendanceBoardDescription_1_1}>
                                지각/결석
                            </div>
                            <div className={classes.attendanceBoardDescription_1_2}>
                                <span className={classes.attendanceBoardDescriptionHour}>0 / 0</span>
                                <span>회</span>
                            </div>
                        </div>

                        <div className={classes.attendanceBoardDescription_1}>
                            <div className={classes.attendanceBoardDescription_1_1}>
                                공부 시간 등수
                            </div>
                            <div className={classes.attendanceBoardDescription_1_2}>
                                <span className={classes.attendanceBoardDescriptionHour}>21/172</span>
                                <span>등</span>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div className={classes.notificationDiv}>
                <div className={classes.notificationTitle}>최근 공지사항</div>

                <div className={classes.notifications}>

                    {
                        notificationResults &&
                        notificationResults.map((each: notification) => {
                            if (each.images.length > 0) {
                                return (
                                    <div key={each.title} className={classes.notification}>
                                        <div className={classes.notification_imageDiv} style={{ width: "277px", height: "140px", backgroundSize: "cover", backgroundImage: `url("https://peetsunbae.com/${each.images[0].split("/public/")[1]}")` }}>
                                        </div>
                                        <div className={classes.notification_description}>
                                            <div className={classes.notification_description1}>
                                                <div className={classes.notification_description1_1}>
                                                    {each.title}
                                                </div>
                                                <div className={classes.notification_description1_2}>
                                                    <Avatar>{each.author[0]}</Avatar>
                                                </div>
                                            </div>
                                            <div className={classes.notification_description2}>
                                                <div className={classes.notification_description2_1}>{each.createdAt.year + "." + each.createdAt.month + "." + each.createdAt.date}</div>
                                                <div className={classes.notification_description2_2}>
                                                    <img src="img/like.svg" alt="like"></img> 0
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            else {
                                return (
                                    <div key={each.title} className={classes.notification}>

                                        <div className={classes.notification_description_text}>
                                            <div className={classes.notification_description1}>
                                                <div className={classes.notification_description1_1}>
                                                    {each.title}
                                                </div>
                                                <div className={classes.notification_description1_2}>
                                                    <Avatar><span className={classes.avatarText}>{each.author[0]}</span></Avatar>
                                                </div>
                                            </div>
                                            <div className={classes.eachDescription}>
                                                {each.description}
                                            </div>
                                            <div className={classes.notification_description2}>
                                                <div className={classes.notification_description2_1}>{each.createdAt.year + "." + each.createdAt.month + "." + each.createdAt.date}</div>
                                                <div className={classes.notification_description2_2}>
                                                    <img src="img/like.svg" alt="like"></img> 0
                                                </div>
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

export default withStyles(styles)(Home);