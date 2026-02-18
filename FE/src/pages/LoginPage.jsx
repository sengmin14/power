import Input from "../components/Input/Input.jsx"
import Button from "../components/Button/Button.jsx"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {

    const navigate = useNavigate();

    const handleClickJoin = () => {
        navigate("/join");
    }

    const handleLogin = () => {
        alert("로그인 버튼 클릭");
    }

    return (
        <form onSubmit={handleLogin}>
            <Input label="ID" type="text" placeholder="ID" />
            <Input label="PW" type="password" placeholder="Password" />
            <div style={{height: "55px" }}></div>
            <Button variant="primary">Login</Button>
            <Button variant="secondary" onClick={handleClickJoin} type="button">Join</Button>
        </form>
    );
}

export default LoginPage;