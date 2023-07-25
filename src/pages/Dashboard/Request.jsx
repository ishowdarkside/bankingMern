import { useState } from "react";
import styles from "./Dashboard.module.scss";
import { useRequest } from "../../hooks/useRequest";
export default function Requests() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const { mutate } = useRequest();
  function handleSubmit() {
    mutate({ recipient, amount });
    setRecipient("");
    setAmount("");
  }
  return (
    <form
      className={styles.requestPanel}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <h3>Request Money</h3>
      <input
        type="text"
        placeholder="Recipients email"
        className={styles.requestInput}
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="number"
        placeholder="$"
        className={styles.requestInput}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button>Request</button>
    </form>
  );
}
