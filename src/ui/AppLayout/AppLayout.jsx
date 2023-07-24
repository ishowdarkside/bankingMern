import { Outlet } from "react-router-dom";
import { useProtect } from "../../hooks/useProtect";

export default function AppLayout() {
  useProtect();
  return (
    <div>
      <Outlet />
    </div>
  );
}
