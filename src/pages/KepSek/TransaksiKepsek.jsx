// src/pages/Kepsek/TransaksiKepsek.jsx
import React, { useState, useCallback, useEffect } from "react";
import { useGetTransactionsQuery } from "../../services/api/transactions.api";
import ArusKeuangan from "../../components/ArusKeuangan";
import GradeFilter from "../../components/filter/GradeFilter";
import DayRangeFilter from "../../components/filter/DayRangeFilter";
import TransactionTable from "../../components/table/TransactionTable";

export default function TransaksiKepsek() {
  const [filters, setFilters] = useState({
    grade: "",
    dayRange: "",
    search: "",
    page: 1,
    limit: 10,
  });

  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.search]);

  // Build API params
  const apiParams = {
    ...(filters.grade && { grade: filters.grade }),
    ...(filters.dayRange && { dayRange: filters.dayRange }),
    ...(debouncedSearch && { search: debouncedSearch }),
    page: filters.page,
    limit: filters.limit,
  };

  // Fetch data dengan RTK Query
  const {
    data: response,
    isLoading,
    isError,
    isFetching,
  } = useGetTransactionsQuery(apiParams);

  const transactions = response?.items || [];
  const meta = response?.meta || {};

  // Handlers
  const handleGradeChange = useCallback((grade) => {
    setFilters((prev) => ({ ...prev, grade, page: 1 }));
  }, []);

  const handleDayRangeChange = useCallback((dayRange) => {
    setFilters((prev) => ({ ...prev, dayRange, page: 1 }));
  }, []);

  const handleSearchChange = useCallback((search) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }));
  }, []);

  const handlePageChange = useCallback((page) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  return (
    <div className="bg-[#F5F7FA] min-h-screen p-6">
      {/* Arus Keuangan Summary */}
      <div className="mb-6">
        <ArusKeuangan />
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        {/* Header dengan Filters */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Daftar Transaksi
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Kelola semua transaksi siswa
              </p>
            </div>

            {/* Filters Group */}
            <div className="flex flex-wrap items-center gap-3">
              <GradeFilter value={filters.grade} onChange={handleGradeChange} />
              <DayRangeFilter
                value={filters.dayRange}
                onChange={handleDayRangeChange}
              />
            </div>
          </div>

          {/* Active Filters Info */}
          {(filters.grade || filters.dayRange || debouncedSearch) && (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-gray-600">Filter aktif:</span>
              {filters.grade && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                  Kelas {filters.grade}
                  <button
                    type="button"
                    onClick={() => handleGradeChange("")}
                    className="hover:text-blue-900"
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
                    grade: "",
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

        {/* Table dengan Search & Pagination */}
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
        />
      </div>
    </div>
  );
}
