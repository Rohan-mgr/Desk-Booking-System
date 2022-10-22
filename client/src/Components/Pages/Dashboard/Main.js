import React from "react";
import { Outlet } from "react-router-dom";
// import Dashboard from "./Dashboard";
// import UI from "./UI";

function Main() {
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      {/* <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
          </div>
        </div>
      </div> */}
      {/* Main content */}
      {/* <section className="content"> */}
      {/* <div className="container-fluid">
          <div className="row"> */}
      <Outlet />
      {/* </div> */}
      {/* <div className="row"></div> */}
      {/* </div> */}
      {/* </section> */}
    </div>
  );
}

export default Main;
