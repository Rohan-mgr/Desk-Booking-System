import React, { useState } from "react";
import "./Signup.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Components/UI/Loader/Loader";
import { ROUTES } from "../../helper/routes";
import { toast } from "react-toastify";
import { handleUserSignup } from "../../services/auth";
import { useFormik } from "formik";

function SignUp(props) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const data = await handleUserSignup(values);
        if (!data) {
          console.log(data);
          return;
        }
        navigate(ROUTES.LOGIN);
      } catch (e) {
        toast.error(e);
        console.log("error", e);
      }
    },
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-form card col-9 col-lg-4 col-md-8">
        <Form className="card-body" onSubmit={formik.handleSubmit}>
          <div>
            <h3 className="text-center">Sign up</h3>
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
              required
              value={formik.values.fname}
              onChange={formik.handleChange}
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
              required
              value={formik.values.lname}
              onChange={formik.handleChange}
              placeholder="Enter Last Name"
              isInvalid={!!errors.lname}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              required
              value={formik.values.email}
              onChange={formik.handleChange}
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
              required
              value={formik.values.password}
              onChange={formik.handleChange}
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
