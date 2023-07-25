import styles from "./Dashboard.module.scss";
import { useUserContext } from "../../contexts/userContext";
import Modal from "../../ui/Modal/Modal";
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
  return <h1>OVO JE DEPOSIT MODAL</h1>;
}

function WithdrawModal() {
  return <h1>OVO JE WITHDRAW MODAL</h1>;
}
