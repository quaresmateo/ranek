import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3333/api/v1",
});

axiosInstance.interceptors.request.use(
  function(config) {
    const token = window.localStorage.token;
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint);
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body);
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body);
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint);
  },
  login(endpoint, body) {
    return axiosInstance.post(endpoint, body);
  },
  validateToken(endpoint, body) {
    return axiosInstance.post(endpoint, body);
  },
};

export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}
