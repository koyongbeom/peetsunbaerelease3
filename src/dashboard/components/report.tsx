import React, {useEffect} from 'react';
import { RouteComponentProps } from 'react-router';

type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface reportProps extends RouteComponentProps {
    activateMenuList : (curret : currentSideBarMenuList) => void;
}


const Report : React.FC<reportProps> = (props) => {
    useEffect(()=>{
        props.activateMenuList("출석 관리 보고");
    }, [])

    return(
        <div>
            report
        </div>
    )
}

export default Report;