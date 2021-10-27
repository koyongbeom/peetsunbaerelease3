import React, {useEffect} from 'react';
import { RouteComponentProps } from 'react-router';

type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface chartProps extends RouteComponentProps {
    activateMenuList : (curret : currentSideBarMenuList) => void;
}


const Chart : React.FC<chartProps> = (props) => {
    useEffect(()=>{
        props.activateMenuList("chart");
    }, [])

    return(
        <div>
            chart
        </div>
    )
}

export default Chart;