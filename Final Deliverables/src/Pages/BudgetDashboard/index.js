import React, { useState } from 'react'
import Header from '../../Components/Header'
import SideBar from '../../Components/SideBar'
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Paper, TextField, Typography } from '@mui/material'
import emptyImg from '../../assets/empty_item.svg'
// import "./budgetDashboard.css"
import BudgetCard from '../../Components/BudgetCard'



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
                    autoFocus
                    margin="dense"
                    required
                    label="Weekly Budget"
                    type="number"
                    onChange={(e) => props.setBudget({ ...props.budget, "weeklyBudget": e.target.value })}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    label="Monthly Budget"
                    onChange={(e) => props.setBudget({ ...props.budget, "monthlyBudget": e.target.value })}
                    type="number"
                    fullWidth
                    required
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Done</Button>
            </DialogActions>
        </Dialog>
    );
}

const BudgetDashboard = () => {
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
            <div className='dashBoardContainer'>
                <Header />
                {/* <div className="budget__header">
                    <h2>Budget</h2>
                </div> */}
                <div className="budget__body">
                    {hasBudget ? (
                        <div className="budget__body__container">
                            <Paper elevation={5} className="budget__ChartCont">
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    Chart
                                </Typography>
                            </Paper>
                            <div className="budget__cardCont">
                                <BudgetCard title="Weekly Expense/Budget" expense="300" budget={budget?.weeklyBudget} balance="100" />
                                <BudgetCard title="Monthly Expense/Budget" expense="300" budget={budget?.monthlyBudget} balance="100" />
                            </div>
                        </div>
                    ) : (
                        <div className="budget__no__body__container">
                            <h3>You have not created a budget yet</h3>
                            <img src={emptyImg} alt="" />
                            <Button onClick={handleClickOpen} variant="contained">Add budget</Button>
                            <BudgetDialog
                                open={open}
                                onClose={handleClose}
                                setBudget={setBudget}
                                budget={budget}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default BudgetDashboard