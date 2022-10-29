import React from "react";

import { ToastContainer } from "react-toastify";

import { Routes, Route, redirect } from "react-router-dom";
import SignUp from "./Pages/Signup.js/Signup";
import Login from "./Pages/LoginPage/LoginPage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Landing from "./Pages/landing/landing";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ROUTES } from "./helper/routes";
import CreateCompany from "./Pages/Dashboard/CreateCompany/CreateCompany";
import RegisterCompany from "./Pages/Dashboard/RegisterCompany/RegisterCompany";
import Company from "./Pages/Dashboard/Company/Company";
import DashboardHome from "./Pages/Dashboard/dashboard/dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path={ROUTES.LANDING} element={<Landing />} />

        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route
          path={ROUTES.ROOT}
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path={ROUTES.DASHBOARD} element={<DashboardHome />} />
          <Route path={ROUTES.COMPANY} element={<Company />} />
          <Route path={ROUTES.CREATE_COMPANY} element={<CreateCompany />} />
          <Route path={ROUTES.REGISTER_COMPANY} element={<RegisterCompany />} />
          <Route path={ROUTES.MANAGE} element={<RegisterCompany />} />
        </Route>
        <Route path="*" element={<p>404!</p>} />
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
