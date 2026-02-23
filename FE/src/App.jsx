import './App.css'
import { Route, Routes } from 'react-router-dom';
import Layout from './pages/layouts/Layout';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage'; 
import MainPage from './pages/mainPage';

function App() {

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
