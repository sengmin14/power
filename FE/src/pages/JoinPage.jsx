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
        showText : false,
        message : "비밀번호가 일치하지 않습니다.",
        color : "red"
    });

    // id, nickname 등 유효성 검사가 필요한 데이터
    const [checkField, setCheckField] = useState({
        loginId  : { showText: false, exists: false, message: "", color: ""},
        nickname : { showText: false, exists: false, message: "", color: ""}
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
            showText: !isMatch  // && signData.passwordConfirm.length > 0
        });
    }, [signData.password, signData.passwordConfirm]);

    // 회원가입 유효성 검사
    const joinValidation = () => {

        const result = {
            isError : false,
            message : ""
        };

        for(const item of Object.keys(signData)) {
            if( cmnUtil.isEmpty( signData[item] ) ) {
                const convertKr = item === 'loginId'  ? '아이디란을' 
                                : item === 'password' ? '비밀번호란을' 
                                : item === 'passwordConfirm' ? '비밀번호 확인란을'
                                : item === 'email'    ? '이메일란을'
                                : item === 'nickname' ? '닉네임란을' : '새로운 필드란을';
                result.isError = true;
                result.message = convertKr + "입력해주세요";
                return result;
            }
        }

        // id 중복확인
        if(checkField.loginId.exists === true) {
            result.isError = true;
            result.message = checkField.loginId.message;
        }
        // 비밀번호 비교
        else if(!passwordValidation.isMatch) {
            result.isError = true;
            result.message = passwordValidation.message;
        }
        // nickname 중복확인
        else if(checkField.nickname.exists === true) {
            result.isError = true;
            result.message = checkField.nickname.message;
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
            errorUtil.errorProcess(error);
        }
    }

    // 포커스 아웃 시 동작하는 함수
    const handleOnBlur = async (e) => {
        if(e.target.value !== "") {
            const paramMap = {
                name : e.target.name,
                data : {
                    [e.target.name] : e.target.value
                }
            }

            try {
                const result = await joinService.checkField(paramMap);
                setCheckField(prev => {
                    const newState = {
                        ...prev,
                        [paramMap.name]: {
                            ...result,
                            showText: true,
                            color: result.exists ? "red" : "green"
                        }
                    }
                    return newState;
                });
            } 
            catch (error) {
                errorUtil.errorProcess(error);
            }
        }
        // 필드 값이 없을 경우
        else {
            setCheckField({
                loginId  : { showText: false, exist: false, message: "", color: ""},
                nickname : { showText: false, exist: false, message: "", color: ""}
            });
        }
    }

    return(
        <div>
            <Input id="loginId" name="loginId" label="ID " type="text" placeholder="ID" 
                value={signData.loginId} 
                onChange={ e => handleChange(e, "loginId")}
                onBlur={handleOnBlur}
                validation={checkField.loginId}
            />
            <Input id="password" name="password" label="PW" type="password" placeholder="Password"  
                value={signData.password} 
                onChange={ e => handleChange(e, "password")}
            />
            <Input id="passwordConfirm" name="passwordConfirm" label="PW CHECK" type="password" placeholder="Password Check"
                value={signData.passwordConfirm} 
                onChange={ e => handleChange(e, "passwordConfirm")}
                validation={passwordValidation}
            />
            <Input id="email" name="email" label="E-MAIL" type="email" placeholder="E-MAIL" 
                value={signData.email}
                onChange={ e => handleChange(e, "email")}
            />
            <Input id="nickname" name="nickname" label="NICK NAME" type="text" placeholder="NICK NAME" 
                value={signData.nickname} 
                onChange={ e => handleChange(e, "nickname")}
                onBlur={handleOnBlur}
                validation={checkField.nickname}
            />

            <Button onClick={handleSignUp} >Sign Up</Button>
        </div>
    );
}

export default JoinPage;