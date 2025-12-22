import React from 'react';

export default function StudentsTableView({
  students = [],
  isLoading,
  selectedIds = [],
  isAllSelected,
  isSomeSelected,
  onSelectAll,
  onSelectOne,
}) {
  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="relative overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="p-8 text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="mt-2 text-sm text-gray-500">Memuat data...</p>
        </div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="relative overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="p-8 text-center">
          <p className="text-gray-500">Tidak ada data siswa</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-sm text-gray-700 bg-gray-50 border-b border-gray-200">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="table-checkbox-all"
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isSomeSelected;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="table-checkbox-all" className="sr-only">
                  Select all
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Nama Siswa
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Wali Kelas
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Kelas
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              No. Telepon
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Status
            </th>
            <th scope="col" className="px-6 py-3 font-medium">
              Tgl Bergabung
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const isSelected = selectedIds.includes(student.id);

            return (
              <tr
                key={student.id}
                className="bg-white border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-${student.id}`}
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) =>
                        onSelectOne(student.id, e.target.checked)
                      }
                      className="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor={`checkbox-${student.id}`} className="sr-only">
                      Select student
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {student.studentName}
                </th>
                <td className="px-6 py-4">{student.teacherName}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Kelas {student.grade}
                  </span>
                </td>
                <td className="px-6 py-4">{student.phoneNumber}</td>
                <td className="px-6 py-4">
                  {student.isGraduated ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Lulus
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Aktif
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {formatDate(student.createdAt)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
