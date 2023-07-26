/* eslint-disable react/prop-types */
import { useUserData } from "../../hooks/useUserData";
import Spinner from "../../ui/Spinner";
import { getMonths } from "../../services/getMonths";
import styles from "./RequestsReceived.module.scss";
import InfoPanel from "../../ui/InfoPanel/InfoPanel";
import Modal from "../../ui/Modal/Modal";
import { useUserContext } from "../../contexts/userContext";
import { useAcceptRequest } from "../../hooks/useAcceptRequest";

export default function RequestsReceived() {
  const { isLoading, user } = useUserData();
  const { activeRequest, currOpenModal } = useUserContext();

  if (isLoading) return <Spinner />;
  const { receivedRequests } = user;

  if (receivedRequests.length === 0) return <span>No received requests</span>;
  return (
    <>
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
    <div>
      <span>
        Are you sure you want to accept this request? Your account will be
        charged for additional ${request.value}.
      </span>
      <button
        onClick={() =>
          mutate(request._id, { onSuccess: () => dispatch({ type: "reset" }) })
        }
      >
        ACCEPT
      </button>
      <button onClick={() => dispatch({ type: "reset" })}>CANCEL</button>
    </div>
  );
}

function DeclineRequest({ request }) {
  const { dispatch } = useUserContext();
  return (
    <div>
      <span>
        Are you sure you want to decline this request? This action is
        inevitable. If you change your mind, {request.receiver.name} will have
        to make a request again.
      </span>
      <button>Yes, i am sure</button>
      <button onClick={() => dispatch({ type: "reset" })}>Cancel</button>
    </div>
  );
}
