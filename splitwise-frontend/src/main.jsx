// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import "./index.css";
// import { Toaster } from "react-hot-toast";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//     <Toaster
//         position="top-right"
//         toastOptions={{
//           style: {
//             background: "#0f172a",
//             color: "#fff",
//           },
//         }}
//       />
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import "./index.css";
// import { Toaster } from "react-hot-toast";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           style: {
//             background: "#0f172a",
//             color: "#fff",
//           },
//         }}
//       />
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";

document.documentElement.classList.add("dark");

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#0f172a",
              color: "#fff",
            },
          }}
        />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
