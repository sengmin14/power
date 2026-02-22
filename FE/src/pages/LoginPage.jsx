import Input from "../components/Input/Input.jsx"
import Button from "../components/Button/Button.jsx"
import { useNavigate } from "react-router-dom"
import styles from "./LoginPage.module.css"

const LoginPage = () => {

    const navigate = useNavigate();

    const handleClickJoin = () => {
        navigate("/join");
    }

    const handleLogin = () => {
        alert("로그인 버튼 클릭");
    }

    return (
        // <div className={styles.loadingContainer}>
        //     <div className={styles.spinner}></div>
        // </div>

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

/* TODO 
    1. login api 호출
        1-1. 성공 시
            - /main 으로 이동
        1-2. 오류 시
            - 오류 메세지 표출
    
    2. login 후 받아온 userDto 저장소에 담기
        a. zustand : 새로고침 시 초기화됨 app.jsx에서 리렌더링 될 때 마다 서버에서 다시 받아와야 함 [v]
        b. contextAPI
        c. localStorage

    3. 토큰으로 사용자가 누군지 서버에 다시 묻고 사용자 정보 가져오기
        쿠키에 담긴 JWT를 확인해서 현재 로그인한 사용자의 DTO를 돌려주는 api 필요함 
        springSecurity 사용하니까 Authentication 객체에 있을 걸?
        jwtfilter에서 UsernamePasswordAuthenticationToken 으로 시큐리티용 인증 객체 생성 해야 할 듯?

    4. 로그인 만료 후 axiosApi.js에서 추가 처리

    5. 로그아웃

*/