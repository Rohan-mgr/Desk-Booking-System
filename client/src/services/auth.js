import emailjs from "@emailjs/browser";
import { ROUTES } from "../helper/routes";
import { _getSecureLs } from "../helper/storage";
const { AUTH_ENDPOINT } = require("../helper/endpoints");
const { httpAuth, http } = require("../helper/http");

export const handleUserLogin = async (userData) => {
  const URL = AUTH_ENDPOINT.login;

  const response = await httpAuth.post(URL, JSON.stringify(userData));
  return response;
};
export const handleUserSignup = async (userData) => {
  const URL = AUTH_ENDPOINT.signup;
  const response = await httpAuth.post(URL, JSON.stringify(userData));
  return response;
};

export const handleCreateCompany = async (companyInfo) => {
  const URL = AUTH_ENDPOINT.registercompany;
  const response = await httpAuth.post(URL, JSON.stringify(companyInfo));
  return response;
};
export const handleRegisterCompany = async (companyInfo, id) => {
  const URL = AUTH_ENDPOINT.registercompany + "/" + id;
  const info = { ...companyInfo, registerId: id };
  const response = await httpAuth.post(URL, JSON.stringify(companyInfo));
  return response;
};

export const handleUserMessage = async (visitorInfo) => {
  const response = await emailjs.send(
    "service_4j7iift",
    "template_9mrpqt5",
    visitorInfo,
    "PLCqtnflXkQA_889q"
  );
  return response;
};

export const getCurrentUser = async () => {
  const userId = _getSecureLs("auth")?.user;
  if (userId) {
    const response = await http.get(AUTH_ENDPOINT.getUser + `/${userId}`);
    console.log("current user data", response);
  }
};
