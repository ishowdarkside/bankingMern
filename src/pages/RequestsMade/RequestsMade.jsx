/* eslint-disable react/prop-types */
import { useUserData } from "../../hooks/useUserData";
import { getMonths } from "../../services/getMonths";
import styles from "./RequestsMade.module.scss";
import InfoPanel from "../../ui/InfoPanel/InfoPanel";
import Spinner from "../../ui/Spinner";
import { useState } from "react";
import Pagination from "../../features/Pagination/Pagination";
export default function RequestsMade() {
  const { isLoading, user } = useUserData();
  const [page, setPage] = useState(1);

  if (isLoading) return <Spinner />;
  const startStep = -7 * page;
  const endStep = page == 1 ? user.madeRequests.length : -7 * page + 7;
  const paginatedRequests = user.madeRequests
    .slice(startStep, endStep)
    .reverse();
  return (
    <div>
      {user.madeRequests.length === 0 && (
        <span>You haven&apos;t made any requests lately</span>
      )}
      {user.madeRequests.length > 0 && <InfoPanel options={false} />}

      <div className={styles.requestsWrapper}>
        {user.madeRequests.length > 0 &&
          paginatedRequests.map((r) => <Request request={r} key={r.id} />)}
      </div>

      <Pagination
        maxNum={7}
        page={page}
        setterFunc={setPage}
        arr={user.madeRequests}
        paginatedArr={paginatedRequests}
      />
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
