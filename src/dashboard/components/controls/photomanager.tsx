import React, { useEffect, useRef, useState } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styles from "../../componentsStyle/photomanager.module.css";
import { each } from "cheerio/lib/api/traversing";
import Slider from '@mui/material/Slider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const PhotoManager: React.FC<any> = (props) => {
    const [loading, setLoading] = useState(false);
    const [dateTime, setDateTime] = useState(new Date().getTime());
    const [value, setValue] = React.useState('four');
    const [images, setImages] = useState<any>([]);
    const [certifyingImageList, setCertifyingImageList] = useState<any>([]);
    const [active, setActive] = useState(100);
    const [activeMenuId, setActiveMenuId] = useState(99999999);
    const [activeMenuDescription, setActiveMenuDescription] = useState("");
    const [update, setUpdate] = useState(Math.random());
    const [imageSize, setImageSize] = useState(200);
    const ref = useRef<any>(null);
    const [imageStyle, setImageStyle] = useState<any>({
        width: "200px"
    })
    const [titleStyle, setTitleStyle] = useState<any>({
        width: "200px",
        height: "75px",
        fontSize: "16px"
    });
    const [alignment, setAlignment] = React.useState('title');


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const start = async (date: number) => {
        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/report/certifyingImageList?time=" + date, {
            method: "GET",
            headers: { "Authorization": token },
            credentials: "include",
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    setLoading(false);
                    result.certifyingImageList.forEach((each: any) => {
                        var count = 0;
                        result.images.forEach((image: any) => {
                            if (image.title === each.description && image.kind === each.location) {
                                count++;
                            }
                        })
                        each.count = count;
                    })
                    setImages([...result.images]);
                    setCertifyingImageList([...result.certifyingImageList]);
                })
        })
    }

    const activeMenu = (index: number, id: number, description: string) => {
        console.log(description);
        console.log(index);
        setActive(index);
        setActiveMenuId(id);
        setActiveMenuDescription(description);
    }

    const clickImage = async (e: any, id: number, title: any) => {
        console.log(id);
        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }


        var menuDescription = "";
        if (title) {

        } else {
            menuDescription = activeMenuDescription;
        }



        fetch("https://peetsunbae.com/dashboard/report/imageTitle", {
            method: "POST",
            headers: { "Authorization": token, "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                id, menuDescription
            })
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    setUpdate(Math.random());
                })
        })

    }

    useEffect(() => {
        setLoading(true);
        start(dateTime);
    }, [update]);

    const onChange = (e: any) => {
        console.log(e.target.value);
        setImageSize(e.target.value);
        console.log(ref.current);
        const newStyle = {
            width: `${e.target.value}px`
        }
        setImageStyle({
            ...newStyle
        });
        const newTitleStyle = {
            fontSize: `${16 * e.target.value / 200}px`,
            width: `${e.target.value}px`,
            height: `${75 * e.target.value / 200}px`
        }
        setTitleStyle(newTitleStyle);
    }

    const toggleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    const previousDay = () => {
        var targetDate = new Date(dateTime);
        targetDate.setDate(targetDate.getDate()-1);
        setDateTime(targetDate.getTime());
        start(targetDate.getTime());
    }

    const nextDay = () => {
        var targetDate = new Date(dateTime);
        targetDate.setDate(targetDate.getDate()+1);
        setDateTime(targetDate.getTime());
        start(targetDate.getTime());
    }

    return (
        <div>
            <div className={styles.dateChange}>
                <div>
                    <ButtonGroup sx={{marginLeft : "20px", marginBottom : "12px"}} variant="outlined" aria-label="outlined button group">
                        <Button onClick={previousDay}>◁</Button>
                        <Button onClick={nextDay}>▷</Button>
                    </ButtonGroup>
                    <div className={styles.dateLine}>
                        {new Date(dateTime).getFullYear()}년 {new Date(dateTime).getMonth() + 1}월 {new Date(dateTime).getDate()}일
                    </div>
                </div>
            </div>
            <div className={styles.firstDiv}>
                <Box width={300}>
                    <h3 style={{ fontFamily: "Apple_R", marginLeft: "6px", marginBottom: "6px" }}>사진 크기 조절</h3>
                    <Slider sx={{ marginLeft: "6px" }} onChange={onChange} defaultValue={200} min={150} max={1200} aria-label="Default" valueLabelDisplay="auto" />
                </Box>
                <div>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={toggleChange}
                    >
                        <ToggleButton value="title"><span style={{ fontFamily: "Apple_B" }}>제목 순서 배열</span></ToggleButton>
                        <ToggleButton value="time"><span style={{ fontFamily: "Apple_B" }}>시간 순서 배열</span></ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>


            <Box sx={{ width: '100%', typography: 'body1', marginTop : "12px" }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label={<span style={{ fontFamily: "Apple_B", fontSize : "18px" }}>4층</span>} value="four" />
                            <Tab label={<span style={{ fontFamily: "Apple_B", fontSize : "18px"}}>6층</span>} value="six" />
                            <Tab label={<span style={{ fontFamily: "Apple_B", fontSize : "18px" }}>2호점</span>} value="second" />
                        </TabList>
                    </Box>
                </TabContext>
            </Box>

            <div className={styles.listBox}>
                <div className={styles.list}>
                    <div className={styles.listTime}>
                        오전
                    </div>
                    {
                        certifyingImageList.map((eachList: any, index: number) => {
                            if (eachList.location === value && eachList.time === "오전") {
                                return (
                                    <div key={eachList.id} className={`${styles.eachList} ${index === active ? styles.active : ""}`} onClick={(e) => { activeMenu(index, eachList.id, eachList.description) }}>
                                        <div className={styles.eachListDiv}>{eachList.description}</div> <span className={`${styles.count} ${eachList.count === eachList.number ? styles.active : ""}`}>{eachList.count}/{eachList.number}</span>
                                    </div>
                                );
                            }
                        })
                    }
                    <div className={styles.listTime}>
                        오후
                    </div>
                    {
                        certifyingImageList.map((eachList: any, index: number) => {
                            if (eachList.location === value && eachList.time === "오후") {
                                return (
                                    <div key={eachList.id} className={`${styles.eachList} ${index === active ? styles.active : ""}`} onClick={(e) => { activeMenu(index, eachList.id, eachList.description) }}>
                                        <div className={styles.eachListDiv}>{eachList.description}</div> <span className={`${styles.count} ${eachList.count === eachList.number ? styles.active : ""}`}>{eachList.count}/{eachList.number}</span>
                                    </div>
                                );
                            }
                        })
                    }
                    <div className={styles.listTime}>
                        저녁
                    </div>
                    {
                        certifyingImageList.map((eachList: any, index: number) => {
                            if (eachList.location === value && eachList.time === "저녁") {
                                return (
                                    <div key={eachList.id} className={`${styles.eachList} ${index === active ? styles.active : ""}`} onClick={(e) => { activeMenu(index, eachList.id, eachList.description) }}>
                                        <div className={styles.eachListDiv}>{eachList.description}</div> <span className={`${styles.count} ${eachList.count === eachList.number ? styles.active : ""}`}>{eachList.count}/{eachList.number}</span>
                                    </div>
                                );
                            }
                        })
                    }
                    {
                        value === "six" &&
                        <div className={styles.listTime}>
                            별도
                        </div>
                    }

                    {
                        certifyingImageList.map((eachList: any, index: number) => {
                            if (eachList.location === value && eachList.time === "별도") {
                                return (
                                    <div key={eachList.id} className={`${styles.eachList} ${index === active ? styles.active : ""}`} onClick={(e) => { activeMenu(index, eachList.id, eachList.description) }}>
                                        <div className={styles.eachListDiv}>{eachList.description}</div> <span className={`${styles.count} ${eachList.count === eachList.number ? styles.active : ""}`}>{eachList.count}/{eachList.number}</span>
                                    </div>
                                );
                            }
                        })
                    }
                </div>

                <div className={styles.imageBox}>
                    {alignment === "time" &&
                        images.map((eachImage: any) => {
                            if (eachImage.kind === value) {
                                const preTime = eachImage.name.split("_")[1];
                                const time = preTime.split(".")[0];
                                return (
                                    <div key={eachImage.id} className={styles.eachImage} onClick={(e) => { clickImage(e, eachImage.id, eachImage.title) }}>
                                        <div style={titleStyle} className={styles.title}>{eachImage.title} </div>
                                        <img ref={ref} style={imageStyle} className={`${styles.image} ${eachImage.title ? styles.active : ""}`} src={eachImage.url} alt="image" />
                                        <div className={styles.date}>{time[0]}{time[1]}시&nbsp;{time[2]}{time[3]}분&nbsp;{time[4]}{time[5]}초</div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>

                <div className={styles.titleImageBox}>
                    {
                        alignment === "title" &&
                        certifyingImageList.map((eachTitle: any, index: number) => {
                            if (eachTitle.location === value) {
                                return (
                                    <div key={eachTitle.id}>
                                        <div className={styles.eachTitle}>
                                            {eachTitle.description} - ({eachTitle.count}/{eachTitle.number})
                                        </div>
                                        <div className={`${styles.imageBox} ${styles.second}`}>
                                            {
                                                images.map((eachImage: any) => {
                                                    if (eachImage.kind === value && eachImage.title === eachTitle.description) {
                                                        const preTime = eachImage.name.split("_")[1];
                                                        const time = preTime.split(".")[0];
                                                        return (
                                                            <div key={eachImage.id} className={styles.eachImage} onClick={(e) => { clickImage(e, eachImage.id, eachImage.title) }}>
                                                                <img ref={ref} style={imageStyle} className={`${styles.image} ${eachImage.title ? styles.active : ""}`} src={eachImage.url} alt="image" />
                                                                <div className={`${styles.date} ${styles.second}`}>{time[0]}{time[1]}시&nbsp;{time[2]}{time[3]}분&nbsp;{time[4]}{time[5]}초</div>
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                    </div>
                                );
                            }
                        })
                    }
                    {
                        alignment === "title" &&
                        <>
                            <div className={styles.eachTitle}>
                                배정 안된 사진
                            </div>
                            <div className={`${styles.imageBox} ${styles.second}`}>
                                {
                                    images.map((eachImage: any) => {
                                        if (eachImage.kind === value && !eachImage.title) {
                                            const preTime = eachImage.name.split("_")[1];
                                            const time = preTime.split(".")[0];
                                            return (
                                                <div key={eachImage.id} className={styles.eachImage} onClick={(e) => { clickImage(e, eachImage.id, eachImage.title) }}>
                                                    <img ref={ref} style={imageStyle} className={`${styles.image} ${eachImage.title ? styles.active : ""}`} src={eachImage.url} alt="image" />
                                                    <div className={`${styles.date} ${styles.second}`}>{time[0]}{time[1]}시&nbsp;{time[2]}{time[3]}분&nbsp;{time[4]}{time[5]}초</div>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </>
                    }
                </div>
            </div>

        </div>
    )
}

export default PhotoManager;