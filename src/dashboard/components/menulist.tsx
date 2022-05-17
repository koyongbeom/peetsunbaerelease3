const menu = [
    //--------------------------------- 학생, 학부모 뺀곳---------------
    {
        value : ["teacher", "parent", "student","staff"],
        name : "home",
        description : "홈"
    },
    {
        value : ["teacher", "parent", "staff"],
        name : "notification",
        description : "공지사항"
    },
    {
        value : ["teacher", "student", "staff"],
        name : "alarm",
        description : "출석 기록"
    },
    {
        value : ["teacher", "parent", "staff"],
        name : "edit",
        description : "지각/결석 사유 제출"
    },
    {
        value : ["parent", "student", "staff", "teacher"],
        name : "book",
        description : "상담일지"
    },
    {
        value : ["teacher", "student", "staff"],
        name : "question",
        description : "질의응답"
    },
    {
        value : ["teacher", "parent", "staff"],
        name : "restaurant",
        description : "도시락신청"
    },
    {
        value : ["teacher", "parent", "staff"],
        name : "envelope",
        description : "나에게 온 메시지"
    },
    {
        value : ["teacher", "parent", "staff", "student"],
        name : "search",
        description : "의견 보내기"
    },
    //------------------------------------------------------
    {
        value : ["teacher", "staff"],
        name : "chart",
        description : "상담일지 적기"
    },
    {
        value : ["teacher", "staff"],
        name : "attendance",
        description : "업무 관리"
    },
    {

        value : ["staff"],
        name : "출석 관리 보고",
        description : "홈"
    },
    {
        value : ["teacher", "staff"],
        name : "avatar",
        description : "학생정보"
    }
]

export default menu;




