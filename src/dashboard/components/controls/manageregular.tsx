import React, {useEffect, useState} from "react";
import styles from "../../componentsStyle/manageregular.module.css";
import Divider from "../data/divider";

const ManageRegular : React.FC <any> = (props) => {

    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [data, setData] = useState<any>();
    const [update, setUpdate] = useState<any>(0);


    const letsUpdate = () => {
        setUpdate(Math.random());
    }


    useEffect(() => {

        fetch("https://peetsunbae.com/dashboard/chart/regularSchedule/totalget?month=" + month,{
            method : "GET",
            credentials : "include"
        }).then((response : any) => {
            response.json()
            .then((result : any) => {
                console.log(result);

                result.data.sort(function(a : any,b : any){
                    if(a.staffpermit === 0 && b.staffpermit === 1){
                        return -1;
                    }else if(a.staffpermit === 0 && b.staffpermit === 2){
                        return -1;
                    }else{
                        return 1;
                    }
                });

                result.data.sort(function(a:any, b:any){
                    if(a.staffpermit === 2 && b.staffpermit === 1){
                        return -1;
                    }else{
                        return 1;
                    }
                })

                if(result.message === "success"){
                    setData(result.data);
                }
            })
        })

    }, [month, update])

    return (
        <div className={styles.main}>
            <div className={styles.title}>
                {month}월 정기일정 관리
            </div>
            <div className={styles.dividerDiv}>
                {
                    data &&
                    data.map((eachData : any, index : number) => {
                        return (
                            <div key={eachData.id} className={styles.eachDividerDiv}>
                                <div className={styles.name}>
                                    {eachData.name}
                                </div>
                                <div className={styles.dividerDivDiv}>
                                    <Divider update={letsUpdate} data={eachData} month={month} userId={eachData.userId} />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default ManageRegular;