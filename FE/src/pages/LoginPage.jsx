import Input from "../components/Input/Input.jsx"
import Button from "../components/Button/Button.jsx"
import { useNavigate } from "react-router-dom"
import styles from "./LoginPage.module.css"
import { loginService } from "../util/api/service/loginPage/loginService.js"
import { useState } from "react";
import { cmnUtil } from "../util/cmnUtil";
import { errorUtil } from "../util/errorUtil";
import { useAuthStore } from '../store/authStore';

const LoginPage = () => {

    const navigate = useNavigate();
    const setLogin = useAuthStore((state) => state.setLogin);

    const [loginData, setLoginData] = useState({
        loginId  : "",
        password : ""
    });

    const handleClickJoin = () => {
        navigate("/join");
    }

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        // 유효성 검사
        if( cmnUtil.isEmpty(loginData.loginId) || cmnUtil.isEmpty(loginData.password) ) {
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }

        try {
            const result = await loginService.login(loginData);
            console.log("login result :: ", result);

            // 로그인 성공 후 이동
            if(result.success) {

                // zustand에 로그인 정보 저장하기
                // /auth/login 에서 userDto 바로 넘겨주지 말고 new HashMap으로 필요한거만 담아서 주기 [수정해야할 사항!]
                const userData = {
                    userId : result.user.userId,
                    loginId : result.user.loginId,
                    nickname : result.user.nickname,
                    email : result.user.email,
                    role : result.user.role,
                    createdAt : result.user.createdAt
                }
                setLogin(userData);
                alert(userData.loginId + "님 환영합니다!");
                navigate("/main");
            }
        } catch (error) {
            errorUtil.errorProcess(error);
        }
        
    }

    return (
        <form onSubmit={handleLogin}>
            <Input id="loginId" name="loginId" label="ID" type="text" placeholder="ID" 
                value={loginData.loginId} 
                onChange={handleChange} />
            <Input id="password" name="password" label="PW" type="password" placeholder="Password" 
                value={loginData.password} 
                onChange={handleChange} />
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
            - /main 으로 이동 [v]
        1-2. 오류 시
            - 오류 메세지 표출 [v]
    
    2. login 후 받아온 userDto 저장소에 담기
        a. zustand : 새로고침 시 초기화됨 app.jsx에서 리렌더링 될 때 마다 서버에서 다시 받아와야 함

    3. 토큰으로 사용자가 누군지 서버에 다시 묻고 사용자 정보 가져오기
        쿠키에 담긴 JWT를 확인해서 현재 로그인한 사용자의 DTO를 돌려주는 api 필요함 
        springSecurity 사용하니까 Authentication 객체에 있을 걸?
        jwtfilter에서 UsernamePasswordAuthenticationToken 으로 시큐리티용 인증 객체 생성 해야 할 듯?

    4. 로그인 만료 후 axiosApi.js에서 추가 처리

    5. 로그아웃

*/