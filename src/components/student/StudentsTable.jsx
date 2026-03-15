import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import StudentsTableView from "./StudentsTableView";
import TablePagination from "./TablePagination";
import BulkActionModal from "./BulkActionModal";
import {
  useGetStudentsQuery,
  useGraduateStudentsMutation,
  usePromoteStudentsToNextGradeMutation,
} from "../../services/api/students.api";

export default function StudentsTable({ teacherId, teacherGrade }) {

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  // ✅ Set biar tidak ada duplikat
  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const [modalAction, setModalAction] = useState(null);

  const limit = 10;

  const { data, isLoading, isFetching } = useGetStudentsQuery({
    page,
    limit,
    search: searchQuery || undefined,
    teacherId: teacherId || undefined,
    grade: teacherGrade || undefined,
  });

  const [promoteStudents, { isLoading: isPromoting }] =
    usePromoteStudentsToNextGradeMutation();
  const [graduateStudents, { isLoading: isGraduating }] =
    useGraduateStudentsMutation();

  const students = data?.items || [];
  const meta = data?.meta;

  useEffect(() => {
    setSelectedIds(new Set());
    setPage(1);
    setSearchQuery("");
  }, [teacherId, teacherGrade]);

  useEffect(() => {
    setSelectedIds(new Set());
  }, [page]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
    setSelectedIds(new Set());
  };

  const handleSelectAll = (checked) => {
    setSelectedIds(() => {
      if (!checked) return new Set();
      return new Set(students.map((s) => s.id));
    });
  };

  const handleSelectOne = (id, checked) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const selectedCount = selectedIds.size;

  const handleOpenModal = (action) => {
    if (selectedCount === 0) {
      toast.error("❌ Pilih minimal 1 siswa terlebih dahulu", { duration: 4000 });
      return;
    }
    setModalAction(action);
  };

  const handleCloseModal = () => setModalAction(null);

  const handleConfirmAction = async () => {
    const idsArray = Array.from(selectedIds);

    const loadingToast = toast.loading("Memproses data siswa...");
    try {
      if (modalAction === "promote") {
        await promoteStudents({ studentIds: idsArray }).unwrap();
        toast.dismiss(loadingToast);
        toast.success("✅ Siswa berhasil naik kelas", { duration: 3000 });
      } else if (modalAction === "graduate") {
        await graduateStudents({ studentIds: idsArray }).unwrap();
        toast.dismiss(loadingToast);
        toast.success("✅ Siswa berhasil diluluskan", { duration: 3000 });
      } else {
        toast.dismiss(loadingToast);
        toast.error("❌ Aksi tidak dikenal", { duration: 4000 });
        return;
      }

      // ✅ tutup modal + reset selection
      setSelectedIds(new Set());
      setModalAction(null);

    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(
        `❌ ${error?.data?.message || "Terjadi kesalahan saat memproses siswa"}`,
        { duration: 4000 }
      );
    }
  };

  const isAllSelected = students.length > 0 && selectedIds.size === students.length;
  const isSomeSelected = selectedIds.size > 0 && !isAllSelected;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="text-black absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Cari nama siswa..."
            className="text-black bg-white w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
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
        selectedCount={selectedCount}
        onPromoteClick={() => handleOpenModal("promote")}
        onGraduateClick={() => handleOpenModal("graduate")}
        isActionLoading={isPromoting || isGraduating}
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
        selectedCount={selectedCount}
        isLoading={isPromoting || isGraduating}
        onConfirm={handleConfirmAction}
        onClose={handleCloseModal}
      />
    </div>
  );
}
