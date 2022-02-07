import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import koLocale from 'date-fns/locale/ko'
import { DataGridPro, GridRowsProp, GridColDef, GridToolbar, LicenseInfo, useGridApiRef, GridFilterModel } from '@mui/x-data-grid-pro';
import { Typography } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

LicenseInfo.setLicenseKey("e3ec4d79d1fa1f36cc88ecffd4e68392T1JERVI6MzMyMjMsRVhQSVJZPTE2NjkzODUyMDIwMDAsS0VZVkVSU0lPTj0x");



const columns: any = [
    { field: 'name', headerName: '이름', width: 80 },
    { field: 'kind', headerName: '직책', width: 120},
    {
        field: 'day_1', headerName: 1, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_2', headerName: 2, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_3', headerName: 3, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_4', headerName: 4, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_5', headerName: 5, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_6', headerName: 6, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_7', headerName: 7, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_8', headerName: 8, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_9', headerName: 9, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_10', headerName: 10, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_11', headerName: 11, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_12', headerName: 12, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_13', headerName: 13, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_14', headerName: 14, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_15', headerName: 15, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_16', headerName: 16, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_17', headerName: 17, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_18', headerName: 18, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_19', headerName: 19, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_20', headerName: 20, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_21', headerName: 21, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_22', headerName: 22, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_23', headerName: 23, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_24', headerName: 24, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_25', headerName: 25, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_26', headerName: 26, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_27', headerName: 27, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_28', headerName: 28, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_29', headerName: 29, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_30', headerName: 30, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    {
        field: 'day_31', headerName: 31, width: 50, renderCell: (params: any) => {
            if (params.value) {
                return (
                    <div>
                        <Typography sx={{ fontSize: "12px", color: "primary.main" }}>{params.value.name}</Typography>
                        <Typography sx={{ fontSize: "12px", color: "error.main" }}>{params.value.title}</Typography>
                    </div>
                );
            }
        }
    },
    { field: 'isStudent', headerName: '학생', width: 120, filterable: false },

];


