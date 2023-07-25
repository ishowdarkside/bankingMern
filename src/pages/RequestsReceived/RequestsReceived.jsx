/* eslint-disable react/prop-types */
import { useUserData } from "../../hooks/useUserData";
import Spinner from "../../ui/Spinner";
import { getMonths } from "../../services/getMonths";
import styles from "./RequestsReceived.module.scss";
import InfoPanel from "../../ui/InfoPanel/InfoPanel";

export default function RequestsReceived() {
  const { isLoading, user } = useUserData();

  if (isLoading) return <Spinner />;

  const { receivedRequests } = user;

  if (receivedRequests.length === 0) return <span>No received requests</span>;
  return (
    <div className={styles.requestsWrapper}>
      <InfoPanel />

      <div className={styles.requestsWrapper}>
        {receivedRequests
          .slice(-5)
          .reverse()
          .map((r) => (
            <Request request={r} key={r._id} />
          ))}
      </div>
    </div>
  );
}

function Request({ request: { approved, receiver, value, requestDate } }) {
  const months = getMonths();
  const formatedDate = `${months[new Date(requestDate).getMonth()]} ${new Date(
    requestDate
  ).getDate()} ${new Date(requestDate).getFullYear()}`;
  return (
    <div className={styles.requestElement}>
      <span className={approved ? styles.approved : styles.notApproved}>
        {approved ? "APPROVED" : "NOT APPROVED"}
      </span>

      <div className={styles.recipientInfo}>
        <span className={styles.requestPlaceholder}>
          Request received from:
        </span>
        <span className={styles.recipientEmail}>{receiver.email}</span>
      </div>
      <span>{formatedDate}</span>
      <span className={styles.requestAmount}>${value}</span>
      {!approved && (
        <div className={styles.btnWrapper}>
          <button>ACCEPT</button>
          <button>DECLINE</button>
        </div>
      )}
    </div>
  );
}
