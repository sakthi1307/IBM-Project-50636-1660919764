import { Box, Button, Checkbox, Container, Divider, FormControlLabel, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './signup.css'
import GoogleIcon from '@mui/icons-material/Google';
const Signup = () => {
    const [userData, setUserData] = useState({});

    const formData = new FormData();
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000//signup', {
            method: 'POST',
            body: formData,
        }).then(res => console.log(res.body))
    }
    return (
        <Container maxWidth="xl" className='signup'>
            <Paper elevation={24} className="formContainer" square >
                <Typography variant="h4" align="center">Signup</Typography>
                <Box className="form">
                    <TextField variant="standard" label="Fullname" onChange={(event) => {
                        formData.append('name', event.target.value);
                        setUserData({
                            ...userData,
                            ["name"]: event.target.value
                        });
                    }} />
                    <TextField variant="standard" label="Email" onChange={(event) => {
                        formData.append('email', event.target.value);
                        setUserData({
                            ...userData,
                            ["email"]: event.target.value
                        });
                    }} />
                    <TextField variant="standard" label="Password" onChange={(event) => {
                        formData.append('password', event.target.value);

                        setUserData({
                            ...userData,
                            ["password"]: event.target.value
                        });
                    }} />
                    <TextField variant="standard" label="Confirm Password" onChange={(event) => {
                        formData.append('confirmPassword', event.target.value);

                        setUserData({
                            ...userData,
                            ["confirmPassword"]: event.target.value
                        });
                    }} />
                    {/* <TextField variant="standard" label="Income" />
                    <TextField variant="standard" label="Occupation" /> */}
                    <FormControlLabel control={<Checkbox />} label="I agree to the terms and conditions" />
                    <Button variant="outlined" onClick={handleSubmit}>Signup</Button>
                    <Button variant="contained" startIcon={<GoogleIcon />} >Sign up with google</Button>
                </Box>
                <Divider style={{ "marginTop": "10px" }} />
                <Typography className="footertext" variant="body2" color="text.secondary" align="center">Already have an accout? <NavLink to="/login">login</NavLink></Typography>
            </Paper>
        </Container>
    )
}

export default Signup