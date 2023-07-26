import styles from "./TabBar.module.scss";
export default function TabBar() {
  return (
    <div className={styles.tabBar}>
      <div>
        <img src="/calendar-sm.svg" alt="calendar image" />
        <span>Transaction date</span>
      </div>
      <div className={styles.centerMe}>
        <img src="/pig.svg" alt="pig image" />
        <span>Transaction type</span>
      </div>

      <div>
        <img src="/money.svg" alt="money" />
        <span>Amount</span>
      </div>
    </div>
  );
}
