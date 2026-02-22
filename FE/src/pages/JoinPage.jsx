import { useEffect, useState } from "react";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import style from "./JoinPage.module.css";
import { joinService } from "../util/api/service/joinPage/joinService";
import { cmnUtil } from "../util/cmnUtil";
import { errorUtil } from "../util/errorUtil";
import { useNavigate } from 'react-router-dom';

const JoinPage = () => {

    const navigate = useNavigate();

    // Input 컴포넌트 데이터
    const [signData, setSignData] = useState({
        loginId  : "",
        password : "",
        passwordConfirm : "",
        email    : "",
        nickname : "",
    });

    // 비밀번호 일치 여부 검증 데이터 (Password Confirmation Validation)
    const [passwordValidation, setPasswordValidation] = useState({
        isMatch : false,
        showError : false,
        showText : "비밀번호가 일치하지 않습니다."
    });

    // Input 컴포넌트 change 이벤트
    const handleChange = (e, field) => {
        setSignData({
            ...signData,
            [field] : e.target.value
        });
    }

    // password, passwordConfirm 데이터 변경 시 일치 확인 로직
    useEffect(() => {
        const isMatch = signData.password === signData.passwordConfirm;

        setPasswordValidation({
            ...passwordValidation,
            isMatch: isMatch,
            showError: !isMatch  // && signData.passwordConfirm.length > 0
        });
    }, [signData.password, signData.passwordConfirm]);

    // 회원가입 유효성 검사
    const joinValidation = () => {

        const result = {
            isError : false,
            message : ""
        };

        for(const item of Object.keys(signData)) {
            if( item !== 'passwordConfirm' ) {
                if( cmnUtil.isEmpty( signData[item] ) ) {
                    const convertKr = item === 'loginId'  ? '아이디를' 
                                    : item === 'password' ? '비밀번호를' 
                                    : item === 'email'    ? '이메일을'
                                    : item === 'nickname' ? '닉네임을' : '새로운 필드를';
                    result.isError = true;
                    result.message = convertKr + "입력해주세요";
                    break;
                }
            }
            else {
                if( !passwordValidation.isMatch ) {
                    result.isError = true;
                    result.message = passwordValidation.showText;
                    break;
                }
            }
        }
        return result;
    }

    // 회원가입 버튼 클릭
    const handleSignUp = async () => {

        const validResult = joinValidation();

        if(validResult.isError) {
            alert(validResult.message);
            return;
        }

        try{
            const joinResult = await joinService.join(signData);

            // 성공 시 로그인 페이지로 이동
            if( joinResult.success ) {
                alert(joinResult.message);
                navigate("/");
            }
        }
        catch(error) {
            console.log(error);
            errorUtil.errorProcess(error);
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
            <Input label="PW CHECK" type="password" placeholder="Password Check"
                value={signData.passwordConfirm} 
                validation={passwordValidation}
                onChange={ e => handleChange(e, "passwordConfirm")}
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