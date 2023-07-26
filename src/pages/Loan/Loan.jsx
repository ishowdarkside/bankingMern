/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useUserData } from "../../hooks/useUserData";
import { useUserContext } from "../../contexts/userContext";
import { formatDate } from "../../services/formatDate";
import { useRequestLoan } from "../../hooks/useRequestLoan";
import styles from "./Loan.module.scss";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal/Modal";
import { useState } from "react";
import { usePayLoan } from "../../hooks/usePayLoan";

export default function Loan() {
  const { isLoading, user } = useUserData();
  const { dispatch, currOpenModal } = useUserContext();
  if (isLoading) return <Spinner />;

  if (user.hasLoan) {
    return (
      <div className={styles.hasLoanPanel}>
        <span className={styles.alert}>
          You can not request a loan until you pay off your last loan.
        </span>

        <button
          className={styles.triggerModal}
          onClick={() => dispatch({ type: "payLoan" })}
        >
          PAY LOAN NOW!
        </button>
        {currOpenModal === "payLoan" && (
          <Modal>
            <PayLoanPanel user={user} />
          </Modal>
        )}
      </div>
    );
  }
  return (
    <>
      <div className={styles.requestPanel}>
        {!user.hasLoan && (
          <div className={styles.flex}>
            <span className={styles.loanInfo}>
              Hello and welcome to the loan panel.Belove, push the button down
              to request a loan. Your maximum borrowing amount is determined by
              your current account balance.
            </span>
            <button onClick={() => dispatch({ type: "modal/loan" })}>
              Request a laon
            </button>
          </div>
        )}
      </div>

      {currOpenModal === "loan" && (
        <Modal>
          <LoanPanel />
        </Modal>
      )}
    </>
  );
}

function LoanPanel() {
  const { dispatch } = useUserContext();
  const { mutate, isLoading } = useRequestLoan();
  const [loanAmount, setLoanAmount] = useState("");

  if (isLoading) return <Spinner />;
  return (
    <form
      className={styles.loanForm}
      onSubmit={(e) => {
        e.preventDefault();
        mutate(loanAmount, {
          onSuccess: () => dispatch({ type: "reset" }),
          onError: () => dispatch({ type: "rest" }),
        });
      }}
    >
      <h2>Request a loan</h2>
      <div className={styles.elementsWrapper}>
        <input
          type="number"
          placeholder="Loan amount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
        <button>Request loan now!</button>
        <button onClick={() => dispatch({ type: "reset" })}>Cancel</button>
      </div>
    </form>
  );
}

function PayLoanPanel({ user }) {
  const { dispatch } = useUserContext();
  const { mutate, isLoading } = usePayLoan();

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.payLoanPanel}>
      <span>
        Loan amount: <b>${user.loan}</b>
      </span>
      <span>
        Loan requested at: <i>{formatDate(user.loanRequestedAt)}</i>
      </span>
      <span className={styles.loanAlert}>
        If you proceed to pay a loan, your account will be charged for
        additional ${user.loan}
      </span>
      <button
        onClick={() =>
          mutate(null, { onSuccess: () => dispatch({ type: "reset" }) })
        }
      >
        PAY LOAN
      </button>
      <button onClick={() => dispatch({ type: "reset" })}>Cancel</button>
    </div>
  );
}
