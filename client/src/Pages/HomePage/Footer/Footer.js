import React from "react";
import "./Footer.css";
import { Container, Row, Col } from "react-bootstrap";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

function Footer() {
  return (
    <section>
      <Container fluid className="text-center footer">
        <Row>
          <Col>
            <p>Stay Connect with us</p>
            <p>
              <a href="https://www.facebook.com/" target="_blank">
                <BsFacebook />
              </a>
              <a href="https://www.instagram.com/" target="_blank">
                <BsInstagram />
              </a>
              <a href="https://www.twitter.com/" target="_blank">
                <BsTwitter />
              </a>
            </p>
            <p>
              Book Your Desk &copy; {new Date().getFullYear()}. All rights
              reserved
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Footer;
