/* eslint-disable react-refresh/only-export-components */
import { Link, NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { AiOutlineUser } from "react-icons/ai";
import { useUserData } from "../../hooks/useUserData";
import { useLocation } from "react-router-dom";
import { memo } from "react";
export default memo(function Navbar() {
  const { user, isLoading } = useUserData();
  const { pathname } = useLocation();
  if (isLoading) return null;
  const notApprovedRequestsReceived = user.receivedRequests.filter(
    (r) => !r.approved
  ).length;

  const notApprovedRequestsMade = user.madeRequests.filter(
    (r) => !r.approved
  ).length;

  return (
    <nav className={styles.nav}>
      <div className="container">
        <Link className={styles.navLogo} to="/app">
          Darkside banking
        </Link>
        <ul>
          <li>
            <NavLink to="dashboard">Dashboard</NavLink>
          </li>
          <li>
            {user.hasLoan && !pathname.endsWith("loan") && (
              <span className={styles.hasLoan}></span>
            )}
            <NavLink to="loan">Laon</NavLink>
          </li>
          <li>
            <NavLink to="history">Transactions history</NavLink>
          </li>
          <li>
            <NavLink to="requestsReceived">
              Received Requests{" "}
              {notApprovedRequestsReceived !== 0 &&
                user.receivedRequests.length > 0 &&
                !pathname.endsWith("requestsReceived") && (
                  <span className={styles.madeRequests}>
                    {notApprovedRequestsReceived}
                  </span>
                )}
            </NavLink>
          </li>
          <li>
            <NavLink to="requestsMade">
              My Requests{" "}
              {notApprovedRequestsMade !== 0 &&
                user.madeRequests.length > 0 &&
                !pathname.endsWith("requestsMade") && (
                  <span className={styles.madeRequests}>
                    {notApprovedRequestsMade}
                  </span>
                )}
            </NavLink>
          </li>
          <li>
            <NavLink to="user">
              <AiOutlineUser style={{ fontSize: "30px" }} />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
});
