// src/components/Modal.jsx
import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ 
  show, 
  onClose, 
  title, 
  children, 
  size = "md" 
}) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && show) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [show, onClose]);

  if (!show) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/60 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className={`relative w-full ${sizeClasses[size]} mx-auto my-6 z-50`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow-xl">
          {/* Modal header */}
          {title && (
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-900">
                {title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors"
              >
                <X className="w-5 h-5" />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
          )}

          {/* Modal body */}
          <div className="p-4 md:p-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal Header Component (opsional, untuk struktur yang lebih baik)
export function ModalHeader({ children, onClose }) {
  return (
    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
      <h3 className="text-xl font-semibold text-gray-900">
        {children}
      </h3>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center transition-colors"
        >
          <X className="w-5 h-5" />
          <span className="sr-only">Close modal</span>
        </button>
      )}
    </div>
  );
}

// Modal Body Component (opsional)
export function ModalBody({ children }) {
  return (
    <div className="p-4 md:p-5">
      {children}
    </div>
  );
}

// Modal Footer Component (opsional)
export function ModalFooter({ children }) {
  return (
    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
      {children}
    </div>
  );
}