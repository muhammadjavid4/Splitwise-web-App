// import { type RouteConfig, layout, route, index } from "@react-router/dev/routes";

// export default [
//   layout("./root.tsx", [
//     index("./routes/home.tsx"),
//     route("login", "./routes/login.tsx"),
//     route("register", "./routes/register.tsx"),

//     // protected routes
//     route("dashboard", "./routes/dashboard.tsx"),
//     route("notifications", "./routes/notifications.tsx"),
//     route("groups/:groupId", "./routes/groups.$groupId.tsx"),
//   ]),
// ] satisfies RouteConfig;

import { type RouteConfig, layout, route, index } from "@react-router/dev/routes";

export default [

  // public routes
  index("./routes/home.tsx"),
  route("login", "./routes/login.tsx"),
  route("register", "./routes/register.tsx"),

  // protected routes
  layout("./components/layout/ProtectedLayout.tsx", [
    route("dashboard", "./routes/dashboard.tsx"),
    route("notifications", "./routes/notifications.tsx"),
    route("groups/:groupId", "./routes/groups.$groupId.tsx"),
    route("groups/:groupId/analytics", "./features/analytics/GroupAnalytics.jsx"),
  ]),

] satisfies RouteConfig;