// src/components/TransactionTable.jsx
import React from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Pagination from './Pagination';

export default function TransactionTable({
  data = [],
  isLoading,
  isError,
  searchQuery,
  onSearchChange,
  currentPage,
  totalPages,
  onPageChange,
  totalResults = 0,
}) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTypeColor = (type) => {
    return type === 'DEPOSIT'
      ? 'text-green-600 bg-green-50'
      : 'text-red-600 bg-red-50';
  };

  const getTypeLabel = (type) => {
    return type === 'DEPOSIT' ? 'Setoran' : 'Penarikan';
  };

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Gagal memuat data transaksi</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari nama siswa..."
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-blue-500 block w-full pl-10 p-2.5"
        />
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto bg-neutral-primary-soft  rounded-base ">
        <table className="w-full text-sm text-center rtl:text-right text-body">
          <thead className=" font-light  text-[#718EBF] bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Nama</th>
              <th scope="col" className="px-6 py-3">Kelas</th>
              <th scope="col" className="px-6 py-3">Nominal</th>
              <th scope="col" className="px-6 py-3">Jumlah Tabungan</th>
              <th scope="col" className="px-6 py-3">Tanggal Transaksi</th>
              <th scope="col" className="px-6 py-3">Type</th>
              <th scope="col" className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                  Tidak ada data transaksi
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id} className="bg-white border-gray-200 border-b text-center text-gray-900 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium  whitespace-nowrap">
                    {row.name}
                  </td>
                  <td className="px-6 py-4">{row.grade}</td>
                  <td className="px-6 py-4 font-semibold">
                    {formatCurrency(row.amount)}
                  </td>
                      <td className="px-6 py-4">{formatCurrency(row.balance)}</td>
                      <td className="px-6 py-4 text-xs">{formatDate(row.date)}</td>
                      <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTypeColor(
                        row.type
                      )}`}
                    >
                      {getTypeLabel(row.type)}
                    </span>
                  </td>
                 
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}