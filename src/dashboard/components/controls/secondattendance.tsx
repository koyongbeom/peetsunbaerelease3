import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TotalFingerprint from './totalfingerprint';
import CurrentSeat from './currentseat';
import SecondAttendanceProcess from './secondattendanceprocess';

const SecondAttendance: React.FC<any> = (props) => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label={<span style={{fontFamily : "Apple_B", fontSize : "18px"}}>출석체크</span>} value="1" />
                            <Tab label={<span style={{fontFamily : "Apple_B", fontSize : "18px"}}>현재 등원생</span>} value="2" />
                            <Tab label={<span style={{fontFamily : "Apple_B", fontSize : "18px"}}>전체 지문 인식</span>} value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <div>
                            <SecondAttendanceProcess />
                        </div>
                    </TabPanel>
                    <TabPanel value="2">
                        <CurrentSeat />
                    </TabPanel>
                    <TabPanel value="3">
                        <TotalFingerprint />
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}

export default SecondAttendance;