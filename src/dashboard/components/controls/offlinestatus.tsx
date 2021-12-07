import React, {useState, useEffect} from 'react';
import styles from "../../componentsStyle/offlinestatus.module.css";

const OfflineStatus : React.FC<any> = (props) => {
    const [day, setDay] = useState<any[]>([]);
    const [date, setDate] = useState<number[]>([]);
    const [info, setInfo] = useState<any>();
    const [number, setNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState("student");


    useEffect(() => {
        if (props.user) {
            setUser(props.user.value);
        }

        setLoading(true);
        console.log("---------");
        async function start() {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/question/offline/check", {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);
                        setInfo(result.data);
                    })
            })
        }

        async function startAll() {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/question/offline/check", {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);
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
                case 0: currentDay.push("일"); break;
                case 1: currentDay.push("월"); break;
                case 2: currentDay.push("화"); break;
                case 3: currentDay.push("수"); break;
                case 4: currentDay.push("목"); break;
                case 5: currentDay.push("금"); break;
                case 6: currentDay.push("토"); break;
            }
        })

        console.log(currentDate);
        console.log(currentDay);
        setDay(currentDay);
        setDate(currentDate);

    }, []);


    return (
        <div className={styles.checkBoard}>
            <div className={styles.title}>
                <img src="img/calendar.svg" alt="calendar"></img><span className={styles.titleText}>질의응답 신청현황</span>
            </div>
            {user === "student" &&
                <>
                    <div className={styles.dayLine}>
                        <div className={styles.dayFirst1}>

                        </div>
                        {day && day.map((eachDay, index) => {
                            return (
                                <div className={styles.dayDiv}>
                                    {eachDay}
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.dateLine}>
                        <div className={styles.dayFirst2}>
                            <div>현</div>
                            <div>황</div>
                        </div>
                        {day && day.map((eachDay, index) => {
                            var day: any;

                            switch (eachDay) {
                                case "일": day = 0; break;
                                case "월": day = 1; break;
                                case "화": day = 2; break;
                                case "수": day = 3; break;
                                case "목": day = 4; break;
                                case "금": day = 5; break;
                                case "토": day = 6; break;
                            }


                            return (
                                <div key={number + index} className={styles.dateDiv}>
                                    {
                                        (typeof (day) === "number" && info && info[day].length > 0) ?
                                            <div className={styles.dateDivDiv}>
                                                {
                                                    info[day].map((eachEnroll: any) => {
                                                        return (
                                                            <div className={styles.eachEnroll}>
                                                                <div>
                                                                    {eachEnroll.subject === "chemistry" && "[화학]"}
                                                                    {eachEnroll.subject === "organic" && "[유기]"}
                                                                    {eachEnroll.subject === "physics" && "[물리]"}
                                                                    {eachEnroll.subject === "biology" && "[생물]"}
                                                                </div>
                                                                <div>
                                                                    {eachEnroll.uploadTeacherDescription}
                                                                </div>
                                                                <div>
                                                                    {eachEnroll.ampm} {eachEnroll.hours}:{eachEnroll.minutes}
                                                                </div>
                                                                <div>
                                                                    {eachEnroll.teacherName}
                                                                </div>

                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                            :
                                            ""
                                    }

                                </div>
                            )
                        })}
                    </div>
                </>
            }
            {
                ((user === "staff") || (user === "teacher")) && 
                <div>
                    Hello World
                </div>
            }


        </div>
    )
}

export default OfflineStatus;