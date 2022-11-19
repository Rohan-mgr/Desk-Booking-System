import { COMPANY_ENDPOINTS } from "../helper/endpoints";
import { http, httpAuth } from "../helper/http";
import { getUserToken, _getSecureLs } from "../helper/storage";

export const getCompany = async (cid) => {
  const URL = COMPANY_ENDPOINTS.companyInfo + "/" + cid;
  const Token = getUserToken();

  const response = await http.get(URL);
  return response;
};
export const getAllCompanies = async () => {
  const URL = COMPANY_ENDPOINTS.company;
  const userMode = _getSecureLs("auth")?.mode;
  const Token = getUserToken();

  const response = await http.get(URL + `/${userMode}`);
  return response;
};

export const getCompanyFloors = async (cId) => {
  const URL = COMPANY_ENDPOINTS.addRoom + "/" + cId;
  getUserToken();
  const response = await http.get(URL);
  return response;
};
export const getFloorRooms = async (floorId) => {
  const URL = COMPANY_ENDPOINTS.addDesk + "/" + floorId;
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
  const response = await httpAuth.post(URL, JSON.stringify(userData));
  return response;
};

export const deleteCompany = async (cid) => {
  const URL = COMPANY_ENDPOINTS.deleteCompany + `/${cid}`;
  const Token = getUserToken();
  const response = await http.delete(URL);
  return response;
};

export const handleAddFloor = async (cid, floorInfo) => {
  const URL = COMPANY_ENDPOINTS.addFloor + "/" + cid;
  getUserToken();
  const response = await http.post(URL, JSON.stringify(floorInfo));
  return response;
};

export const bookDesk = async (did, rid, fid, cid) => {
  const URL = COMPANY_ENDPOINTS.bookDesk;
  getUserToken();
  const response = await http.post(
    URL,
    JSON.stringify({ fId: fid, roomId: rid, deskId: did, cId: cid })
  );
  return response;
};

export const cancelDesk = async (did, rid, fid, userMode) => {
  const URL = COMPANY_ENDPOINTS.cancelDesk;
  getUserToken();
  const response = await http.post(
    URL,
    JSON.stringify({ fId: fid, roomId: rid, deskId: did, userMode: userMode })
  );
  return response;
};

export const bookRoom = async (rid, fid, cid) => {
  const URL = COMPANY_ENDPOINTS.bookRoom;
  getUserToken();
  const response = await http.post(
    URL,
    JSON.stringify({ fId: fid, roomId: rid, cId: cid })
  );
  return response;
};

export const cancelRoom = async (rid, fid, userMode) => {
  const URL = COMPANY_ENDPOINTS.cancelRoom;
  getUserToken();
  const response = await http.post(
    URL,
    JSON.stringify({ fId: fid, roomId: rid, userMode: userMode })
  );
  return response;
};

export const handleAddRoom = async (cid, roomInfo) => {
  const URL = COMPANY_ENDPOINTS.addRoom + "/" + cid;
  getUserToken();
  const response = await http.post(URL, JSON.stringify(roomInfo));
  return response;
};
export const handleAddDesk = async (cid, deskInfo) => {
  const URL = COMPANY_ENDPOINTS.addDesk + "/" + cid;
  getUserToken();
  const response = await http.post(URL, JSON.stringify(deskInfo));
  return response;
};
