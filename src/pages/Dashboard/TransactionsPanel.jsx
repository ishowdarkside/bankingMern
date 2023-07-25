/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.scss";

import { getMonths } from "../../services/getMonths";
export default function TransactionsPanel({ transactions }) {
  return (
    <div className={styles.transactionPanel}>
      <h3>Latest transactions</h3>
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

      <div className={styles.transactionsWrapper}>
        {transactions?.length > 0 &&
          transactions
            ?.slice(-6)
            .reverse()
            ?.map((t) => (
              <Transaction
                key={t._id}
                type={t.transactionType}
                date={t.transactionDate}
                value={t.value}
              />
            ))}
        {transactions?.length === 0 && (
          <span className={styles.nothingToShow}>NO RECENT TRANSACTIONS.</span>
        )}
      </div>
      <Link to="history" className={styles.redirectLink}>
        View more
      </Link>
    </div>
  );
}

function Transaction({ type, date, value }) {
  const newDate = new Date(date);
  const months = getMonths();
  const dateModified = `${newDate.getDate()} ${months[newDate.getMonth()]}`;
  return (
    <div className={styles.transactionWrapper}>
      <span className={styles.transactionDate}>{dateModified}</span>
      <span className={`${styles.transactionType} ${styles.centerType}`}>
        <img
          src={type === "deposit" ? "/arrowDeposit.svg" : "/arrowWithdraw.svg"}
        />
        {type}
      </span>
      <span
        className={
          type === "deposit"
            ? styles.transAmountDeposit
            : styles.transAmountWithdraw
        }
      >
        {type === "deposit" ? `+$${value}` : `-$${value}`}
      </span>
    </div>
  );
}
