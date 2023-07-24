import { useEffect } from "react";
import { isAuthenticated } from "../services/isAuthenticated";
import { useNavigate } from "react-router-dom";

export function useProtect() {
  const navigate = useNavigate();

  useEffect(() => {
    async function protect() {
      const res = await isAuthenticated();
      if (res.status === "fail") return navigate("/auth/login");
    }
    protect();
  }, [navigate]);
}
