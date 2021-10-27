import React, {useEffect} from 'react';
import { RouteComponentProps } from 'react-router';

type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface editProps extends RouteComponentProps {
    activateMenuList : (curret : currentSideBarMenuList) => void;
}


const Edit : React.FC<editProps> = (props) => {
    useEffect(()=>{
        props.activateMenuList("edit");
    }, [])

    return(
        <div>
            edit
        </div>
    )
}

export default Edit;