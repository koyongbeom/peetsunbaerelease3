import { LinearProgress } from '@mui/material';
import React, { useEffect, useReducer, useState } from 'react'
import styles from "../../componentsStyle/restaurant.module.css"




const Meals: React.FC<any> = (props) => {
    const [day, setDay] = useState<any[]>([]);
    const [date, setDate] = useState<number[]>([]);
    const [info, setInfo] = useState<any>();
    const [update, setUpdate] = useState(0);
    const [number, setNumber] = useState(0);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        setLoading(true);
        console.log("---------");
        async function start() {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/restaurant/check", {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result.data);
                        if(result.message === "success"){
                            const resultData = {...result.data};
                            setInfo(resultData);
                            props.letsUpdate();
                            setTimeout(()=>{
                                setNumber(number+1);
                                setInfo(resultData);
                                setLoading(false);
                            }, 50);
                        }
                    })
            })
        }
        start();

        const date = new Date();
        const dateInfo = [];
        date.setDate(date.getDate() - 1);
        for (var i = 0; i < 7; i++) {
            dateInfo.push(date.setDate(date.getDate() + 1));
        }

        console.log(dateInfo);
        const currentDay: any = [];
        const currentDate: any = [];

        dateInfo.forEach((each: any) => {
            currentDate.push(new Date(each).getDate());
            switch (new Date(each).getDay()) {
                case 0: currentDay.push("???"); break;
                case 1: currentDay.push("???"); break;
                case 2: currentDay.push("???"); break;
                case 3: currentDay.push("???"); break;
                case 4: currentDay.push("???"); break;
                case 5: currentDay.push("???"); break;
                case 6: currentDay.push("???"); break;
            }
        })

        console.log(currentDate);
        console.log(currentDay);
        setDay(currentDay);
        setDate(currentDate);

    }, [update])

    const cancelMeal = (e : any, id : number, price : number, targetDate : string, day : number, whenType : string) => {
        var token = "";
        setLoading(true);

            if (window.electron) {
                token = window.electron.sendMessageApi.getToken();
            }
    
            fetch("https://peetsunbae.com/dashboard/restaurant/check", {
                method: "DELETE",
                headers: { "Authorization": token, "Content-Type" : "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    id : id,
                    price : price,
                    targetDate : targetDate
                })
            }).then((response) => {
                response.json()
                    .then((result) => {
                        console.log(result);
                        if(result.message === "success"){
                            const newInfo = info;
                            setUpdate(Math.random());
                            setTimeout(()=>{
                                setUpdate(Math.random());
                            }, 100);
                        }
                    })
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className={styles.checkBoard}>
            <div className={styles.title}>
                <img src="img/calendar.svg" alt="calendar"></img><span className={styles.titleText}>????????? ????????????</span>
            </div>
            <div className={styles.dayLine}>
                <div className={styles.dayFirst1}>

                </div>
                {day && day.map((eachDay, index) => {
                    return (
                        <div className={`${styles.dayDiv} ${eachDay === "???" ? styles.sunday : ""}`}>
                            {eachDay}
                        </div>
                    );
                })}
            </div>
            <div className={styles.dateLine}>
                <div className={styles.dayFirst2}>
                    <div>???</div>
                    <div>???</div>
                </div>
                {day && day.map((eachDay, index) => {
                    var day : any;

                    switch (eachDay) {
                        case "???" : day = 0; break;
                        case "???" : day = 1; break;
                        case "???" : day = 2; break;
                        case "???" : day = 3; break;
                        case "???" : day = 4; break;
                        case "???" : day = 5; break;
                        case "???" : day = 6; break;
                    }


                    return (
                        <div key={number + index} className={styles.dateDiv}>
                                {
                                    (typeof(day) === "number" && info && info[day].lunch.length > 0) ?
                                        <div className={styles.dateDivDiv}>
                                            <div className={styles.menuListLunch}>
                                                <div>{info[day].lunch[0].restaurantName}</div>
                                                <div>{info[day].lunch[0].mealName}</div>
                                                {/* <div>{info[day].lunch[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}???</div> */}
                                            </div>
                                            {(index === 0 && new Date().getTime() > new Date(info[day].lunch[0].targetDate).getTime()) ? "" : 
                                            <div
                                            onClick={(e)=>{cancelMeal(e, info[day].lunch[0].id, info[day].lunch[0].price, info[day].lunch[0].targetDate, day, "lunch")}}
                                            className={styles.cancelBtn}>????????????</div>}
                                        </div>
                                        :
                                        ""
                                }
                            
                        </div>
                    )
                })}
            </div>
            <div className={styles.dateLine}>
                <div className={styles.dayFirst3}>
                    <div>???</div>
                    <div>???</div>
                </div>
                {day && day.map((eachDay, index) => {
                    var day : any;
                    switch (eachDay) {
                        case "???" : day = 0; break;
                        case "???" : day = 1; break;
                        case "???" : day = 2; break;
                        case "???" : day = 3; break;
                        case "???" : day = 4; break;
                        case "???" : day = 5; break;
                        case "???" : day = 6; break;
                    }
                    
                    return (
                        <div key={number + index} className={styles.dateDiv}>
                                {
                                (typeof(day) === "number" && info && info[day].dinner.length > 0) 
                                ?
                                <div className={styles.dateDivDiv}>
                                    <div className={styles.menuListDinner}>
                                        <div>{info[day].dinner[0].restaurantName}</div>
                                        <div>{info[day].dinner[0].mealName}</div>
                                        {/* <div>{info[day].dinner[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}???</div> */}
                                    </div>
                                    {(index === 0 && new Date().getTime() > new Date(info[day].dinner[0].targetDate).getTime()) ? "" : 
                                            <div className={styles.cancelBtn}
                                            onClick={(e)=>{cancelMeal(e, info[day].dinner[0].id, info[day].dinner[0].price, info[day].dinner[0].targetDate, day, "dinner")}}
                                            >????????????</div>}
                                </div>
                                : 
                                ""}
                        </div>
                    )
                })}
            </div>

            {loading && 
                        <div className={styles.linearProgress}>
                            <LinearProgress />
                        </div>
            }

        </div>
    )
}

export default Meals;