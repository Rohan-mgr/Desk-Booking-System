import React from "react";
import "./SideNav.css";
import { ROUTES } from "../../helper/routes";
import { _removeAllLs } from "../../helper/storage";
import { useNavigate } from "react-router-dom";

function SideNav() {
  const navigate = useNavigate();

  return (
    <aside className="main-sidebar sidebar-dark-primary ">
      <a
        href={ROUTES.DASHBOARD + "/" + ROUTES.CREATE_COMPANY}
        className="brand-link d-flex align-items-center"
      >
        <i className="bi-bullseye brand-logo mr-2"></i>
        <span className="brand-text font-weight-light">Book Your Desk</span>
      </a>

      <div className="sidebar ">
        <nav className="mt-2 mb-2 d-flex flex-column justify-content-between align-items-between">
          <ul
            className="nav nav-flat nav-sidebar flex-column"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <a href="/dashboard" className="nav-link">
                <i className="nav-icon fa fa-house-user" aria-hidden="true"></i>
                <p>Dashboard</p>
              </a>
            </li>

            <li className="nav-item">
              <a href="/dashboard/company" className="nav-link">
                <i className="nav-icon fa fa-building" aria-hidden="true"></i>
                <p>Workspaces</p>
              </a>
            </li>

            <li className="nav-item">
              <a href="/dashboard" className="nav-link">
                <i className="nav-icon fas fa-toolbox"></i>
                <p>Manage</p>
              </a>
            </li>
          </ul>
        </nav>

        <div class="sidebar-custom">
          <button
            onClick={() => {
              _removeAllLs();
              navigate(ROUTES.LOGIN);
            }}
            class="mt-2 btn btn-secondary hide-on-collapse pos-right"
          >
            <i class="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

export default SideNav;