import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../../store/user.store";

export default function ProtectedRoute() {
  const isAuth = useUserStore((s) => s.isAuth);

  // not logged in → login page
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
