import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import useUserStore from "@/store/user.store";
import { logoutApi } from "@/features/auth/auth.api";
import {
  FiLogIn,
  FiUserPlus,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import NotificationBell from "./NotificationBell";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";

export default function Navbar({ onDashboardClick }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, logout, user } = useUserStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const isDashboard = location.pathname === "/dashboard";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch {}
    finally {
      logout();
      toast.success("Logged out successfully");
      navigate("/login");
    }
  };

  const getInitials = () => {
    if (!user?.name) return "U";
    const parts = user.name.trim().split(" ");
    return (
      ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase()
    );
  };

  return (
    <>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[420px] h-[70px] bg-cyan-500/15 blur-3xl z-40 pointer-events-none" />

      <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-[72px] flex justify-between items-center">
          
          <Link to="/" className="text-xl font-bold text-cyan-400">
            Split<span className="text-white">Wise</span>
          </Link>

          <div className="hidden md:flex gap-3 items-center">
            {!isAuth ? (
              <>
                <Button asChild variant="outline">
                  <Link to="/login">
                    <FiLogIn /> Login
                  </Link>
                </Button>

                <Button asChild className="bg-cyan-500 text-black hover:bg-cyan-400">
                  <Link to="/register">
                    <FiUserPlus /> Get Started
                  </Link>
                </Button>
              </>
            ) : (
              <>
                
                <Button
                  variant={isDashboard ? "secondary" : "ghost"}
                  onClick={() => {
                    onDashboardClick?.();
                    navigate("/dashboard");
                  }}
                >
                  <FiGrid /> Dashboard
                </Button>

                <NotificationBell
                  onClick={() => navigate("/notifications")}
                />

                {/* PROFILE */}
                <div ref={profileRef} className="relative">
                  <Button
                    variant="ghost"
                    onClick={() => setProfileOpen((p) => !p)}
                    className="flex items-center gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-cyan-500 text-black flex items-center justify-center font-bold">
                      {getInitials()}
                    </div>
                    <FiChevronDown />
                  </Button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-48 rounded-xl bg-slate-900 border border-slate-800 shadow-xl">
                      <div className="px-4 py-3 border-b border-slate-800">
                        <p className="text-sm text-white font-semibold">
                          {user?.name}
                        </p>
                      </div>

                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start text-red-400"
                      >
                        <FiLogOut /> Logout
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          /* {mobile ke liye} */
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuOpen((m) => !m)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          } bg-slate-900 border-t border-slate-800`}
        >
          <div className="px-4 py-5 space-y-3">
            {!isAuth ? (
              <>
                <Button asChild className="w-full">
                  <Link to="/login">
                    <FiLogIn /> Login
                  </Link>
                </Button>

                <Button
                  asChild
                  className="w-full bg-cyan-500 text-black"
                >
                  <Link to="/register">
                    <FiUserPlus /> Get Started
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="w-full justify-start"
                  variant="secondary"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/dashboard");
                  }}
                >
                  <FiGrid /> Dashboard
                </Button>

                <Button
                  className="w-full justify-start"
                  variant="secondary"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/notifications");
                  }}
                >
                  🔔 Notifications
                </Button>

                <Button
                  className="w-full justify-start text-red-400"
                  variant="ghost"
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                >
                  <FiLogOut /> Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
