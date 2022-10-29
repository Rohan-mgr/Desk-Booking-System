import emailjs from "@emailjs/browser";
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
export const handleRegisterCompany = async (companyInfo, id) => {
  const URL = AUTH_ENDPOINT.registercompany + "/" + id;
  console.log(URL, "registercompany");
  const info = { ...companyInfo, registerId: id };
  console.log(info);
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

export const handleFetchCompany = async () => {
  const URL = AUTH_ENDPOINT.registercompany;
  const response = await httpAuth.get(URL);
  return response;
};
