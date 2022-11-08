import { Box, Button, Container, Divider, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google';
const Login = () => {
    const [userData, setUserData] = useState({});

    const formData = new FormData();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:5000//login', {
            method: 'POST',
            body: formData,
        }).then(res => console.log(res.body))
    }
    return (
        <Container maxWidth="xl" className='signup'>
            <Paper elevation={24} className="formContainer" square >
                <Typography variant="h4" align="center">Login</Typography>
                <Box className="form">
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
                    <Button variant="outlined">Login</Button>
                    <Button variant="contained" startIcon={<GoogleIcon />} >Log in with google</Button>
                </Box>
                <Divider style={{ "marginTop": "10px" }} />
                <Typography className="footertext" variant="body2" color="text.secondary" align="center">Don't have an accout? <NavLink to="/signup">Signup</NavLink></Typography>
            </Paper>
        </Container>
    )
}

export default Login