import styles from "./Button.module.css";

const Button = ({ children, variant = 'primary', ...props }) => {

    const buttonClass = `${styles.btn} ${styles[variant]}`;

    return (
        <button className={buttonClass} {...props}>
            {children}
        </button>
    );
};


export default Button;