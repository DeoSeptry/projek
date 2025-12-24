// src/components/modal/WithdrawModal.jsx
import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import { useWithdrawForm } from '../../hooks/transactions/useWithdrawForm';

export default function WithdrawModal({
  isOpen,
  onClose,
  onSuccess,
  saldoInfo = {
    saldoTersedia: 0,
    batasMinimal: 0,
    maxPenarikan: 0
  }
}) {
  const { register, formState: { errors }, onSubmit, isLoading, rootErrorMessage } = 
    useWithdrawForm({
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
        <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Tarik Tunai
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
              disabled={isLoading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Info Saldo */}
          <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Saldo Tersedia:</span>
                <span className="text-sm font-semibold text-gray-900">
                  Rp {saldoInfo.saldoTersedia?.toLocaleString('id-ID') || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Batas Minimal:</span>
                <span className="text-sm font-semibold text-gray-900">
                  Rp {saldoInfo.batasMinimal?.toLocaleString('id-ID') || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Max Penarikan:</span>
                <span className="text-sm font-semibold text-gray-900">
                  Rp {saldoInfo.maxPenarikan?.toLocaleString('id-ID') || '0'}
                </span>
              </div>
            </div>
          </div>

          {/* Root Error */}
          {rootErrorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{rootErrorMessage}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jumlah Penarikan <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  Rp
                </span>
                <input
                  type="number"
                  {...register('amount')}
                  className={`w-full pl-12 pr-4 py-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.amount ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0"
                  disabled={isLoading}
                />
              </div>
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Maksimal: Rp {saldoInfo.maxPenarikan?.toLocaleString('id-ID') || '0'}
              </p>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alasan Penarikan <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('reason')}
                rows={3}
                className={`w-full px-4 py-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                  errors.reason ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Masukkan alasan penarikan"
                disabled={isLoading}
              />
              {errors.reason && (
                <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>
              )}
            </div>

            {/* Info Note */}
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800">
                <strong>Catatan:</strong> Penarikan tunai membutuhkan waktu proses 1-2 hari kerja. 
                Dana akan dikirim ke rekening yang terdaftar.
              </p>
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
                    Memproses...
                  </span>
                ) : (
                  'Tarik Tunai'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}