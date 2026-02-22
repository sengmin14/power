import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    }

    return(
        <div className={styles.header} onClick={handleClick}>
            Tomato's Catch Mind
        </div>
    );
}

export default Header;