import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestLoan } from "../services/requestLoan";
import { toast } from "react-hot-toast";

export function useRequestLoan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (val) => requestLoan(val),
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success(res.message);
        queryClient.invalidateQueries(["user"]);
      }
      if (res.status === "fail") toast.error(res.message);
    },
    onError: (err) => toast.error(err.message),
  });
}
