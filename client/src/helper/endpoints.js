import { config } from "../config";

export const AUTH_ENDPOINT = {
  login: config.baseURL + "/login",
  signup: config.baseURL + "/signup",
};
