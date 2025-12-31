import React from "react";

export default function StudentsTableView({
  students = [],
  selectedIds = new Set(),

  isAllSelected = false,
  isSomeSelected = false,
  onSelectAll,
  onSelectOne,

  // ✅ action footer
  selectedCount = 0,
  onPromoteClick,
  onGraduateClick,
  isActionLoading = false,
}) {
  return (
    <div className="relative overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full text-sm text-left text-gray-700">
        {/* ✅ Atas: hanya nama kolom */}
        <thead className="text-xs text-gray-600 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="p-4 w-[56px]" />
            <th scope="col" className="px-6 py-3">Nama Siswa</th>
            <th scope="col" className="px-6 py-3">Nama Wali</th>
            <th scope="col" className="px-6 py-3">Kelas</th>
            <th scope="col" className="px-6 py-3">No HP</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                Tidak ada data siswa
              </td>
            </tr>
          ) : (
            students.map((student) => {
              const id = student.id;
              const checked = selectedIds?.has?.(id) ?? false;

              return (
                <tr
                  key={id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-4">
                    <div className="flex items-center">
                      <input
                        id={`table-checkbox-${id}`}
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => onSelectOne?.(id, e.target.checked)}
                        className="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500"
                      />
                      <label htmlFor={`table-checkbox-${id}`} className="sr-only">
                        Select row
                      </label>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {student.studentName ?? "-"}
                  </td>
                  <td className="px-6 py-4">{student.teacherName ?? "-"}</td>
                  <td className="px-6 py-4">{student.grade ?? "-"}</td>
                  <td className="px-6 py-4">{student.phoneNumber ?? "-"}</td>
                </tr>
              );
            })
          )}
        </tbody>

        {/* ✅ Footer: checkbox pilih semua + tombol action sebaris */}
        <tfoot className="bg-gray-50 border-t border-gray-200">
          <tr>
            <td className="p-4 align-middle">
              <div className="flex items-center">
                <input
                  id="table-checkbox-all-bottom"
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isSomeSelected;
                  }}
                  onChange={(e) => onSelectAll?.(e.target.checked)}
                  className="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="table-checkbox-all-bottom" className="sr-only">
                  Select all
                </label>
              </div>
            </td>

            <td colSpan={4} className="px-6 py-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <span className="text-sm text-gray-600">
                  Pilih Semua
                </span>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onPromoteClick}
                    disabled={selectedCount === 0 || isActionLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Naik Kelas ({selectedCount})
                  </button>

                  <button
                    type="button"
                    onClick={onGraduateClick}
                    disabled={selectedCount === 0 || isActionLoading}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Luluskan ({selectedCount})
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
