import { CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import { display } from '@mui/system';
import Button from '@mui/material/Button';
import { Subject } from '@mui/icons-material';
import ProfileFirst from './controls/profilefirst';
import ProfileSecond from './controls/profilesecond';
import ProfileThird from './controls/profilethird';
import ProfileFourth from './controls/profilefourth';

const Profile: React.FC<any> = (props: any) => {
    const [currentProfile, setCurrentProfile] = useState("first");

    const changeProfilePage = (where : string) => {
        setCurrentProfile(where);
    }

    return (
        <>
            {currentProfile === "first" ? <ProfileFirst changeProfilePage={changeProfilePage} /> : ""}
            {currentProfile === "second" ? <ProfileSecond changeProfilePage={changeProfilePage} /> : ""}
            {currentProfile === "third" ? <ProfileThird changeProfilePage={changeProfilePage} /> : ""}
            {currentProfile === "fourth" ? <ProfileFourth history={props.history} changeProfilePage={changeProfilePage} /> : ""}
        </>
    )
}

export default Profile;