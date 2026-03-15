// src/components/modal/WithdrawModal.jsx
import React from 'react';
import { X, AlertCircle, Wallet, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useWithdrawForm } from '../../hooks/transactions/useWithdrawForm';
import { useGetTransactionTotalAmountsQuery } from '../../services/api/transactions.api';

function formatIDR(value) {
  const numericValue = Number(value || 0);
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(numericValue);
}

export default function WithdrawModal({
  isOpen,
  onClose,
  onSuccess,
}) {
  // Fetch saldo dari API yang sama dengan ArusKeuangan
  const { 
    data: totals, 
    isLoading: isLoadingBalance 
  } = useGetTransactionTotalAmountsQuery();

  const { 
    register, 
    formState: { errors }, 
    onSubmit: handleFormSubmit, 
    isLoading, 
    rootErrorMessage 
  } = useWithdrawForm({
    onSuccess: (res) => { 
      // Toast sukses
       toast.success("Pengajuan Penarikan Berhasil!", {
        duration: 3000,
      });
      onSuccess?.(res);
      onClose();
    },
    onError: (error) => {
      // Toast error dengan detail pesan dari backend
      const errorMessage = 
        error?.data?.message || 
        error?.message || 
        'Gagal mengajukan penarikan';
      toast.error(` ${errorMessage}`, {
        duration: 4000,
      });
    }
  });

  // Wrap onSubmit untuk menampilkan loading toast
  const onSubmit = async (data) => {
    const loadingToast = toast.loading('Memproses pengajuan penarikan...');
    
    try {
      await handleFormSubmit(data);
      toast.dismiss(loadingToast);
    } catch (error) {
      toast.dismiss(loadingToast);
      // Error sudah di-handle di onError callback
    }
  };

  if (!isOpen) return null;

  const saldoTersedia = totals?.totalBalances ?? 0;

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
          <div className="mb-6 p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Wallet className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-blue-700 font-medium mb-1">
                  Saldo Tersedia
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {isLoadingBalance ? (
                    <span className="text-base">Memuat...</span>
                  ) : (
                    formatIDR(saldoTersedia)
                  )}
                </p>
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
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  Rp
                </span>
                <input
                  type="number"
                  {...register('amount')}
                  className={`w-full pl-12 pr-4 py-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
                    errors.amount ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0"
                  disabled={isLoading || isLoadingBalance}
                />
              </div>
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
              )}
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alasan Penarikan <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('reason')}
                rows={4}
                className={`w-full px-4 py-3 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition ${
                  errors.reason ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Contoh: Keperluan bayar SPP, biaya sekolah, dll."
                disabled={isLoading}
              />
              {errors.reason && (
                <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>
              )}
            </div>

            {/* Info Note */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-900 mb-1">
                    Catatan Penting:
                  </p>
                  <ul className="text-xs text-amber-800 space-y-1">
                    <li>• Penarikan akan diproses dalam 1-2 hari kerja</li>
                    <li>• Pastikan alasan penarikan jelas dan valid</li>
                    <li>• Dana akan dikembalikan sesuai prosedur sekolah</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
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
                disabled={isLoading || isLoadingBalance}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Memproses...
                  </span>
                ) : (
                  'Ajukan Penarikan'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}