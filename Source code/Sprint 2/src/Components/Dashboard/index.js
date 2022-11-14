
import React from 'react';
import "./Dashboard.css";
import { Box, Card, CardActionArea, CardContent, CardHeader, CircularProgress, Typography } from '@mui/material';
import Header from '../Header';
import SideBar from '../SideBar';
import InfoCard from '../InfoCard';

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

function Dashboard() {
    return (
        <>
            <SideBar />
            <div className='DashBoard'>
                <Header />
                <div className='UserCards'>
                    <InfoCard title="Expenses" amount="300" link="records" />
                    <InfoCard title="Income" amount="300" link="budgets" />
                    <InfoCard title="Your Bills" amount="300" link="bills" />
                    <InfoCard title="Your Goals" amount="300" link="budgets" />

                </div>
                <div className="graphContainer">
                    <Card elevation={5} className="expenseInfo">
                        {/* <CardHeader>
                            <Typography variant="h6" component="h6" color="primary">
                                Expense Info</Typography>
                        </CardHeader> */}
                        <Typography variant="h5" textAlign="center" component="h5" >Expense Info</Typography>
                        <CardContent className='expenseCardContent'>
                            <CircularProgressWithLabel value={70} />
                            <Typography variant="h6" component="h6" className='expenseTitle' color="gray">Total spending</Typography>
                            <Typography variant="h4" component="h4" className='expenseAmount' color="primary">$3000</Typography>
                            <Typography variant="body2" component="p" className='expenseNote' color="gray" textAlign="center">Previous transactions processing. Last payments may not be includeed.</Typography>
                            <div className="statInfoContainer">
                                <div className="statInfo">
                                    <Typography variant="body1" component="p" color="gray">Total spending</Typography>
                                    <Typography variant="body2" textAlign="center" component="p" color="primary">$330</Typography>
                                </div>
                                <div className="statInfo">
                                    <Typography variant="body1" component="p" color="gray">Last Week</Typography>
                                    <Typography variant="body2" textAlign="center" component="p" color="primary">$30</Typography>
                                </div>
                                <div className="statInfo">
                                    <Typography variant="body1" component="p" color="gray">Last Month</Typography>
                                    <Typography variant="body2" textAlign="center" component="p" color="primary">$300</Typography>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card elevation={5} className='UserGraph'>
                        <img src='https://karaandnate.com/wp-content/uploads/2018/01/Screen-Shot-2018-01-29-at-8.34.34-AM.png' alt='alter' className='Image' />
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Dashboard