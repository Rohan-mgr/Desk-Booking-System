import React, { useState } from "react";
import "./Signup.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import Loader from "../../UI/Loader/Loader";
import { validateForm } from "../../../shared/utility";

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
    const formError = validateForm(userData, "signup");
    if (Object.keys(formError).length > 0) {
      setErrors(formError);
    } else {
      props.onSignUp(userData, setErrors, setUserCredentials);
    }
  };

  return (
    <Form
      className="col-9 col-md-8 col-lg-4 mx-auto mt-2"
      onSubmit={(e) => handleUserCredentialsSubmission(e, userCredentials)}
    >
      <div className="SignUp__logo__wrapper">
        <div className="logo col-lg-2 col-3 col-md-2">
          <Image
            fluid
            src={require("../../../Assets/Images/desk-logo.png")}
            alt="desk-logo.png"
          />
        </div>
        <h1>Welcome</h1>
      </div>
      {!!errors.signupError && (
        <p className="login-errors my-3 text-center">{errors.signupError}</p>
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
      <Button
        className="col-12 col-lg-4 col-md-3"
        variant="primary"
        type="submit"
      >
        {props.loading ? <Loader /> : "Sign Up"}
      </Button>
      <div className="text-center my-2">
        <Form.Text>
          Already have an account?{" "}
          <Link to="/login" style={{ fontWeight: "bold" }}>
            Sign In
          </Link>
        </Form.Text>
      </div>
    </Form>
  );
}

export default SignUp;
