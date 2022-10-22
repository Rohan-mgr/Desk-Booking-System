import React from "react";
import Button from "react-bootstrap/esm/Button";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "../../helper/routes";
import { _removeAllLs, _setSecureLs } from "../../helper/storage";

function Main() {
  const navigate = useNavigate();
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
          </div>
        </div>
      </div>

      <section className="content">
        <div className="container-fluid">
          <div>
            <Button
              onClick={() => {
                _removeAllLs();
                navigate(ROUTES.LOGIN);
              }}
            >
              Logout
            </Button>
          </div>
          <div className="row">
            <Outlet />
          </div>
          <div className="row"></div>
        </div>
      </section>
    </div>
  );
}

export default Main;
