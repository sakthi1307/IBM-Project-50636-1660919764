
import React from 'react';
import "./Dashboard.css";
import { Card, CardContent, Typography } from '@mui/material';
import Header from '../Header';

function Dashboard() {
    return (
        <div className='DashBoard'>
            <Header />
            <div className='UserCards'>
                <Card sx={{ minWidth: 50, maxWidth: 200 }} className="Card">

                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Expense
                        </Typography>
                        <Typography variant="h6" component="h6" color="primary">
                            $150
                        </Typography>

                    </CardContent>
                </Card>

                <Card sx={{ minWidth: 50, maxWidth: 200 }} className="Card">
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Income
                        </Typography>
                        <Typography variant="h6" component="h6" color="primary">
                            $2000
                        </Typography>

                    </CardContent>
                </Card>

                <Card sx={{ minWidth: 50, maxWidth: 200 }} className="Card">
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Your Balance
                        </Typography>
                        <Typography variant="h6" component="h6" color="primary">
                            $1850
                        </Typography>

                    </CardContent>
                </Card>
            </div>
            <div className='UserGraph'>
                <img src='https://karaandnate.com/wp-content/uploads/2018/01/Screen-Shot-2018-01-29-at-8.34.34-AM.png' alt='alter' className='Image' />
            </div>
        </div>
    )
}

export default Dashboard