// import { useState } from "react";
// import { loginApi } from "./auth.api";
// import useUserStore from "../../store/user.store";
// import { useNavigate, Link } from "react-router-dom";
// import { FiMail, FiLock, FiLogIn, FiUserPlus } from "react-icons/fi";
// import toast from "react-hot-toast";

// export default function Login() {
//   const navigate = useNavigate();

//   // 🔥 OPTION 1: login function lo
//   const login = useUserStore((s) => s.login);

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await loginApi(form);

//       // 🔥 BACKEND RESPONSE EXPECTED:
//       // res.data = { user, token }

//       login(res.data.user, res.data.token); // ✅ TOKEN STORE
//       toast.success("Logged in successfully");
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
      
//       {/* BACKGROUND GLOW */}
//       <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/20 blur-3xl rounded-full" />

//       <form
//         onSubmit={handleSubmit}
//         className="relative z-10 bg-slate-900/90 backdrop-blur border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-xl"
//       >
//         {/* HEADER */}
//         <h2 className="text-3xl font-bold mb-2 text-center">
//           Welcome Back 👋
//         </h2>
//         <p className="text-slate-400 text-center mb-6">
//           Login to continue managing your expenses
//         </p>

//         {/* ERROR */}
//         {error && (
//           <p className="mb-4 text-red-400 text-sm text-center">
//             {error}
//           </p>
//         )}

//         {/* EMAIL */}
//         <div className="relative mb-4">
//           <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-400 outline-none transition"
//             required
//             onChange={(e) =>
//               setForm({ ...form, email: e.target.value })
//             }
//           />
//         </div>

//         {/* PASSWORD */}
//         <div className="relative mb-6">
//           <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-400 outline-none transition"
//             required
//             onChange={(e) =>
//               setForm({ ...form, password: e.target.value })
//             }
//           />
//         </div>

//         {/* LOGIN BUTTON */}
//         <button
//           disabled={loading}
//           className="group w-full bg-cyan-500 text-black py-3 rounded-xl font-semibold hover:bg-cyan-400 transition flex items-center justify-center gap-2"
//         >
//           <FiLogIn className="group-hover:translate-x-1 transition" />
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         {/* DIVIDER */}
//         <div className="my-6 flex items-center gap-4">
//           <div className="flex-1 h-px bg-slate-800" />
//           <span className="text-slate-500 text-sm">OR</span>
//           <div className="flex-1 h-px bg-slate-800" />
//         </div>

//         {/* REGISTER CTA */}
//         <Link
//           to="/register"
//           className="flex items-center justify-center gap-2 w-full border border-slate-700 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
//         >
//           <FiUserPlus />
//           New user? Create an account
//         </Link>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { loginApi } from "./auth.api";
import useUserStore from "@/store/user.store";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock, FiLogIn, FiUserPlus } from "react-icons/fi";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export default function Login() {
  const navigate = useNavigate();
  const login = useUserStore((s) => s.login);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // ✅ TanStack Mutation (auto loading + error)
  const loginMutation = useMutation({
    mutationFn: loginApi,

    onSuccess: (res) => {
      login(res.data.user, res.data.token);
      toast.success("Logged in successfully");
      navigate("/dashboard");
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Login failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(form);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/20 blur-3xl rounded-full" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-slate-900/90 backdrop-blur border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-xl"
      >
        {/* HEADER */}
        <h2 className="text-3xl font-bold mb-2 text-center">
          Welcome Back 👋
        </h2>

        <p className="text-slate-400 text-center mb-6">
          Login to continue managing your expenses
        </p>

        {/* EMAIL */}
        <div className="relative mb-4">
          <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="email"
            placeholder="Email"
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-400 outline-none transition"
            required
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        {/* PASSWORD */}
        <div className="relative mb-6">
          <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-400 outline-none transition"
            required
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        {/* LOGIN BUTTON */}
        <button
          disabled={loginMutation.isPending}
          className="group w-full bg-cyan-500 text-black py-3 rounded-xl font-semibold hover:bg-cyan-400 transition flex items-center justify-center gap-2"
        >
          <FiLogIn className="group-hover:translate-x-1 transition" />

          {loginMutation.isPending
            ? "Logging in..."
            : "Login"}
        </button>

        {/* DIVIDER */}
        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-slate-800" />
          <span className="text-slate-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        {/* REGISTER CTA */}
        <Link
          to="/register"
          className="flex items-center justify-center gap-2 w-full border border-slate-700 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
        >
          <FiUserPlus />
          New user? Create an account
        </Link>
      </form>
    </div>
  );
}
