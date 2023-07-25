import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../services/request";
import { toast } from "react-hot-toast";
export function useRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ recipient, amount }) => request(recipient, amount),
    onSuccess: (res) => {
      if (res.status === "success") {
        toast.success(res.message);
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
      if (res.status === "fail") {
        toast.error(res.message);
      }
    },
  });
}
