import { config } from "../config";

export const AUTH_ENDPOINT = {
  login: config.baseURL + "/login",
  signup: config.baseURL + "/signup",
  getUser: config.baseURL + "/get-user",
};

export const COMPANY_ENDPOINTS = {
  company: `${config.baseURL}/registercompany`,
  companySignUp: `${config.baseURL}/companysignup`,
  companyLogin: `${config.baseURL}/companylogin`,
  deleteCompany: `${config.baseURL}/deletecompany`,
  editCompany: `${config.baseURL}/edit`,
};