const TotalAttendance: React.FC<any> = (props) => {
    const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
    const [submitBool, setSubmitBool] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState<any>([
    ]);
    const [sum, setSum] = useState(0);
    const apiRef = useGridApiRef();
    const [targetDate, setTargetDate] = useState(new Date());
    const [alignment, setAlignment] = React.useState('all');
    const [count, setCount] = useState(0);

    const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
        items: [
            { id: 2, columnField: 'name', operatorValue: 'contains', value: "" }
        ],
    });

    const [name, setName] = useState("");

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        console.log(newAlignment);
        setAlignment(newAlignment);

        setName("");

        switch (newAlignment) {
            case "all":
                setFilterModel({
                    items: [
                        { id: 2, columnField: 'name', operatorValue: 'contains', value: "" }
                    ]
                });
                break;
            case "staff":
                setFilterModel({
                    items: [
                        { id: 1, columnField: 'kind', operatorValue: 'contains', value: '직원' },
                        { id: 2, columnField: 'name', operatorValue: 'contains', value: "" }

                    ],
                });
                break;
            case "teacher":
                setFilterModel({
                    items: [
                        { id: 1, columnField: 'kind', operatorValue: 'contains', value: '담임' },
                        { id: 2, columnField: 'name', operatorValue: 'contains', value: "" }

                    ],
                });
                break;
            case "coaching":
                setFilterModel({
                    items: [
                        { id: 1, columnField: 'kind', operatorValue: 'contains', value: '과외' },
                        { id: 2, columnField: 'name', operatorValue: 'contains', value: "" }

                    ],
                });
                break;
            case "student":
                setFilterModel({
                    items: [
                        { id: 1, columnField: 'isStudent', operatorValue: 'contains', value: 'O' },
                        { id: 2, columnField: 'name', operatorValue: 'contains', value: "" }
                    ],
                });
                break;
            case "six":
                setFilterModel({
                    items: [
                        { id: 1, columnField: 'kind', operatorValue: 'contains', value: '6층' },
                        { id: 2, columnField: 'name', operatorValue: 'contains', value: "" }
                    ],
                });
                break;
            case "four":
                setFilterModel({
                    items: [
                        { id: 1, columnField: 'kind', operatorValue: 'contains', value: '4층' },
                        { id: 2, columnField: 'name', operatorValue: 'contains', value: "" }
                    ],
                });
                break;
            case "second":
                setFilterModel({
                    items: [
                        { id: 1, columnField: 'kind', operatorValue: 'contains', value: '2호점' },
                        { id: 2, columnField: 'name', operatorValue: 'contains', value: "" }
                    ],
                });
                break;
        }

    };



    const getAttendance = async (month: number, year: number) => {
        setRows([]);
        setLoading(true);
        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }


        fetch(`https://peetsunbae.com/dashboard/report/totalattendance?month=${month}&year=${year}`, {
            method: "GET",
            headers: { "Authorization": token },
            credentials: "include",
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                    const newRows: any = [];
                    result.user.rows.forEach((each: any) => {
                        const oneRow: any = {};
                        oneRow.id = each.id;
                        oneRow.name = each.cell[4];
                        oneRow.kind = each.cell[3] === "최고반" ? "직원" : each.cell[3];
                        oneRow.isStudent = (each.cell[3] != "최고반" && each.cell[3] != "과외선생님" && each.cell[3] != "담임선생님") ? "O" : ""
                        newRows.push(oneRow);
                    });
                    result.data.forEach((day: any, index: number) => {
                        day.rows.forEach((user: any) => {
                            newRows.forEach((row: any) => {
                                if (row.id === user.id) {
                                    row[`day_${index + 1}`] = {}
                                    row[`day_${index + 1}`].name = user.cell[6];
                                    row[`day_${index + 1}`].title = user.cell[7];
                                }
                            })
                        })
                    })
                    setRows([...newRows]);
                    setLoading(false);
                })
        })
    }


    useEffect(() => {

        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        getAttendance(currentMonth, currentYear);
    }, []);


    const filterChange = () => {

    }

    const letsSum = (param: any) => {

    }

    const previousMonth = () => {
        const newCount: number = count + 1;
        const date = new Date();
        const targetDate = new Date(date.setMonth(date.getMonth() - newCount));
        console.log(targetDate.getFullYear(), targetDate.getMonth() + 1);
        setCount(newCount);
        getAttendance(targetDate.getMonth() + 1, targetDate.getFullYear());

        setTargetDate(new Date(targetDate));
    }

    const nextMonth = () => {
        if (count > 0) {
            const newCount: number = count - 1;
            const date = new Date();
            const targetDate = new Date(date.setMonth(date.getMonth() - newCount));
            setCount(newCount);
            getAttendance(targetDate.getMonth() + 1, targetDate.getFullYear());

            setTargetDate(new Date(targetDate));
        }
    }

    const nameChange = (e : any) => {
        setName(e.target.value);
        const newFilterModel : any = filterModel;
        newFilterModel.items.forEach((each : any)=>{
            if(each.id === 2){
                each.value = e.target.value;
            }
        })
        setFilterModel({...newFilterModel});
    }


    return (
        <div>
            <div style={{ marginTop: "64px", marginBottom: "6px", display: "flex", justifyContent: "space-between" }}>
                <div>
                    <div>
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Button onClick={previousMonth}>◁</Button>
                            <Button onClick={nextMonth}>▷</Button>
                        </ButtonGroup>
                    </div>
                </div>
                <div>
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                    >
                        <ToggleButton value="all">ALL</ToggleButton>
                        <ToggleButton value="staff">직원</ToggleButton>
                        <ToggleButton value="teacher">담임</ToggleButton>
                        <ToggleButton value="coaching">과외</ToggleButton>
                        <ToggleButton value="student">학생</ToggleButton>
                        <ToggleButton value="six">6층</ToggleButton>
                        <ToggleButton value="four">4층</ToggleButton>
                        <ToggleButton value="second">2호</ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>
            <div style={{marginTop : "32px" ,marginBottom: "12px", fontFamily: "Apple_B", display : "flex", justifyContent : "space-between" }}>
                <div>{targetDate && targetDate.getFullYear()}년 {targetDate && targetDate.getMonth() + 1}월</div>
                <div><TextField value={name} onChange={nameChange} id="standard-basic" placeholder="이름을 검색하세요" variant="standard" /></div>
            </div>
            <div>
                <div style={{ height: 500, width: '100%' }}>
                    <div style={{ display: "flex", height: "100%" }}>
                        <div style={{ flexGrow: 1 }}>
                            <DataGridPro loading={loading} rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} apiRef={apiRef}
                                onStateChange={filterChange}
                                filterModel={filterModel}
                                onFilterModelChange={(model) => setFilterModel(model)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TotalAttendance;