import styles from "./Dashboard.module.scss";
import { getMonths } from "../../services/getMonths";
export default function DatePanel() {
  const months = getMonths();
  return (
    <div className={styles.datePanel}>
      <span className={styles.boldDate}>{new Date().getDate()}</span>
      <span>{months[new Date().getMonth()]}</span>
    </div>
  );
}
