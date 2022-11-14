import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const InfoCard = ({ title, amount, link }) => {
    return (
        <Card elevation={5} sx={{ minWidth: 50, maxWidth: 200 }} className="Card">

            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h6" component="h6" color="primary">
                    ${amount}
                </Typography>
            </CardContent>
            <CardActionArea className='infoCard--footer' >
                <Link to={link}>View Details</Link>
            </CardActionArea>
        </Card>
    )
}

export default InfoCard