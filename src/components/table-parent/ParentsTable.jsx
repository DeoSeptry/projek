// src/components/ParentsTable/ParentsTable.jsx
import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import SearchBar from '../table/SearchBar';
import BaseTable from '../table/BaseTable';
import Pagination from '../Pagination';


export default function ParentsTable({
  data = [],
  isLoading,
  isError,
  searchQuery = "",
  onSearchChange,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalResults = 0,
  onEdit,
  onDelete,
}) {
  const columns = [
    { header: 'NISN' },
    { header: 'Nama Siswa' },
    { header: 'Nama Orang Tua' },
    { header: 'Kelas' },
    { header: 'Username' },
    { header: 'No. HP' },
    { header: 'Aksi' },
  ];

  const renderRow = (row, idx) => (
    <tr
      key={row.id || idx}
      className="bg-white border-gray-200 border-b text-center text-gray-900 hover:bg-gray-50"
    >
      <td className="px-6 py-4 font-medium">{row.nisn}</td>
      <td className="px-6 py-4">{row.studentName}</td>
      <td className="px-6 py-4">{row.parentName}</td>
      <td className="px-6 py-4">{row.grade}</td>
      <td className="px-6 py-4">{row.username}</td>
      <td className="px-6 py-4">{row.phoneNumber}</td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(row)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit Data"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(row)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Hapus Data"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      {onSearchChange && (
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Cari nama siswa, orang tua, atau NISN..."
        />
      )}

      {/* Table */}
      <BaseTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        isError={isError}
        renderRow={renderRow}
        emptyMessage="Tidak ada data orang tua"
        errorMessage="Gagal memuat data orang tua"
      />

      {/* Pagination - Always show */}
      {totalPages > 0 && (
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