import React from 'react'
import Header from '../../Components/Header'
import SideBar from '../../Components/SideBar'

const RecordDashboard = () => {
    return (
        <>
            <SideBar />
            <div className='dashBoardContainer'>
                <Header />
                <h1>Records Dashboard</h1>
            </div>
        </>
    )
}

export default RecordDashboard