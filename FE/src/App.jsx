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

function App() {

  const { setLogin, setLogout } = useAuthStore();

  useEffect(()=>{
    const initAuth = async () => {
      try {
        const result = await loginService.me();
        console.log("### who am i result :: ", result);

        if(result.success) {
          setLogin(result.user);
        }
      }
      catch(error) {
        errorUtil.errorProcess(error);
      }
    }
    initAuth();
  },[setLogin]);

  return (

    <Routes>
      <Route path='/' element={ <Layout/>  }>
        <Route index element={ <LoginPage/> } />
        <Route path='/join' element={ <JoinPage/> } />

        <Route path='/main' element={ <MainPage/> } />
      </Route>
    </Routes>
    
    
  )
}

export default App
