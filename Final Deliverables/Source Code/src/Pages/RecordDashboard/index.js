import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import SideBar from '../../Components/SideBar'
import { Box, Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControlLabel, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import emptyImg from '../../assets/empty_item.svg'
import './recordDashboard.css'
import BudgetCard from '../../Components/BudgetCard'
import { recordStore } from '../../store'
function RecordDialog(props) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };
    const handleChange = (event) => {
        props.setExpense({ ...props.expense, "gain": event.target.checked })
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
                <FormControlLabel control={<Checkbox defaultChecked value={props?.expense?.gain} onChange={handleChange} />} label="is Expense" />
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
    const records = recordStore.useState(s => s.records);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const getRecords = async () => {
        let token = localStorage.getItem('token');
        await fetch('http://159.122.178.155:32442/records', {
            method: 'GET',
            headers: new Headers({
                "x-access-token": token
            })
        }).then(res => res.json().then(data => {
            console.log(data)
            recordStore.update(s => {
                s.records = data.records
            })
        }))
    }
    useEffect(() => {
        getRecords()
    }, [records])
    const formData = new FormData();
    const handleClose = (value) => {
        if (expense) {
            setHasExpense(true)
            formData.append("amount", expense.amount)
            formData.append("category", expense.category)
            formData.append("gain", expense.gain)
            let token = localStorage.getItem('token')
            fetch('http://159.122.178.155:32442/records', {
                method: 'POST',
                body: formData,
                headers: new Headers({
                    "x-access-token": token
                })
            }).then(res => res.json().then(data => {
                console.log(data)
                getRecords()
            }))
        }
        setOpen(false);
    };
    return (
        <>
            <SideBar />
            <div className='dashBoardContainer'>
                <Header />
                <div className="record__body">
                    {records.length > 0 ? (
                        <div className="record__body__container">
                            {/* <Paper elevation={5} className="record__ChartCont">
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    Chart
                                </Typography>
                            </Paper> */}
                            <Paper elevation={5} style={{ padding: "20px" }} className="record__TableCont">
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                                    <Typography variant="h6" color="text.secondary" gutterBottom>
                                        Records
                                    </Typography>
                                    <Button onClick={handleClickOpen} variant="contained">Add expense</Button>
                                    <RecordDialog
                                        open={open}
                                        onClose={handleClose}
                                        setExpense={setExpense}
                                        expense={expense}
                                    />
                                </Box>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell align="right">Category</TableCell>
                                            <TableCell align="right">Amount</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {records.map((row, ind) => (
                                            <TableRow
                                                key={ind}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell >{new Date(row?.date_created).toLocaleDateString()}</TableCell>
                                                <TableCell align="right">{row?.category}</TableCell>
                                                <TableCell align="right" component="th" scope="row">
                                                    {row?.amount}
                                                </TableCell>
                                            </TableRow>
                                        ))}
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