const { AUTH_ENDPOINT } = require("../helper/endpoints");
const { httpAuth } = require("../helper/http");

export const handleUserLogin = (userData, setErrors, setUserCredentials) => {
  const URL = AUTH_ENDPOINT.login;
  httpAuth.post(URL, userData);
  // fetch("http://localhost:3080/login", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(userData),
  // })
  //   .then((res) => {
  //     if (res.status !== 200 && res.status !== 201) {
  //       throw new Error("Invalid Email Address & Password");
  //     }
  //     return res.json();
  //   })
  //   .then((resData) => {
  //     setAuthState((prevState) => {
  //       return {
  //         ...prevState,
  //         isAuth: true,
  //         token: resData.token,
  //         userId: resData.userId,
  //       };
  //     });
  //     _setSecureLs('token', resData.token);
  //     _setSecureLs('userId', resData.userId);
  //     const remainingMilliseconds = 60 * 60 * 1000;
  //     const expiryDate = new Date(
  //       new Date().getTime() + remainingMilliseconds
  //     );
  //     _setSecureLs('usexpiryDateerId',  expiryDate.toISOString());
  //     setIsLoading(false);
  //     navigate("/dashboard");
  //   })
  //   .catch((err) => {
  //     setAuthState((prevState) => {
  //       return {
  //         ...prevState,
  //         isAuth: false,
  //         token: null,
  //         userId: null,
  //       };
  //     });
  //     setUserCredentials((prevState) => {
  //       return {
  //         ...prevState,
  //         email: "",
  //         password: "",
  //       };
  //     });
  //     setErrors((prevState) => {
  //       return {
  //         ...prevState,
  //         loginError: err.message,
  //       };
  //     });
  //     setIsLoading(false);
  //     throw new Error(err);
  //   });
};
