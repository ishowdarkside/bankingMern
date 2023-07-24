import { Outlet } from "react-router-dom";
import { useProtect } from "../../hooks/useProtect";

import Navbar from "../Navbar/Navbar";
import styles from "./Applayout.module.scss";
export default function AppLayout() {
  //napravi context gdje ces stavit userIsVerified i sve dok on ne bude true neces pozivati ovaj query: pomocu enabled property dole
  useProtect();

  return (
    <>
      <Navbar />
      <div className={styles.appBody}>
        <div className="container">
          <Outlet />
        </div>
      </div>
    </>
  );
}
