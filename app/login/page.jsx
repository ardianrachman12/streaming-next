"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // <-- loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { token, user } = await login(form.email, form.password);

      setUser(user);
      router.push("/v2");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login gagal, periksa email & password"
      );
    } finally {
      setLoading(false); // <-- stop spinner
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h1>
        <p className="text-white/80 text-center mb-8">
          Silakan login untuk melanjutkan
        </p>

        {error && (
          <div className="bg-red-500/20 text-red-200 px-4 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-white/90 text-sm mb-1 block">Email</label>
            <input
              type="email"
              placeholder="Masukkan email..."
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white focus:outline-none"
            />
          </div>

          <div>
            <label className="text-white/90 text-sm mb-1 block">Password</label>
            <input
              type="password"
              placeholder="Masukkan password..."
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading} // <-- disable button saat loading
            className="w-full bg-white text-blue-700 font-semibold py-2 rounded-lg hover:bg-gray-200 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="animate-spin h-5 w-5 border-2 border-blue-700 border-t-transparent rounded-full"></span>
            )}
            {loading ? "Processing..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
