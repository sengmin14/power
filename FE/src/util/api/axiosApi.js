import axios from 'axios';

const api = axios.create({
  
  // npm run dev 실행 시: Vite가 자동으로 .env.development를 읽어서 baseURL을 /api로 설정합니다. (프록시 작동)
  // npm run build 실행 시: Vite가 자동으로 .env.production을 읽어서 baseURL을 백엔드 IP 주소로 고정하여 빌드합니다. (운영 환경용)
  baseURL: import.meta.env.VITE_API_BASE_URL,  
  timeout: 5000,
  withCredentials: true,                    
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => {
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