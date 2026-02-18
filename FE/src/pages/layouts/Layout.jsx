import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import style from "./Layout.module.css";

const Layout = () => {
    return(
        <div className="layoutContainer">
            <div className={style.headerContainer}>
                <Header />
            </div>
            <main className={style.mainLayout}>
                <Outlet />
            </main>
            <div className={style.footerContainer}>
                <Footer />
            </div>
        </div>
    );
}

export default Layout;
 