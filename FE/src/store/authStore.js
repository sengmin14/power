// src/store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      // 로그인 성공 시 호출
      setLogin: (userData) => set({ user: userData, isLoggedIn: true }),
      
      // 로그아웃 또는 토큰 만료 시 호출
      setLogout: () => {
        set({ user: null, isLoggedIn: false });
      },
    }),
    { name: 'auth-storage' } // 로컬 스토리지 키 이름
  )
);