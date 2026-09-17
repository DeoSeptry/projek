// src/components/TransactionTable/modals/EditTransactionModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Pencil } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { TransactionUpdateAmountSchema } from '../../schemas/transactions/transactions.schema';
import { useGetTransactionByIdQuery } from '../../services/api/transactions.api';


export default function EditTransactionModal({
  isOpen,
  onClose,
  transaction,
  onSubmit,
  isLoading,
}) {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  // Data tampilan diambil dari detail transaksi, bukan dari item list.
  const transactionId = transaction?.id;
  const {
    data: detail,
    isLoading: isLoadingDetail,
    isError: isDetailError,
  } = useGetTransactionByIdQuery(transactionId, {
    skip: !isOpen || !transactionId,
  });

  useEffect(() => {
    if (detail) {
      setAmount(String(detail.amount));
      setError('');
    }
  }, [detail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const parsed = TransactionUpdateAmountSchema.safeParse({ amount });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    onSubmit({ transactionId, amount: parsed.data.amount });
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
    setError('');
  };

  if (!isOpen || !transactionId) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/60 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Pencil className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit Data Transaksi
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Ubah nominal transaksi siswa
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Student Info */}
          {isLoadingDetail ? (
            <div className="mt-6 mx-6 mb-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600 text-center">
              Memuat detail transaksi...
            </div>
          ) : isDetailError || !detail ? (
            <div className="mt-6 mx-6 mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
              Gagal memuat detail transaksi.
            </div>
          ) : (
            <div className="mt-6 mx-6 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Nama Siswa:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {detail.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Nominal Saat Ini:</span>
                  <span className="text-sm font-semibold text-blue-600">
                    {formatCurrency(detail.amount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tipe:</span>
                  <span className={`text-sm font-medium ${
                    detail.type === 'DEPOSIT' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {detail.type === 'DEPOSIT' ? 'Setoran' : 'Penarikan'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 pb-6">
            <div className="mb-6">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nominal Baru <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  Rp
                </span>
                <input
                  type="text"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0"
                  className={`w-full pl-12 text-black pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    error ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={isLoading || isLoadingDetail || !detail}
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
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
                type="submit"
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition disabled:bg-blue-400 disabled:cursor-not-allowed"
                disabled={isLoading || isLoadingDetail || isDetailError || !detail}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Menyimpan...
                  </span>
                ) : (
                  'Simpan Perubahan'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}