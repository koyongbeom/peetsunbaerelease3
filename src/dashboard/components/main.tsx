import React from 'react';
import {withStyles} from '@mui/styles';
import styles from '../componentsStyle/mainStyles'

interface props {
    classes : any;
}

const Main : React.FC<props> = (props) => {
    const classes = props.classes;

    return (
        <div className={classes.main}>
            <div className={classes.attendanceBoard}>
                <div className={classes.attendanceBoardWeek}>

                </div>
                <div className={classes.attendanceBoardToday}>

                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(Main);