import { RouteComponentProps } from 'react-router';
import { Alert, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField'
import { ClassNames } from '@emotion/react';
import { Link } from 'react-router-dom';
import { RepeatOneSharp } from '@mui/icons-material';
import { Socket } from 'socket.io-client';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress'

import styles from "../componentsStyle/upload.module.css";

import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import Mysearch from './controls/mysearch';
import Totalsearch from './controls/totalsearch';
import CoachingReview from './controls/coachingreview';
import LifeReview from './controls/lifereview';

type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface searchProps extends RouteComponentProps {
    user: any;
    activateMenuList: (curret: currentSideBarMenuList) => void;
}

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#d32f2f',
    },
    '& .MuiRating-iconHover': {
        color: '#d32f2f',
    },
});


const Search: React.FC<searchProps> = (props) => {



    useEffect(() => {
        props.activateMenuList("search");

        async function start() {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/search/questions", {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include"
            }).then((response) => {
                setLoading(false);
                response.json()
                    .then((result) => {
                        console.log(result);
                        if(result.message === "success"){
                            const coachingResult = result.coachingResult;
                            const lifeResult = result.lifeResult;

                            setCoachingFirstQuestion(coachingResult[0].question);
                            setCoachingSecondQuestion(coachingResult[1].question);
                            setCoachingThirdQuestion(coachingResult[2].question);
                            setCoachingFourthQuestion(coachingResult[3].question);

                            setLifeFirstQuestion(lifeResult[0].question);
                            setLifeSecondQuestion(lifeResult[1].question);
                            setLifeThirdQuestion(lifeResult[2].question);
                            setLifeFourthQuestion(lifeResult[3].question);
                        }
                    })
            }).catch((error) => {
                console.log(error);
            })
        }
        start();
    }, [])

    const [searchMenu, setSearchMenu] = useState("write");

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const [files, setFiles] = useState<any>([]);
    const [filenames, setFileNames] = useState<string[]>([]);

    const [titleExist, setTitleExist] = useState(false);
    const [descriptionExist, setDescriptionExsit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadBool, setUploadBool] = useState(false);
    const [errorBool, setErrorBool] = useState(false);
    const [kindValue, setKindValue] = useState("live");

    const [alignment, setAlignment] = React.useState('named');

    const [satisfyRating, setSatisfyRating] = useState(2);
    const [curriculumRating, setCurriculumRating] = useState(2);
    const [consultRating, setConsultRating] = useState(2);
    const [hopeRating, setHopeRating] = useState(2);

    const [coachingFirstQuestion, setCoachingFirstQuestion] = useState("");
    const [coachingSecondQuestion, setCoachingSecondQuestion] = useState("");
    const [coachingThirdQuestion, setCoachingThirdQuestion] = useState("");
    const [coachingFourthQuestion, setCoachingFourthQuestion] = useState("");

    const [lifeFirstQuestion, setLifeFirstQuestion] = useState("");
    const [lifeSecondQuestion, setLifeSecondQuestion] = useState("");
    const [lifeThirdQuestion, setLifeThirdQuestion] = useState("");
    const [lifeFourthQuestion, setLifeFourthQuestion] = useState("");


    const change = (e: any, type: string) => {
        setKindValue(e.target.value);
    }

    const ratingChange = (event: any, newValue: any, type: string) => {
        switch (type) {
            case "satisfy":
                setSatisfyRating(newValue);
                break;
            case "curriculum":
                setCurriculumRating(newValue);
                break;
            case "consult":
                setConsultRating(newValue);
                break;
            case "hope":
                setHopeRating(newValue);
                break;
        }
    }

    const selectChange = (e: any, value: any) => {

    }



    const writeTitle = (event: any) => {
        setTitle(event.target.value);
        setUploadBool(false);
        if (event.target.value) {
            setTitleExist(true);
        } else {
            setTitleExist(false);
        }
    }

    const writeDescription = (event: any) => {
        setDescription(event.target.value);
        setUploadBool(false);
        if (event.target.value) {
            setDescriptionExsit(true);
        } else {
            setDescriptionExsit(false);
        }
    }

    const fileOnChange = (event: any) => {
        if (event.target) {
            const length = event.target.files.length;
            var i;
            var newFilenames = filenames;
            var newFiles = files;
            for (i = 0; i < length; i++) {
                newFilenames = [...newFilenames, event.target.files[i].name];
                newFiles.push(event.target.files[i]);
            }
            setFiles(newFiles);
            setFileNames(newFilenames);
        }
    }

    const deleteImage = (event: any) => {
        if (event.target) {
            console.log(files.length);
            var newFilenames = filenames;
            var newFiles = files;
            newFilenames = newFilenames.filter((filename) => (filename !== event.target.dataset.name));
            newFiles = newFiles.filter((file: any) => (file.name !== event.target.dataset.name));
            setFileNames(newFilenames);
            setFiles(newFiles);
        }
    }

    const submit = async (e: any) => {
        e.preventDefault();

        if (kindValue === "review") {

            console.log(satisfyRating);
            console.log(curriculumRating);
            console.log(consultRating);
            console.log(hopeRating);

            setLoading(true);

            const data = { satisfyRating, curriculumRating, consultRating, hopeRating, description, alignment }

            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/search/rating", {
                method: "POST",
                headers: { "Authorization": token, "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);
                        setLoading(false);
                        if (result.message === "success") {
                            console.log("success");
                            setTitle("");
                            setDescription("");
                            setFiles([]);
                            setFileNames([]);
                            setUploadBool(true);
                            setTitleExist(false);
                            setDescriptionExsit(false);
                            setTimeout(() => {
                                setUploadBool(false);
                            }, 2000);
                        } else if (result.message === "DUPLICATED") {
                            setErrorBool(true);
                            setTimeout(() => {
                                setErrorBool(false);
                            }, 2000);
                        }
                    })
            })

        } else if (kindValue === "life") {

            console.log(satisfyRating);
            console.log(curriculumRating);
            console.log(consultRating);
            console.log(hopeRating);

            setLoading(true);

            const data = { satisfyRating, curriculumRating, consultRating, hopeRating, description, alignment }

            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/search/liferating", {
                method: "POST",
                headers: { "Authorization": token, "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);
                        setLoading(false);
                        if (result.message === "success") {
                            console.log("success");
                            setTitle("");
                            setDescription("");
                            setFiles([]);
                            setFileNames([]);
                            setUploadBool(true);
                            setTitleExist(false);
                            setDescriptionExsit(false);
                            setTimeout(() => {
                                setUploadBool(false);
                            }, 2000);
                        } else if (result.message === "DUPLICATED") {
                            setErrorBool(true);
                            setTimeout(() => {
                                setErrorBool(false);
                            }, 2000);
                        }
                    })
            })
        } else {
            setLoading(true);

            var formData = new FormData();
            var message = { kindValue: kindValue, description: description, named: alignment };
            formData.append("message", JSON.stringify(message));

            files.forEach((file: any) => {
                formData.append('opinion_picture', file);
            })

            var token = "";

            if (window.electron) {
                token = window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/search/opinion", {
                method: "POST",
                headers: { "Authorization": token },
                credentials: "include",
                body: formData
            }).then((response) => {
                response.json()
                    .then((response) => {
                        console.log(response);
                        setLoading(false);
                        if (response.message === "success") {
                            setTitle("");
                            setDescription("");
                            setFiles([]);
                            setFileNames([]);
                            setUploadBool(true);
                            setTitleExist(false);
                            setDescriptionExsit(false);
                            setTimeout(() => {
                                setUploadBool(false);
                            }, 2000);
                        }
                        if (response.message === "DUPLICATED") {

                        }
                    })
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        console.log(newAlignment);
        setAlignment(newAlignment);
    };





    return (
        <div className={styles.main}>

            <div className={styles.mainBoard}>
                <div className={styles.title}>
                    <img src="img/off/chart.svg" alt="chart" /> 의견 보내기
                </div>

                <div className={styles.searchMenu}>
                    <div onClick={(e) => { setSearchMenu("write") }} className={`${styles.searchMenuDiv} ${searchMenu === "write" ? styles.active : ""}`}>
                        건의사항 작성
                    </div>
                    <div onClick={(e) => { setSearchMenu("watch") }} className={`${styles.searchMenuDiv} ${searchMenu === "watch" ? styles.active : ""}`}>
                        나의 건의사항
                    </div>
                    {(props.user && (props.user.value==="teacher" || props.user.value === "staff")) &&
                    <div onClick={(e) => { setSearchMenu("total") }} className={`${styles.searchMenuDiv} ${searchMenu === "total" ? styles.active : ""}`}>
                        전체 건의사항
                    </div>
                    }
                    {(props.user && (props.user.value==="teacher" || props.user.value === "staff")) &&
                    <div onClick={(e) => { setSearchMenu("coaching") }} className={`${styles.searchMenuDiv} ${searchMenu === "coaching" ? styles.active : ""}`}>
                        전체 담임평가
                    </div>
                    }
                    {(props.user && (props.user.value==="teacher" || props.user.value === "staff")) &&
                    <div onClick={(e) => { setSearchMenu("life") }} className={`${styles.searchMenuDiv} ${searchMenu === "life" ? styles.active : ""}`}>
                        전체 생활평가
                    </div>
                    }
                </div>

                {searchMenu === "write" &&
                    <>
                        <div className={styles.titleDescriptionDiv}>
                            <div className={styles.titleDescription}>
                                * 모든 신청/건의사항/메세지는 이곳에서 보내주시기 바랍니다.<br />
                                * 영업일 2일 이내 답변 드리는 것을 규칙으로 합니다.<br />
                                * 익명 업로드의 경우 운영진도 작성자 확인이 불가능합니다.
                            </div>
                            <div className={styles.isName}>
                                <ToggleButtonGroup
                                    sx={{ marginBottom: "12px", backgroundColor: "white" }}
                                    color="primary"
                                    value={alignment}
                                    exclusive
                                    onChange={handleChange}
                                >
                                    <ToggleButton value="named"><span className={styles.toggleText}>실명</span></ToggleButton>
                                    <ToggleButton value="nonamed"><span className={styles.toggleText}>익명</span></ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>



                        <form encType="multipart/formdata">



                            <div className={styles.kindDiv}>
                                <div className={styles.divStyle}>종류</div>
                                <FormControl sx={{ minWidth: "100%", backgroundColor: "white" }}>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        value={kindValue}
                                        onChange={(e) => { change(e, "kind") }}
                                        autoWidth
                                        placeholder="어떤 종류의 의견인가요?"
                                    >
                                        <MenuItem value="live">
                                            <span className={styles.dayText}>생활</span>
                                        </MenuItem>
                                        <MenuItem value="change">
                                            <span className={styles.dayText}>자리변경</span>
                                        </MenuItem>
                                        <MenuItem value="consult"><span className={styles.dayText}>담임상담</span></MenuItem>
                                        <MenuItem value="question"><span className={styles.dayText}>질의응답</span></MenuItem>
                                        <MenuItem value="coaching"><span className={styles.dayText}>과외</span></MenuItem>
                                        <MenuItem value="ceo"><span className={styles.dayText}>대표에게만</span></MenuItem>
                                        <MenuItem value="etc"><span className={styles.dayText}>기타</span></MenuItem>
                                        <MenuItem value="review"><span className={styles.dayText}>담임평가</span></MenuItem>
                                        <MenuItem value="life"><span className={styles.dayText}>생활평가</span></MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            {
                                (kindValue === "review" || kindValue === "life") &&
                                <div className={styles.reviewDiv}>
                                    <div className={styles.reviewTitle}>
                                        {new Date().getMonth() + 1}월 {kindValue === "review" ? "담임평가" : "생활평가"}
                                    </div>
                                    <div className={styles.satisfyDiv}>
                                        <Box
                                            sx={{
                                                '& > legend': { mt: 2 },
                                            }}
                                        >
                                            <div className={styles.divStyle}>ㆍ {kindValue === "review" ? coachingFirstQuestion : lifeFirstQuestion }</div>
                                            <div className={styles.heartDiv}>
                                                <StyledRating
                                                    size="large"
                                                    name="customized-color"
                                                    value={satisfyRating}
                                                    onChange={(event, newValue) => { ratingChange(event, newValue, "satisfy") }}
                                                    defaultValue={2}
                                                    getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                                    precision={0.5}
                                                    icon={<FavoriteIcon fontSize="inherit" />}
                                                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                                />
                                            </div>
                                        </Box>
                                    </div>
                                    <div className={styles.satisfyDiv}>
                                        <Box
                                            sx={{
                                                '& > legend': { mt: 2 },
                                            }}
                                        >
                                            <div className={styles.divStyle}>ㆍ {kindValue === "review" ? coachingSecondQuestion : lifeSecondQuestion }</div>
                                            <div className={styles.heartDiv}>
                                                <StyledRating
                                                    size="large"
                                                    name="customized-color"
                                                    value={curriculumRating}
                                                    onChange={(event, newValue) => { ratingChange(event, newValue, "curriculum") }}

                                                    defaultValue={2}
                                                    getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                                    precision={0.5}
                                                    icon={<FavoriteIcon fontSize="inherit" />}
                                                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                                />
                                            </div>
                                        </Box>
                                    </div>
                                    <div className={styles.satisfyDiv}>
                                        <Box
                                            sx={{
                                                '& > legend': { mt: 2 },
                                            }}
                                        >
                                            <div className={styles.divStyle}>ㆍ {kindValue === "review" ? coachingThirdQuestion : lifeThirdQuestion}</div>
                                            <div className={styles.heartDiv}>
                                                <StyledRating
                                                    size="large"
                                                    name="customized-color"
                                                    value={consultRating}
                                                    onChange={(event, newValue) => { ratingChange(event, newValue, "consult") }}

                                                    defaultValue={2}
                                                    getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                                    precision={0.5}
                                                    icon={<FavoriteIcon fontSize="inherit" />}
                                                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                                />
                                            </div>
                                        </Box>
                                    </div>
                                    <div className={styles.satisfyDiv}>
                                        <Box
                                            sx={{
                                                '& > legend': { mt: 2 },
                                            }}
                                        >
                                            <div className={styles.divStyle}>ㆍ {kindValue === "review" ? coachingFourthQuestion : lifeFourthQuestion }</div>
                                            <div className={styles.heartDiv}>
                                                <StyledRating
                                                    size="large"
                                                    name="customized-color"
                                                    defaultValue={2}
                                                    value={hopeRating}
                                                    onChange={(event, newValue) => { ratingChange(event, newValue, "hope") }}

                                                    getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                                    precision={0.5}
                                                    icon={<FavoriteIcon fontSize="inherit" />}
                                                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                                />
                                            </div>
                                        </Box>
                                    </div>
                                </div>
                            }

                            <div>
                                <div className={styles.divStyle}>{(kindValue === "review" || kindValue === "life") ? "ㆍ요청사항이나 개선사항을 적어주세요" : "내용"}</div>
                                <TextField value={description} onChange={writeDescription} required sx={{ backgroundColor: "white", marginBottom: 1 }} id="description" multiline rows={(kindValue === "review" || kindValue === "life") ? 3 : 12} fullWidth variant="outlined" placeholder="내용을 적어주세요 : )" />
                            </div>

                            {!(kindValue === "review" || kindValue === "life") &&
                                <div className={styles.filenameDiv}>
                                    <label htmlFor="file">
                                        <img className={styles.imageStyle} src="img/images-light.svg" alt="images">
                                        </img>
                                    </label>
                                    <div className={styles.filenameStyle}>
                                        {filenames.map((filename) => (<div className={styles.filenameDivStyle} data-name={filename} key={filename}>{filename}<img onClick={(e) => { deleteImage(e); }} className={styles.times} data-name={filename} alt="cancel" src="img/times-light.svg"></img></div>))}
                                    </div>
                                    <input onChange={(e) => { fileOnChange(e) }} type="file" name="file" id="file" accept="image/*" multiple hidden />
                                </div>
                            }



                            {loading &&
                                <Box sx={{ width: '100%', marginTop: 3, marginBottom: 3 }}>
                                    <LinearProgress />
                                </Box>
                            }

                            {errorBool &&
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="error" sx={{ marginTop: 2, marginBottom: 2 }}><span className={styles.spanStyles2}>이미 {new Date().getMonth() + 1}월 평가를 하였습니다 !</span></Alert>
                                </Stack>
                            }




                            {uploadBool &&
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="info" sx={{ marginTop: 2, marginBottom: 2 }}><span className={styles.spanStyles2}>업로드 성공 !</span></Alert>
                                </Stack>
                            }


                            <div className={styles.buttonStyles}>
                                <Link to="/dashboard/home">
                                    <Button sx={{ marginRight: 2 }} variant="outlined" size="large" component="label">
                                        <span className={styles.spanStyles2}>닫기</span>
                                    </Button>
                                </Link>
                                <Button disabled={!descriptionExist} onClick={(e: any) => { submit(e); }} variant="outlined" size="large" component="label">
                                    <span className={styles.spanStyles2}>내용 업로드</span>
                                </Button>
                            </div>



                        </form>
                    </>
                }

                {searchMenu === "watch" &&
                <div>
                    <Mysearch />
                </div>
                }
                {searchMenu === "total" &&
                <div>
                    <Totalsearch />
                </div>
                }
                {searchMenu === "coaching" &&
                <div>
                    <CoachingReview />
                </div>
                }
                {searchMenu === "life" &&
                <div>
                    <LifeReview />
                </div>
                }

            </div>
        </div>
    )
}

export default Search;