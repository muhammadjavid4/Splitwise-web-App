import { Outlet, Navigate } from "react-router";
import useUserStore from "../../store/user.store";

export default function ProtectedLayout() {
  const { isAuth } = useUserStore();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}