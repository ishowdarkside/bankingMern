import { useQuery } from "@tanstack/react-query";
import { fetchUserData } from "../services/fetchUserData";
import { useUserContext } from "../contexts/userContext";

export function useUserData() {
  const { isVerified } = useUserContext();
  const { isFetching, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
    enabled: !!isVerified,
  });

  return { isFetching, user };
}
