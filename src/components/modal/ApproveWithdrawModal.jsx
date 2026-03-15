// src/components/modal/ApproveWithdrawModal.jsx
import React from 'react';
import { X, AlertCircle, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export default function ApproveWithdrawModal({
  isOpen,
  onClose,
  transaction,
  onConfirm,
  isLoading,
}) {
  const handleApprove = () => {
    if (transaction?.id) {
      onConfirm(transaction.id);
    }
  };

  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/60 transition-opacity"
        onClick={isLoading ? undefined : onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Approve Penarikan
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
              disabled={isLoading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Warning Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-amber-600" />
            </div>
          </div>

          {/* Transaction Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Nama Siswa:</span>
              <span className="text-sm font-medium text-gray-900">
                {transaction.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Kelas:</span>
              <span className="text-sm font-medium text-gray-900">
                {transaction.grade}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Nominal Penarikan:</span>
              <span className="text-sm font-semibold text-red-600">
                {formatCurrency(transaction.amount)}
              </span>
            </div>
            {transaction.reason && (
              <div className="pt-2 border-t border-gray-200">
                <span className="text-sm text-gray-600">Alasan:</span>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {transaction.reason}
                </p>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="text-sm text-gray-600">Status:</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full animate-pulse"></span>
                Menunggu Approval
              </span>
            </div>
          </div>

          {/* Confirmation Message */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <CheckCircle className="w-4 h-4 inline mr-1" />
              Dengan menyetujui, transaksi penarikan ini akan diproses dan saldo siswa akan berkurang.
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
              onClick={handleApprove}
              className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition disabled:bg-green-400 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Memproses...
                </span>
              ) : (
                'Approve Penarikan'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}