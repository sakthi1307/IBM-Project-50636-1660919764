import './App.css';
import SideBar from './Components/SideBar';
import Dashboard from './Components/Dashboard';
import { Route, Routes } from "react-router-dom";
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import BillDashboard from './Pages/BillDashboard';
import BudgetDashboard from './Pages/BudgetDashboard';
import RecordDashboard from './Pages/RecordDashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route index element={<Dashboard />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="bills" element={<BillDashboard />} />
        {/* <Route path="budgets" element={<BudgetDashboard />} /> */}
        <Route path="records" element={<RecordDashboard />} />
      </Routes>
    </div>

  );
}

export default App;
