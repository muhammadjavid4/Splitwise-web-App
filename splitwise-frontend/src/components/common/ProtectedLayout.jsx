// import { Navigate, Outlet } from "react-router-dom";
// import useUserStore from "../../store/user.store";

// export default function ProtectedLayout() {
//   const isAuth = useUserStore((s) => s.isAuth);

//   if (!isAuth) return <Navigate to="/login" replace />;

//   return <Outlet />;
// }

// import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "../../store/user.store";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  const isAuth = useUserStore((s) => s.isAuth);

  if (!isAuth) return <Navigate to="/login" replace />;

  return <Outlet />;
}