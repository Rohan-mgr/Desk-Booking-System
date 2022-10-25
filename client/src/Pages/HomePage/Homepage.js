import React from "react";
import NavBar from "./Navigation/Navbar";
import LandingPage from "./LandingPage/LandingPage";
import Contact from "./Contact/Contact";
import About from "./About/About";
import Footer from "./Footer/Footer";

function Homepage() {
  return (
    <div>
      <NavBar />
      <LandingPage />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default Homepage;
