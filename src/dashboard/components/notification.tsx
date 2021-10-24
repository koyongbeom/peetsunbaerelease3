import React from 'react';
import { Link } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { RouteComponentProps } from 'react-router';

const notification : React.FC<RouteComponentProps> = (props) => {

    return(
        <div>
            notification
            <Link to="/dashboard/notification/write">공지사항 적기</Link>
        </div>
    )
}

export default notification;