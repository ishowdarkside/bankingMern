import { Outlet } from "react-router-dom";
import { useProtect } from "../../hooks/useProtect";
import { useUserData } from "../../hooks/useUserData";
import Spinner from "../../ui/Spinner";
export default function AppLayout() {
  //napravi context gdje ces stavit userIsVerified i sve dok on ne bude true neces pozivati ovaj query: pomocu enabled property dole
  useProtect();
  const { user, isLoading } = useUserData();
  console.log(user);
  if (isLoading) return <Spinner />;
  return (
    <div>
      <Outlet />
    </div>
  );
}
