import { blue } from "@mui/material/colors";

const styles : any = (theme : any) => ({
    main: {
        width: "1500px",
        margin: "auto",
    },
    appBar : {
        backgroundColor : "#3d50b0",
        display : "flex",
        justifyContent : "space-between",
        height : "78px",
        alignItems : "center",
        paddingLeft : "47px",
        paddingRight : "40px"
    },
    profileDiv : {
        display : "flex",
        alignItems : "center",
    },
    profileConfig : {
        color : "#e6e6e6",
        fontFamily : "Apple_R",
        fontSize : "15px",
        paddingRight : "7.5px",
        borderRight : "1px solid #ffffff",
        marginRight : "16.5px",
        display : "inline-block",
        cursor : "pointer"
    },
    avatarCircle : {
        width : "36px",
        height : "36px",
        backgroundColor : "#f5f5f5",
        borderRadius : "50%",
        marginRight : "11px",
        display : "flex",
        justifyContent : "center",
        cursor : "pointer"
    },
    logout : {
        color : "#e6e6e6",
        fontFamily : "Apple_R",
        fontSize : "15px",
        display : "inline-block",
        cursor : "pointer"
    },
    avatar : {
        width : "14px"
    },
    body : {
        display : "flex",
        width : "100%",
    },
    sideMenu : {
        width : "244px",
    },
    sideMenuProfile : {
        marginLeft : "26px",
        width : "192px",
        borderBottom : "1px solid #dfdfdf",
        display : "flex",
        flexDirection : "column",
        alignItems : "center",
        paddingTop : "27px",
        paddingBottom : "23.5px"
    },
    where : {
        display : "flex",
        alignItems : "center",
        marginBottom : "12px"
    },
    inside : {
        marginRight : "6.1px"
    },
    outside : {
        width : "17px",
        marginRight : "6.1px"
    },
    outsideText : {
        fontFamily : "Apple_R",
        letterSpacing : "-0.75px",
        color : "#828282",
        fontSize : "18px"
    },
    sideMenuAvatar : {
        width : "66px",
        height : "66px",
        borderRadius : "50%",
        backgroundColor : "#ebebeb",
        marginBottom : "10px",
        display : "flex",
        justifyContent : "center",
        alignItems : "center"
    },
    sideMenuName : {
        fontSize : "18px",
        fontFamily : "Apple_R",
        letterSpacing : "-0.85px",
        color : "#303030"
    },
    sideMenuList : {
        paddingTop : "26.5px",
        paddingLeft : "26.3px"
    },
    sideMenuListSection : {
        display : "flex",
        marginBottom : "23.4px",
        cursor : "pointer",
        alignItems : "center"
    },
    sideMenuListImg : {
        marginRight : "24.7px",
    },
    sideMenuListText : {
        fontFamily : "Apple_R",
        letterSpacing : "-0.8px",
        color : "#303030"
    }
    
})

export default styles;