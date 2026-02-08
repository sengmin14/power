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

    <div>
      <Header />
      <div style={{ padding: '20px' }}>
        <Input 
          label="ID" 
          type="text"
          placeholder="ID를 입력해주세요"
          onChange={e => console.log(e.target.value)}
        />
        <Input 
          label="PW" 
          type="password"
          placeholder="PW를 입력해주세요"
        />
      </div>
      
      <div style={{ padding: '20px' }}>
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>

        <Button variant="secondary" onClick={handleJoin}>
          Join
        </Button>
      </div>

      

        <Footer />
    </div>

    
  )
}

export default App
