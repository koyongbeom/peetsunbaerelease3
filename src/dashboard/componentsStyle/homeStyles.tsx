import { Theme } from "@mui/system";
import { url } from "inspector";


const styles: any = (theme: Theme) => ({
    main: {
        backgroundColor: "#f5f5f5",
        width: "calc(100% - 244px)",
        height: "calc(100vh - 78px)",
        paddingLeft: "46px",
        paddingTop: "48px",
        paddingBottom: "48px"
    },
    attendanceBoard: {
        display: "flex",
    },
    attendanceBoardWeek: {
        width: "568px",
        paddingBotton: "34.5px",
        backgroundColor: "#ffffff",
        marginRight: "28px"
    },
    attendanceBoardToday: {
        width: "568px",
        paddingBottom: "34.5px",
        backgroundColor: "#ffffff"
    },
    attendanceBoardTitle: {
        backgroundColor: "#ececec",
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: "33px",
        paddingRight: "36px",
        height: "54px",
        alignItems: "center"
    },
    attendanceBoardTitle_1: {
        fontFamily: "Apple_B",
        fontSize: "19px",
        letterspacing: "-0.95px",
        color: "#303030"
    },
    attendanceBoardTitle_2: {
        width: "81px",
        height: "32px",
        backgroundColor: "#ffffff",
        borderRadius: "28px",
        border: "1px solid #d4d4d4",
        lineHeight: "32px",
        textAlign: "center",
        fontFamily: "Apple_M",
        fontSize: "15px",
        letterSpacing: "-0.38px",
        color: "#3d50b0"
    },
    attendanceBoardDescription: {
        paddingLeft: "33px",
        paddingRight: "39px",
        paddingTop: "11.5px"
    },
    attendanceBoardDescription_1: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "16.5px",
        paddingBottom: "15.5px",
        borderBottom: "1px solid #e9e9e9"
    },
    attendanceBoardDescription_1_1: {
        fontFamily: "Apple_R",
        fontSize: "17px",
        color: "#303030",
        letterSpacing: "-0.85px"
    },
    attendanceBoardDescription_1_2: {
        fontFamily: "Apple_R",
        color: "#303030",
        letterSpacing: "-0.9px",
        fontSize: "18px"
    },
    attendanceBoardDescriptionHour: {
        fontSize: "22px",
        fontFamily: "Apple_R",
        color: "#d14e4e",
        display: "inline-block",
        marginRight: "6px"
    },
    attendanceBoardDescriptionMinute: {
        fontSize: "22px",
        fontFamily: "Apple_R",
        color: "#d14e4e",
        display: "inline-block",
        marginRight: "6px",
        marginLeft: "8px"
    },
    notificationDiv: {
        marginTop: "39px"
    },
    notificationTitle: {
        fontFamily: "Apple_B",
        fontSize: "22px",
        marginBottom: "16px"
    },
    notifications: {
        display: "flex"
    },
    notification: {
        marginRight: "19px"
    },
    notification_imageDiv: {
        width: "277px",
        height: "140px",
        backgroundSize: "cover"
    },
    notification_image: {
        width: "277px",
    },
    notification_description: {
        paddingLeft: "23px",
        paddingBottom: "21px",
        paddingRight: "21px",
        backgroundColor: "white",
    },
    notification_description_text: {
        paddingTop: "6px",
        paddingLeft: "23px",
        paddingBottom: "21px",
        paddingRight: "21px",
        backgroundColor: "white",
        width: "277px",
        height: "279px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    notification_description1: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "34px",
        paddingTop: "18px"
    },
    notification_description1_1: {
        width: "150px",
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize : "17px",
        fontFamily : "Apple_B",
        letterSpacing : "-0.85px"
    },
    notification_description2: {
        display: "flex",
        justifyContent: "space-between"
    },
    eachDescription: {
        fontSize : "15px",
        lineHeight : "22px",
        maxWidth: '100%',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 3,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginBottom : "70px",
        height : "65px",
        fontFamily : "Apple_L",
        letterSpacing : "-0.75px"
    },
    avatarText : {
        fontFamily : "Apple_R"
    },
    notification_description2_1 : {
        fontFamily : "Apple_L",
        letterSpacing : "-0.8px"
    },
    notification_description2_2 : {
        fontFamily : "Apple_L",
        cursor : "pointer"
    },
});

export default styles;