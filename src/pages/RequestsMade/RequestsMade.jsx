/* eslint-disable react/prop-types */
import { useUserData } from "../../hooks/useUserData";
import { getMonths } from "../../services/getMonths";
import styles from "./RequestsMade.module.scss";
import InfoPanel from "../../ui/InfoPanel/InfoPanel";
import Spinner from "../../ui/Spinner";
export default function RequestsMade() {
  const { isLoading, user } = useUserData();

  if (isLoading) return <Spinner />;

  return (
    <div>
      {user.madeRequests.length === 0 && (
        <span>You haven&apos;t made any requests lately</span>
      )}
      {user.madeRequests.length > 0 && <InfoPanel options={false} />}

      <div className={styles.requestsWrapper}>
        {user.madeRequests.length > 0 &&
          user.madeRequests
            .slice(-7)
            .reverse()
            .map((r) => <Request request={r} key={r.id} />)}
      </div>
    </div>
  );
}

function Request({ request: { approved, recipient, requestDate, value } }) {
  const months = getMonths();
  const formatedDate = `${months[new Date(requestDate).getMonth()]} ${new Date(
    requestDate
  ).getDate()} ${new Date(requestDate).getFullYear()}`;
  return (
    <div className={styles.requestElement}>
      {!approved && <span className={styles.notApproved}>NOT APPROVED</span>}
      {approved && <span className={styles.approved}>APPROVED</span>}

      <div className={styles.recipientInfo}>
        <span className={styles.recipientEmail}>{recipient.email}</span>
        <span className={styles.recipientFullName}>
          {recipient.name} {recipient.surname}
        </span>
      </div>

      <span className={styles.requestDates}>{formatedDate}</span>

      <span className={styles.requestAmount}>${value}</span>
    </div>
  );
}
