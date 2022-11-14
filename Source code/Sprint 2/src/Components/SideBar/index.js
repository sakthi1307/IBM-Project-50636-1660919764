import React from 'react';
import "./SideBar.css";
import { NavLink } from "react-router-dom";
import { SideBarData } from "./SideBarData";

function SideBar() {
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
      </ul>

    </div>
  )
}

export default SideBar