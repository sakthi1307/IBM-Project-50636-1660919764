import { Box, Button, Container, Divider, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google';
import { userStore } from '../../store';
const Login = () => {
    const [userData, setUserData] = useState({});

    const formData = new FormData();
    const handleSubmit = async (e) => {
        e.preventDefault();
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        await fetch('http://159.122.178.155:32442/login', {
            method: 'POST',
            body: formData,
        }).then(res => res.json().then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                userStore.update(s => {
                    s.isLoggedIn = true
                    s.token = data.token
                })
                window.location.href = '/';
            }
        }))
    }
    return (
        <Container maxWidth="xl" className='signup'>
            <Paper elevation={24} className="formContainer" square >
                <Typography variant="h4" align="center">Login</Typography>
                <form className="form">
                    <TextField variant="standard" type="email" label="Email" onChange={(event) => {
                        formData.append('email', event.target.value);
                        setUserData({
                            ...userData,
                            ["email"]: event.target.value
                        });
                    }} />
                    <TextField variant="standard" type="password" label="Password" onChange={(event) => {
                        formData.append('password', event.target.value);
                        setUserData({
                            ...userData,
                            ["password"]: event.target.value
                        });
                    }} />
                    <Button variant="outlined" type='submit' onClick={handleSubmit}>Login</Button>
                    {/* <Button variant="contained" startIcon={<GoogleIcon />} >Log in with google</Button> */}
                </form>
                <Divider style={{ "marginTop": "10px" }} />
                <Typography className="footertext" variant="body2" color="text.secondary" align="center">Don't have an accout? <NavLink to="/signup">Signup</NavLink></Typography>
            </Paper>
        </Container>
    )
}

export default Login