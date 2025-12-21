import React from "react";
import { User, Lock } from "lucide-react";

import logo from "../assets/logo.png";
import illus from "../assets/illus-login.png";

import { useLoginForm } from "../hooks";
import { IconTextInput, PasswordInput } from "../components";

export default function LoginPage() {
  const {
    register,
    formState: { errors },
    onSubmit,
    disableSubmit,
    isLoading,
    rootErrorMessage,
    clearRootError,
  } = useLoginForm();

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

          <form className="space-y-4 text-[16px]" onSubmit={onSubmit}>
            <IconTextInput
              icon={<User size={18} />}
              placeholder="Nama Pengguna"
              autoComplete="username"
              error={errors?.username?.message}
              registration={register("username")}
              onValueChange={clearRootError}
            />

            <PasswordInput
              icon={<Lock size={18} />}
              placeholder="Kata Sandi"
              autoComplete="current-password"
              error={errors?.password?.message}
              registration={register("password")}
              onValueChange={clearRootError}
            />

            {rootErrorMessage ? (
              <p className="text-red-600 text-sm" aria-live="polite">
                {rootErrorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={disableSubmit}
              className={`w-full bg-[#1814F3] hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-all active:scale-[0.98] mt-4 uppercase tracking-widest ${
                disableSubmit ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "MEMPROSES..." : "MASUK"}
            </button>
          </form>
        </div>

        <div className="rounded-3xl hidden md:flex w-1/2 bg-[#FDF7F0] p-8 items-center justify-center">
          <img src={illus} alt="Ilustrasi login" className="w-full h-auto object-contain" />
        </div>
      </div>
    </div>
  );
}
