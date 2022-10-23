import React from "react";
import "./SideNav.css";
import { ROUTES } from "../../helper/routes";

function SideNav() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href={ROUTES.CREATE_COMPANY} className="brand-link">
        <img
          src="/dist/img/desk-logo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{
            opacity: ".8",
            boxShadow: "none",
            borderRadius: "0",
          }}
        />
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
            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
            <li className="nav-item">
              <a href="/registercompany" className="nav-link">
                <i className="nav-icon fa fa-building" aria-hidden="true"></i>
                <p>Create Company</p>
              </a>
            </li>
            <li className="nav-item">
              <a href="/dashboard/ui2 " className="nav-link">
                <i className="nav-icon fas fa-tree" />
                <p>UI Elements2</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default SideNav;
