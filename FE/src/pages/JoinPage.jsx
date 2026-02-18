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

    const handleSignUp = () => {
        console.log(signData);

        
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