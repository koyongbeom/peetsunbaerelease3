import React, {useEffect} from 'react';
import { RouteComponentProps } from 'react-router';

type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface attendanceProps extends RouteComponentProps {
    activateMenuList : (curret : currentSideBarMenuList) => void;
}

const Attendance : React.FC<attendanceProps> = (props) => {
    useEffect(()=>{
        props.activateMenuList("attendance");
    }, [])

    return(
        <div>
            attendance
        </div>
    )
}

export default Attendance;