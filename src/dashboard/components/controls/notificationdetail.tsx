import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styles from '../../componentsStyle/notificationdetail.module.css';

const NotificationDetail : React.FC<any> = (props) => {

    const location : any = useLocation();
    const [loading, setLoading] = useState(false);
    const [notificationResult, setNotificationResult] = useState<any>();

    useEffect(()=>{
        console.log(location.state.id);
        const id = location.state.id;

        async function start() {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/notification/geteach?id="+id, {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include"
            }).then((response) => {
                setLoading(false);
                response.json()
                    .then((result) => {
                        console.log(result);
                        setNotificationResult(result.message[0]);
                    })
            }).catch((error) => {
                console.log(error);
            })
        }
        start();

    }, []);

    const deleteNotification = async (e : any) => {
        console.log(e.target.dataset.id);
        const id = e.target.dataset.id;

        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/notification/delete?id="+id, {
            method: "DELETE",
            headers: { "Authorization": token },
            credentials: "include"
        }).then((response) => {
            setLoading(false);
            response.json()
                .then((result) => {
                    console.log(result);
                    if(result.message === "success"){
                        location.state.history.push("/dashboard/notification");
                    }
                })
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className={styles.main}>
            <div className={styles.title}>
                <img src="img/off/notification.svg" alt="talk" />
                <div className={styles.titleText}>최근 공지사항</div>
            </div>

            <div className={styles.descriptionBox}>
                <div className={styles.descriptionBoxTitle}>
                    <div>
                        {notificationResult && notificationResult.title}
                    </div>
                    <div data-id = {notificationResult ? notificationResult.id : ""}>
                        {(props.user.value==="teacher" || props.user.value === "staff" ) && <img onClick={deleteNotification}  data-id = {notificationResult ? notificationResult.id : ""} className={styles.delete} src="img/trash-alt-light.svg" alt="trash"></img>}
                    </div>
                </div>
                <div className={styles.descriptionBoxDate}>
                    <div>
                        <div>
                            작성일
                        </div>
                        <div>
                            {notificationResult && notificationResult.createdAt.year}.{notificationResult && notificationResult.createdAt.month}.{notificationResult && notificationResult.createdAt.date} <span className={styles.number}>(조회 : {notificationResult && notificationResult.number})</span>
                        </div>
                    </div>
                    <div>
                        <div>
                            작성자
                        </div>
                        <div>
                            {notificationResult && notificationResult.author}
                        </div>
                    </div>
                </div>
                <div className={styles.descriptionBoxBody}>
                    <div className={styles.imagesBox}>
                        {notificationResult && notificationResult.images.map((each: string) => {
                            return (
                                <div>
                                    <img className={styles.notificationImage} alt="notificationImg" src={`https://peetsunbae.com/${each.split("/public/")[1]}`}></img>
                                </div>
                            )
                        })}
                    </div>
                    <div className={styles.text}>
                        {notificationResult && notificationResult.description}
                    </div>
                </div>
            </div>


            <div className={styles.listBtnDiv}>
                <div onClick={()=>{props.history.push("/dashboard/notification")}} className={styles.listBtn}>
                        목록
                </div>
            </div>
        </div>
    )
}

export default NotificationDetail;