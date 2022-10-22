import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "helper/storage";

import config from "../config/config";
import { withData, withError } from "./api";

export const http = axios.create({
  baseURL: config.baseUrl,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use((req) => {
  req.headers.authorization = `Bearer ${getAccessToken()}`;

  return req;
});

http.interceptors.response.use(
  (res) => {
    return withData(res.data);
  },
  (err) => {
    return withError(err?.response?.data?.error);
  }
);

export const httpAuth = axios.create({
  baseURL: config.loginUrl,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

httpAuth.interceptors.request.use((req) => {
  return req;
});

export function get(url, params) {
  return http({
    method: "get",
    url,
    params,
  });
}

export function post(url, data, params) {
  return http({
    method: "post",
    url,
    data,
    params,
  });
}

export function put(url, data, params) {
  return http({
    method: "put",
    url,
    data,
    params,
  });
}

export function patch(url, data, params) {
  return http({
    method: "patch",
    url,
    data,
    params,
  });
}

export function remove(url, params) {
  return http({
    method: "delete",
    url,
    params,
  });
}
