import { useUserData } from "../../hooks/useUserData";
import Overview from "./Overview";

/* eslint-disable react/prop-types */
export default function Dashboard() {
  const { user } = useUserData();

  return (
    <div>
      <Overview name={user.name} balance={user.balance} />
    </div>
  );
}
