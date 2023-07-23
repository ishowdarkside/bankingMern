import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/signup";
import { toast } from "react-hot-toast";
export function useSignupUser() {
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => signup(data),
    mutationKey: ["user"],
    onSuccess: (res) => {
      console.log(res);
      if (res.status === "fail") toast.error(res.message);
      if (res.status === "success") toast.success(res.message);
    },
    onError: (err) => console.log(err.message),
  });

  return { mutate, isLoading };
}
