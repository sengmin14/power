import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  
  server: {
    proxy: {
      // 경로가 /api로 시작하면 아래 target 주소로 전달합니다.
      '/api': {
        target: 'http://15.164.100.162:8080',
        changeOrigin: true,
        // 백엔드 API 주소에 /api가 없다면 제거해주는 설정입니다.
        // 만약 백엔드 주소 자체가 http://...:8080/api/... 라면 아래 라인을 지워라
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
