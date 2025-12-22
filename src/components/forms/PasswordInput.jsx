// components/forms/PasswordInput.jsx
import React from "react";
import { Eye, EyeOff } from "lucide-react";

export function PasswordInput({
  icon,
  placeholder,
  autoComplete,
  error,
  registration,
  onValueChange,
  disabled = false,
  ...props
}) {
  const [show, setShow] = React.useState(false);

  return (
    <div>
      {/* Input wrapper - icons positioned relative to this */}
      <div className="relative">
        {icon && (
          <span
            className={`absolute inset-y-0 left-4 flex items-center pointer-events-none transition ${
              disabled ? "text-gray-400" : "text-[#718EBF]"
            }`}
          >
            {icon}
          </span>
        )}

        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${registration?.name}-error` : undefined}
          className={`w-full ${
            icon ? "pl-12" : "pl-4"
          } pr-12 py-3 bg-[#F5F7FA] border ${
            error
              ? "border-red-400 focus:border-red-500"
              : "border-transparent focus:border-blue-400"
          } focus:bg-white rounded-xl outline-none transition-all placeholder:text-[#718EBF] text-slate-600 ${
            disabled ? "opacity-60 cursor-not-allowed bg-gray-100" : ""
          }`}
          {...registration}
          {...props}
          onChange={(e) => {
            registration?.onChange(e);
            onValueChange?.();
          }}
        />

        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          disabled={disabled}
          className={`absolute inset-y-0 right-3 flex items-center transition ${
            disabled
              ? "text-gray-400 cursor-not-allowed"
              : "text-[#718EBF] hover:text-slate-600"
          }`}
          aria-label={show ? "Sembunyikan password" : "Tampilkan password"}
          tabIndex={-1}
        >
          {show ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>

      {/* Error message - outside of relative container */}
      {error && (
        <p
          id={`${registration?.name}-error`}
          className="text-red-600 text-sm mt-2"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}