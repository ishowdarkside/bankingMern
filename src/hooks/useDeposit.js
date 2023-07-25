import { deposit } from "../services/deposit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "../contexts/userContext";
import { toast } from "react-hot-toast";
export function useDeposit() {
  const { dispatch } = useUserContext();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (depositValue) => deposit(depositValue),
    onSuccess: (res) => {
      dispatch({ type: "modal/close" });
      if (res.status === "success") {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        toast(`Deposit cooldown 5 minutes`, {
          duration: 300000,
          icon: "⏰",
          position: "bottom-right",
        });
      }
      if (res.status === "fail") {
        toast.error(`${res.message} `);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
}
