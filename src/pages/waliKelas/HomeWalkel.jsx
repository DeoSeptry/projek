// src/pages/waliKelas/HOME-WALKEL.jsx
import React, { useState, useCallback } from "react";
import toast from "react-hot-toast"; // atau library toast lainnya
import { useSelector } from "react-redux";

import Chart from "../../components/ChartAktivitas";
import ArusKeuangan from "../../components/ArusKeuangan";
import TransactionTable from "../../components/TransactionTable";
import EditTransactionModal from "../../components/modal/EditTransactionModal";
import DeleteTransactionModal from "../../components/modal/DeleteTransactionModal";
import { 
  useGetTransactionsQuery,
  useUpdateTransactionAmountMutation,
  useDeleteTransactionMutation 
} from "../../services/api/transactions.api";

export default function HomeWalkel() {
  const { user } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });

  // Modal states
  const [editModal, setEditModal] = useState({
    isOpen: false,
    transaction: null,
  });

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    transaction: null,
  });

  // Queries & Mutations
  const { data: response, isLoading, isError, isFetching } =
    useGetTransactionsQuery(filters);

  const [updateAmount, { isLoading: isUpdating }] = useUpdateTransactionAmountMutation();
  const [deleteTransaction, { isLoading: isDeleting }] = useDeleteTransactionMutation();

  const transactions = response?.items || [];
  const meta = response?.meta || {};

  // Handlers
  const handlePageChange = useCallback((page) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  // Edit handlers
  const handleEditClick = (transaction) => {
    setEditModal({ isOpen: true, transaction });
  };

  const handleEditSubmit = async ({ transactionId, amount }) => {
    try {
      await updateAmount({ transactionId, amount }).unwrap();
      
      toast.success('✅ Nominal transaksi berhasil diperbarui', {
        duration: 3000,
      });
      
      setEditModal({ isOpen: false, transaction: null });
    } catch (error) {
      const errorMessage = error?.data?.message || 'Gagal memperbarui nominal transaksi';
      
      toast.error(`❌ ${errorMessage}`, {
        duration: 4000,
      });
      
      console.error('Update error:', error);
    }
  };

  const handleEditClose = () => {
    if (!isUpdating) {
      setEditModal({ isOpen: false, transaction: null });
    }
  };

  // Delete handlers
  const handleDeleteClick = (transaction) => {
    setDeleteModal({ isOpen: true, transaction });
  };

  const handleDeleteConfirm = async (transactionId) => {
    const loadingToast = toast.loading('Menghapus transaksi...');
    
    try {
      await deleteTransaction(transactionId).unwrap();
      
      toast.dismiss(loadingToast);
      toast.success('✅ Transaksi berhasil dihapus', {
        duration: 3000,
      });
      
      setDeleteModal({ isOpen: false, transaction: null });
    } catch (error) {
      toast.dismiss(loadingToast);
      
      const errorMessage = error?.data?.message || 'Gagal menghapus transaksi';
      
      toast.error(`❌ ${errorMessage}`, {
        duration: 4000,
      });
      
      console.error('Delete error:', error);
    }
  };

  const handleDeleteClose = () => {
    if (!isDeleting) {
      setDeleteModal({ isOpen: false, transaction: null });
    }
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen p-6">
      <h2 className="text-[22px] text-[#343C6A] font-medium mb-4">
        Dashboard Wali Kelas
      </h2>

      <div className="mb-6">
        <ArusKeuangan />
      </div>

      <div className="mb-6">
        <Chart />
      </div>

      {/* Transaction Table with Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Daftar Transaksi Siswa
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Kelola transaksi siswa di kelas Anda
          </p>
        </div>

        <TransactionTable
          data={transactions}
          isLoading={isLoading || isFetching}
          isError={isError}
          currentPage={meta.page || 1}
          totalPages={meta.totalPages || 1}
          totalResults={meta.totalResults || 0}
          onPageChange={handlePageChange}
          showSearch={false}
          showPagination={true}
          showActions={true}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>

      {/* Edit Modal */}
      <EditTransactionModal
        isOpen={editModal.isOpen}
        onClose={handleEditClose}
        transaction={editModal.transaction}
        onSubmit={handleEditSubmit}
        isLoading={isUpdating}
      />

      {/* Delete Modal */}
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