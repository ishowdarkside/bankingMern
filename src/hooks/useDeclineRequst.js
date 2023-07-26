import { useMutation, useQueryClient } from "@tanstack/react-query";
import { declineRequest } from "../services/declineRequest";
import { toast } from "react-hot-toast";
export function useDeclineRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: declineRequest,
    onSuccess: (res) => {
      if (res.status === "success") {
        queryClient.invalidateQueries(["user"]);
        toast.success(res.message);
      }
      if (res.status === "fail") toast.error(res.message);
    },
    onError: (err) => toast.error(err.message),
  });
}
