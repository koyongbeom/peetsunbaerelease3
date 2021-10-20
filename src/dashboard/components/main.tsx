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
            Hello World!
        </div>
    )
}

export default withStyles(styles)(Main);