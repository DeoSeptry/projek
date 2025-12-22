// src/components/TransactionTable/TransactionTable.jsx
import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import SearchBar from './table/SearchBar';
import BaseTable from './table/BaseTable';
import { formatCurrency, formatDate } from '../utils/formatters';
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
  showActions = false, // Toggle untuk show/hide actions column
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

  // Base columns
  const baseColumns = [
    { header: 'Nama' },
    { header: 'Kelas' },
    { header: 'Nominal' },
    { header: 'Jumlah Tabungan' },
    { header: 'Tanggal Transaksi' },
    { header: 'Type' },
    { header: 'Status' },
  ];

  // Add Actions column if needed
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
      <td className="px-6 py-4">{formatCurrency(row.balance)}</td>
      <td className="px-6 py-4 text-xs">{formatDate(row.date)}</td>
      <td className="px-6 py-4">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTypeColor(row.type)}`}
        >
          {getTypeLabel(row.type)}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
          {row.status}
        </span>
      </td>

      {/* Actions Column */}
      {showActions && (
        <td className="px-6 py-4">
          <div className="flex items-center justify-center gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(row)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit Nominal"
              >
                <Edit2 className="w-4 h-4" />
              </button>
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
      {/* Search Bar - Optional */}
      {showSearch && onSearchChange && (
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Cari nama siswa..."
        />
      )}

      {/* Table */}
      <BaseTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
        renderRow={renderRow}
        emptyMessage="Tidak ada data transaksi"
        errorMessage="Gagal memuat data transaksi"
      />

      {/* Pagination - Optional */}
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