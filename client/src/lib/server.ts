import axios from "axios";

let server = axios;

server.defaults.baseURL = import.meta.env.VITE_API_URL;

server.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${window.sessionStorage.auth_token}`;
  return config;
});

export default server;
