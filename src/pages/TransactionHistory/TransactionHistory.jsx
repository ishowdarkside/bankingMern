/* eslint-disable react/prop-types */
import { useUserData } from "../../hooks/useUserData";
import { useState } from "react";
import { getMonths } from "../../services/getMonths";
import styles from "./TransactionHistory.module.scss";
import Spinner from "../../ui/Spinner";
import Pagination from "../../features/Pagination/Pagination";
import TabBar from "../../ui/TabBar/TabBar";
export default function TransactionHistory() {
  const { user, isLoading } = useUserData();

  const [page, setPage] = useState(1);

  if (isLoading) return <Spinner />;
  const { transactions } = user;

  const startStep = -9 * page;
  const endStep = page === 1 ? transactions.length : -9 * page + 9;
  const paginatedTransactions = transactions
    .slice(startStep, endStep)
    .reverse();

  if (transactions?.length === 0)
    return (
      <span className={styles.nothingToShow}>NO RECENT TRANSACTIONS.</span>
    );
  return (
    <div className={styles.transactionPanel}>
      <h3>Latest transactions</h3>

      <TabBar />
      <div className={styles.transactionsWrapper}>
        {transactions?.length > 0 &&
          paginatedTransactions.map((t) => (
            <Transaction
              key={t._id}
              type={t.transactionType}
              date={t.transactionDate}
              value={t.value}
            />
          ))}
      </div>

      <Pagination
        setterFunc={setPage}
        page={page}
        maxNum={9}
        arr={transactions}
        paginatedArr={paginatedTransactions}
      />
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
