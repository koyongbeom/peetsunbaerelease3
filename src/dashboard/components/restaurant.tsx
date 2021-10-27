import React, {useEffect} from 'react';
import { RouteComponentProps } from 'react-router';

type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface restaurantProps extends RouteComponentProps {
    activateMenuList : (curret : currentSideBarMenuList) => void;
}


const Restaurant : React.FC<restaurantProps> = (props) => {
    useEffect(()=>{
        props.activateMenuList("restaurant");
    }, [])

    return(
        <div>
            restaurant
        </div>
    )
}

export default Restaurant;