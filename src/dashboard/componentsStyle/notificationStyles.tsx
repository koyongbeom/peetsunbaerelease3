const style : any = (theme : any) => ({
    main: {
        backgroundColor: "#f5f5f5",
        width: "calc(100% - 244px)",
        height: "100vh",
        paddingLeft: "46px",
        paddingTop: "41px",
        paddingBottom: "48px"
    },

    notificationTitle: {
        fontFamily: "Apple_B",
        fontSize: "22px",
        marginBottom: "16px"
    },
    notifications: {
        display: "flex"
    },
    notifications2: {
        display: "flex",
        marginTop : "39px"
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
        fontFamily : "Apple_L"
    },
    newNotification : {
        position : "fixed",
        right : "42px",
        bottom : "20px",
        width : "174px",
        height : "46px",
        lineHeight : "46px",
        textAlign : "center",
        backgroundColor : "#303030",
        color : "white",
        borderRadius : "28px",
        fontFamily : "Apple_R"
    },
    pencil : {
        marginRight : "6.9px"
    }
});

export default style;