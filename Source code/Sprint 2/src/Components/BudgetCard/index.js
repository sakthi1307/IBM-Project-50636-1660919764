import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

const BudgetCard = ({ title, expense, budget, balance }) => {
    return (
        <Card elevation={5} sx={{ minWidth: 300, maxWidth: 300, marginBottom: "20px" }} className="Card">

            <CardContent>
                <Typography variant='h6' sx={{ fontSize: 18, fontWeight: "bold" }} color="text.secondary" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h6" pb={1} component="h6" color="primary">
                    ${expense}/${budget}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Balance: ${balance}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default BudgetCard