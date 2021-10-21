import React from 'react';
import { Link } from 'react-router-dom';

const notification : React.FC = () => {
    return(
        <div>
            notification
            <Link to="/dashboard/notification/write">공지사항 적기</Link>
        </div>
    )
}

export default notification;