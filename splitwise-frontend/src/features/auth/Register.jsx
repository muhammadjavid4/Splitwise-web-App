import { useState } from "react";
import { registerApi } from "./auth.api";
import { useNavigate, Link } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiUserCheck,
  FiLogIn,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerMutation = useMutation({
    mutationFn: registerApi,

    onSuccess: () => {
      toast.success("Registered successfully. Please login.");
      navigate("/login");
    },

    onError: (err) => {
      toast.error(err.response?.data?.message || "Register failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(form);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-950 overflow-hidden">

      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/20 blur-3xl rounded-full" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-slate-900/90 backdrop-blur border border-slate-800 p-8 rounded-2xl w-full max-w-md shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-2 text-center">
          Create Account 🚀
        </h2>

        <p className="text-slate-400 text-center mb-6">
          Join SplitWise and start managing expenses smartly
        </p>

        <div className="relative mb-4">
          <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Name"
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-cyan-400 outline-none transition"
            required
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

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

        <button
          disabled={registerMutation.isPending}
          className="group w-full bg-cyan-500 text-black py-3 rounded-xl font-semibold hover:bg-cyan-400 transition flex items-center justify-center gap-2"
        >
          <FiUserCheck className="group-hover:scale-110 transition" />

          {registerMutation.isPending
            ? "Creating..."
            : "Create Account"}
        </button>

        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-slate-800" />
          <span className="text-slate-500 text-sm">
            Already have an account?
          </span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        <Link
          to="/login"
          className="flex items-center justify-center gap-2 w-full border border-slate-700 py-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition"
        >
          <FiLogIn />
          Login Instead
        </Link>
      </form>
    </div>
  );
}
