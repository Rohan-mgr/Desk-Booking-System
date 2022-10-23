import React from "react";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div className="content-wrapper">
      {/* <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
            </div>
          </div>
        </div>
      </div> */}

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Main;
