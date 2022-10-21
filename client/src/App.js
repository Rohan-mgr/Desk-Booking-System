import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import SignUp from "./Components/Pages/Signup.js/Signup";
import Login from "./Components/Pages/LoginPage/LoginPage";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [authState, setAuthState] = useState({
    isAuth: undefined,
    token: null,
    userId: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    setAuthState((prevState) => {
      return {
        ...prevState,
        isAuth: true,
        token: token,
        userId: userId,
      };
    });
    setAutoLogout(remainingMilliseconds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.isAuth, authState.token, authState.userId]);

  const logoutHandler = () => {
    setAuthState((prevState) => {
      return {
        ...prevState,
        isAuth: false,
        token: null,
        userId: null,
      };
    });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiryDate");
    navigate("/login");
  };

  const setAutoLogout = (remainingTime) => {
    setTimeout(() => {
      logoutHandler();
    }, remainingTime);
  };

  const handleUserCredentialsSubmission = (
    userData,
    setErrors,
    setUserCredentials
  ) => {
    setIsLoading(true);
    fetch("http://localhost:3080", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          if (res.status === 409) {
            throw new Error("Email address already exists!");
          } else {
            throw new Error("Creating a user failed!");
          }
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        setIsLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        setIsLoading(false);
        setErrors((prevState) => {
          return {
            ...prevState,
            signupError: err.message,
          };
        });
        setUserCredentials((prevState) => {
          return {
            ...prevState,
            fname: "",
            lname: "",
            email: "",
            password: "",
          };
        });
        throw new Error(err);
      });
  };

  const handleUserlogin = (userData, setErrors, setUserCredentials) => {
    setIsLoading(true);
    fetch("http://localhost:3080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Invalid Email Address & Password");
        }
        return res.json();
      })
      .then((resData) => {
        setAuthState((prevState) => {
          return {
            ...prevState,
            isAuth: true,
            token: resData.token,
            userId: resData.userId,
          };
        });
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        setIsLoading(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        setAuthState((prevState) => {
          return {
            ...prevState,
            isAuth: false,
            token: null,
            userId: null,
          };
        });
        setUserCredentials((prevState) => {
          return {
            ...prevState,
            email: "",
            password: "",
          };
        });
        setErrors((prevState) => {
          return {
            ...prevState,
            loginError: err.message,
          };
        });
        setIsLoading(false);
        throw new Error(err);
      });
  };
  console.log(authState.isAuth);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <SignUp
              loading={isLoading}
              onSignUp={handleUserCredentialsSubmission}
            />
          }
        />
        <Route
          path="/login"
          element={<Login loading={isLoading} onSingIn={handleUserlogin} />}
        />
        {authState.isAuth && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}
        {/* <Route path="/" element={<PrivateRoute isAuth={authState.isAuth} />}> */}
        {/* </Route> */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </div>
  );
}

export default App;
