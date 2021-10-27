import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';

type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface AlarmProps extends RouteComponentProps {
    activateMenuList : (curret : currentSideBarMenuList) => void;
}

const Alarm : React.FC<AlarmProps> = (props) => {
    useEffect(()=>{
        props.activateMenuList("alarm");
    }, [])

    return(
        <div>
            Alarm
        </div>
    )
}

export default Alarm;

