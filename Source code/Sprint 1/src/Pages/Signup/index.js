import { Box, Button, Checkbox, Container, Divider, FormControlLabel, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import './signup.css'
import GoogleIcon from '@mui/icons-material/Google';
const Signup = () => {
    return (
        <Container maxWidth="xl" className='signup'>
            <Paper elevation={24} className="formContainer" square >
                <Typography variant="h4" align="center">Signup</Typography>
                <Box className="form">
                    <TextField variant="standard" label="Fullname" />
                    <TextField variant="standard" label="Phone Number" />
                    <TextField variant="standard" label="Email" />
                    <TextField variant="standard" label="Password" />
                    <TextField variant="standard" label="Confirm Password" />
                    {/* <TextField variant="standard" label="Income" />
                    <TextField variant="standard" label="Occupation" /> */}
                    <FormControlLabel control={<Checkbox />} label="I agree to the terms and conditions" />
                    <Button variant="outlined">Signup</Button>
                    <Button variant="contained" startIcon={<GoogleIcon />} >Sign up with google</Button>
                </Box>
                <Divider style={{ "marginTop": "10px" }} />
                <Typography className="footertext" variant="body2" color="text.secondary" align="center">Already have an accout? <NavLink to="/login">login</NavLink></Typography>
            </Paper>
        </Container>
    )
}

export default Signup