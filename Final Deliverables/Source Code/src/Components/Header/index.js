import React from 'react'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { userStore } from '../../store';
const Header = () => {
    const user = userStore.useState(s => s.user);
    return (
        <div className='NameBar'>
            <p className='title'>Your Dashboard</p>
            <div className='User'>
                <p>{user?.name}</p>
                <AccountCircleIcon />
            </div>
        </div>
    )
}

export default Header