
import React, { useEffect, useState } from 'react';
import "./Dashboard.css";
import { Box, Button, Card, CardActionArea, CardContent, CardHeader, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import Header from '../Header';
import SideBar from '../SideBar';
import InfoCard from '../InfoCard';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { dashboardStore } from '../../store';

ChartJS.register(ArcElement, Tooltip, Legend);

function CircularProgressWithLabel(
    props
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }} className="progressContainer">
            <CircularProgress className='progressbar' variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="h6"
                    component="h6"
                    color="text.secondary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}
function BudgetDialog(props) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Add budget</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Monthly Budget"
                    onChange={(e) => props.setBudget(e.target.value)}
                    type="number"
                    fullWidth
                    required
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Done</Button>
            </DialogActions>
        </Dialog>
    );
}

function Dashboard() {
    // const dashboardDetails = dashboardStore.useState(s => s.dashboardDetails);
    const [dashboardDetails, setDashboardDetails] = useState(false);
    const [hasBudget, setHasBudget] = useState(false)
    const [budget, setBudget] = useState(null);
    const [open, setOpen] = useState(false);
    const data = {
        labels: Object.keys(dashboardDetails?.expense_by_category || {}),
        datasets: [
            {
                label: '# of Votes',
                data: Object.values(dashboardDetails?.expense_by_category || {}),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const getDashboardDetails = async () => {
        let token = localStorage.getItem('token');
        await fetch('http://localhost:5000/dashboard', {
            method: 'GET',
            headers: new Headers({
                "x-access-token": token
            })
        }).then(res => res.json().then(data => {
            console.log(data)
            dashboardStore.update(s => {
                s.dashboardDetails = data
            })
            setDashboardDetails(data)
        }))
    }

    const formData = new FormData();
    const handleClose = (value) => {
        if (budget) {
            setHasBudget(true)
            formData.append('budget', budget);
            let token = localStorage.getItem('token')
            fetch('http://localhost:5000/budget', {
                method: 'POST',
                body: formData,
                headers: new Headers({
                    "x-access-token": token
                })
            }).then(res => res.json().then(data => {
                console.log(data)
                getDashboardDetails()
            }))
        }
        setOpen(false);
    };
    useEffect(() => {
        getDashboardDetails()
    }, [])

    return (
        <>
            <SideBar />
            <div className='DashBoard'>
                <Header />
                <div className='UserCards'>
                    <InfoCard title="Expenses" amount={dashboardDetails?.current_month_spending} link="records" />
                    <InfoCard title="Income" amount={dashboardDetails?.income} link="/" />
                    <InfoCard title="Balance" amount={dashboardDetails?.balance} link="/" />
                    <Card elevation={5} sx={{ minWidth: 50, maxWidth: 200 }} className="Card">

                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Budget
                            </Typography>
                            <Typography variant="h6" component="h6" color="primary">
                                ${dashboardDetails?.monthly_limit || 0}
                            </Typography>
                        </CardContent>
                        <CardActionArea className='infoCard--footer' >
                            <Button onClick={handleClickOpen} variant="text">Add budget</Button>
                        </CardActionArea>
                    </Card>
                    <BudgetDialog
                        open={open}
                        onClose={handleClose}
                        setBudget={setBudget}
                        budget={budget}
                    />
                </div>
                <div className="graphContainer">
                    <Card elevation={5} className="expenseInfo">
                        {/* <CardHeader>
                            <Typography variant="h6" component="h6" color="primary">
                                Expense Info</Typography>
                        </CardHeader> */}
                        <Typography variant="h5" textAlign="center" component="h5" >Expense Info</Typography>
                        <CardContent className='expenseCardContent'>
                            <CircularProgressWithLabel value={parseFloat((dashboardDetails?.current_month_spending * 100) / dashboardDetails?.income).toFixed(1)} />
                            <Typography variant="h6" component="h6" className='expenseTitle' color="gray">Total spending</Typography>
                            <Typography variant="h4" component="h4" className='expenseAmount' color="primary">${dashboardDetails?.current_month_spending}</Typography>
                            <Typography variant="body2" component="p" className='expenseNote' color="gray" textAlign="center">Previous transactions processing. Last payments may not be includeed.</Typography>
                            <div className="statInfoContainer">
                                <div className="statInfo">
                                    <Typography variant="body1" component="p" color="gray">Last Week</Typography>
                                    <Typography variant="body2" textAlign="center" component="p" color="primary">${dashboardDetails?.last_week_spending}</Typography>
                                </div>
                                <div className="statInfo">
                                    <Typography variant="body1" component="p" color="gray">Last Month</Typography>
                                    <Typography variant="body2" textAlign="center" component="p" color="primary">${dashboardDetails?.last_week_spending}</Typography>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card elevation={5} className='UserGraph'>
                        <Doughnut className='dashgraph' options={options} data={data} />
                        {/* <img src='https://karaandnate.com/wp-content/uploads/2018/01/Screen-Shot-2018-01-29-at-8.34.34-AM.png' alt='alter' className='Image' /> */}
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Dashboard