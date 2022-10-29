import './App.css';
import SideBar from './Components/SideBar';
import Dashboard from './Components/Dashboard';
import { Route, Routes } from "react-router-dom";
import Login from './Pages/Login';
import Signup from './Pages/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route exact path="/" element={
          <>
            <SideBar />
            <Dashboard />
          </>
        } />
      </Routes>
    </div>

  );
}

export default App;
