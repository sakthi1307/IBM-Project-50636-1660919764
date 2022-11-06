import React from 'react'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Header = () => {
    return (
        <div className='NameBar'>
            <p>Your Dashboard</p>
            <div className='User'>
                <p>User Name</p>
                <AccountCircleIcon />
            </div>
        </div>
    )
}

export default Header