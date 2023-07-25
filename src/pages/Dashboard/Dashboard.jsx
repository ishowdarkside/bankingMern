import { useUserData } from "../../hooks/useUserData";
import Overview from "./Overview";
import styles from "./Dashboard.module.scss";
import Operations from "./Operations";
import Requests from "./Request";
import DatePanel from "./DatePanel";
import TransactionsPanel from "./TransactionsPanel";
import Spinner from "../../ui/Spinner";

/* eslint-disable react/prop-types */
export default function Dashboard() {
  const { user } = useUserData();

  if (!user) return <Spinner />;
  return (
    <div className={styles.dashboardLayout}>
      {user && (
        <>
          <Overview name={user?.name} balance={user?.balance} />
          <Operations />
          <Requests />
          <DatePanel />
          <TransactionsPanel transactions={user?.transactions} />
        </>
      )}
    </div>
  );
}
