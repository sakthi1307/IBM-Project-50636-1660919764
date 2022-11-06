import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PaymentIcon from '@mui/icons-material/Payment';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
export const SideBarData = [
    {
        title: "Dashboard",
        icon: <DashboardIcon />,
        link: "/dashboard"
    },
    {
        title: "Budgets and Goals",
        icon: <TrackChangesIcon />,
        link: "/budgets"
    },
    {
        title: "Records",
        icon: <FormatListBulletedIcon />,
        link: "/records"
    },
    {
        title: "Bills",
        icon: <PaymentIcon />,
        link: "/bills"
    },
    {
        title: "Signup",
        icon: <PersonOutlineIcon />,
        link: "/signup"
    }
]