import { Box, Button, Checkbox, Container, Divider, FormControlLabel, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './signup.css'
import GoogleIcon from '@mui/icons-material/Google';
const Signup = () => {
    const [userData, setUserData] = useState({});

    const formData = new FormData();
    const handleSubmit = (e) => {
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('income', userData.income);
        formData.append('phone_number', userData.phone_number);
        e.preventDefault();
        fetch('http://159.122.178.155:32442/signup', {
            method: 'POST',
            body: formData,
        }).then(res => {window.location.href='/'})
    }
    return (
        <Container maxWidth="xl" className='signup'>
            <Paper elevation={24} className="formContainer" square >
                <Typography variant="h4" align="center">Signup</Typography>
                <form className="form">
                    <TextField variant="standard" required label="Fullname" type="text" onChange={(event) => {
                        formData.append('name', event.target.value);
                        setUserData({
                            ...userData,
                            ["name"]: event.target.value
                        });
                    }} />
                    <TextField variant="standard" required label="Email" type="email" onChange={(event) => {
                        formData.append('email', event.target.value);
                        setUserData({
                            ...userData,
                            ["email"]: event.target.value
                        });
                    }} />
                    <TextField variant="standard" required label="Password" type="password" onChange={(event) => {
                        formData.append('password', event.target.value);

                        setUserData({
                            ...userData,
                            ["password"]: event.target.value
                        });
                    }} />
                    <TextField variant="standard" required label="Confirm Password" type="password" onChange={(event) => {
                        formData.append('confirmPassword', event.target.value);

                        setUserData({
                            ...userData,
                            ["confirmPassword"]: event.target.value
                        });
                    }} />
                    <TextField variant="standard" required label="Phone Number" type="tel" onChange={(event) => {
                        formData.append('confirmPassword', event.target.value);

                        setUserData({
                            ...userData,
                            ["phone_number"]: event.target.value
                        });
                    }} />
                    <TextField variant="standard" required label="Income" type="number" onChange={(event) => {
                        formData.append('confirmPassword', event.target.value);

                        setUserData({
                            ...userData,
                            ["income"]: event.target.value
                        });
                    }} />
                    {/* <TextField variant="standard" label="Income" />
                    <TextField variant="standard" label="Occupation" /> */}
                    <FormControlLabel control={<Checkbox />} label="I agree to the terms and conditions" />
                    <Button variant="outlined" type='submit' onClick={handleSubmit}>Signup</Button>
                    {/* <Button variant="contained" startIcon={<GoogleIcon />} >Sign up with google</Button> */}
                </form>
                <Divider style={{ "marginTop": "10px" }} />
                <Typography className="footertext" variant="body2" color="text.secondary" align="center">Already have an accout? <NavLink to="/">login</NavLink></Typography>
            </Paper>
        </Container>
    )
}

export default Signup