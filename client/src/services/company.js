import { COMPANY_ENDPOINTS } from "../helper/endpoints";
import { http } from "../helper/http";
import { getUserToken } from "../helper/storage";

export const getAllCompanies = async () => {
  const URL = COMPANY_ENDPOINTS.company;
  const Token = getUserToken();
  console.log(Token);

  const response = await http.get(URL);
  return response;
};
