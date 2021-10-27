import React, {useEffect} from 'react';

import { RouteComponentProps } from 'react-router';

type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface bookProps extends RouteComponentProps {
    activateMenuList : (curret : currentSideBarMenuList) => void;
}


const Book : React.FC<bookProps> = (props) => {
    useEffect(()=>{
        props.activateMenuList("book");
    }, [])

    return(
        <div>
            book
        </div>
    )
}

export default Book;