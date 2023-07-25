/* eslint-disable react/prop-types */
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useUserContext } from "../../contexts/userContext";
export default function Modal({ children }) {
  const { isOpenModal, dispatch } = useUserContext();

  if (!isOpenModal) return null;
  return createPortal(
    <div className={styles.overlay}>
      <button
        onClick={() => dispatch({ type: "modal/close" })}
        className={styles.buttonClose}
      >
        <AiOutlineCloseCircle />
      </button>
      <div className={styles.modal}>{children}</div>
    </div>,
    document.body
  );
}
