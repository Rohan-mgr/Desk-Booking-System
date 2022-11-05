import { COMPANY_ENDPOINTS } from "../helper/endpoints";
import { http, httpAuth } from "../helper/http";
import { getUserToken, _getSecureLs } from "../helper/storage";

export const getAllCompanies = async () => {
  const URL = COMPANY_ENDPOINTS.company;
  const userMode = _getSecureLs("auth")?.mode;
  const Token = getUserToken();
  console.log(Token);

  const response = await http.get(URL + `/${userMode}`);
  return response;
};

export const handleCompanySignup = async (userData) => {
  const URL = COMPANY_ENDPOINTS.companySignUp;
  const response = await httpAuth.post(URL, JSON.stringify(userData));
  return response;
};

export const handleCompanyLogin = async (userData) => {
  const URL = COMPANY_ENDPOINTS.companyLogin;
  console.log(URL, userData);
  const response = await httpAuth.post(URL, JSON.stringify(userData));
  return response;
};

export const deleteCompany = async (cid) => {
  const URL = COMPANY_ENDPOINTS.deleteCompany + `/${cid}`;
  const Token = getUserToken();
  console.log(cid, Token, URL, "deleteCompanyId");
  const response = await http.delete(URL);
  return response;
};
