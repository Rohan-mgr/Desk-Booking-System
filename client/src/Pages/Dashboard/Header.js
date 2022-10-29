import React, { useEffect } from "react";
import "./Header.css";
import { BsBell } from "react-icons/bs";
import Button from "react-bootstrap/esm/Button";
import { ROUTES } from "../../helper/routes";
import { _removeAllLs } from "../../helper/storage";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/auth";

function Header() {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  getCurrentUser();
  return (
    <nav className="main-header navbar navbar-expand  mr-1">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars" />
          </a>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        {/* Notifications Dropdown Menu */}
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <BsBell style={{ marginRight: "24px" }} />
            <span className="badge badge-warning navbar-badge">15</span>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header">
              15 Notifications
            </span>
            <div className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <i className="fas fa-envelope mr-2" /> 4 new messages
              <span className="float-right text-muted text-sm">3 mins</span>
            </a>
            <div className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <i className="fas fa-users mr-2" /> 8 friend requests
              <span className="float-right text-muted text-sm">12 hours</span>
            </a>
            <div className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              <i className="fas fa-file mr-2" /> 3 new reports
              <span className="float-right text-muted text-sm">2 days</span>
            </a>
            <div className="dropdown-divider" />
            <a href="#" className="dropdown-item dropdown-footer">
              See All Notifications
            </a>
          </div>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="fullscreen"
            href="#"
            role="button"
          >
            <i className="fas fa-expand-arrows-alt" />
          </a>
        </li>
        <div>
          <Button
            className="col-12"
            onClick={() => {
              _removeAllLs();
              navigate(ROUTES.LOGIN);
            }}
          >
            Logout
          </Button>
        </div>
      </ul>
    </nav>
  );
}

export default Header;
