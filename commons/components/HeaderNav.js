import React from "react";
import HyperPilotLogo from "../../assets/images/asset_hyperpilot_nav_logo.svg";
import MainMenuIcon from "../../assets/images/icon_main_menu.svg";
import UserIcon from "../../assets/images/icon_user.svg";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import NavItemLink from "./NavItemLink";




export default ({ history, children }) => (
  <div>
    <nav className="navbar">
      <div className="container">

        {/* HyperPilot icon */}
        <div className="left">
          <div className="navbar-item">
            <img className="brand" src={HyperPilotLogo} />
          </div>
        </div>

        {/* Search bar */}
        <div className="center">
          <div className="navbar-item">
            <input type="search" placeholder="Jump to apps, status, services..." />
          </div>
        </div>

        {/* Menu and account icon */}
        <div className="right nav-sublist">
          <div className="navbar-item">
            <img className="menu-icon" src={MainMenuIcon} />
          </div>
          <Link to="/login" className="navbar-item">
            <img className="user-icon" src={UserIcon} />
          </Link>
        </div>

      </div>
    </nav>

    {/* Header */}
    <div className="header">
      <div className="container">
        <div className="current-location">
        <NavItemLink  activeStyle={{color:"#fff", border:"none", }} to="/sizing-test" text="Sizing Analysis"/>
        </div>
        <a href="#" className="badge info settings-button">
          <span className="placehold-settings-icon" /> Settings
        </a>
      </div>
    </div>

    {/* Subnav */}

  </div>
)
