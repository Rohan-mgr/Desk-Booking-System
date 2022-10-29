import "./NavBar.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useLocation } from "react-router-dom";

function NavBar(props) {
  const location = useLocation();
  return (
    <Navbar bg="Navbar home_navbar" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            alt="desk-logo"
            src="/dist/img/desk-logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Book Your Desk
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            activeKey={location.pathname}
            className="text-center"
            style={{ marginLeft: "auto" }}
          >
            <Nav.Link href="#contact" className="mx-3 my-2">
              Contact Us
            </Nav.Link>
            <Nav.Link href="#about" className="mx-3 my-2">
              About Us
            </Nav.Link>
            <Nav.Link href="/signup" className="mx-3 my-2">
              Sign Up
            </Nav.Link>
            <Nav.Link
              href="/login"
              className="mx-3 my-2"
              style={{ marginLeft: "auto" }}
            >
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
