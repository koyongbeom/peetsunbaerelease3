import React, {useEffect, useState} from "react";
import { resourceLimits } from "worker_threads";
import styles from "../dashboard/componentsStyle/offline.module.css";
import { ReactComponent as LogoSvg } from '../svg/newlogo.svg';


const QuestionExample : React.FC<any> = (props) => {

    const [data, setData] = useState<any>();

    useEffect(()=>{
        const meta = document.createElement("meta");
        meta.name = "viewport";
        meta.content = "width=device-width, initial-scale=1";
        document.getElementsByTagName("head")[0].appendChild(meta);


        const url = window.location.href;
        const id = url.split("?id=")[1];
        console.log(id);

        fetch(`https://peetsunbae.com/dashboard/question/offlinequestionexample/get?id=${id}`, {
            method : "get",
        }).then((response : any)=>{
            response.json()
            .then((result : any) => {
                console.log(result);
                if(result.message === "success"){
                    setData(result.data[0]);
                }
            })
        })

    }, [])

    return (
        <div>
            <div style={{height : "40px"}}>
            </div>
            {
                data && data.images.map((eachImage : string, imageIndex : number) => {
                    return (
                        <div key={imageIndex} className={styles.imageWrapperDiv}>
                            <img className={styles.imageExample} src={`https://peetsunbae.com/${eachImage}`} />
                        </div>
                    );
                } )
            }
            <div className={styles.exampleQuestionDescription}>
                {
                    data && data.value
                }
            </div>

            <div className={styles.logoDiv}>
                <LogoSvg className={styles.newlogo} />
            </div>
        </div>
    )
}

export default QuestionExample;