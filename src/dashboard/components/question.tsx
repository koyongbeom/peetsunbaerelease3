import React, {useEffect} from 'react';
import { RouteComponentProps } from 'react-router';

type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface questionProps extends RouteComponentProps {
    activateMenuList : (curret : currentSideBarMenuList) => void;
}


const Question : React.FC<questionProps> = (props) => {
    useEffect(()=>{
        props.activateMenuList("question");
    }, [])

    return(
        <div>
            question
        </div>
    )
}

export default Question;