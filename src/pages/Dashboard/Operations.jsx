import styles from "./Dashboard.module.scss";
import formStyles from "./Forms.module.scss";
import { useUserContext } from "../../contexts/userContext";
import Modal from "../../ui/Modal/Modal";
import { useState } from "react";
import { useDeposit } from "../../hooks/useDeposit";
import { useWithdraw } from "../../hooks/useWithdraw";
import Spinner from "../../ui/Spinner";

export default function Operations() {
  const { currOpenModal, dispatch } = useUserContext();
  return (
    <>
      <div className={styles.operations}>
        <div onClick={() => dispatch({ type: "modal/deposit" })}>DEPOSIT</div>
        <div onClick={() => dispatch({ type: "modal/withdraw" })}>WITHDRAW</div>
      </div>

      {currOpenModal === "deposit" && (
        <Modal>
          <DepositModal />
        </Modal>
      )}
      {currOpenModal === "withdraw" && (
        <Modal>
          <WithdrawModal />
        </Modal>
      )}
    </>
  );
}

function DepositModal() {
  const [depositValue, setDepositValue] = useState("");
  const { mutate, isLoading } = useDeposit();

  async function handleSubmit() {
    mutate(depositValue);
  }

  if (isLoading) return <Spinner />;
  return (
    <form
      className={formStyles.depositForm}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <span>Deposit money:</span>
      <div>
        <img src="/money.svg" />
        <input
          type="number"
          placeholder="$"
          value={depositValue}
          onChange={(e) => setDepositValue(e.target.value)}
        />
      </div>
      <button>DEPOSIT</button>
    </form>
  );
}

function WithdrawModal() {
  const [withdrawValue, setWithdrawValue] = useState("");
  const { mutate, isLoading } = useWithdraw();

  function handleSubmit() {
    mutate(withdrawValue);
  }
  if (isLoading) return <Spinner />;
  return (
    <form
      className={formStyles.withdrawForm}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <span>Withdraw money:</span>
      <div>
        <img src="/money.svg" />
        <input
          type="number"
          placeholder="$"
          value={withdrawValue}
          onChange={(e) => setWithdrawValue(e.target.value)}
        />
      </div>
      <button>WITHDRAW</button>
    </form>
  );
}
