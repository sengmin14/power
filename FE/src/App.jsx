import './App.css'
import { Route, Routes } from 'react-router-dom';
import Layout from './pages/layouts/Layout';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';

function App() {

  return (

    <Routes>
      <Route path='/' element={ <Layout/> }>
        <Route index element={ <LoginPage/> } />
        <Route path='/join' element={ <JoinPage/> } />
      </Route>
    </Routes>
    
    
  )
}

export default App
