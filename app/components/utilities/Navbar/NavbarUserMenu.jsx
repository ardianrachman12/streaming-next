"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../context/AuthContext";
import { logout as logoutApi } from "../../../../services/auth";

export default function NavbarUserMenu() {
  const { user, setUser, loading } = useAuth();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutApi(); // call API logout laravel
    } catch (e) {
      console.log("Logout error (ignored)", e);
    }
    
    setUser(null);
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="text-white/70 text-sm animate-pulse">Checking...</div>
    );
  }

  const isLoggedIn = !!user;

  return (
    <div className="relative">
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
      >
        {isLoggedIn ? (
          <>
            <span className="font-semibold">{user.name}</span>
            <span>▾</span>
          </>
        ) : (
          <>
            <span>Guest</span>
            <span>▾</span>
          </>
        )}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-200 z-50">
          {isLoggedIn ? (
            <>
              {/* <button
                onClick={() => router.push("/dashboard")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Dashboard
              </button> */}

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/login")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Login
              </button>

              <button
                onClick={() => router.push("/register")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Register
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
