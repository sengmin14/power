import axios from 'axios';

const api = axios.create({
  baseURL: 'http://15.164.100.162:8080', 
  timeout: 5000,                  
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    return response.data
  }, 
  (error) => {
    return Promise.reject(error);
  }
);

export default api;