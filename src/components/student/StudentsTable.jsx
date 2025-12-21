import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import StudentsTableView from './StudentsTableView';
import TablePagination from './TablePagination';
import BulkActionModal from './BulkActionModal';
import { 
  useGetStudentsQuery, 
  useGraduateStudentsMutation, 
  usePromoteStudentsToNextGradeMutation 
} from '../../services/api/students.api';

export default function StudentsTable({ teacherId, teacherGrade }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [modalAction, setModalAction] = useState(null);
  
  const limit = 10;

  // Query students dengan filter teacherId dan grade
  const { data, isLoading, isFetching } = useGetStudentsQuery({
    page,
    limit,
    search: searchQuery || undefined,
    teacherId: teacherId || undefined,
    grade: teacherGrade || undefined, // ✅ Filter berdasarkan grade
  });

  const [promoteStudents, { isLoading: isPromoting }] = usePromoteStudentsToNextGradeMutation();
  const [graduateStudents, { isLoading: isGraduating }] = useGraduateStudentsMutation();

  const students = data?.items || [];
  const meta = data?.meta;

  // Reset selection dan page saat teacher berubah
  useEffect(() => {
    setSelectedIds([]);
    setPage(1);
    setSearchQuery('');
  }, [teacherId]);

  // Reset selection saat page berubah
  useEffect(() => {
    setSelectedIds([]);
  }, [page]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset ke halaman pertama saat search
  };

  const handleSelectAll = (checked) => {
    setSelectedIds(checked ? students.map((s) => s.id) : []);
  };

  const handleSelectOne = (id, checked) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((sid) => sid !== id)
    );
  };

  const handleOpenModal = (action) => {
    if (selectedIds.length === 0) {
      alert('Pilih minimal 1 siswa terlebih dahulu');
      return;
    }
    setModalAction(action);
  };

  const handleCloseModal = () => {
    setModalAction(null);
  };

  const handleConfirmAction = async () => {
    try {
      if (modalAction === 'promote') {
        await promoteStudents({ studentIds: selectedIds }).unwrap();
        alert('Siswa berhasil naik kelas!');
      } else if (modalAction === 'graduate') {
        await graduateStudents({ studentIds: selectedIds }).unwrap();
        alert('Siswa berhasil diluluskan!');
      }
      setSelectedIds([]);
      setModalAction(null);
    } catch (error) {
      alert(error?.data?.message || 'Terjadi kesalahan');
    }
  };

  const isAllSelected = students.length > 0 && selectedIds.length === students.length;
  const isSomeSelected = selectedIds.length > 0 && !isAllSelected;

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Cari nama siswa..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleOpenModal('promote')}
            disabled={selectedIds.length === 0}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Naik Kelas ({selectedIds.length})
          </button>
          <button
            type="button"
            onClick={() => handleOpenModal('graduate')}
            disabled={selectedIds.length === 0}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Luluskan ({selectedIds.length})
          </button>
        </div>
      </div>

      {/* Table */}
      <StudentsTableView
        students={students}
        isLoading={isLoading || isFetching}
        selectedIds={selectedIds}
        isAllSelected={isAllSelected}
        isSomeSelected={isSomeSelected}
        onSelectAll={handleSelectAll}
        onSelectOne={handleSelectOne}
      />

      {/* Pagination */}
      {meta && (
        <TablePagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
          totalResults={meta.totalResults}
          onPageChange={setPage}
        />
      )}
    
      {/* Modal */}
      <BulkActionModal
        isOpen={modalAction !== null}
        action={modalAction}
        selectedCount={selectedIds.length}
        isLoading={isPromoting || isGraduating}
        onConfirm={handleConfirmAction}
        onClose={handleCloseModal}
      />
    </div>
  );
}