/* eslint-disable react/prop-types */
import styles from "./Input.module.scss";
export default function Input({
  type,
  placeholder,
  register,
  label,
  validation,
  disabled,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={styles.input}
      {...register(label, { ...validation })}
      disabled={disabled}
    />
  );
}
