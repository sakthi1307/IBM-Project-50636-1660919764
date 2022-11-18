import React from 'react';
import "./SideBar.css";
import { NavLink } from "react-router-dom";
import { SideBarData } from "./SideBarData";
import { userStore } from '../../store';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Button } from '@mui/material';

function SideBar() {
  const isLoggedIn = userStore.useState(s => s.isLoggedIn);
  const logout = () => {
    userStore.update(s => {
      s.isLoggedIn = false
      s.token = ""
      s.user = {}
    })
    localStorage.removeItem("token")
    window.location.href = "/"
  }
  return (
    <div className='SideBar'>
      <div className='AppName'>
        Expenso
      </div>
      <ul className='SideBarList'>
        {SideBarData.map((val, key) => {
          return <li key={key} >
            <NavLink to={val.link} className="Row">
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </NavLink>

          </li>;

        })}
        {
          isLoggedIn ? (
            <li>
              <NavLink variant='text' onClick={logout} className="Row">
                <div id="icon"><PersonOutlineIcon /></div>
                <div id="title">Logout</div>
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="/signup" className="Row">
                <div id="icon"><PersonOutlineIcon /></div>
                <div id="title">Signup</div>
              </NavLink>
            </li>

          )
        }
      </ul>

    </div>
  )
}

export default SideBar