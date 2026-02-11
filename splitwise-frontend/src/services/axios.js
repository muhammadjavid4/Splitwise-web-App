// import axios from "axios";
// import useUserStore from "../store/user.store";

// const api = axios.create({
//   baseURL: "http://localhost:4000/api",
// });

// api.interceptors.request.use((config) => {
//   const token = useUserStore.getState().token;

//   // 🔐 JWT
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   // ❌ DO NOT ADD If-None-Match / If-Modified-Since
//   // ❌ DO NOT FORCE CACHE HEADERS

//   return config;
// });

// export default api;


import axios from "axios";
import useUserStore from "../store/user.store";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // ✅ local backend
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
