import { useProtect } from "../../hooks/useProtect";
import Button from "../../ui/Button/Button";
import styles from "./LandingPage.module.scss";
import { useNavigate } from "react-router-dom";
export default function LandingPage() {
  useProtect();
  const navigate = useNavigate();
  return (
    <div className={styles.body}>
      <div className="container">
        <div>
          <h1>Darkside banking</h1>
          <h2>Pay and get paid with ease.</h2>

          <div className={styles.buttonWrapper}>
            <Button type="primary" onClick={() => navigate("/auth/login")}>
              LOGIN
            </Button>
            <Button type="secondary" onClick={() => navigate("/auth/signup")}>
              SIGNUP
            </Button>
          </div>
        </div>
        <img src="/landingpageimg.png" alt="landing page image" />
      </div>
    </div>
  );
}
