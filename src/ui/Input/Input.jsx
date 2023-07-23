/* eslint-disable react/prop-types */
import styles from "./Input.module.scss";
export default function Input({ type, placeholder, register, label }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={styles.input}
      {...register(label)}
    />
  );
}
