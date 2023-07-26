/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./Dashboard.module.scss";
import TabBar from "../../ui/TabBar/TabBar";
import { formatDate } from "../../services/formatDate";
export default function TransactionsPanel({ transactions }) {
  return (
    <div className={styles.transactionPanel}>
      <h3>Latest transactions</h3>
      <TabBar />

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
      {transactions.length > 6 && (
        <Link to="/app/history" className={styles.redirectLink}>
          View more
        </Link>
      )}
    </div>
  );
}

function Transaction({ type, date, value }) {
  const formatedDate = formatDate(date);
  return (
    <div className={styles.transactionWrapper}>
      <span className={styles.transactionDate}>{formatedDate}</span>
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
