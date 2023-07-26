/* eslint-disable react/prop-types */
import { useUserData } from "../../hooks/useUserData";
import Spinner from "../../ui/Spinner";
import { getMonths } from "../../services/getMonths";
import styles from "./RequestsReceived.module.scss";
import InfoPanel from "../../ui/InfoPanel/InfoPanel";
import Modal from "../../ui/Modal/Modal";
import { useUserContext } from "../../contexts/userContext";
import { useAcceptRequest } from "../../hooks/useAcceptRequest";
import { useState } from "react";
import { useDeclineRequest } from "../../hooks/useDeclineRequst";
import Pagination from "../../features/Pagination/Pagination";

export default function RequestsReceived() {
  const { isLoading, user } = useUserData();
  const { activeRequest, currOpenModal } = useUserContext();

  const [page, setPage] = useState(1);

  if (isLoading) return <Spinner />;
  const { receivedRequests } = user;

  const startStep = -5 * page;
  const endStep = page == 1 ? receivedRequests.length : -5 * page + 5;
  const paginatedRequests = receivedRequests
    .slice(startStep, endStep)
    .reverse();

  if (receivedRequests.length === 0) return <span>No received requests</span>;
  return (
    <>
      <div className={styles.requestsWrapper}>
        <InfoPanel />

        <div className={styles.requestsWrapper}>
          {paginatedRequests.map((r) => (
            <Request request={r} key={r._id} />
          ))}
        </div>
      </div>

      <Pagination
        arr={receivedRequests}
        paginatedArr={paginatedRequests}
        maxNum={5}
        page={page}
        setterFunc={setPage}
      />

      {currOpenModal === "accept" && (
        <Modal>
          <AcceptRequest request={activeRequest} />
        </Modal>
      )}
      {currOpenModal === "decline" && (
        <Modal>
          <DeclineRequest request={activeRequest} />
        </Modal>
      )}
    </>
  );
}

function Request({ request }) {
  const { approved, receiver, value, requestDate } = request;
  const { dispatch } = useUserContext();
  const months = getMonths();
  const formatedDate = `${months[new Date(requestDate).getMonth()]} ${new Date(
    requestDate
  ).getDate()} ${new Date(requestDate).getFullYear()}`;
  return (
    <>
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
            <button
              onClick={() =>
                dispatch({
                  type: "request/assign",
                  payload: { value: request, currOpenModal: "accept" },
                })
              }
            >
              ACCEPT
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: "request/assign",
                  payload: { value: request, currOpenModal: "decline" },
                })
              }
            >
              DECLINE
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function AcceptRequest({ request }) {
  const { dispatch } = useUserContext();
  const { mutate, isLoading } = useAcceptRequest();

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.modal}>
      <span>
        Are you sure you want to accept this request? Your account will be
        charged for additional ${request.value}.
      </span>
      <div>
        <button
          onClick={() =>
            mutate(request._id, {
              onSuccess: () => dispatch({ type: "reset" }),
            })
          }
        >
          ACCEPT
        </button>
        <button onClick={() => dispatch({ type: "reset" })}>CANCEL</button>
      </div>
    </div>
  );
}

function DeclineRequest({ request }) {
  const { dispatch } = useUserContext();
  const { mutate, isLoading } = useDeclineRequest();

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.modal}>
      <span>
        Are you sure you want to decline this request? This action is
        irreversible. If you change your mind, {request.receiver.name} will have
        to make a request again.
      </span>
      <div>
        <button
          onClick={() =>
            mutate(request._id, {
              onSuccess: () => dispatch({ type: "reset" }),
            })
          }
        >
          Yes, i am sure
        </button>
        <button onClick={() => dispatch({ type: "reset" })}>Cancel</button>
      </div>
    </div>
  );
}
