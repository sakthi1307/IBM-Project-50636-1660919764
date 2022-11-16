import React, { useState } from 'react'
import Header from '../../Components/Header'
import SideBar from '../../Components/SideBar'
import { Box, Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControlLabel, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import emptyImg from '../../assets/empty_item.svg'
import './recordDashboard.css'
import BudgetCard from '../../Components/BudgetCard'
function RecordDialog(props) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Add expense</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    required
                    label="Amount"
                    type="number"
                    onChange={(e) => props.setExpense({ ...props.expense, "amount": e.target.value })}
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    required
                    label="Category"
                    type="text"
                    onChange={(e) => props.setExpense({ ...props.expense, "category": e.target.value })}
                    fullWidth
                    variant="outlined"
                />
                <FormControlLabel control={<Checkbox defaultChecked onChange={e => (props.setExpense({ ...props.expense, "isExpense": e.target.checked }))} />} label="is Expense" />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Done</Button>
            </DialogActions>
        </Dialog>
    );
}

const RecordDashboard = () => {
    const [hasExpense, setHasExpense] = useState(false)
    const [expense, setExpense] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        if (expense)
            setHasExpense(true)
        setOpen(false);
    };
    return (
        <>
            <SideBar />
            <div className='dashBoardContainer'>
                <Header />
                <div className="record__body">
                    {hasExpense ? (
                        <div className="record__body__container">
                            <Paper elevation={5} className="record__ChartCont">
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    Chart
                                </Typography>
                            </Paper>
                            <Paper elevation={5} className="record__TableCont">
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell align="right">Category</TableCell>
                                            <TableCell align="right">Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow
                                            key={1}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell >{new Date().toDateString()}</TableCell>
                                            <TableCell align="right">Food</TableCell>
                                            <TableCell align="right" component="th" scope="row">
                                                "123"
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                        </div>
                    ) : (
                        <div className="record__no__body__container">
                            <h3>You have not created a transactions yet</h3>
                            <img src={emptyImg} alt="" />
                            <Button onClick={handleClickOpen} variant="contained">Add expense</Button>
                            <RecordDialog
                                open={open}
                                onClose={handleClose}
                                setExpense={setExpense}
                                expense={expense}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default RecordDashboard