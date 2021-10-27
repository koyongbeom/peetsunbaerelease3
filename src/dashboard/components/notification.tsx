import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { RouteComponentProps } from 'react-router';
import { withStyles } from '@mui/styles';
import { Avatar, Button } from '@mui/material';
import styles from '../componentsStyle/notificationStyles';

interface notificationProps extends RouteComponentProps {
    classes : any;
    user : any;
}


const Notification: React.FC<notificationProps> = (props) => {
    const classes = props.classes;

    console.log(props.location.pathname);

    const [notificationResults, setNotificationResults] = useState<any>();
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        console.log("getNotifications")
        async function start() {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/notification/get", {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include"
            }).then((response) => {
                setLoading(false);
                response.json()
                    .then((result) => {
                        console.log(result);
                        setNotificationResults(result.message);
                    })
            }).catch((error) => {
                console.log(error);
            })
        }
        start();
    }, [])

    return (
        <div className={classes.main}>
            <div className={classes.notificationDiv}>
                <div className={classes.notificationTitle}>
                    <img src="./img/notification.svg" alt="speechBubble" style={{marginRight : "11.3px"}} />
                    최근 공지사항
                </div>

                <div className={classes.notifications}>

                    {
                        notificationResults &&
                        notificationResults.map((each: any, index: number) => {
                            if (index < 4) {
                                if (each.images.length > 0) {
                                    return (
                                        <div key={each.title + Math.random()} className={classes.notification}>
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
                                        <div key={each.title + Math.random()} className={classes.notification}>

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
                        }
                        )
                    }

                </div>

                <div className={classes.notifications2}>

                    {
                        notificationResults &&
                        notificationResults.map((each: any, index: number) => {
                            if (3< index) {
                                if (each.images.length > 0) {
                                    return (
                                        <div key={each.title + Math.random()} className={classes.notification}>
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
                                        <div key={each.title + Math.random()} className={classes.notification}>

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
                        }
                        )
                    }

                </div>

            </div>
            {
                (props.user.value === "teacher" || props.user.value === "staff") &&
                <Link to="/dashboard/notification/write">
                    <Button sx={{position : "fixed", bottom : "15px", right : "45px"}} variant="contained">신규 게시물 작성</Button>
                </Link>
            }
        </div>
    )
}

export default withStyles(styles)(Notification);