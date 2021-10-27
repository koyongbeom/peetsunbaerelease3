import React, {useEffect} from 'react';

import { RouteComponentProps } from 'react-router';

type currentSideBarMenuList = "avatar" | "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface avatarProps extends RouteComponentProps {
    activateMenuList : (curret : currentSideBarMenuList) => void;
}


const Avatar : React.FC<avatarProps> = (props) => {
    useEffect(()=>{
        props.activateMenuList("avatar");
    }, [])

    return(
        <div>
            avatar
        </div>
    )
}

export default Avatar;