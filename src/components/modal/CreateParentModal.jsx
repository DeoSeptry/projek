// src/components/modal/CreateParentModal.jsx
import React from 'react';
import { X } from 'lucide-react';
import { useParentCreateForm } from '../../hooks/parents/useParentCreateForm';


export default function CreateParentModal({
  isOpen,
  onClose,
  onSuccess,
}) {
  const { register, formState: { errors }, onSubmit, isLoading, rootErrorMessage } = 
    useParentCreateForm({
      onSuccess: (res) => {
        onSuccess?.(res);
        onClose();
      },
    });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/60 transition-opacity"
        onClick={() => !isLoading && onClose()}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Tambah Akun Orang Tua
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
              disabled={isLoading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Root Error */}
          {rootErrorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{rootErrorMessage}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            {/* NISN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NISN <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('nisn')}
                className={`w-full px-4 py-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.nisn ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Masukkan NISN"
                disabled={isLoading}
              />
              {errors.nisn && (
                <p className="mt-1 text-sm text-red-600">{errors.nisn.message}</p>
              )}
            </div>

            {/* Nama Siswa */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Siswa <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('studentName')}
                className={`w-full px-4 py-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.studentName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Masukkan nama siswa"
                disabled={isLoading}
              />
              {errors.studentName && (
                <p className="mt-1 text-sm text-red-600">{errors.studentName.message}</p>
              )}
            </div>

            {/* Nama Orang Tua */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Orang Tua <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('parentName')}
                className={`w-full px-4 py-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.parentName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Masukkan nama orang tua"
                disabled={isLoading}
              />
              {errors.parentName && (
                <p className="mt-1 text-sm text-red-600">{errors.parentName.message}</p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('username')}
                className={`w-full px-4 py-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Masukkan username"
                disabled={isLoading}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
              )}
            </div>

            {/* No HP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                No. HP <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('phoneNumber')}
                className={`w-full px-4 py-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Masukkan nomor HP"
                disabled={isLoading}
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-black text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                {...register('password')}
                className={`w-full px-4 py-3 text-black border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Minimal 6 karakter"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Konfirmasi Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                {...register('confirmPassword')}
                className={`w-full px-4 py-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Masukkan ulang password"
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
                disabled={isLoading}
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition disabled:bg-blue-400 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Menyimpan...
                  </span>
                ) : (
                  'Simpan Data'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}