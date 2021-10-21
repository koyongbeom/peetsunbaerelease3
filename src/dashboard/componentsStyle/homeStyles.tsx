import { Theme } from "@mui/system";


const styles : any = (theme : Theme) => ({
    main : {
        backgroundColor : "#f5f5f5",
        width : "calc(100% - 244px)",
        height : "100vh",
        paddingLeft : "46px",
        paddingTop : "48px",
        paddingBottom : "48px"  
    },
    attendanceBoard : {
        display : "flex",
    },
    attendanceBoardWeek : {
        width : "568px",
        paddingBotton : "34.5px",
        backgroundColor : "#ffffff",
        marginRight : "28px"
    },
    attendanceBoardToday : {
        width : "568px",
        paddingBottom : "34.5px",
        backgroundColor : "#ffffff"
    },
    attendanceBoardTitle : {
        backgroundColor : "#ececec",
        display : "flex",
        justifyContent : "space-between",
        paddingLeft : "33px",
        paddingRight : "36px",
        height : "54px",
        alignItems : "center"
    },
    attendanceBoardTitle_1 : {
        fontFamily : "Apple_B",
        fontSize : "19px",
        letterspacing : "-0.95px",
        color : "#303030"
    },
    attendanceBoardTitle_2 : {
        width : "81px",
        height : "32px",
        backgroundColor : "#ffffff",
        borderRadius : "28px",
        border : "1px solid #d4d4d4",
        lineHeight : "32px",
        textAlign : "center",
        fontFamily : "Apple_M",
        fontSize : "15px",
        letterSpacing : "-0.38px",
        color : "#3d50b0"
    },
    attendanceBoardDescription : {
        paddingLeft : "33px",
        paddingRight : "39px",
        paddingTop : "11.5px"
    },
    attendanceBoardDescription_1 : {
        display : "flex",
        justifyContent : "space-between",
        alignItems : "center",
        paddingTop : "16.5px",
        paddingBottom : "15.5px",
        borderBottom : "1px solid #e9e9e9"
    },
    attendanceBoardDescription_1_1 : {
        fontFamily : "Apple_R",
        fontSize : "17px",
        color : "#303030",
        letterSpacing : "-0.85px"
    },
    attendanceBoardDescription_1_2 : {
        fontFamily : "Apple_R",
        color : "#303030",
        letterSpacing : "-0.9px",
        fontSize : "18px"
    },
    attendanceBoardDescriptionHour : {
        fontSize : "22px",
        fontFamily : "Apple_R",
        color : "#d14e4e",
        display : "inline-block",
        marginRight : "6px"
    },
    attendanceBoardDescriptionMinute : {
        fontSize : "22px",
        fontFamily : "Apple_R",
        color : "#d14e4e",
        display : "inline-block",
        marginRight : "6px",
        marginLeft : "8px"
    },
    notification : {
        marginTop : "39px"
    },
    notificationTitle : {
        fontFamily : "Apple_B",
        fontSize : "22px"
    }
});

export default styles;