// src/components/modal/DepositModal.jsx
import React, { useState, useMemo } from 'react';
import { X, DollarSign, User, Search, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { useClickOutside } from '../../hooks/transactions/useClickOutside';
import { useGetStudentsQuery } from '../../services/api/students.api';
import { useDepositForm } from '../../hooks/transactions/useDepositForm';


export default function DepositModal({ isOpen, onClose }) {
  const [searchStudent, setSearchStudent] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Click outside to close dropdown
  const dropdownRef = useClickOutside(() => {
    setIsDropdownOpen(false);
  }, isDropdownOpen);

  // Fetch students data
  const { data: studentsResponse, isLoading: isLoadingStudents } = useGetStudentsQuery({
    limit: 100, // Ambil banyak data untuk dropdown
    ...(searchStudent && { search: searchStudent }),
  });

  const students = studentsResponse?.items || [];

  const {
    register,
    onSubmit,
    isLoading,
    rootErrorMessage,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useDepositForm({
    onSuccess: (data) => {
      toast.success('✅ Transaksi deposit berhasil ditambahkan', {
        duration: 3000,
      });
      handleClose();
    },
    onError: (error) => {
      console.error('Deposit error:', error);
    },
  });

  const selectedStudentId = watch('studentId');

  // Find selected student
  const selectedStudent = useMemo(() => {
    return students.find((s) => s.id === selectedStudentId);
  }, [students, selectedStudentId]);

  const handleClose = () => {
    if (!isLoading) {
      reset();
      setSearchStudent('');
      setIsDropdownOpen(false);
      onClose();
    }
  };

  const handleSelectStudent = (student) => {
    setValue('studentId', student.id, { shouldValidate: true });
    setIsDropdownOpen(false);
    setSearchStudent('');
  };

  // Filter students based on search
  const filteredStudents = useMemo(() => {
    if (!searchStudent.trim()) return students;
    
    const search = searchStudent.toLowerCase();
    return students.filter(
      (student) =>
        student.name?.toLowerCase().includes(search) ||
        student.nisn?.toLowerCase().includes(search) ||
        student.grade?.toString().includes(search)
    );
  }, [students, searchStudent]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 transition-opacity animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Tambah Transaksi Deposit
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Tambahkan saldo tabungan siswa
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="p-6 space-y-5">
          {/* Root Error Message */}
          {rootErrorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{rootErrorMessage}</p>
            </div>
          )}

          {/* Student Dropdown Field */}
          <div>
            <label
              htmlFor="studentId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Pilih Siswa
              <span className="text-red-500 ml-1">*</span>
            </label>
            
            {/* Hidden input for form validation */}
            <input
              type="hidden"
              {...register('studentId')}
            />

            {/* Custom Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                disabled={isLoading || isLoadingStudents}
                className={`
                  w-full flex items-center justify-between gap-2 px-4 py-3
                  border rounded-lg text-left
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                  transition-colors
                  ${errors.studentId ? 'border-red-300 bg-red-50' : 'border-gray-300'}
                  ${selectedStudent ? 'text-gray-900' : 'text-gray-400'}
                `}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <User className="w-5 h-5 flex-shrink-0 text-gray-400" />
                  {selectedStudent ? (
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {selectedStudent.studentName}
                      </p>
                    </div>
                  ) : (
                    <span className="truncate">
                      {isLoadingStudents ? 'Memuat data siswa...' : 'Pilih siswa'}
                    </span>
                  )}
                </div>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 text-gray-400 transition-transform ${
                    isDropdownOpen ? 'transform rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-hidden">
                  {/* Search Input */}
                  <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={searchStudent}
                        onChange={(e) => setSearchStudent(e.target.value)}
                        placeholder="Cari nama atau NISN..."
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>

                  {/* Students List */}
                  <div className="max-h-60 overflow-y-auto">
                    {isLoadingStudents ? (
                      <div className="p-4 text-center text-sm text-gray-500">
                        Memuat data siswa...
                      </div>
                    ) : filteredStudents.length === 0 ? (
                      <div className="p-4 text-center text-sm text-gray-500">
                        {searchStudent ? 'Siswa tidak ditemukan' : 'Tidak ada data siswa'}
                      </div>
                    ) : (
                      filteredStudents.map((student) => (
                        <button
                          key={student.id}
                          type="button"
                          onClick={() => handleSelectStudent(student)}
                          className={`
                            w-full text-black px-4 py-3 text-left hover:bg-gray-50 transition-colors
                            ${selectedStudentId === student.id ? 'bg-blue-50' : ''}
                          `}
                        >
                          <p className="font-medium text-black text-sm">
                            {student.studentName}
                          </p>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {errors.studentId && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.studentId.message}
              </p>
            )}
          </div>

          {/* Amount Field */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nominal Deposit
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 font-medium">Rp</span>
              </div>
              <input
                id="amount"
                type="number"
                {...register('amount', { valueAsNumber: true })}
                disabled={isLoading}
                placeholder="0"
                min="0"
                step="1000"
                className={`
                  block w-full pl-12 pr-4 py-3 
                  border rounded-lg 
                  text-gray-900 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
                  transition-colors
                  ${errors.amount ? 'border-red-300 bg-red-50' : 'border-gray-300'}
                `}
              />
            </div>
            {errors.amount && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.amount.message}
              </p>
            )}
            <p className="mt-1.5 text-xs text-gray-500">
              Minimal deposit Rp 1.000
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading || isLoadingStudents}
              className="flex-1 px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Memproses...</span>
                </>
              ) : (
                <span>Tambah Deposit</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}