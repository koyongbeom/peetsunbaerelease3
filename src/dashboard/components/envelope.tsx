import { RouteComponentProps } from 'react-router';
import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import koLocale from 'date-fns/locale/ko'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { GridRenderCellParams,DataGridPro, GridRowsProp, GridColDef, GridToolbar, LicenseInfo, useGridApiRef, GridEditRowsModel } from '@mui/x-data-grid-pro';
import { eachDayOfInterval } from 'date-fns';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { createStyles, makeStyles } from '@mui/styles';
import styles from '../componentsStyle/envelope.module.css';
import { createTheme, darken, lighten } from '@mui/material/styles';

LicenseInfo.setLicenseKey("e3ec4d79d1fa1f36cc88ecffd4e68392T1JERVI6MzMyMjMsRVhQSVJZPTE2NjkzODUyMDIwMDAsS0VZVkVSU0lPTj0x");


type currentSideBarMenuList = "home" | "notification" | "alarm" | "edit" | "book" | "question" | "restaurant" | "envelope" | "search" | "chart" | "attendance" | "출석 관리 보고";

interface envelopeProps extends RouteComponentProps {
    activateMenuList : (curret : currentSideBarMenuList) => void;
}


const Envelope : React.FC<envelopeProps> = (props) => {
    useEffect(()=>{
        props.activateMenuList("envelope");
    }, [])

    return(
        <div className={styles.main}>
            <div className={styles.title}>
                <img src="img/off/envelope.svg" alt="envelope" />
                나에게 온 메세지
            </div>

            <div>
                
            </div>

        </div>
    )
}

export default Envelope;