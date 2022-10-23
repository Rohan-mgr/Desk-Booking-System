import React from "react";

import { ToastContainer } from "react-toastify";

import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/Signup.js/Signup";
import Login from "./Pages/LoginPage/LoginPage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ROUTES } from "./helper/routes";
import CreateCompany from "./Pages/Dashboard/Dashboard Pages/CreateCompany";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        <Route index path={ROUTES.LOGIN} element={<Login />} />
        <Route
          path={ROUTES.ROOT}
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/registercompany" element={<CreateCompany />} />
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
