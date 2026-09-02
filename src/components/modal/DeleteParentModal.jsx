// src/components/modal/DeleteParentModal.jsx
import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DeleteParentModal({
  isOpen,
  onClose,
  parent,
  onConfirm,
  isLoading,
}) {
  if (!isOpen || !parent) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/60 transition-opacity"
        onClick={() => !isLoading && onClose()}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 transform transition-all">
          {/* Header with Warning Icon */}
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">
                Hapus Akun Orang Tua
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Tindakan ini tidak dapat dibatalkan
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
              disabled={isLoading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Parent Details */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-3">
              Anda akan menghapus akun orang tua berikut:
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">NISN:</span>
                <span className="text-sm font-medium text-gray-900">
                  {parent.nisn}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Nama Siswa:</span>
                <span className="text-sm font-medium text-gray-900">
                  {parent.studentName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Nama Orang Tua:</span>
                <span className="text-sm font-medium text-gray-900">
                  {parent.parentName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Kelas:</span>
                <span className="text-sm font-medium text-gray-900">
                  {parent.grade}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Username:</span>
                <span className="text-sm font-medium text-gray-900">
                  {parent.username}
                </span>
              </div>
            </div>
          </div>

          {/* Warning Message */}
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              Data akun yang dihapus tidak dapat dikembalikan. Pastikan Anda yakin sebelum melanjutkan.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
              disabled={isLoading}
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => onConfirm(parent.id)}
              className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition disabled:bg-red-400 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Menghapus...
                </span>
              ) : (
                'Ya, Hapus Akun'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}