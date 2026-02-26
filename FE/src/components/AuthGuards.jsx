import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

// 로그인 안 되어 있으면 무조건 로그인화면(/)
export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuthStore();
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

// 로그인 되어 있으면 무조건 메인(/main)
export const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useAuthStore();
  return isLoggedIn ? <Navigate to="/main" replace /> : children;
};