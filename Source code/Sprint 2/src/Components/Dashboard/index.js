
import React, { useState } from 'react';
import "./Dashboard.css";
import { Box, Button, Card, CardActionArea, CardContent, CardHeader, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
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
    const [hasBudget, setHasBudget] = useState(false)
    const [budget, setBudget] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        if (budget)
            setHasBudget(true)
        setOpen(false);
    };
    return (
        <>
            <SideBar />
            <div className='DashBoard'>
                <Header />
                <div className='UserCards'>
                    <InfoCard title="Expenses" amount="300" link="records" />
                    <InfoCard title="Income" amount="300" link="budgets" />
                    <InfoCard title="Your Bills" amount="300" link="bills" />
                    <Card elevation={5} sx={{ minWidth: 50, maxWidth: 200 }} className="Card">

                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Budget
                            </Typography>
                            <Typography variant="h6" component="h6" color="primary">
                                ${budget ? budget : 0}
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