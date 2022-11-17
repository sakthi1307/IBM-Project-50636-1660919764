import './App.css';
import SideBar from './Components/SideBar';
import Dashboard from './Components/Dashboard';
import { Route, Routes } from "react-router-dom";
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import BillDashboard from './Pages/BillDashboard';
import BudgetDashboard from './Pages/BudgetDashboard';
import RecordDashboard from './Pages/RecordDashboard';
import { userStore } from './store';
import { useEffect } from 'react';

function App() {
  const isLoggedIn = userStore.useState(s => s.isLoggedIn);
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!!token) {
      userStore.update(s => {
        s.isLoggedIn = true
        s.token = token
      })
      fetch('http://localhost:5000/getinfo', {
        method: 'GET',
        headers: new Headers({
          "x-access-token": token
        })
      }).then(res => res.json().then(data => {
        console.log(data)
        userStore.update(s => {
          s.user = data.users
        })
      }))
    }
  }, [])
  return (
    <div className="App">
      <Routes>
        {
          !isLoggedIn ? (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          ) : (
            <>
              <Route index element={<Dashboard />} />
              <Route path="bills" element={<BillDashboard />} />
              {/* <Route path="budgets" element={<BudgetDashboard />} /> */}
              <Route path="records" element={<RecordDashboard />} />
            </>
          )
        }
      </Routes>
    </div>

  );
}

export default App;
