import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3030/api/v1",
});

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
    return axiosInstance.post(endpoint, body).then((response) => {
      console.log(response);
    });
  },
};

export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}
