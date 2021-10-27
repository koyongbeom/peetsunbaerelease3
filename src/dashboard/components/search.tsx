import React, {useEffect} from 'react';
import { RouteComponentProps } from 'react-router';

type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface searchProps extends RouteComponentProps {
    activateMenuList : (curret : currentSideBarMenuList) => void;
}


const Search : React.FC<searchProps> = (props) => {
    useEffect(()=>{
        props.activateMenuList("search");
    }, [])

    return(
        <div>
            search
        </div>
    )
}

export default Search;