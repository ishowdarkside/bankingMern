import styles from "./NotFound.module.scss";
import { useNavigate } from "react-router-dom";
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <span onClick={() => navigate("/app")} className={styles.navigate}>
        &larr; Navigate to dashboard
      </span>
      <h1>Whoops, page not found</h1>
      <img src="/not-found.svg" alt="not found" />
    </div>
  );
}
