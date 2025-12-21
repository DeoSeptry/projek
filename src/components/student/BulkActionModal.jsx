import React from 'react';
import { X, AlertCircle, TrendingUp, GraduationCap } from 'lucide-react';

export default function BulkActionModal({
  isOpen,
  action,
  selectedCount,
  isLoading,
  onConfirm,
  onClose,
}) {
  if (!isOpen) return null;

  const isPromote = action === 'promote';
  const icon = isPromote ? TrendingUp : GraduationCap;
  const title = isPromote ? 'Naik Kelas' : 'Luluskan Siswa';
  const description = isPromote
    ? `Apakah Anda yakin ingin menaikkan ${selectedCount} siswa ke kelas berikutnya?`
    : `Apakah Anda yakin ingin meluluskan ${selectedCount} siswa?`;
  const confirmText = isPromote ? 'Ya, Naik Kelas' : 'Ya, Luluskan';
  const bgColor = isPromote ? 'bg-blue-100' : 'bg-green-100';
  const iconColor = isPromote ? 'text-blue-600' : 'text-green-600';
  const btnColor = isPromote
    ? 'bg-blue-600 hover:bg-blue-700'
    : 'bg-green-600 hover:bg-green-700';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray-900/60 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon */}
          <div className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center mb-4`}>
            {React.createElement(icon, {
              className: `w-6 h-6 ${iconColor}`,
            })}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 mb-6">{description}</p>

          {/* Warning */}
          <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg mb-6">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Perhatian!</p>
              <p>Aksi ini tidak dapat dibatalkan. Pastikan data sudah benar.</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={`flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${btnColor}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Memproses...
                </span>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}