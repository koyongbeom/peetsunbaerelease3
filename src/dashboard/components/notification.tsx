import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { RouteComponentProps } from 'react-router';
import { withStyles } from '@mui/styles';
import { Avatar, Button, Skeleton } from '@mui/material';
import styles from '../componentsStyle/notificationStyles';
import '../componentsStyle/notificationStyle.css';
import { TrendingUpOutlined } from '@mui/icons-material';

type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface notificationProps extends RouteComponentProps {
    classes : any;
    user : any;
    activateMenuList : (curret : currentSideBarMenuList) => void;
}


const Notification: React.FC<notificationProps> = (props) => {



    useEffect(()=>{
        props.activateMenuList("notification");
    }, [])

    const classes = props.classes;


    const [notificationResults, setNotificationResults] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [imgLoaded, setImgLoaded] = useState([false,false,false,false,false,false,false,false,false]);

    // const handleOnload = (e : any, index : number) => {
    //     console.log(1111111);
    //     console.log(index);
    //     const newImgLoaded = imgLoaded;
    //     newImgLoaded[index] = true;
    //     setImgLoaded([...newImgLoaded]);
    // }


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
                                        <div key={each.title + Math.random()} className={classes.notification} data-id={each.id}>
                                            <div className="imageDiv" style={{ width: "277px", height: "140px", backgroundSize: "cover" }}>

                                                <img className="notification_image" src={`https://peetsunbae.com/${each.images[0].split("/public/")[1]}`} alt="img" />
                                                {imgLoaded[index] ?
                                                    "" :
                                                    <Skeleton variant="rectangular" width={277} height={140} />
                                                }
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
                                                    <div className={classes.notification_description2_2}>
                                                        {/* <img src="img/like.svg" alt="like"></img> 0 */}
                                                    </div>
                                                    <div className={classes.notification_description2_1}>{each.createdAt.year + "." + each.createdAt.month + "." + each.createdAt.date}</div>

                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                else {
                                    return (
                                        <div key={each.title + Math.random()} className={classes.notification} data-id={each.id}>

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
                                                    <div className={classes.notification_description2_2}>
                                                        {/* <img src="img/like.svg" alt="like"></img> 0 */}
                                                    </div>
                                                    <div className={classes.notification_description2_1}>{each.createdAt.year + "." + each.createdAt.month + "." + each.createdAt.date}</div>

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
                                        <div key={each.title + Math.random()} className={classes.notification} data-id={each.id}>
                                            <div className="imageDiv" style={{ width: "277px", height: "140px", backgroundSize: "cover" }}>
                                                
                                                <img className="notification_image" src={`https://peetsunbae.com/${each.images[0].split("/public/")[1]}`} alt="img" />
                                                {imgLoaded[index] ? "" :
                                                    <Skeleton variant="rectangular" width={277} height={140} />
                                                }
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
                                                    <div className={classes.notification_description2_2}>
                                                        {/* <img src="img/like.svg" alt="like"></img> 0 */}
                                                    </div>
                                                    <div className={classes.notification_description2_1}>{each.createdAt.year + "." + each.createdAt.month + "." + each.createdAt.date}</div>

                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                else {
                                    return (
                                        <div key={each.title + Math.random()} className={classes.notification} data-id={each.id}>

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
                                                    <div className={classes.notification_description2_2}>
                                                        {/* <img src="img/like.svg" alt="like"></img> 0 */}
                                                    </div>
                                                    <div className={classes.notification_description2_1}>{each.createdAt.year + "." + each.createdAt.month + "." + each.createdAt.date}</div>

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
                    <div className={classes.newNotification}>
                        <img src="./img/pencil.svg" alt="pencil" className={classes.pencil} />
                        신규 게시물 작성
                    </div>
                </Link>
            }
        </div>
    )
}

export default withStyles(styles)(Notification);