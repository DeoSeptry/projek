import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, GraduationCap } from 'lucide-react';

const GRADES = [
  { value: '', label: 'Pilih Kelas' },
  { value: 1, label: 'Kelas 1' },
  { value: 2, label: 'Kelas 2' },
  { value: 3, label: 'Kelas 3' },
  { value: 4, label: 'Kelas 4' },
  { value: 5, label: 'Kelas 5' },
  { value: 6, label: 'Kelas 6' },
];

export default function GradeDropdownFilter({ 
  id = 'grade',
  name = 'grade',
  value, 
  onChange, 
  error,
  disabled = false 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedLabel = GRADES.find((g) => g.value === value || String(g.value) === String(value))?.label || 'Pilih Kelas';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (gradeValue) => {
    // Simulate event untuk compatibility dengan handleChange yang ada
    const syntheticEvent = {
      target: {
        name: name,
        value: gradeValue
      }
    };
    onChange(syntheticEvent);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        id={id}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`inline-flex items-center justify-center w-full text-black bg-white border hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <GraduationCap className="w-4 h-4 mr-2" />
        <span className={!value ? 'text-gray-400' : 'text-black'}>{selectedLabel}</span>
        <ChevronDown
          className={`w-4 h-4 ms-auto transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <div className="absolute left-0 right-0 mt-2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg animate-fade-in">
          <ul className="p-2 text-sm text-gray-700 font-medium max-h-60 overflow-y-auto">
            {GRADES.map((grade) => {
              const isSelected = grade.value === value || String(grade.value) === String(value);

              return (
                <li key={grade.value}>
                  <button
                    type="button"
                    onClick={() => handleSelect(grade.value)}
                    className={`inline-flex items-center w-full p-2 rounded transition-colors ${
                      isSelected
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'hover:bg-gray-50 hover:text-gray-900'
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
                    <span className={isSelected ? '' : 'ml-6'}>{grade.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* CSS for fade-in animation */}
      <style jsx>{`
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