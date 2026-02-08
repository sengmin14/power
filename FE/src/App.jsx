import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/Button/Button';
import Footer from './components/Footer/Footer';

function App() {
  const [count, setCount] = useState(0)
  const handleLogin = () => alert("로그인 페이지 아직 안만들었는디요");
  const handleJoin = () => alert("회원가입 페이지 동미니가 만들거에요");

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={ {flex: 1}}>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>New React222333444</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is123 {count}
          </button>
          <p>
            rhinod, skim, jin001, jin002, jin003
            , rhinod001, o94777o
          </p>
        </div>
        <div style={{ padding: '20px' }}>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>

          <Button variant="secondary" onClick={handleJoin}>
            Join
          </Button>
        </div>
      </div>
      <Footer />  
    </div>
  )
}

export default App
