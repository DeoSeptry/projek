import React, { useEffect } from 'react';
import { User } from 'lucide-react';
import TeacherCard from './TeacherCard';


export default function TeacherCards({ 
  teachers = [], 
  isLoading = false,
  selectedTeacher = null,
  onSelectTeacher 
}) {
  // Auto-select first teacher when data loads
  useEffect(() => {
    if (teachers.length > 0 && !selectedTeacher) {
      onSelectTeacher?.(teachers[0]);
    }
  }, [teachers, selectedTeacher, onSelectTeacher]);

  const handleCardClick = (teacher) => {
    onSelectTeacher?.(teacher);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Pilih Wali Kelas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-[180px] bg-gray-100 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (teachers.length === 0) {
    return (
      <div className="text-center py-12 bg-white border border-gray-200 rounded-xl">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
          <User className="w-10 h-10 text-gray-400" />
        </div>
        <p className="text-gray-500 font-medium text-lg">Belum ada wali kelas</p>
        <p className="text-gray-400 text-sm mt-2">
          Klik tombol "Tambah Wali Kelas" untuk mulai
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">
        Pilih Wali Kelas
      </h2>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 mb-6 lg:grid-cols-6 gap-4">
        {teachers.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
            isActive={selectedTeacher?.id === teacher.id}
            onClick={() => handleCardClick(teacher)}
          />
        ))}
      </div>
    </div>
  );
}