// src/pages/Kepsek/AkunKepsek.jsx
import React, { useState, useCallback } from 'react';
import { UserPlus, Search, Users, RefreshCw } from 'lucide-react';
import { useGetTeachersQuery } from '../../services/api/teachers.api';
import CreateTeacherModal from '../../components/modal/CreateTeacherModal';
import StudentsManagementPage from '../../components/student/StudentManagementPage';

export default function AkunKepsek() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch teachers list
  const { data: response, isLoading, isError, refetch, isFetching } = useGetTeachersQuery({
    search: searchQuery || undefined,
  });

  const teachers = response?.items || [];
  const totalResults = response?.meta?.totalResults || 0;

  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen p-6">
      <div className="= mx-auto">
        {/* Header Section */}
        <div className="rounded-2xl  mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Daftar Akun</h2>
              <p className="text-sm text-gray-500">Akun wali kelas beserta daftar siswa-siswinya  </p>
            </div>
              <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-colors shadow-sm"
            >
              <UserPlus className="w-4 h-4" />
              <span>Tambah Wali Kelas</span>
            </button>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="">


          {/* Teacher Tabs List */}
          {!isError && (
            <StudentsManagementPage teachers={teachers} isLoading={isLoading} />
          )}
        </div>

        {/* Info Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Gunakan tombol <span className="font-semibold">"Tambah Wali Kelas"</span> untuk
            menambahkan akun baru
          </p>
        </div>
      </div>

      {/* Create Teacher Modal */}
      <CreateTeacherModal
        show={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
}