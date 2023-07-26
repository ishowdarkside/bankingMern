import { useUserData } from "../../hooks/useUserData";
import { formatDate } from "../../services/formatDate";
import Spinner from "../../ui/Spinner";
import styles from "./User.module.scss";
import { destroyCookie } from "../../services/destroyCookie";
import { useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();
  const { user, isLoading } = useUserData();
  if (isLoading) return <Spinner />;
  return (
    <>
      <h1 className={styles.label}>User&apos;s informations:</h1>
      <div className={styles.userPanel}>
        <div>
          <span>user:</span>
          <h2>
            {user.name} {user.surname}
          </h2>
        </div>

        <div>
          <span>email:</span>
          <h3>{user.email}</h3>
        </div>
        <div>
          <span>Total transactions:</span>
          <h3>{user.transactions.length}</h3>
        </div>

        <span>
          Loan status:
          <b className={user.hasLoan ? styles.loanActive : styles.loanInactive}>
            {user.hasLoan ? " ACTIVE" : " INACTIVE"}
          </b>
        </span>
        <span>
          Birth year: <b>{formatDate(user.birthYear)}</b>
        </span>
        <span>
          Balance:<b> ${user.balance}</b>{" "}
        </span>
        <button
          className={styles.logout}
          onClick={() => {
            destroyCookie("jwt");
            navigate("/auth/login");
          }}
        >
          LOGOUT
        </button>
      </div>
    </>
  );
}
