import { COMPANY_ENDPOINTS } from "../helper/endpoints";
import { http } from "../helper/http";

export const getAllCompanies = async () => {
  const URL = COMPANY_ENDPOINTS.company;

  const response = await http.get(URL);
  return response;
};
