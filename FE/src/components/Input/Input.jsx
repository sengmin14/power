import styles from './Input.module.css';

const Input = ({label, ...props}) => {
    return(
        <div className={styles.inputContainer}>
            {label && <label className={styles.label}>{label}</label>}
            <input
                className={styles.inputField}
                {...props}
            />
        </div>
    );
}

export default Input;