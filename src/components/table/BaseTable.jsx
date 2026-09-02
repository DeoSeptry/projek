// src/components/BaseTable/BaseTable.jsx
import React from 'react';

export default function BaseTable({
  columns = [],
  data = [],
  isLoading = false,
  isError = false,
  emptyMessage = "Tidak ada data",
  errorMessage = "Gagal memuat data",
  renderRow,
  className = "",
}) {
  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{errorMessage}</p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-x-auto bg-neutral-primary-soft rounded-base ${className}`}>
      <table className="w-full text-sm text-center rtl:text-right text-body">
        <thead className="font-light text-[#718EBF] bg-gray-50">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} scope="col" className="px-6 py-3">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center">
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => renderRow(row, idx))
          )}
        </tbody>
      </table>
    </div>
  );
}