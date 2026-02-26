// src/store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginService } from '../util/api/service/loginPage/loginService';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,

      // 로그인 성공 시 호출
      setLogin: (userData) => set({ user: userData, isLoggedIn: true }),
      
      // 로그아웃 또는 토큰 만료 시 호출
      setLogout: () => {
        set({ user: null, isLoggedIn: false });
        localStorage.removeItem('auth-storage');
      },

      // 새 탭, 새로고침 시 서버에 신분 확인 요청
      checkAuth: async () => {
        try {
          const response = await loginService.me();

          if(response.success) { 
            set({ user: response.user, isLoggedIn: true});
          }
          else {
            get().setLogout();
          }
        } 
        catch (error) {
          // 오류 시 즉시 로그아웃 처리(? 아니면 errorProcess 태울까? )
          get().setLogout();
        }
      }
    }),
    { name: 'auth-storage' } // 로컬 스토리지 키 이름
  )
);