import React from 'react';
import { User, Calendar } from 'lucide-react';
import { useGetTeacherByIdQuery } from '../../services/api/teachers.api';

export default function TeacherDetailPanel({ teacher: teacherFromList }) {
  // Ambil detail terbaru dari API; data list dipakai sementara agar tidak ada layar kosong.
  const { data: teacherDetail } = useGetTeacherByIdQuery(teacherFromList?.id, {
    skip: !teacherFromList?.id,
  });
  const teacher = teacherDetail ?? teacherFromList;

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };
  const getInitials = (name = '') => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!teacher) {
    return (
      <div className="border border-gray-200 rounded-xl bg-white shadow-sm p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <User className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 font-medium">Pilih Wali Kelas</p>
        <p className="text-gray-400 text-sm mt-1">
          Untuk melihat detail dan daftar siswa
        </p>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden sticky top-6">

      {/* Content */}
      <div className="p-6">
        {/* Avatar & Name */}
        <div className="flex flex-col items-center mb-2 pb-2">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg mb-4">
            {teacher.avatar ? (
              <img
                src={teacher.avatar.url}
                alt={teacher.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-white font-semibold text-2xl">
                {getInitials(teacher.name)}
              </span>
            )}
          </div>

        </div>

        {/* Details */}
        <div className="space-y-4">
          <div className='flex flex-col gap-5'>
            <label className="text-lg font-medium text-gray-700 tracking-wide">
              Profil Wali Kelas
            </label>

            <div className='flex flex-col gap-3'>
              <div className='flex justify-between border-b border-gray-200 pb-2'>
                <span className='text-left text-gray-500'>Nama</span>
                <span className='text-left text-[#718EBF]'>{teacher.name}</span>
              </div>
              <div className='flex justify-between border-b border-gray-200 pb-2'>
                <span className='text-left text-gray-500'>Username</span>
                <span className='text-left text-[#718EBF]'>{teacher.username}</span>
              </div>
              <div className='flex justify-between border-b border-gray-200 pb-2'>
                <span className='text-left text-gray-500'>Kelas</span>
                <span className='text-left text-[#718EBF]'>{teacher.grade ?? '-'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}