/* eslint-disable react/prop-types */
import styles from "./Dashboard.module.scss";
export default function Overview({ name, balance }) {
  return (
    <div className={styles.overview}>
      <h3 className={styles.welcomeHeading}>
        Welcome back,
        <span className={styles.username}>
          {` ${name?.[0]?.toUpperCase() + name?.toLowerCase()?.slice(1)}`}
        </span>
      </h3>
      <p>Balance:</p>
      <span className={styles.balance}>${balance?.toFixed(2)}</span>
    </div>
  );
}
