import React, { useState } from 'react'
import Header from '../../Components/Header'
import SideBar from '../../Components/SideBar'
import "./billDashboard.css"
import { Box, Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControlLabel, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import emptyImg from '../../assets/empty_item.svg'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function RecordDialog(props) {
    const { onClose, open } = props;

    const handleChange = (newValue) => {
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
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        if (bill)
            setHasBill(true)
        setOpen(false);
    };
    return (
        <>
            <SideBar />
            <div className='dashBoardContainer'>
                <Header />
                <div className="record__body">
                    {hasBill ? (
                        <div className="record__body__container">
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
                                                123
                                            </TableCell>
                                        </TableRow>
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