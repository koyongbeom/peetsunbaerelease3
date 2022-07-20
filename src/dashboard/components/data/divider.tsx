import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import HorizontalLinearStepper from './horizontallinearstepper';
import { Button } from '@mui/material';

export default function InsetDividers(props: any) {

    const [id, setId] = React.useState(0);
    const [dayData, setDayData] = React.useState<any>([]);
    const [staffpermit, setStaffpermit] = React.useState(0);
    const [parentpermit, setParentpermit] = React.useState(0);

    const [activeStep, setActiveStep] = React.useState(-1);
    const [errorStep, setErrorStep] = React.useState(-1);


    React.useEffect(() => {

        if (props.data) {

            const newDaydata = [];
            newDaydata.push(props.data.data.monday);
            newDaydata.push(props.data.data.tuesday);
            newDaydata.push(props.data.data.wednesday);
            newDaydata.push(props.data.data.thursday);
            newDaydata.push(props.data.data.friday);
            newDaydata.push(props.data.data.saturday);
            newDaydata.push(props.data.data.etc);
            
            setId(props.data.id);
            
            setDayData([...newDaydata]);
            console.log(newDaydata);

            if(props.data.parentpermit === 1){
                setActiveStep(2);
                setErrorStep(-1);
            }
            if(props.data.staffpermit === 1){
                setActiveStep(1);
                setErrorStep(-1);
            }
            if(props.data.staffpermit === 0){
                setActiveStep(0);
            }
            if(props.data.staffpermit === 2){
                setActiveStep(0);
                setErrorStep(1);
            }
            if(props.data.parentpermit === 2){
                setActiveStep(1);
                setErrorStep(2);
            }

        }

    }, [props.data]);

    const submit = (e : any, id : number, isAccept : boolean) => {

        const body = {
            id, isAccept, data : props.data.data, month : props.month, userId : props.userId
        }

        fetch("https://peetsunbae.com/dashboard/chart/regularSchedule/staffpermit", {
            method : "POST",
            credentials : "include",
            headers : {"content-type" : "application/json"},
            body : JSON.stringify(body)
        }).then((response : any) => {
            response.json()
            .then((result : any) => {
                console.log(result);
                if(result.message === "success"){
                    alert("저장 완료");
                    props.update();
                }
            })
        })
    }


    return (
        <div>
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                }}
            >
                {
                    dayData &&
                    dayData.map((eachDay: any, index: number) => {
                        return (
                            <div>
                                <ListItem sx={{ paddingTop: "16px", paddingBottom: "16px" }}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <span style={{ fontFamily: "Apple_R" }}>
                                                {
                                                    index === 0 ? "월" : index === 1 ? "화" : index === 2 ? "수" : index === 3 ? "목" : index === 4 ? "금" : index === 5 ? "토" : index === 6 ? "기타" : ""
                                                }
                                            </span>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={eachDay} />
                                </ListItem>
                                <Divider />
                            </div>
                        );
                    })
                }
            </List>
            <div style={{width : "600px", height : "50px", display : "flex", alignItems : "center"}}>
                <HorizontalLinearStepper activeStep={activeStep} errorStep={errorStep} />
            </div>
            <div style={{display : "flex", justifyContent : "flex-end", marginTop : "32px"}}>
                <Button onClick={(e : any) => {submit(e, id, false)}} variant="contained" sx={{width : "100px", marginRight : "12px"}} color="error">
                    비승인
                </Button>
                <Button onClick={(e : any) => {submit(e, id, true)}} variant="contained" sx={{width : "100px"}}>
                    승인
                </Button>
            </div>
        </div>
    );
}