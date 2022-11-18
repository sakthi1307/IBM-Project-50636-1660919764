import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import SideBar from '../../Components/SideBar'
import "./billDashboard.css"
import { Box, Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControlLabel, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import emptyImg from '../../assets/empty_item.svg'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { billsStore } from '../../store'

function RecordDialog(props) {
    const { onClose, open } = props;

    const handleChange = (newValue) => {
        console.log(newValue.toString())
        props.setBill({ ...props.bill, "duedate": newValue.toString() });
    };
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
                    onChange={(e) => props.setBill({ ...props.bill, "amount": e.target.value })}
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    required
                    label="Bill name"
                    type="text"
                    onChange={(e) => props.setBill({ ...props.bill, "name": e.target.value })}
                    fullWidth
                    variant="outlined"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        className='datePicker'
                        label="Due Date"
                        inputFormat="DD/MM/YYYY"
                        value={props.bill?.duedate}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Done</Button>
            </DialogActions>
        </Dialog>
    );
}
const BillDashboard = () => {
    const [hasBill, setHasBill] = useState(false)
    const [bill, setBill] = useState(null);
    const [open, setOpen] = useState(false);
    const bills = billsStore.useState(s => s.bills);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const getBills = async () => {
        let token = localStorage.getItem('token');
        await fetch('http://159.122.178.155:32442/bills', {
            method: 'GET',
            headers: new Headers({
                "x-access-token": token
            })
        }).then(res => res.json().then(data => {
            console.log(data)
            billsStore.update(s => {
                s.bills = data.bills
            })
        }))
    }

    useEffect(() => {
        getBills()
    }, [bills])

    const formData = new FormData();
    const handleClose = (value) => {
        if (bill) {
            setHasBill(true)
            formData.append('bill_name', bill.name);
            formData.append('amount', bill.amount);
            formData.append('due_date', bill.duedate ? new Date(bill.duedate).toLocaleDateString() : new Date().toLocaleDateString());
            let token = localStorage.getItem('token')
            fetch('http://159.122.178.155:32442/bills', {
                method: 'POST',
                body: formData,
                headers: new Headers({
                    "x-access-token": token
                })
            }).then(res => res.json().then(data => {
                console.log(data)
                getBills()
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
                    {bills?.length>0 ? (
                        <div className="record__body__container">
                            <Paper elevation={5} style={{ padding: "20px" }} className="record__TableCont">
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                                    <Typography variant="h6" color="text.secondary" gutterBottom>
                                        Bills
                                    </Typography>
                                    <Button onClick={handleClickOpen} variant="contained">Add Bill</Button>
                                    <RecordDialog
                                        open={open}
                                        onClose={handleClose}
                                        setBill={setBill}
                                        bill={bill}
                                    />
                                </Box>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Amount</TableCell>
                                            <TableCell align="right">Category</TableCell>
                                            <TableCell align="right">Due Date</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {bills.map((row, ind) => (
                                            <TableRow
                                                key={ind}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell>{row?.name}</TableCell>
                                                <TableCell align="right" component="th" scope="row">
                                                    {row?.amount}
                                                </TableCell>
                                                <TableCell align="right" >{new Date(row?.due_date).toLocaleDateString()}</TableCell>
                                            </TableRow>

                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </div>
                    ) : (
                        <div className="record__no__body__container">
                            <h3>You don't have any bills yet</h3>
                            <img src={emptyImg} alt="" />
                            <Button onClick={handleClickOpen} variant="contained">Add Bill</Button>
                            <RecordDialog
                                open={open}
                                onClose={handleClose}
                                setBill={setBill}
                                bill={bill}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default BillDashboard