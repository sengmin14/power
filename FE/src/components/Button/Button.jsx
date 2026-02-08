import styles from "./Button.module.css";

const Button = ({ children, onClick, variant = 'primary' }) => {

    const buttonClass = `${styles.btn} ${styles[variant]}`;

    return (
        <button className={buttonClass} onClick={onClick}>
            {children}
        </button>
    );
};


export default Button;