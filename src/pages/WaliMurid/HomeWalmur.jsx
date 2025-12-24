// src/pages/WaliMurid/HOME-WALMUR.jsx
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chart from "../../components/ChartAktivitas";
import ArusKeuangan from "../../components/ArusKeuangan";
import TransactionTable from "../../components/table/TransactionTable";
import { useGetTransactionsQuery } from "../../services/api/transactions.api";

export default function HomeWalmur() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });

  const {
    data: response,
    isLoading,
    isError,
    isFetching,
  } = useGetTransactionsQuery(filters);

  const transactions = response?.items || [];
  const meta = response?.meta || {};

  const handlePageChange = useCallback((page) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  return (
    <div className="bg-[#F5F7FA] min-h-screen p-6">
      <div className="mb-6">
        <h2 className="text-[22px] text-[#343C6A] font-medium mb-4">
          Arus Keuangan
        </h2>
        <ArusKeuangan />
      </div>

      <div className="mb-6">
        <h2 className="text-[22px] text-[#343C6A] font-medium mb-4">
          Grafik Aktivitas
        </h2>
        <Chart />
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[22px] text-[#343C6A] font-medium">
            Riwayat Transaksi
          </h2>
          <button
            onClick={() => navigate("/transaksiWalmur")}
            className="text-[16px] text-[#718EBF] hover:text-[#1814F3] transition-colors"
          >
            Lihat Semua
          </button>
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
        />
      </div>
    </div>
  );
}
