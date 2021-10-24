import React, { useEffect, useState } from 'react'

export interface notification {
    author : string;
    createdAt : {year : number; month : number; date : number; hours : number; minutes : number; };
    description : string;
    images : string[];
    title : string;
}

export interface notificationResult extends Array<notification> {}

const useNotifications: any = (newNotification : Boolean) => {
    const [notificationResults, setNotificationResults] = useState<notificationResult>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {


        console.log("useNotifications");
        async function start() {
            setLoading(true);

            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/home/notifications", {
                method : "GET",
                headers : {"Authorization" : token},
                credentials : "include"
            }).then((response)=>{
                setLoading(false);
                response.json()
                .then((result)=>{
                    console.log(result);
                    setNotificationResults(result.message);
                })
            }).catch((error)=>{
                console.log(error);;
            })
        }

        start();
    }, [newNotification]);;

    return {notificationResults, loading};
}

export default useNotifications;