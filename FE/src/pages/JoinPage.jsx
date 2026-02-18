import { useState } from "react";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import style from "./JoinPage.module.css";

const JoinPage = () => {

    const [signData, setSignData] = useState({
        loginId  : "",
        password : "",
        email    : "",
        nickname : "",
    });

    const handleChange = (e, field) => {
        setSignData({
            ...signData,
            [field] : e.target.value
        });
    }

    const handleSignUp = async () => {
        console.log(signData);

        // TODO
        // 1. 호출 방식 선택 fetch or axios 회의필요 - 서버 주소 공통화
        // 2. 공통 함수로 api 처리하기 
        // 3. pw 체크 로직
        // 4. input validation 로직 
        // 5. 로그인 성공 후 처리

        try {
            const response = await fetch("http://15.164.100.162:8080/users/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(signData)
            });

            if( response.ok ) {
                const result = await response.json();
                alert("회원가입 성공!");
                console.log("### result :: ", result);
            }
        }
        catch(err) {
            console.log("### err :: ", err);
        }
    }

    return(
        <div>
            <Input label="ID " type="text" placeholder="ID" 
                value={signData.loginId} 
                onChange={ e => handleChange(e, "loginId")}
            />
            <Input label="PW" type="password" placeholder="Password"  
                value={signData.password} 
                onChange={ e => handleChange(e, "password")}
            />
            <Input label="PW CHECK" type="password" placeholder="Password"
                 
            />
            <Input label="E-MAIL" type="email" placeholder="E-MAIL" 
                value={signData.email} 
                onChange={ e => handleChange(e, "email")}
            />
            <Input label="NICK NAME" type="text" placeholder="NICK NAME" 
                value={signData.nickname} 
                onChange={ e => handleChange(e, "nickname")}
            />

            <Button onClick={handleSignUp} >Sign Up</Button>
        </div>
    );
}

export default JoinPage;