import React from "react";

export function IconTextInput({
  icon,
  placeholder,
  autoComplete,
  type = "text",
  error,
  registration,
  onValueChange,
}) {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-4 flex items-center text-[#718EBF]">
        {icon}
      </span>

      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className="w-full pl-12 pr-4 py-3 bg-[#F5F7FA] border border-transparent focus:border-blue-400 focus:bg-white rounded-xl outline-none transition-all placeholder:text-[#718EBF] text-slate-600"
        {...registration}
        onChange={(e) => {
          registration.onChange(e);
          onValueChange?.();
        }}
      />

      {error ? <p className="text-red-600 text-sm mt-2">{error}</p> : null}
    </div>
  );
}
