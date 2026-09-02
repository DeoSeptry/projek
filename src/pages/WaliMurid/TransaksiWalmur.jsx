// src/pages/WaliMurid/TRANSAKSI-WALMUR.jsx
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import ArusKeuangan from '../../components/ArusKeuangan';
import TransactionTable from '../../components/table/TransactionTable';
import { useGetTransactionsQuery } from '../../services/api/transactions.api';
import WithdrawModal from '../../components/modal/WithdrawModal';

export default function TransaksiWalmur() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
  });

  const {
    data: response,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetTransactionsQuery(filters);

  const transactions = response?.items || [];
  const meta = response?.meta || {};

  const handlePageChange = useCallback((page) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const handleWithdrawSuccess = () => {
    // Refresh data setelah withdraw berhasil
    refetch();
  };

  return (
    <div className='bg-[#F5F7FA] min-h-screen p-6'>
      <h1 className='text-[22px] text-[#343C6A] font-medium mb-4'>
        Arus Keuangan
      </h1>
      
      <div className='mb-6'>
        <ArusKeuangan />
      </div>

      {/* Riwayat Transaksi */}
      <div className='bg-white rounded-2xl p-6 shadow-sm'>
        <div className='flex justify-between items-start mb-6 max-md:flex-col max-md:gap-4'>
          <div>
            <h2 className='text-[18px] text-[#343C6A] font-semibold mb-1'>
              Riwayat Transaksi
            </h2>
            <p className='text-[14px] text-[#718EBF]'>
              Lihat semua riwayat transaksi tabungan Anda
            </p>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className='inline-flex items-center justify-center text-white bg-blue-600 border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none transition-colors'
          >
            Tarik Tunai
          </button>
        </div>

        <div className='border-t border-gray-100 pt-6'>
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
          />
        </div>
      </div>

      <WithdrawModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleWithdrawSuccess}
      />
    </div>
  );
}