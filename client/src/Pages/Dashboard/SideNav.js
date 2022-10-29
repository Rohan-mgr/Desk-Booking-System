import React from "react";
import "./SideNav.css";
import { ROUTES } from "../../helper/routes";

function SideNav() {
  return (
    <aside className="main-sidebar sidebar-dark-primary ">
      <a
        href={ROUTES.DASHBOARD + "/" + ROUTES.CREATE_COMPANY}
        className="brand-link d-flex align-items-center"
      >
        <i className="bi-bullseye brand-logo mr-2"></i>
        <span className="brand-text font-weight-light">Book Your Desk</span>
      </a>
      <div className="sidebar">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
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
      </div>
    </aside>
  );
}

export default SideNav;
