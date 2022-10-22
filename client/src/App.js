import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Components/Pages/Signup.js/Signup";
import Login from "./Components/Pages/LoginPage/LoginPage";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route index path="/dashboard/*" element={<Dashboard />}></Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<p>404!</p>} />
      </Routes>
    </div>
  );
}

export default App;
