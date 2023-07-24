import { useEffect } from "react";
import { isAuthenticated } from "../services/isAuthenticated";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";

export function useProtect() {
  const { setIsVerified } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    async function protect() {
      const res = await isAuthenticated();
      if (res.status === "fail") return navigate("/auth/login");
      if (res.status === "success") setIsVerified(true);
    }
    protect();
  }, [navigate]);
}
