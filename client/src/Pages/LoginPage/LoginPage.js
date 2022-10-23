import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";

import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loader from "../../Components/UI/Loader/Loader";
import { handleUserLogin } from "../../services/auth";
import { _getSecureLs, _setSecureLs } from "../../helper/storage";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../helper/routes";

import "./LoginPage.css";

function Login(props) {
  const navigate = useNavigate();
  const { isLoggedIn } = _getSecureLs("auth");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(ROUTES.ROOT);
    }
  }, [isLoggedIn, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const data = await handleUserLogin(values);
        if (!data.userId) {
          console.log(data);
          return;
        }

        _setSecureLs("auth", {
          isLoggedIn: true,
          token: data.token,
          user: data.userId,
        });

        navigate(ROUTES.CREATE_COMPANY);
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
    <div className="login-wrapper">
      <Form className="login-form card" onSubmit={formik.handleSubmit}>
        <div className="card-body">
          <div className="card-title-wrapper">
            <h3 className="text-center mb-3">Login</h3>
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Enter Email"
              isInvalid={formik.errors.email}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              isInvalid={formik.errors.password}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              onClick={togglePassword}
              label="Show Password"
            />
          </Form.Group>
          <div className="row">
            <div className="col d-grid">
              <Button
                className="btn btn-primary"
                size="lg"
                variant="primary"
                type="submit"
              >
                {props.loading ? <Loader /> : "Login"}
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Login;
