import React from 'react'
import Header from '../../Components/Header'
import SideBar from '../../Components/SideBar'

const BudgetDashboard = () => {
    return (
        <>
            <SideBar />
            <div className='dashBoardContainer'>
                <Header />
                <h1>Budget Dashboard</h1>
            </div>
        </>
    )
}

export default BudgetDashboard