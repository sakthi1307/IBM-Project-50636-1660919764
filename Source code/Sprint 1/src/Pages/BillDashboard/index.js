import React from 'react'
import Header from '../../Components/Header'
import SideBar from '../../Components/SideBar'
import "./billDashboard.css"
const BillDashboard = () => {
    return (
        <>
            <SideBar />
            <div className='dashBoardContainer'>
                <Header />
                <h1>Bill Dashboard</h1>
            </div>
        </>
    )
}

export default BillDashboard