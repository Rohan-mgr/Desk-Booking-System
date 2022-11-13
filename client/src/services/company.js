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

export const getCompanyFloors = async (cId) => {
  console.log(cId, "getfloors");
  const URL = COMPANY_ENDPOINTS.addRoom + "/" + cId;
  getUserToken();
  const response = await http.get(URL);
  return response;
};
export const getFloorRooms = async (floorId) => {
  const URL = COMPANY_ENDPOINTS.addDesk + "/" + floorId;
  console.log(URL, floorId, "getroom");
  getUserToken();
  const response = await http.get(URL);
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

export const handleAddFloor = async (cid, floorInfo) => {
  const URL = COMPANY_ENDPOINTS.addFloor + "/" + cid;
  getUserToken();
  console.log(URL, floorInfo, "add floor js");
  const response = await http.post(URL, JSON.stringify(floorInfo));
  return response;
};
export const handleAddRoom = async (cid, roomInfo) => {
  const URL = COMPANY_ENDPOINTS.addRoom + "/" + cid;
  getUserToken();
  console.log(URL, cid);
  const response = await http.post(URL, JSON.stringify(roomInfo));
  return response;
};
export const handleAddDesk = async (cid, deskInfo) => {
  const URL = COMPANY_ENDPOINTS.addDesk + "/" + cid;
  getUserToken();
  console.log(URL, deskInfo);
  const response = await http.post(URL, JSON.stringify(deskInfo));
  return response;
};
