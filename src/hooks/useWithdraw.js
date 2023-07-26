import { useMutation, useQueryClient } from "@tanstack/react-query";
import { withdraw } from "../services/withdraw";
import { useUserContext } from "../contexts/userContext";
import { toast } from "react-hot-toast";

export function useWithdraw() {
  const queryClient = useQueryClient();
  const { dispatch } = useUserContext();
  return useMutation({
    mutationFn: (val) => withdraw(val),
    onSuccess: (res) => {
      dispatch({ type: "modal/close" });
      if (res.status === "fail") {
        toast.error(res.message);
      }
      if (res.status === "success") {
        toast.success(res.message);
        toast(`Withdraw cooldown 5 minutes`, {
          duration: 300000,
          icon: "⏰",
          position: "bottom-right",
        });
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
    },
    onError: (err) => toast.error(err.message),
  });
}
