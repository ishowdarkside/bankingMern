/* eslint-disable react/prop-types */
import styles from "./Button.module.scss";
export default function Button({ children, onClick, type }) {
  return (
    <button onClick={onClick} className={styles[type]}>
      {children}
    </button>
  );
}
