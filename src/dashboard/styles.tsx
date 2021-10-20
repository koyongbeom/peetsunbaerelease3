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
    },
    sideMenu : {
        backgroundColor : "#3ee0b9",
        width : "244px",
    }
    
})

export default styles;