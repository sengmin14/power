import './App.css'
import { Route, Routes } from 'react-router-dom';
import Layout from './pages/layouts/Layout';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage'; 
import MainPage from './pages/MainPage';
import { useAuthStore } from './store/authStore'; 
import { useEffect } from 'react';
import { errorUtil } from './util/errorUtil';
import { loginService } from './util/api/service/loginPage/loginService';
import { ProtectedRoute, PublicRoute } from './components/AuthGuards';

function App() {

  const { checkAuth } = useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  return (

    <Routes>
      <Route path='/' element={ <Layout/>  }>

        {/* 로그인/회원가입: 로그인 된 사람은 못 들어감 */}
        <Route index element={ 
          <PublicRoute>
            <LoginPage />
          </PublicRoute> 
        } />
        <Route path='/join' element={ 
          <PublicRoute>
            <JoinPage />
          </PublicRoute>  
        } />

        {/* 메인: 로그인 안 된 사람은 못 들어옴 */}
        <Route path='/main' element={ 
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
    
    
  )
}

export default App
