import React from "react";
import Header from "./Header";
import SideNav from "./SideNav";
import Main from "./Main";
import Footer from "./Footer";

function Dashboard() {
  return (
    <div className="wrapper">
      <Header />
      <SideNav />
      <Main />
      <Footer />
    </div>
  );
}

export default Dashboard;
