import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { AiOutlineUser } from "react-icons/ai";
export default function Navbar() {
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
            <NavLink to="requestsReceived">Received Requests</NavLink>
          </li>
          <li>
            <NavLink to="requestsMade">My Requests</NavLink>
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
