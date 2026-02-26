// // src/app/routes.ts
// import {
//   type RouteConfig,
//   route,
//   index,
//   layout,
// } from "@react-router/dev/routes";

// export default [
//   layout("./App.tsx", [
//     index("./pages/Landing.tsx"),

//     route("login", "./features/auth/Login.tsx"),
//     route("register", "./features/auth/Register.tsx"),

//     route("notifications", "./pages/Notifications.tsx"),

//     layout("./components/common/ProtectedLayout.tsx", [
//       route("dashboard", "./pages/Dashboard.tsx"),
//       route("groups/:groupId", "./features/groups/GroupDetails.tsx"),
//     ]),
//   ]),
// ] satisfies RouteConfig;




// import {
//   route,
//   index,
//   layout,
// } from "@react-router/dev/routes";

// export default [
//   layout("./App.jsx", [
//     index("./pages/Landing.jsx"),

//     route("login", "./features/auth/Login.jsx"),
//     route("register", "./features/auth/Register.jsx"),

//     route("notifications", "./pages/Notifications.jsx"),

//     layout("./components/common/ProtectedLayout.jsx", [
//       route("dashboard", "./pages/Dashboard.jsx"),
//       route("groups/:groupId", "./features/groups/GroupDetails.jsx"),
//     ]),
//   ]),
// ];




// import { layout, route, index } from "@react-router/dev/routes";

// export default [
//   layout("../App.jsx", [

//     // PUBLIC
//     index("../pages/Landing.jsx"),
//     route("login", "../features/auth/Login.jsx"),
//     route("register", "../features/auth/Register.jsx"),
//     route("notifications", "../pages/Notifications.jsx"),

//     // PROTECTED
//     layout("../components/common/ProtectedLayout.jsx", [
//       route("dashboard", "../pages/Dashboard.jsx"),
//       route("groups/:groupId", "../features/groups/GroupDetails.jsx"),
//     ]),
//   ]),
// ];

import { RouteConfig,route, index, layout } from "@react-router/dev/routes";

export default [

  index("./pages/Landing.jsx"),
  route("login", "./features/auth/Login.jsx"),
  route("register", "./features/auth/Register.jsx"),
  route("notifications", "./pages/Notifications.jsx"),

  // protected routes
  layout("./components/common/ProtectedLayout.jsx", [
    route("dashboard", "./pages/Dashboard.jsx"),
    route("groups/:groupId", "./features/groups/GroupDetails.jsx"),
  ]),
] satisfies RouteConfig;