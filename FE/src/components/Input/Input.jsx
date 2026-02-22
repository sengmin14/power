import styles from './Input.module.css';

const Input = ({label, validation, ...props}) => {

    return(
        <div className={styles.inputContainer}>
            {label && <label className={styles.label}>{label}</label>}
            <input
                className={styles.inputField}
                {...props}
            />
            { 
                validation?.showError
                && <p style={{color:"red", fontWeight:"bold"}}>{validation.showText}</p> 
            }
            
        </div>
    );
}

export default Input;

// ?. : 옵셔널 체이닝