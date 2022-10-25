import React from "react";
import "./LandingPage.css";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/Image";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <Container fluid id="landingPage">
      <Row>
        <Col className="col-lg-6 col-12 content1">
          <h1 className="mb-5">
            Book a{" "}
            <Typewriter
              options={{
                strings: [
                  "<h1'>Floor</h1>",
                  "<h1'>Room</h1>",
                  "<h1'>Desk</h1>",
                ],
                autoStart: true,
                loop: true,
              }}
            />
            <span>for your office</span>
          </h1>
          <p className="col-lg-8">
            Build your dream office with us. Allow your colleague to reserve
            desks with a simple app. Implement reservation rules to ensure
            efficient and fair usage. Make cooperation easier by showing where
            others sit.
          </p>
          <Button
            className="col-6 col-lg-3 col-md-4"
            onClick={() => navigate("/login")}
          >
            Book Now
          </Button>
        </Col>
        <Col className="col-lg-6 col-12">
          <Image fluid src="/dist/img/banner-image.png" />
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPage;
