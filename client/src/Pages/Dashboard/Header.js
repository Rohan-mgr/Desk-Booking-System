import React, { useEffect } from "react";
import "./Header.css";
import { BsBell } from "react-icons/bs";
import Button from "react-bootstrap/esm/Button";
import { ROUTES } from "../../helper/routes";
import { _removeAllLs } from "../../helper/storage";
import { useNavigate } from "react-router-dom";

function Header({ currentUser }) {
  const navigate = useNavigate();

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

        <li className="nav-item">
          <a className="nav-link" href="#" role="button">
            <i className="fas fa-user" /> {currentUser?.fname}
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
