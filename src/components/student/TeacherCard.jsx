import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function TeacherCard({ teacher, isActive, onClick }) {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex gap-2 items-center p-4 rounded-2xl transition-all min-w-[140px] ${
        isActive
          ? 'border-blue-500 bg-blue-500 shadow-md'
          : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm transition-all ${
          isActive
            ? 'bg-gradient-to-br from-blue-600 to-blue-700 ring-4 ring-blue-200'
            : 'bg-gradient-to-br from-blue-500 to-blue-600'
        }`}
      >
        {teacher.avatar ? (
          <img
            src={teacher.avatar.url}
            alt={teacher.name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="text-white font-semibold text-lg">
            {getInitials(teacher.name)}
          </span>
        )}
      </div>

      <div>
        <div className="flex flex-col">
          <span
            className={`inline-flex items-center gap-1 py-1 text-xs font-medium ${
              isActive
                ? ' text-white'
                : ' text-blue-500'
            }`}
          >
            {/* <GraduationCap className="w-3.5 h-3.5" /> */}
            Kelas {teacher.grade}
          </span>
          <h4
            className={`mt-3 text-sm font-semibold text-left line-clamp-2 ${
              isActive ? 'text-white' : 'text-blue-500'
            }`}
          >
            {teacher.name}
          </h4>
        </div>
      </div>
    </button>
  );
}