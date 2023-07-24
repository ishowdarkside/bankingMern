import styles from "./Dashboard.module.scss";
export default function Requests() {
  return (
    <form className={styles.requestPanel}>
      <h3>Request Money</h3>
      <input
        type="text"
        placeholder="Recipients email"
        className={styles.requestInput}
      />
      <input type="number" placeholder="$" className={styles.requestInput} />
      <button>Request</button>
    </form>
  );
}
