/* eslint-disable react/prop-types */
import styles from "./Button.module.scss";
export default function Button({ children, onClick, type, disabled }) {
  return (
    <button onClick={onClick} className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}
