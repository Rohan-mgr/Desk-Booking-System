import React from "react";
import { ROUTES } from "../../../helper/routes";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <a href={ROUTES.ROOT} className="navbar-brand mx-auto mx-lg-0">
          <i className="bi-bullseye brand-logo mr-2"></i>
          <span className="brand-text">
            Desk <br /> Booking system{" "}
          </span>
        </a>

        <a className="nav-link custom-btn btn d-lg-none" href="#">
          Buy Tickets
        </a>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link click-scroll" href="#section_1">
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link click-scroll" href="#section_2">
                About
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link click-scroll" href="#section_6">
                Workspace
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link click-scroll" href="#section_7">
                Contact
              </a>
            </li>

            <li className="nav-item">
              <a
                className="nav-link custom-btn btn d-none d-lg-block"
                href={ROUTES.LOGIN}
              >
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
