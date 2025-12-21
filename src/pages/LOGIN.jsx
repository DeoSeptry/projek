import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import illus from "../assets/illus-login.png";
import { User, Lock } from "lucide-react";

import { useLoginMutation } from "../services/authApi";
import { getHomePathByRole } from "../routes/rolePaths";

export default function LOGIN() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const [login, { isLoading, error }] = useLoginMutation();

  const errorMessage =
    error?.data?.message ||
    error?.data?.error ||
    error?.data?.msg ||
    (typeof error?.data === "string" ? error.data : null) ||
    error?.error ||
    "Login gagal";

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    if (isLoading) return;

    const u = username.trim();
    const p = password.trim();

    if (!u || !p) {
      setFormError("Username dan password wajib diisi.");
      return;
    }

    const res = await login({ username: u, password: p }).unwrap();

    const role = res?.data?.role; 
    navigate(getHomePathByRole(role), { replace: true });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="flex flex-col md:flex-row overflow-hidden max-w-4xl w-full">
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center md:text-left mb-8">
            <img className="mx-auto" src={logo} alt="Logo" />
            <h2 className="text-[20px] font-semibold text-[#343C6A] text-center">
              SD Negeri Gantungan 02
            </h2>

            <div className="flex items-center gap-2 my-6">
              <div className="h-px bg-[#718EBF] flex-grow" />
              <span className="text-[16px] text-[#718EBF] whitespace-nowrap tracking-wider">
                Masuk Untuk Melanjutkan
              </span>
              <div className="h-px bg-[#718EBF] flex-grow" />
            </div>
          </div>

          <form className="space-y-4 text-[16px]" onSubmit={handleSubmit}>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-[#718EBF]">
                <User size={18} />
              </span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Nama Pengguna"
                autoComplete="username"
                className="w-full pl-12 pr-4 py-3 bg-[#F5F7FA] border border-transparent focus:border-blue-400 focus:bg-white rounded-xl outline-none transition-all placeholder:text-[#718EBF] text-slate-600"
              />
            </div>

            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center text-[#718EBF]">
                <Lock size={18} />
              </span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Kata Sandi"
                autoComplete="current-password"
                className="w-full pl-12 pr-4 py-3 bg-[#F5F7FA] border border-transparent focus:border-blue-400 focus:bg-white rounded-xl outline-none transition-all placeholder:text-[#718EBF] text-slate-600"
              />
            </div>

            {formError ? (
              <p className="text-red-600 text-sm">{formError}</p>
            ) : null}

            {error ? (
              <p className="text-red-600 text-sm">{errorMessage}</p>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#1814F3] hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-all active:scale-[0.98] mt-4 uppercase tracking-widest ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "MEMPROSES..." : "MASUK"}
            </button>
          </form>
        </div>

        <div className="rounded-3xl hidden md:flex w-1/2 bg-[#FDF7F0] p-8 items-center justify-center">
          <img
            src={illus}
            alt="Ilustrasi login"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}
