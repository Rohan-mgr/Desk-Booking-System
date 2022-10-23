const { AUTH_ENDPOINT } = require("../helper/endpoints");
const { httpAuth } = require("../helper/http");

export const handleUserLogin = async (userData) => {
  const URL = AUTH_ENDPOINT.login;

  const response = await httpAuth.post(URL, JSON.stringify(userData));
  return response;
};
export const handleUserSignup = async (userData) => {
  const URL = AUTH_ENDPOINT.signup;
  console.log(URL, "singup");
  const response = await httpAuth.post(URL, JSON.stringify(userData));
  return response;
};

export const handleCreateCompany = async (companyInfo) => {
  const URL = AUTH_ENDPOINT.registercompany;
  console.log(URL, "createcompany");
  console.log(companyInfo);
  const response = await httpAuth.post(URL, JSON.stringify(companyInfo));
  return response;
};
export const handleRegisterCompany = (companyInfo, id) => {
  const URL = AUTH_ENDPOINT.registercompany + "/" + id;
  console.log(URL, "registercompany");
  console.log(companyInfo, id);
  // const response = await httpAuth.post(URL, JSON.stringify(companyInfo));
  // return response;
};
