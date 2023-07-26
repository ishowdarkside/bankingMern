import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptRequest } from "../services/acceptRequest";
import { toast } from "react-hot-toast";
export function useAcceptRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (val) => acceptRequest(val),
    onSuccess: (res) => {
      if (res.status === "success") {
        queryClient.invalidateQueries(["user"]);
        toast.success(res.message);
      }
      if (res.status === "fail") {
        toast.error(res.message);
      }
    },
    onError: (err) => toast.error(err.message),
  });
}
