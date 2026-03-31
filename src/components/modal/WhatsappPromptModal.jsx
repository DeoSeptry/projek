import React from "react";
import Lottie from "lottie-react";
import whatsappAnimation from "../../assets/whatsapp loop.json";

export default function WhatsappPromptModal({
  isOpen,
  title,
  message,
  helperText,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  isLoading,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 text-center">
        <div className="mx-auto mb-4 w-24 h-24">
          <Lottie animationData={whatsappAnimation} loop />
        </div>

        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-700 mt-2">{message}</p>
        {helperText ? (
          <p className="text-xs text-gray-500 mt-2">{helperText}</p>
        ) : null}

        <div className="flex gap-3 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition disabled:bg-green-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
