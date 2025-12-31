// src/pages/waliKelas/TRANSAKSI-WALKEL.jsx
import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Download } from "lucide-react";
import toast from "react-hot-toast";
import ArusKeuangan from "../../components/ArusKeuangan";
import DayRangeFilter from "../../components/filter/DayRangeFilter";
import EditTransactionModal from "../../components/modal/EditTransactionModal";
import DeleteTransactionModal from "../../components/modal/DeleteTransactionModal";
import ApproveWithdrawModal from "../../components/modal/ApproveWithdrawModal";

import {
  useGetTransactionsQuery,
  useUpdateTransactionAmountMutation,
  useDeleteTransactionMutation,
  useApproveWithdrawMutation,
  useLazyGetTransactionsQuery,
} from "../../services/api/transactions.api";
import DepositModal from "../../components/modal/DepositModal";
import { exportTransactionsPdf } from "../../utils/exportTransactionsPdf";
import TransactionTable from "../../components/table/TransactionTable";

export default function TransaksiWalkel() {
  const { user } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState({
    dayRange: "",
    search: "",
    page: 1,
    limit: 10,
  });

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  // Modal states
  const [depositModal, setDepositModal] = useState(false);
  const [editModal, setEditModal] = useState({
    isOpen: false,
    transaction: null,
  });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    transaction: null,
  });
  const [approveModal, setApproveModal] = useState({
    isOpen: false,
    transaction: null,
  });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500);
    return () => clearTimeout(timer);
  }, [filters.search]);

  // Build API params
  const apiParams = {
    ...(filters.dayRange && { dayRange: filters.dayRange }),
    ...(debouncedSearch && { search: debouncedSearch }),
    page: filters.page,
    limit: filters.limit,
  };

  // Queries & Mutations
  const {
    data: response,
    isLoading,
    isError,
    isFetching,
  } = useGetTransactionsQuery(apiParams);

  const [updateAmount, { isLoading: isUpdating }] =
    useUpdateTransactionAmountMutation();
  const [deleteTransaction, { isLoading: isDeleting }] =
    useDeleteTransactionMutation();
  const [approveWithdraw, { isLoading: isApproving }] =
    useApproveWithdrawMutation();
  const [triggerGetTransactions] = useLazyGetTransactionsQuery();

  const handleDownload = useCallback(async () => {
    if (isDownloading) return;

    const loadingToast = toast.loading("Menyiapkan PDF...");
    setIsDownloading(true);

    try {
      const baseParams = {
        ...(filters.dayRange ? { dayRange: filters.dayRange } : {}),
        ...(debouncedSearch ? { search: debouncedSearch } : {}),
      };
      const EXPORT_LIMIT = 100;

      const first = await triggerGetTransactions({
        ...baseParams,
        page: 1,
        limit: EXPORT_LIMIT,
      }).unwrap();

      const items1 = first?.items ?? [];
      const meta1 = first?.meta ?? {};
      const totalPages = meta1.totalPages ?? 1;

      let allItems = [...items1];

      for (let p = 2; p <= totalPages; p++) {
        const next = await triggerGetTransactions({
          ...baseParams,
          page: p,
          limit: EXPORT_LIMIT,
        }).unwrap();

        allItems = allItems.concat(next?.items ?? []);
      }

      const subtitleParts = [];
      if (filters.dayRange)
        subtitleParts.push(`Range: ${filters.dayRange} hari`);
      if (debouncedSearch) subtitleParts.push(`Search: "${debouncedSearch}"`);
      const subtitle = subtitleParts.join(" | ");

      const today = new Date();
      const ymd = today.toISOString().slice(0, 10);

      exportTransactionsPdf({
        items: allItems,
        title: "Laporan Transaksi",
        subtitle,
        fileName: `laporan-transaksi-${ymd}.pdf`,
      });

      toast.dismiss(loadingToast);
      toast.success("PDF berhasil dibuat ✅");
    } catch (e) {
      toast.dismiss(loadingToast);
      toast.error(e?.data?.message || e?.message || "Gagal membuat PDF");
    } finally {
      setIsDownloading(false);
    }
  }, [
    isDownloading,
    triggerGetTransactions,
    filters.dayRange,
    debouncedSearch,
  ]);

  const transactions = response?.items || [];
  const meta = response?.meta || {};


  // Handlers
  const handleDayRangeChange = useCallback((dayRange) => {
    setFilters((prev) => ({ ...prev, dayRange, page: 1 }));
  }, []);

  const handleSearchChange = useCallback((search) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }));
  }, []);

  const handlePageChange = useCallback((page) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  // Edit/Approve handlers
  const handleEditClick = (transaction) => {
    // Cek apakah transaksi adalah WITHDRAWAL dengan status PENDING
    const isPendingWithdrawal = 
      transaction.type === 'WITHDRAWAL' && 
      transaction.status === 'PENDING';

    if (isPendingWithdrawal) {
      // Buka modal approve
      setApproveModal({ isOpen: true, transaction });
    } else {
      // Buka modal edit biasa
      setEditModal({ isOpen: true, transaction });
    }
  };

  const handleEditSubmit = async ({ transactionId, amount }) => {
    try {
      await updateAmount({ transactionId, amount }).unwrap();
      toast.success(" Nominal transaksi berhasil diperbarui", {
        duration: 3000,
      });
      setEditModal({ isOpen: false, transaction: null });
    } catch (error) {
      const errorMessage =
        error?.data?.message || "Gagal memperbarui nominal transaksi";
      toast.error(`❌ ${errorMessage}`, {
        duration: 4000,
      });
      console.error("Update error:", error);
    }
  };

  const handleEditClose = () => {
    if (!isUpdating) {
      setEditModal({ isOpen: false, transaction: null });
    }
  };

  // Approve handlers
  const handleApproveConfirm = async (transactionId) => {
    const loadingToast = toast.loading("Memproses approval...");
    try {
      // ✅ Kirim transactionId sebagai parameter
      // Mutation akan membungkusnya dalam body: { transactionId }
      await approveWithdraw(transactionId).unwrap();
      toast.dismiss(loadingToast);
      toast.success("Penarikan berhasil di-approve", {
        duration: 3000,
      });
      setApproveModal({ isOpen: false, transaction: null });
    } catch (error) {
      toast.dismiss(loadingToast);
      const errorMessage = error?.data?.message || "Gagal approve penarikan";
      toast.error(` ${errorMessage}`, {
        duration: 4000,
      });
      console.error("Approve error:", error);
    }
  };

  const handleApproveClose = () => {
    if (!isApproving) {
      setApproveModal({ isOpen: false, transaction: null });
    }
  };

  // Delete handlers
  const handleDeleteClick = (transaction) => {
    setDeleteModal({ isOpen: true, transaction });
  };

  const handleDeleteConfirm = async (transactionId) => {
    const loadingToast = toast.loading("Menghapus transaksi...");
    try {
      await deleteTransaction(transactionId).unwrap();
      toast.dismiss(loadingToast);
      toast.success("Transaksi berhasil dihapus", {
        duration: 3000,
      });
      setDeleteModal({ isOpen: false, transaction: null });
    } catch (error) {
      toast.dismiss(loadingToast);
      const errorMessage = error?.data?.message || "Gagal menghapus transaksi";
      toast.error(` ${errorMessage}`, {
        duration: 4000,
      });
      console.error("Delete error:", error);
    }
  };

  const handleDeleteClose = () => {
    if (!isDeleting) {
      setDeleteModal({ isOpen: false, transaction: null });
    }
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen p-6">
      <h1 className="text-[22px] text-[#343C6A] font-medium mb-4">
        Arus Keuangan
      </h1>

      <div className="mb-6">
        <ArusKeuangan />
      </div>

      {/* Main Content Card - Transaksi */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-[18px] text-[#343C6A] font-semibold mb-1">
                Transaksi Terbaru
              </h2>
              <p className="text-[14px] text-[#718EBF] max-md:hidden">
                Riwayat Transaksi Terbaru Anda
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <DayRangeFilter
                value={filters.dayRange}
                onChange={handleDayRangeChange}
              />
              <button
                onClick={() => setDepositModal(true)}
               className="inline-flex items-center justify-center text-white bg-blue-600 border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none transition-colors ">
                + Tambah Transaksi
              </button>
            </div>
          </div>

          {(filters.dayRange || debouncedSearch) && (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-gray-600">Filter aktif:</span>
              {filters.dayRange && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                  {filters.dayRange} Hari Terakhir
                  <button
                    type="button"
                    onClick={() => handleDayRangeChange("")}
                    className="hover:text-green-900"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              )}
              {debouncedSearch && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                  Pencarian: "{debouncedSearch}"
                  <button
                    type="button"
                    onClick={() => handleSearchChange("")}
                    className="hover:text-purple-900"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    dayRange: "",
                    search: "",
                    page: 1,
                  }));
                }}
                className="text-xs text-red-600 hover:text-red-700 font-medium underline"
              >
                Hapus Semua Filter
              </button>
            </div>
          )}
        </div>

        <TransactionTable
          data={transactions}
          isLoading={isLoading || isFetching}
          isError={isError}
          searchQuery={filters.search}
          onSearchChange={handleSearchChange}
          currentPage={meta.page || 1}
          totalPages={meta.totalPages || 1}
          totalResults={meta.totalResults || 0}
          onPageChange={handlePageChange}
          showSearch={true}
          showPagination={true}
          showActions={true}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex justify-between items-center max-md:flex-col max-md:gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-[18px] text-[#343C6A] font-semibold">
              Download Data Transaksi
            </h2>
            <p className="text-[14px] text-[#718EBF] max-md:hidden">
              Dapatkan data transaksi dalam bentuk PDF
            </p>
          </div>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`inline-flex items-center justify-center text-white bg-blue-600 border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none transition-colors gap-2
          ${isDownloading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            <Download size={18} />
            <span>{isDownloading ? "Membuat PDF..." : "Download PDF"}</span>
          </button>
        </div>
      </div>


      {/* Modals */}
      <DepositModal
        isOpen={depositModal}
        onClose={() => setDepositModal(false)}
      />

      <EditTransactionModal
        isOpen={editModal.isOpen}
        onClose={handleEditClose}
        transaction={editModal.transaction}
        onSubmit={handleEditSubmit}
        isLoading={isUpdating}
      />

      <ApproveWithdrawModal
        isOpen={approveModal.isOpen}
        onClose={handleApproveClose}
        transaction={approveModal.transaction}
        onConfirm={handleApproveConfirm}
        isLoading={isApproving}
      />

      <DeleteTransactionModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteClose}
        transaction={deleteModal.transaction}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </div>
  );
}