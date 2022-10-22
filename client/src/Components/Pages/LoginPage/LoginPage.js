import React, { useState } from "react";
import "./LoginPage.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Loader from "../../UI/Loader/Loader";
import { validateForm } from "../../../shared/utility";
import { handleUserLogin } from "../../../services/auth";

function Login(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
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

  const handleLogin = (e, userData) => {
    e.preventDefault();

    handleUserLogin(userData);

    console.log(userData);
  };

  return (
    <Form
      className="col-9 col-md-8 col-lg-4 mx-auto mt-2"
      onSubmit={(e) => handleLogin(e, userCredentials)}
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
      {!!errors.loginError && (
        <p className="login-errors my-3 text-center">{errors.loginError}</p>
      )}
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
        {props.loading ? <Loader /> : "Sign In"}
      </Button>
    </Form>
  );
}

export default Login;
