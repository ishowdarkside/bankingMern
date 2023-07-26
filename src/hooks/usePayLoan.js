import { useMutation, useQueryClient } from "@tanstack/react-query";
import { payLoan } from "../services/payLoan";
import { toast } from "react-hot-toast";

export function usePayLoan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: payLoan,
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success(res.message);
        queryClient.invalidateQueries(["user"]);
      }
      if (res.status === "fail") toast.error(res.message);
    },
    onError: (err) => toast.err(err.message),
  });
}
