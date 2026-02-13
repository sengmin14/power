import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header';
import Button from './components/Button/Button';
import Input from './components/Input/Input';
import Footer from './components/Footer/Footer';

function App() {
  const handleLogin = () => alert("로그인 페이지 아직 안만들었는디요");
  const handleJoin = () => alert("회원가입 페이지 동미니가 만들거에요");

  return (

    <div className='login-layout'>
      <div className='login-box'>
        <Header />

        <div className='login-ipt-box'>
          <Input 
            label="ID" 
            type="text"
            placeholder="ID"
            // onChange={e => console.log(e.target.value)}
          />
          <Input 
            label="PW" 
            type="password"
            placeholder="Password"
          />
        </div>
        
        <div className='login-btn-box'>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>

          <Button variant="secondary" onClick={handleJoin}>
            Join
          </Button>
        </div>

        <Footer />
      </div>
      
    </div>
  )
}

export default App
