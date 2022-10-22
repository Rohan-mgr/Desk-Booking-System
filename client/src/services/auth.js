const { AUTH_ENDPOINT } = require("../helper/endpoints");
const { httpAuth } = require("../helper/http");

export const handleUserLogin = async (userData) => {
  const URL = AUTH_ENDPOINT.login;

  try {
    const response = await httpAuth.post(URL, JSON.stringify(userData));
    return response;
  } catch (e) {
    console.log(e);
  }
};
