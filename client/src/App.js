import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Components/Pages/Signup.js/Signup";
import Login from "./Components/Pages/LoginPage/LoginPage";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import UI from "./Components/Pages/Dashboard/UI";
import UI2 from "./Components/Pages/Dashboard/UI2";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="ui" element={<UI />} />
          <Route path="ui2" element={<UI2 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
