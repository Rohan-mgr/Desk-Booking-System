import React, { useState } from "react";
import "./Signup.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import Loader from "../../Components/UI/Loader/Loader";
import { ROUTES } from "../../helper/routes";

function SignUp(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChangeHandler = (e) => {
    setUserCredentials((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
    if (!!errors[e.target.name]) {
      setErrors((prevState) => {
        return {
          ...prevState,
          [e.target.name]: null,
        };
      });
    }
  };

  const handleUserCredentialsSubmission = (e, userData) => {
    e.preventDefault();

    props.onSignUp(userData, setErrors, setUserCredentials);
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-form card">
        <Form
          className="card-body"
          onSubmit={(e) => handleUserCredentialsSubmission(e, userCredentials)}
        >
          <div>
            <h3>Sign up</h3>
          </div>
          {!!errors.signupError && (
            <p className="login-errors my-3 text-center">
              {errors.signupError}
            </p>
          )}
          <Form.Group className="mb-3" controlId="fname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="fname"
              value={userCredentials.fname}
              onChange={(e) => handleInputChangeHandler(e)}
              placeholder="Enter First Name"
              isInvalid={!!errors.fname}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fname}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="lname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lname"
              value={userCredentials.lname}
              onChange={(e) => handleInputChangeHandler(e)}
              placeholder="Enter Last Name"
              isInvalid={!!errors.lname}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={userCredentials.email}
              onChange={(e) => handleInputChangeHandler(e)}
              placeholder="Enter Email"
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              value={userCredentials.password}
              onChange={(e) => handleInputChangeHandler(e)}
              placeholder="Password"
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              onClick={togglePassword}
              label="Show Password"
            />
          </Form.Group>
          <div className="d-grid">
            <Button variant="primary" type="submit" size="lg">
              {props.loading ? <Loader /> : "Sign Up"}
            </Button>
          </div>
          <div className="text-center my-2">
            <Form.Text>
              Already have an account?{" "}
              <Link to={ROUTES.LOGIN} style={{ fontWeight: "bold" }}>
                Sign In
              </Link>
            </Form.Text>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
