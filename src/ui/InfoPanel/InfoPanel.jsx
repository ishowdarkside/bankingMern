/* eslint-disable react/prop-types */
import styles from "./InfoPanel.module.scss";

export default function InfoPanel({ options = true }) {
  return (
    <div className={options ? styles.infoPanel : styles.infoPanel4Grid}>
      <span>STATUS</span>
      <span>RECIPIENT</span>
      <span>
        <img src="/calendar-sm.svg" />
        DATE
      </span>
      <span>
        <img src="/money.svg" />
        AMOUNT
      </span>
      {options && <span>OPTIONS</span>}
    </div>
  );
}
