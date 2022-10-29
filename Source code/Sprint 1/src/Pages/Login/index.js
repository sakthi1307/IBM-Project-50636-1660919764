import { Box, Button, Container, Divider, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google';
const Login = () => {
    return (
        <Container maxWidth="xl" className='signup'>
            <Paper elevation={24} className="formContainer" square >
                <Typography variant="h4" align="center">Login</Typography>
                <Box className="form">
                    <TextField variant="standard" label="Email" />
                    <TextField variant="standard" label="Password" />
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