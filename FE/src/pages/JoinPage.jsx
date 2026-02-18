import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import style from "./JoinPage.module.css";

const JoinPage = () => {
    return(
        <form>
            <Input label="ID " type="text" placeholder="ID"/>
            <Input label="PW" type="password" placeholder="Password" />
            <Input label="PW CHECK" type="password" placeholder="Password" />
            <Input label="E-MAIL" type="email" placeholder="E-MAIL" />
            <Input label="NICK NAME" type="text" placeholder="NICK NAME" />

            <Button >Sign Up</Button>
        </form>
    );
}

export default JoinPage;