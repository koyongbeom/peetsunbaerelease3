import React, { useEffect, useState } from "react";
import { resourceLimits } from "worker_threads";
import styles from "../dashboard/componentsStyle/regularparentpermit.module.css";
import { ReactComponent as LogoSvg } from '../svg/newlogo.svg';


const RegularParentpermit: React.FC<any> = (props) => {

    const [id, setId] = useState();
    const [permitState, setPermitState] = useState<any>();
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        console.log("gogogo");

        const meta = document.createElement("meta");
        meta.name = "viewport";
        meta.content = "width=device-width, initial-scale=1";
        document.getElementsByTagName("head")[0].appendChild(meta);


        const url = window.location.href;
        var query = url.split("?regularscheduleId=")[1];

        const id = query.split("&pw=")[0];
        query = query.split("&pw=")[1];

        const pw = query.split("&permit=")[0];
        const permit = query.split("&permit=")[1];

        console.log(id, pw, permit);

        if (permit === "1" && +pw === (500 * (+id)) + 10) {
            setPermitState(1);
        }

        if (permit === "0" && +pw === (500 * (+id)) + 10) {
            setPermitState(2);
        }

        if (+pw === (500 * (+id)) + 10) {
            fetch(`https://peetsunbae.com/dashboard/chart/regularSchedule/parentpermit`, {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    id, permit
                })
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);
                    })
            })
        }

    }, []);

    return (
        <div className={styles.main}>

            {
                (permitState && permitState === 1) &&
                <div className={styles.text}>
                    정기일정 <span style={{ color: "#1b49af" }}>승인</span><br></br>처리 되었습니다.
                </div>
            }

            {
                (permitState && permitState === 2) &&
                <div className={styles.text}>
                    정기일정 <span style={{ color: "red" }}>승인 거절</span><br></br>처리 되었습니다.
                </div>
            }

            <div className={styles.logoDiv}>
                <LogoSvg className={styles.newlogo} />
            </div>
        </div>
    )
}

export default RegularParentpermit;