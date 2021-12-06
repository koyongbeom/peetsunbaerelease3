const styles : any = (theme : any) => ({
    main: {
        backgroundColor: "#f5f5f5",
        width: "calc(100% - 0244px)",
        height : "calc(100vh - 78px)",
        overflow : "scroll",
        paddingLeft: "46px",
        paddingTop: "45.7px",
        paddingBottom: "71px"
    },
    clock : {
        marginRight : "7.1px"
    },
    title : {
        fontFamily : "Apple_B",
        fontSize : "22px",
        display : "flex",
        alignItems : "center"
    },
    paper : {
        marginTop : "19px",
        width : "1164px",
        height : "1354px",
        backgroundColor : "white",
        paddingLeft : "67px",
        paddingRight : "67px"
    },
    paperTitle : {
        display : "flex",
        justifyContent : "space-between",
        paddingTop : "38px"
    },
    calendarFlat : {
        marginRight : "8px"
    },
    studentName : {
        display : "flex",
        alignItems : "center"
    },
    monthStudyTime : {
        width : "180px",
        height : "46px",
        border : "solid 1px #728aff",
        borderRadius : "28px",
        lineHeight : "46px",
        textAlign : "center",
        color : "#3d50b0",
        fontFamily : "Apple_R",
        letterSpacing : "-0.8px"
    },
    calendar : {
        boxSizing : "border-box",

        marginTop : "16px",
        borderTop : "6px solid #f2f2f2",
        borderRight : "3px solid #f2f2f2",
        borderLeft : "3px solid #f2f2f2",
        borderBottom : "6px solid #f2f2f2",
        padding : "0px"  
    },
    calendarTitle : {
        boxSizing : "border-box",

        width : "100%",
        height : "63px",
        backgroundColor : "#566ee8",
        color : "white",
        display : "flex",
        alignItems : "center",
        justifyContent : "center",
        fontFamily : "Apple_R",
        fontSize : "18px",
        letterSpacing : "-0.45px",
        boderBottom : "4px solid #f2f2f2"
    },
    chevronLeft : {
        boxSizing : "border-box",

        width : "7.4px",
        marginRight : "26.6px",
        cursor : "pointer"
    },
    chevronRight : {
        boxSizing : "border-box",

        width : "7.4px",
        marginLeft : "26.6px",
        cursor : "pointer"
    },
    day : {
        boxSizing : "border-box",

        width : "100%",
        display : "flex",
        justifyContent : "space-evenly"
    },
    dayList : {
        marginTop : "4px",
        boxSizing : "border-box",
        height : "44px",
        lineHeight : "44px",
        backgroundColor : "#e4e8ff",
        width : "100%",
        textAlign : "center",
        borderRight : "3px solid #f2f2f2"
    },
    dayList_last : {
        marginTop : "4px",
        boxSizing : "border-box",
        height : "44px",
        lineHeight : "44px",
        backgroundColor : "#e4e8ff ",
        width : "100%",
        textAlign : "center",
    },
    calendarWeek : {
        boxSizing : "border-box",
        display : "flex",
        width : "100%",
        justifyContent : "space-evenly",
        borderBottom : "4px solid #f2f2f2"
    },
    calendarWeekLast : {
        boxSizing : "border-box",
        display : "flex",
        width : "100%",
        justifyContent : "space-evenly"
    },
    calendarDay : {
        boxSizing : "border-box",
        borderRight : "3px solid #f2f2f2",
        width : "100%",
        textAlign : "center",
        height : "165px",
    },
    calendarDay4 : {
        backgroundColor : "red"
    },
    calendarDayLast : {
        boxSizing : "border-box",
        width : "100%",
        textAlign : "center",
        height : "165px",
    }

});

export default styles;