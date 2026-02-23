import styles from "./MainPage.module.css"
import Button from "../components/Button/Button.jsx"
import { mainService } from "../util/api/service/mainPage/mainService.js";
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { errorUtil } from "../util/errorUtil";

const MainPage = () => {

    const navigate = useNavigate();
    const setLogout = useAuthStore((state) => state.setLogout);

    const handleClickLogout = async () => {

        try {

            const result = await mainService.logout();

            console.log("### logout resutl :: ",result);

            if(result.success){
                setLogout();
                alert(result.message);
                navigate("/");
            }
        } catch (error) {

            console.log(error);
            errorUtil.errorProcess(error);
        }
    }

    return(
        <div className={styles.mainContainer}>
            <Button variant="secondary" type="button">게임참가</Button>
            <Button variant="secondary" type="button">게시판</Button>
            <Button type="button" onClick={handleClickLogout}>Logout</Button>
        </div>
    );
}

export default MainPage;