import React from 'react';
import { withStyles } from '@mui/styles';
import styles from '../componentsStyle/homeStyles'

interface props {
    classes: any;
}

const Home: React.FC<props> = (props) => {
    const classes = props.classes;

    return (
        <div className={classes.main}>
            <div className={classes.attendanceBoard}>
                <div className={classes.attendanceBoardWeek}>
                    <div className={classes.attendanceBoardTitle}>
                        <div className={classes.attendanceBoardTitle_1}>
                            이번주 공부 시간
                        </div>
                        <div className={classes.attendanceBoardTitle_2}>
                            #자세히
                        </div>
                    </div>
                    <div className={classes.attendanceBoardDescription}>
                        <div className={classes.attendanceBoardDescription_1}>
                            <div className={classes.attendanceBoardDescription_1_1}>
                                총 공부시간
                            </div>
                            <div className={classes.attendanceBoardDescription_1_2}>
                                <span className={classes.attendanceBoardDescriptionHour}>21</span>
                                <span>시간</span>
                                <span className={classes.attendanceBoardDescriptionMinute}>30</span>
                                <span>분</span>
                            </div>
                        </div>

                        <div className={classes.attendanceBoardDescription_1}>
                            <div className={classes.attendanceBoardDescription_1_1}>
                                지각/결석
                            </div>
                            <div className={classes.attendanceBoardDescription_1_2}>
                                <span className={classes.attendanceBoardDescriptionHour}>3 / 1</span>
                                <span>회</span>
                            </div>
                        </div>

                        <div className={classes.attendanceBoardDescription_1}>
                            <div className={classes.attendanceBoardDescription_1_1}>
                                공부 시간 등수
                            </div>
                            <div className={classes.attendanceBoardDescription_1_2}>
                                <span className={classes.attendanceBoardDescriptionHour}>21/172</span>
                                <span>등</span>
                            </div>
                        </div>

                    </div>
                </div>





                <div className={classes.attendanceBoardToday}>
                    <div className={classes.attendanceBoardTitle}>
                        <div className={classes.attendanceBoardTitle_1}>
                            오늘 공부 시간
                        </div>
                        <div className={classes.attendanceBoardTitle_2}>
                            #자세히
                        </div>
                    </div>
                    <div className={classes.attendanceBoardDescription}>
                        <div className={classes.attendanceBoardDescription_1}>
                            <div className={classes.attendanceBoardDescription_1_1}>
                                총 공부시간
                            </div>
                            <div className={classes.attendanceBoardDescription_1_2}>
                                <span className={classes.attendanceBoardDescriptionHour}>21</span>
                                <span>시간</span>
                                <span className={classes.attendanceBoardDescriptionMinute}>30</span>
                                <span>분</span>
                            </div>
                        </div>

                        <div className={classes.attendanceBoardDescription_1}>
                            <div className={classes.attendanceBoardDescription_1_1}>
                                지각/결석
                            </div>
                            <div className={classes.attendanceBoardDescription_1_2}>
                                <span className={classes.attendanceBoardDescriptionHour}>0 / 0</span>
                                <span>회</span>
                            </div>
                        </div>

                        <div className={classes.attendanceBoardDescription_1}>
                            <div className={classes.attendanceBoardDescription_1_1}>
                                공부 시간 등수
                            </div>
                            <div className={classes.attendanceBoardDescription_1_2}>
                                <span className={classes.attendanceBoardDescriptionHour}>21/172</span>
                                <span>등</span>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div className={classes.notification}>
                <div className={classes.notificationTitle}>최근 공지사항</div>
                <ul></ul>
            </div>
        </div>
    )
}

export default withStyles(styles)(Home);