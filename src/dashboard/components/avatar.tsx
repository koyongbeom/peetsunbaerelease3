import React, {useEffect, useState} from 'react';

import { RouteComponentProps } from 'react-router';
import styles from '../componentsStyle/avatar.module.css';
import AllStudents from './controls/allstudents';

type currentSideBarMenuList = "avatar" | "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface avatarProps extends RouteComponentProps {
    activateMenuList : (curret : currentSideBarMenuList) => void;
}


const Avatar : React.FC<avatarProps> = (props) => {
    const [searchMenu, setSearchMenu] = useState("write");

    useEffect(()=>{
        props.activateMenuList("avatar");
    }, [])

    return(
        <div className={styles.main}>
            <div className={styles.mainBoard}>
                <div className={styles.title}>
                    <img src="img/off/avatar.svg" alt="avatar" /> 학생정보
                </div>

                <div className={styles.searchMenu}>
                    <div onClick={(e) => { setSearchMenu("write") }} className={`${styles.searchMenuDiv} ${searchMenu === "write" ? styles.active : ""}`}>
                        전체 학생정보
                    </div>
                    <div onClick={(e) => { setSearchMenu("watch") }} className={`${styles.searchMenuDiv} ${searchMenu === "watch" ? styles.active : ""}`}>
                        신규안내
                    </div>
                    <div onClick={(e) => { setSearchMenu("out") }} className={`${styles.searchMenuDiv} ${searchMenu === "out" ? styles.active : ""}`}>
                        퇴원자 처리
                    </div>
                </div>

                <div>
                    { searchMenu === "write" && 
                    <AllStudents />
                    }
                </div>
                
            </div>
        </div>
    )
}

export default Avatar;