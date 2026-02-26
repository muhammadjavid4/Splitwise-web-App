// import AppRoutes from "./app/routes.jsx";
// import { Toaster } from "react-hot-toast";

// export default function App() {
//   return (
//     <div className="min-h-screen">
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           style: {
//             background: "#0f172a",
//             color: "#fff",
//           },
//         }}
//       />
//       <AppRoutes />
//     </div>
//   );
// }

// import AppRoutes from "./app/router.jsx";

// export default function App() {
//   return (
//     <div className="min-h-screen">
//       <AppRoutes />
//     </div>
//   );
// }

// import { Outlet } from "react-router-dom";

// export default function App() {
//   return (
//     <div className="min-h-screen">
//       {/* future me Navbar/Sidebar yaha aa sakta */}
//       <Outlet />
//     </div>
//   );
// }


import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}
