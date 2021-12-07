import { style } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import styles from "../componentsStyle/restaurant.module.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { AccountCircle } from '@mui/icons-material';
import { Socket } from 'socket.io-client';
import { CircularProgress } from "@mui/material";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Meals from './controls/meals';
import Totalmeals from './controls/totalmeals';
import koLocale from 'date-fns/locale/ko'

type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface restaurantProps extends RouteComponentProps {
    activateMenuList: (curret: currentSideBarMenuList) => void;
    user: {
        name: string;
        value: "student" | "teacher" | "parent" | "staff";
        id: number;
    } | undefined | null
    socket: Socket
}


const Restaurant: React.FC<restaurantProps> = (props) => {
    const [selectMenu, setSelectMenu] = useState("submit");

    const [restaurantList, setRestaurantList] = useState<any>();
    const [restaurantSelected, setRestaurantSelected] = useState<any>();

    const [openCharge, setOpenCharge] = useState(false);
    const [amount, setAmount] = useState(0);
    const [name, setName] = useState("");
    const [chargedAmount, setChargedAmount] = useState(0);
    const [chargePrev, setChargePrev] = useState(true);
    const [update, setUpdate] = useState(0);
    const [chargedBool, setChargedBool] = useState(false);
    const [uploadBool, setUploadBool] = useState(false);
    const handleOpenCharge = () => setOpenCharge(true);
    const handleCloseCharge = () => setOpenCharge(false);
    const [openUpload, setOpenUpload] = React.useState(false);
    const [uploadRestaurantName, setUploadRestaurantName] = useState("");
    const [uploadMealName, setUploadMealName] = useState("");
    const [uploadMealPrice, setUploadMealPrice] = useState(0);
    const [uploadFile, setUploadFile] = useState();
    const [uploadFileName, setUploadFileName] = useState();
    const [uploadLoading, setUploadLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [deadline, setDeadline] = useState<any>();

    const [lunchBool, setLunchBool] = useState(false);
    const [dinnerBool, setDinnerBool] = useState(false);

    const [dateValue, setDateValue] = useState(new Date());
    const [minDate, setMinDate] = useState(1);

    const [selectedMealName, setSelectedMealName] = useState("");
    const [selectedMealPrice, setSelectedMealPrice] = useState(0);
    const [selectedRestaurantName, setSelectedRestaurantName] = useState("");

    const [whenType, setWhenType] = useState<any>("none");

    const main = useRef<any>(null);

    const [mealMenu, setMealMenu] = useState<any>();

    const [lackOfBanlance, setLackOfBalance] = useState(false);
    const [duplicate, setDuplicate] = useState(false);
    const [timeOut, setTimeOut] = useState(false);
    const [success, setSuccess] = useState(false);
    const [nonSelect, setNonSelect] = useState(false);
    const [nonSelectMeal, setNonSelectMeal] = useState(false);


    const handleOpenUpload = () => setOpenUpload(true);
    const handleCloseUpload = () => setOpenUpload(false);

    useEffect(() => {

        props.activateMenuList("restaurant");
        if (props.user) {
            setName(props.user.name);
        }
    }, [])


    //처음 시작 할때 메뉴랑 포인트 가져오는 기능----------------------------------------------
    useEffect(() => {
        props.socket.on("newAmount", () => {
            const randomNumber = Math.floor(Math.random() * (99999 - 10000) + 10000);
            console.log("newAmount");
            setUpdate(randomNumber);
        })

        async function start() {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/restaurant/start", {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include",
            }).then((response: any) => {
                response.json()
                    .then((result: any) => {
                        console.log(result);
                        setChargedAmount(result.amount);
                        setMealMenu(result.meal);
                        setDeadline(result.deadline);
                        const array: any = [];
                        setRestaurantSelected(result.meal[0].restaurantName);
                        result.meal.forEach((each: any) => {
                            array.push(each.restaurantName);
                        });
                        const set: any = new Set(array);
                        setRestaurantList([...set]);

                    })
            })
        }
        start();

    }, [update]);
    //----------------------------------------------------------------------------------------

    useEffect(() => {
        if (deadline) {
            const date = new Date();
            const currentTimeInfo = date.getHours() * 60 + date.getMinutes();
            const lunchDeadlineInfo = deadline.lunchHours * 60 + deadline.lunchMinutes;
            const dinnerDeadlineInfo = deadline.dinnerHours * 60 + deadline.dinnerMinutes;


            var clickedDate;
            if (dateValue) {
                clickedDate = new Date(dateValue);
                console.log(clickedDate.getDate());
            }

            if (clickedDate?.getMonth() === date.getMonth() && clickedDate.getDate() === date.getDate()) {
                if (currentTimeInfo <= lunchDeadlineInfo) {
                    setLunchBool(true);
                    setDinnerBool(true);
                    setWhenType("none");
                } else if (currentTimeInfo > lunchDeadlineInfo && currentTimeInfo <= dinnerDeadlineInfo) {
                    setLunchBool(false);
                    setDinnerBool(true);
                    setWhenType("none");
                } else {
                    setLunchBool(false);
                    setDinnerBool(false);
                }
            }
        }
    }, [deadline])

    const changeSelectedMenu = (e: any, type: string) => {
        switch (type) {
            case "submit": setSelectMenu("submit"); break;
            case "check": setSelectMenu("check"); break;
            case "total": setSelectMenu("total"); break;
        }
    }

    const handleChangeAmount = (e: any) => {
        const targetAmount = e.target.value;

        if (targetAmount && (+targetAmount > 0) && (+targetAmount) + (+chargedAmount) <= 30000) {
            setChargedBool(true);
        } else {
            setChargedBool(false);
        }

        setAmount(e.target.value);
    }

    const handleChangeName = (e: any) => {
        setName(e.target.value);
    }

    const handleChargePrev = async (e: any) => {
        setChargePrev(false);

        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/restaurant/charge", {
            method: "POST",
            headers: { "Authorization": token, "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                amount: amount,
                name: name
            })
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                })
        })
    }

    const handleUploadRestaurantName = (e: any) => {
        setUploadRestaurantName(e.target.value);
        if (e.target.value && uploadMealName && +uploadMealPrice > 0 && uploadFile) {
            setUploadBool(true);
        }
    }

    const handleUploadMealName = (e: any) => {
        setUploadMealName(e.target.value);
        if (uploadRestaurantName && e.target.value && +uploadMealPrice > 0 && uploadFile) {
            setUploadBool(true);
        }
    }

    const handleUploadMealPrice = (e: any) => {
        setUploadMealPrice(e.target.value);
        if (uploadRestaurantName && uploadMealName && +e.target.value > 0 && uploadFile) {
            setUploadBool(true);
        }
    }

    //답변에 사진 올리기 기능-----------------------------------------------------------
    const fileOnChange = (event: any) => {
        if (event.target.files.length > 0) {
            if (uploadRestaurantName && uploadMealName && +uploadMealPrice > 0) {
                setUploadBool(true);
            }

            console.log(event.target.files);
            console.log(event.target.files[0].name);

            if (event.target) {
                setUploadFile(event.target.files[0]);
                setUploadFileName(event.target.files[0].name);
            }
        }
    }
    //-----------------------------------------------------------------------

    const deleteFile = (event: any) => {
        var VOID;
        setUploadFile(VOID);
        setUploadFileName(VOID);
        setUploadBool(false);
    }

    const uploadSubmit = (event: any) => {
        event.preventDefault();
        setUploadLoading(true);

        console.log(1);

        var formData = new FormData();
        var message = { restaurantName: uploadRestaurantName, mealName: uploadMealName, mealPrice: uploadMealPrice };
        formData.append("message", JSON.stringify(message));

        console.log(uploadFile);

        if (uploadFile) {
            formData.append("meal_picture", uploadFile);
        }

        console.log(message);

        var token = "";

        if (window.electron) {
            token = window.electron.sendMessageApi.getToken();
        }

        fetch("https://peetsunbae.com/dashboard/restaurant/write", {
            method: "POST",
            headers: { "Authorization": token },
            credentials: "include",
            body: formData
        }).then((response) => {
            response.json()
                .then((response) => {
                    console.log(response);
                    if (response.message === "success") {

                        setUploadLoading(false);
                        setUploadMealName("");
                        setUploadRestaurantName("");
                        setUploadMealPrice(0);
                        deleteFile(1);

                        const random = Math.floor(Math.random() * 999999);
                        setUpdate(random);
                    }
                })
        }).catch((error) => {
            console.log(error);
        })
    }

    const selectedMenu = (e: any, name: string, price: number, restaurant: string) => {
        if (main.current) {
            main.current.scrollTo({ top: 250, behavior: "smooth" })
        }
        setSelectedMealName(name);
        setSelectedMealPrice(price);
        setSelectedRestaurantName(restaurant);
    }

    const styleCharge = {
        borderRadius: "6px",
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
    };

    const styleUpload = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        p: 4,
    };

    const submitMeal = () => {
        console.log(1);
        console.log(whenType);
        console.log(selectedMealName);
        console.log(+chargedAmount < +selectedMealPrice);
        if (+chargedAmount < +selectedMealPrice) {
            console.log(11111);
            setLackOfBalance(true);
            setTimeout(() => {
                setLackOfBalance(false);
            }, 1000)
        } else if (whenType === "none") {
            setNonSelect(true);
            setTimeout(() => {
                setNonSelect(false);
            }, 1000)
        } else if (!selectedMealName) {
            setNonSelectMeal(true);
            setTimeout(() => {
                setNonSelectMeal(false);
            }, 1000)
        } else if (dateValue) {
            setSubmitLoading(true);
            const date = new Date(dateValue);
            console.log(date.getHours());

            var token = "";

            if (window.electron) {
                token = window.electron.sendMessageApi.getToken();
            }

            fetch("https://peetsunbae.com/dashboard/restaurant/order", {
                method: "POST",
                headers: { "Authorization": token, "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    targetYear: date.getFullYear(),
                    targetMonth: date.getMonth() + 1,
                    targetDate: date.getDate(),
                    whenType: whenType,
                    restaurantName: selectedRestaurantName,
                    mealName: selectedMealName,
                    price: selectedMealPrice
                })
            }).then((response) => {
                response.json()
                    .then((response) => {
                        setSubmitLoading(false);
                        console.log(response);
                        if (response.message === "TIME_OUT") {
                            setTimeOut(true);
                            setTimeout(() => {
                                setTimeOut(false);
                            }, 1500);
                        } else if (response.message === "LACK_BALANCE") {
                            setLackOfBalance(true);
                            setTimeout(() => {
                                setLackOfBalance(false);
                            }, 1500);
                        } else if (response.message === "success") {
                            setSuccess(true);
                            const randomNumber = Math.floor(Math.random() * (99999 - 10000) + 10000);
                            setUpdate(randomNumber);
                            setTimeout(() => {
                                setSuccess(false);
                            }, 1500);
                        } else if (response.message === "DUPLICATE") {
                            setDuplicate(true);
                            setTimeout(() => {
                                setDuplicate(false);
                            }, 1500);
                        }
                    })
            }).catch((error) => {
                console.log(error);
            })


        }
    }

    const letsUpdate = () => {
        const random = Math.floor(Math.random() * 999999);
        setUpdate(random);
    }

    const disableWeekends = (date: any) => {
        return date.getDay() === 0 || date.getDay() === 6;
    }

    return (
        <div ref={main} className={styles.main}>

            <div className={styles.mainTitle}>
                <img className={styles.mainImg} src="img/restaurant.svg" /> 도시락 신청
            </div>

            <div className={styles.selectMenu}>
                <div onClick={(e) => { changeSelectedMenu(e, "submit") }} className={`selectedMenu ${selectMenu === "submit" ? "active" : ""}`}>
                    도시락 신청하기
                </div>
                <div onClick={(e) => { changeSelectedMenu(e, "check") }} className={`selectedMenu ${selectMenu === "check" ? "active" : ""}`}>
                    나의 신청 현황
                </div>
                {
                    (props.user && (props.user.value === "teacher" || props.user.value === "staff")) &&
                    <div onClick={(e) => { changeSelectedMenu(e, "total") }} className={`selectedMenu ${selectMenu === "total" ? "active" : ""}`}>
                        전체 신청 현황
                    </div>
                }
            </div>

            {selectMenu === "submit" &&
                <>
                    <div className={styles.restaurantList}>
                        {restaurantList && restaurantList.map((restaurant: string) => {
                            return (
                                <div onClick={(e) => { setRestaurantSelected(restaurant) }} className={`${styles.restaurant} ${restaurantSelected === restaurant ? styles.active : ""}`} data-restaurant={restaurant}>
                                    {restaurant}
                                </div>
                            )
                        })}
                    </div>

                    <div className={styles.board}>
                        <div className={styles.menu}>

                            <div className={styles.moneyCharge}>
                                <div>
                                    - 충전금 잔액 : <span className={styles.money}>{chargedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
                                </div>
                                <div onClick={handleOpenCharge}>
                                    충전하기 <img src="img/navigate_next_black_24dp.svg" alt="right" />
                                </div>
                            </div>



                            <div className={styles.mealMenuBoard}>
                                {
                                    mealMenu && mealMenu.map((menu: any, index: number) => {
                                        if (restaurantSelected === menu.restaurantName) {
                                            return (
                                                <div className={`${styles.eachMenu}`}>
                                                    <div className={styles.imgBox}>
                                                        <img className={styles.image} src={`https://peetsunbae.com/${menu.src.split("/public/")[1]}`}></img>
                                                        <div onClick={(e) => { selectedMenu(e, menu.mealName, menu.mealPrice, menu.restaurantName) }} className={styles.mealSelect}>
                                                            <img className={styles.heart} src="img/heart.svg" alt="heart"></img>
                                                            <div className={styles.menuSelectText}>선택하기</div>
                                                        </div>
                                                    </div>
                                                    <div className={styles.menuTitle}>
                                                        {menu.mealName}
                                                    </div>
                                                    <div className={styles.menuPriceDiv}>
                                                        <span className={styles.menuPrice}>{menu.mealPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span> 원
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })
                                }
                            </div>
                        </div>
                        <div className={styles.schedule}>
                            <div className={styles.selectedMealMenu}>
                                - 선택메뉴 : <span>{selectedMealName}</span>
                            </div>
                            <div className={styles.calendarDiv}>
                                <LocalizationProvider locale={koLocale} dateAdapter={AdapterDateFns}>
                                    <StaticDatePicker
                                        shouldDisableDate={disableWeekends}
                                        displayStaticWrapperAs="desktop"
                                        openTo="day"
                                        value={dateValue}
                                        disablePast
                                        minDate={minDate}
                                        onChange={(newValue: any) => {
                                            console.log(newValue);
                                            setDateValue(newValue);
                                            const date = new Date(newValue);
                                            const today = new Date();
                                            if (!(date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate())) {
                                                setLunchBool(true);
                                                setDinnerBool(true);
                                                setWhenType("none");
                                            } else {
                                                if (deadline) {
                                                    const date = new Date();
                                                    const currentTimeInfo = date.getHours() * 60 + date.getMinutes();
                                                    const lunchDeadlineInfo = deadline.lunchHours * 60 + deadline.lunchMinutes;
                                                    const dinnerDeadlineInfo = deadline.dinnerHours * 60 + deadline.dinnerMinutes;

                                                    if (dateValue) {
                                                        const clickedDate = new Date(dateValue);
                                                        console.log(clickedDate.getDate());
                                                    }

                                                    if (currentTimeInfo <= lunchDeadlineInfo) {
                                                        setLunchBool(true);
                                                        setDinnerBool(true);
                                                        setWhenType("none");
                                                    } else if (currentTimeInfo > lunchDeadlineInfo && currentTimeInfo <= dinnerDeadlineInfo) {
                                                        setLunchBool(false);
                                                        setDinnerBool(true);
                                                        setWhenType("none");
                                                    } else {
                                                        setLunchBool(false);
                                                        setDinnerBool(false);
                                                    }
                                                }
                                            }
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>



                            <div className={styles.submitDiv}>
                                <div className={styles.whenDiv}>
                                    <div className={`${styles.when} ${whenType === "lunch" ? styles.active : ""}  ${lunchBool ? "" : styles.disabled}`} onClick={(e: any) => { if (lunchBool) { setWhenType("lunch") } }}>
                                        점심
                                    </div>
                                    <div className={`${styles.when} ${whenType === "dinner" ? styles.active : ""} ${dinnerBool ? "" : styles.disabled}`} onClick={(e: any) => { if (dinnerBool) { setWhenType("dinner") } }}>
                                        저녁
                                    </div>
                                </div>
                                <div className={styles.priceDiv}>
                                    금액 : <span>{selectedMealPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
                                </div>

                                <div className={styles.alert}>
                                    {lackOfBanlance && <Alert severity="error"><span className={styles.alertSpan}>잔액이 부족합니다.</span></Alert>}
                                    {timeOut && <Alert severity="error"><span className={styles.alertSpan}>신청가능 시간이 지났습니다.</span></Alert>}
                                    {nonSelect && <Alert severity="error"><span className={styles.alertSpan}>점심/저녁 선택해주세요.</span></Alert>}
                                    {nonSelectMeal && <Alert severity="error"><span className={styles.alertSpan}>도시락을 선택해주세요.</span></Alert>}
                                    {duplicate && <Alert severity="error"><span className={styles.alertSpan}>이미 해당 시간에 도시락 주문을 하셨습니다.</span></Alert>}
                                    {success && <Alert severity="info"><span className={styles.alertSpan}>도시락 신청 성공</span></Alert>}
                                    {submitLoading && <div className="answerloading">
                                        <CircularProgress />
                                    </div>}
                                </div>

                                <div onClick={submitMeal} className={styles.submitBtn}>
                                    신청하기 <img src="img/chevron-right-regular.svg" alt="chevronRight"></img>
                                </div>
                            </div>


                        </div>
                    </div>




                    {(props.user?.value === "teacher" || props.user?.value === "staff") &&
                        <div onClick={handleOpenUpload} className="qnaWrite">
                            <img src="./img/pencil.svg" alt="pencil" />
                            도시락 업로드
                        </div>
                    }


                    {/* 충전금 잔액 충전용 모달 */}
                    <Modal
                        open={openCharge}
                        onClose={handleCloseCharge}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={styleCharge}>


                            <div className={styles.chargeTitle}>
                                충전하기
                            </div>

                            {chargePrev &&
                                <>
                                    <div className={styles.chargeBoard}>
                                        <FormControl fullWidth>
                                            <div className={styles.chargeAmount}>충전금액</div>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                value={amount}
                                                onChange={handleChangeAmount}
                                                startAdornment={<InputAdornment position="start">₩</InputAdornment>}
                                            />
                                        </FormControl>

                                        <FormControl fullWidth>
                                            <div className={styles.chargeName}>받는 분 통장 표시</div>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                value={name}
                                                onChange={handleChangeName}
                                            />
                                        </FormControl>


                                    </div>

                                    <div className={styles.chargeBtnDiv}>
                                        {chargedBool ?
                                            <div onClick={handleChargePrev} className={styles.chargeBtn}>
                                                충전하기
                                            </div>
                                            :
                                            <div className={styles.disabledChargedBtn}>
                                                충전하기
                                            </div>
                                        }

                                    </div>
                                </>
                            }
                            {!chargePrev &&
                                <>
                                    <div className={styles.accountInfoDiv}>
                                        <div className={styles.accountInfoTitle}>
                                            입금정보
                                        </div>
                                        <div className={styles.accountInfoDescription}>
                                            <div className={styles.accountInfoBank}>
                                                <div>
                                                    - 입금은행
                                                </div>
                                                <div>
                                                    신한은행
                                                </div>
                                            </div>
                                            <div className={styles.accountInfoNumber}>
                                                <div>
                                                    - 계좌번호
                                                </div>
                                                <div>
                                                    110-238-365349
                                                </div>
                                            </div>
                                            <div className={styles.accountInfoName}>
                                                <div>
                                                    - 예금주
                                                </div>
                                                <div>
                                                    고용범
                                                </div>
                                            </div>
                                            <div className={styles.accountInfoAmount}>
                                                <div>
                                                    - 신청금액
                                                </div>
                                                <div>
                                                    {amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                                                </div>
                                            </div>
                                            <div className={styles.accountInfoAddDesc}>
                                                <div>
                                                    - 통장표시
                                                </div>
                                                <div>
                                                    {name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.accountInfoAdd}>
                                            - 30분안에 입금하시면 충전금 잔액에 반영됩니다.
                                        </div>
                                        <div className={styles.accountInfoAdd2}>
                                            - 입금내역과 신청금액, 통장표시가 동일해야 반영됩니다.
                                        </div>
                                    </div>
                                </>
                            }



                        </Box>
                    </Modal>



                    {/* 도시락 업로드용 모달 */}
                    <Modal
                        open={openUpload}
                        onClose={handleCloseUpload}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={styleCharge}>

                            <form encType="multipart/formdata">

                                <div className={styles.chargeTitle}>
                                    도시락 업로드
                                </div>

                                <div className={styles.chargeBoard}>


                                    <FormControl fullWidth>
                                        <div className={styles.chargeName}>업체명</div>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            value={uploadRestaurantName}
                                            onChange={handleUploadRestaurantName}
                                        />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <div className={styles.chargeName}>도시락 이름</div>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            value={uploadMealName}
                                            onChange={handleUploadMealName}
                                        />
                                    </FormControl>

                                    <FormControl fullWidth>
                                        <div className={styles.chargeAmount2}>가격</div>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            value={uploadMealPrice}
                                            onChange={handleUploadMealPrice}
                                            startAdornment={<InputAdornment position="start">₩</InputAdornment>}
                                        />
                                    </FormControl>

                                    {
                                        uploadFile ?
                                            <div className="answerFile" style={{ marginTop: "16px" }}>
                                                <div className="answerFileTitle">
                                                    <img className="uploadedFileClip" src="img/paperclip-light.svg" alt="file" />
                                                    <div>{uploadFileName}</div>
                                                </div>
                                                <div>
                                                    <img onClick={deleteFile} className="uploadedFileTrash" src="img/trash-alt-light.svg" alt="config" />
                                                </div>
                                            </div> : ""
                                    }


                                    <div className={styles.uploadFileDiv}>
                                        <label htmlFor="file">
                                            <div className={styles.uploadFile}>
                                                <img className="clip" src="img/paperclip-light.svg" alt="file" /><span> 가로 세로 같은 사이즈 사진</span>
                                            </div>
                                        </label>
                                        <input onChange={(e) => fileOnChange(e)} type="file" name="file" id="file" accept="image/*" hidden />
                                    </div>


                                </div>

                                <div className={styles.chargeBtnDiv}>

                                    {uploadLoading ?
                                        <div className="answerloading">
                                            <CircularProgress />
                                        </div> : ""
                                    }
                                    {uploadBool ?
                                        <div onClick={uploadSubmit} className={styles.chargeBtn}>
                                            업로드
                                        </div>
                                        :
                                        <div className={styles.disabledChargedBtn}>
                                            업로드
                                        </div>
                                    }

                                </div>
                            </form>
                        </Box>
                    </Modal>
                </>
            }
            {
                selectMenu === "check" && <Meals letsUpdate={letsUpdate} />
            }
            {
                selectMenu === "total" && <Totalmeals />
            }
        </div>
    )
}

export default Restaurant;