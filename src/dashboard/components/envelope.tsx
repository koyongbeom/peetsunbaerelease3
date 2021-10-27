import React, {useEffect} from 'react';
import { RouteComponentProps } from 'react-router';

type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface envelopeProps extends RouteComponentProps {
    activateMenuList : (curret : currentSideBarMenuList) => void;
}


const Envelope : React.FC<envelopeProps> = (props) => {
    useEffect(()=>{
        props.activateMenuList("envelope");
    }, [])

    return(
        <div>
            envelope
        </div>
    )
}

export default Envelope;