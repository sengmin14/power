import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/Button/Button';
import Footer from './components/Footer/Footer';
import Input from './components/Input/Input';

function App() {
  const [count, setCount] = useState(0)
  const handleLogin = () => alert("로그인 페이지 아직 안만들었는디요");
  const handleJoin = () => alert("회원가입 페이지 동미니가 만들거에요");

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={ {flex: 1}}>
        <div style={{ padding: '20px' }}>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>

          <Button variant="secondary" onClick={handleJoin}>
            Join
          </Button>
        </div>

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
          <Input 
            label="E-mail" 
            type="email"
            placeholder="E-mail를 입력해주세요"
          />
        </div>


      </div>
      <Footer />  
    </div>
  )
}

export default App
