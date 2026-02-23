import axios from 'axios';

const api = axios.create({
  baseURL: 'http://15.164.100.162:8080', 
  timeout: 5000,
  withCredentials: true,                    
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
    console.log("resrser :: ", response);
    return response.data;
  }, 
  async (error) => {

    const { config, response } = error;

    if(response?.status === 401) {
      // 로그인, 회원가입 api 호출 후 401은 그냥 리턴
      if (config.url.includes('/users/auth/signup') || config.url.includes('/users/auth/login')) {
        console.log("### test 로그인 회원가입 페이지에서 401 오류 뜬 경우 그냥 리턴 함");
        return Promise.reject(error);
      }

      console.log("### Err [axiosApi] - 인증에러 401");
      window.location.href = "/";
    }
    
    console.log("### axios Error :: " , error);
    return Promise.reject(error);
  }
);

export default api;