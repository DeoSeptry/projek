import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { ChevronDown, GraduationCap } from "lucide-react";

const GRADES = [
  { value: "", label: "Semua Kelas" },
  { value: "1", label: "Kelas 1" },
  { value: "2", label: "Kelas 2" },
  { value: "3", label: "Kelas 3" },
  { value: "4", label: "Kelas 4" },
  { value: "5", label: "Kelas 5" },
  { value: "6", label: "Kelas 6" },
];

export default function GradeFilter({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedLabel = useMemo(() => {
    return GRADES.find((g) => g.value === value)?.label || "Semua Kelas";
  }, [value]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSelect = useCallback(
    (gradeValue) => {
      onChange?.(gradeValue);
      setIsOpen(false);
    },
    [onChange]
  );

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="inline-flex items-center justify-center text-white bg-blue-600 border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <GraduationCap className="w-4 h-4 mr-2" />
        <span>{selectedLabel}</span>
        <ChevronDown
          className={`w-4 h-4 ms-1.5 -me-0.5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg w-44 animate-fade-in">
          <ul className="p-2 text-sm text-gray-700 font-medium">
            {GRADES.map((grade) => {
              const isSelected = grade.value === value;

              return (
                <li key={grade.value}>
                  <button
                    type="button"
                    onClick={() => handleSelect(grade.value)}
                    className={`inline-flex items-center w-full p-2 rounded transition-colors ${
                      isSelected
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="w-4 h-4 mr-2 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <span className={isSelected ? "" : "ml-6"}>{grade.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* ✅ Vite/React: pakai <style> biasa, jangan <style jsx> */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.15s ease-out;
        }
      `}</style>
    </div>
  );
}
