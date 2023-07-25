import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { AiOutlineUser } from "react-icons/ai";
import { useUserData } from "../../hooks/useUserData";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const { user } = useUserData();
  const { pathname } = useLocation();
  if (user)
    return (
      <nav className={styles.nav}>
        <div className="container">
          <h2>Darkside Banking</h2>
          <ul>
            <li>
              <NavLink to="dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="loan">Laon</NavLink>
            </li>
            <li>
              <NavLink to="history">Transactions history</NavLink>
            </li>
            <li>
              <NavLink to="requestsReceived">
                Received Requests{" "}
                {user.receivedRequests.length > 0 &&
                  !pathname.endsWith("requestsReceived") && (
                    <span className={styles.madeRequests}>
                      {user.receivedRequests.length}
                    </span>
                  )}
              </NavLink>
            </li>
            <li>
              <NavLink to="requestsMade">
                My Requests{" "}
                {user.madeRequests.length > 0 &&
                  !pathname.endsWith("requestsMade") && (
                    <span className={styles.madeRequests}>
                      {user.madeRequests.length}
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
}
