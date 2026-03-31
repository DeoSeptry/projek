import React from "react";
import Lottie from "lottie-react";
import whatsappAnimation from "../../assets/whatsapp loop.json";

export default function WhatsappSuccessModal({
  isOpen,
  title,
  message,
  buttonText,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-gray-900/60">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 text-center">
        <div className="mx-auto mb-4 w-24 h-24">
          <Lottie animationData={whatsappAnimation} loop />
        </div>

        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-700 mt-2">{message}</p>

        <div className="pt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
