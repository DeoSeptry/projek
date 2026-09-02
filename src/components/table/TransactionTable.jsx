// src/components/table/TransactionTable.jsx
import React from 'react';
import { Edit2, Trash2, CheckCircle } from 'lucide-react';
import SearchBar from './SearchBar';
import BaseTable from './BaseTable';
import { formatBalance, formatCurrency, formatDate } from '../../utils/formatters';
import Pagination from './Pagination';

export default function TransactionTable({
  data = [],
  isLoading,
  isError,
  searchQuery = "",
  onSearchChange,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalResults = 0,
  showSearch = true,
  showPagination = true,
  showActions = false,
  onEdit,
  onDelete,
}) {
  const getTypeColor = (type) => {
    return type === 'DEPOSIT'
      ? 'text-green-600 bg-green-50'
      : 'text-red-600 bg-red-50';
  };

  const getTypeLabel = (type) => {
    return type === 'DEPOSIT' ? 'Setoran' : 'Penarikan';
  };

  const getStatusColor = (status) => {
    const statusUpper = status?.toUpperCase();
    switch (statusUpper) {
      case 'SUCCESS':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper untuk cek apakah pending withdrawal
  const isPendingWithdrawal = (row) => {
    return row.type === 'WITHDRAWAL' && row.status === 'PENDING';
  };

  const baseColumns = [
    { header: 'Nama' },
    { header: 'Kelas' },
    { header: 'Nominal' },
    { header: 'Jumlah Tabungan' },
    { header: 'Tanggal Transaksi' },
    { header: 'Type' },
    { header: 'Status' },
  ];

  const columns = showActions 
    ? [...baseColumns, { header: 'Aksi' }]
    : baseColumns;

  const renderRow = (row, idx) => (
    <tr
      key={row.id || idx}
      className="bg-white border-gray-200 border-b text-center text-gray-900 hover:bg-gray-50"
    >
      <td className="px-6 py-4 font-medium whitespace-nowrap">{row.name}</td>
      <td className="px-6 py-4">{row.grade}</td>
      <td className="px-6 py-4 font-semibold">{formatCurrency(row.amount)}</td>
      <td className="px-6 py-4">{formatBalance(row.balance)}</td>
      <td className="px-6 py-4 text-xs">{formatDate(row.date)}</td>
      <td className="px-6 py-4">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTypeColor(row.type)}`}
        >
          {row.type}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(row.status)}`}>
          {row.status}
        </span>
      </td>

      {/* Actions Column */}
      {showActions && (
        <td className="px-6 py-4">
          <div className="flex items-center justify-center gap-2">
            {onEdit && (
              <div className="relative">
                {/* Badge untuk pending withdrawal */}
                {isPendingWithdrawal(row) && (
                  <span className="absolute top-0 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                  </span>
                )}
                
                <button
                  onClick={() => onEdit(row)}
                  className={`p-2 rounded-lg transition-colors ${
                    isPendingWithdrawal(row)
                      ? 'text-amber-600 hover:bg-amber-50'
                      : 'text-blue-600 hover:bg-blue-50'
                  }`}
                  title={isPendingWithdrawal(row) ? 'Approve Penarikan' : 'Edit Nominal'}
                >
                  {isPendingWithdrawal(row) ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Edit2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}
            
            {onDelete && (
              <button
                onClick={() => onDelete(row)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Hapus Transaksi"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </td>
      )}
    </tr>
  );

  return (
    <div className="space-y-4">
      {showSearch && onSearchChange && (
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Cari nama siswa..."
        />
      )}

      <BaseTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
        renderRow={renderRow}
        emptyMessage="Tidak ada data transaksi"
        errorMessage="Gagal memuat data transaksi"
      />

      {showPagination && totalPages > 0 && (
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