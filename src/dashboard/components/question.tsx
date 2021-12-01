import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import "../componentsStyle/question.css"
import Questions from './controls/questions';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Socket } from 'socket.io-client';
import Offline from './controls/offline';


type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface questionProps extends RouteComponentProps {
    activateMenuList: (curret: currentSideBarMenuList) => void;
    user: any;
    socket: Socket;
}


const Question: React.FC<questionProps> = (props) => {
    const [selectMenu, setSelectMenu] = useState("chemistry");
    const [pageStartNumber, setPageStartNumber] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [alignment, setAlignment] = React.useState('All');

    const changeSelectedMenu = (e: any, type: string) => {
        switch (type) {
            case "chemistry": setSelectMenu("chemistry"); setPageStartNumber(1); setCurrentPage(1); break;
            case "organic": setSelectMenu("organic"); setPageStartNumber(1); setCurrentPage(1); break;
            case "physics": setSelectMenu("physics"); setPageStartNumber(1); setCurrentPage(1); break;
            case "biology": setSelectMenu("biology"); setPageStartNumber(1); setCurrentPage(1); break;
            case "offline": setSelectMenu("offline"); setPageStartNumber(1); setCurrentPage(1); break;

        }
    }

    const pageChevron = (direction: String) => {
        if (direction === "left") {
            if (pageStartNumber != 1) {
                const page = pageStartNumber - 1;
                setPageStartNumber(pageStartNumber - 5);
                setCurrentPage(page);
            }
        } else if (direction === "right") {
            const page = pageStartNumber + 5;
            setPageStartNumber(pageStartNumber + 5);
            setCurrentPage(page);
        }
    }

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        console.log(newAlignment);
        setAlignment(newAlignment);
    };


    useEffect(() => {
        props.activateMenuList("question");
    }, [])

    return (
        <div className="main">
            <div className="title">
                <img src="img/playlist.svg" alt="playlist" />질의응답
            </div>

            <div className="selectMenu">
                <div onClick={(e) => { changeSelectedMenu(e, "chemistry") }} className={`selectedMenu ${selectMenu === "chemistry" ? "active" : ""}`}>
                    화학 질의응답방
                </div>
                <div onClick={(e) => { changeSelectedMenu(e, "organic") }} className={`selectedMenu ${selectMenu === "organic" ? "active" : ""}`}>
                    유기 질의응답방
                </div>
                <div onClick={(e) => { changeSelectedMenu(e, "physics") }} className={`selectedMenu ${selectMenu === "physics" ? "active" : ""}`}>
                    물리 질의응답방
                </div>
                <div onClick={(e) => { changeSelectedMenu(e, "biology") }} className={`selectedMenu ${selectMenu === "biology" ? "active" : ""}`}>
                    생물 질의응답방
                </div>
                <div onClick={(e) => { changeSelectedMenu(e, "offline") }} className={`selectedMenu ${selectMenu === "offline" ? "active" : ""}`}>
                    오프라인 신청방
                </div>
            </div>

            <div className="questionBodyDiv">
                <div>
                    {
                        selectMenu != "offline" &&
                        <>
                            <ToggleButtonGroup
                                sx={{ marginTop: "20px", backgroundColor: "white" }}
                                color="primary"
                                value={alignment}
                                exclusive
                                onChange={handleChange}
                            >
                                <ToggleButton value="All">All</ToggleButton>
                                <ToggleButton value="My">My</ToggleButton>
                            </ToggleButtonGroup>

                            <div className="qnaBoard">
                                <Questions socket={props.socket} user={props.user} subject={selectMenu} page={currentPage} alignment={alignment}></Questions>
                            </div>
                        </>
                    }



                </div>
                {
                selectMenu === 'offline' &&
                <Offline user={props.user} />
                }
            </div>




            {
                selectMenu != 'offline' && 
                <div className="pageNumberDiv">
                <div className="pageNumber">
                    <img onClick={() => { pageChevron("left"); }} className="chevron" src="img/chevronLeft.svg" alt="chevronLeft" />
                    {
                        [...Array(5)].map((x, i) => {
                            return (
                                <div onClick={() => { setCurrentPage(pageStartNumber + i) }} className={`currentPage ${currentPage === pageStartNumber + i ? "active" : ""}`}>
                                    {pageStartNumber + i}
                                </div>
                            )
                        })
                    }
                    <img className="chevron" onClick={() => { pageChevron("right"); }} src="img/chevronRight.svg" alt="chevronLeft" />
                </div>
            </div>
            }


            {selectMenu != 'offline' &&
                <Link to="/dashboard/question/write">
                    <div className="qnaWrite">
                        <img src="./img/pencil.svg" alt="pencil" />
                        질의응답 작성
                    </div>
                </Link>
            }



        </div>
    )
}

export default Question;