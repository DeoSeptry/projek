// src/pages/admin/ParentsManagement.jsx
import React, { useState, useCallback } from "react";
import toast from "react-hot-toast";
import { UserPlus } from "lucide-react";
import {
  useGetParentsQuery,
  useDeleteParentMutation,
} from "../../services/api/parents.api";
import CreateParentModal from "../../components/modal/CreateParentModal";
import EditParentModal from "../../components/modal/EditParentModal";
import DeleteParentModal from "../../components/modal/DeleteParentModal";
import ParentsTable from "../../components/table/ParentsTable";

export default function AkunWalkel() {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
  });

  // Modal states
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState({
    isOpen: false,
    parent: null,
  });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    parent: null,
  });

  // Queries & Mutations
  const { data: response, isLoading, isError, isFetching } =
    useGetParentsQuery(filters);

  const [deleteParent, { isLoading: isDeleting }] = useDeleteParentMutation();

  const parents = response?.items || [];
  const meta = response?.meta || {};

  // Handlers
  const handleSearchChange = useCallback((search) => {
    setFilters((prev) => ({ ...prev, search, page: 1 }));
  }, []);

  const handlePageChange = useCallback((page) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  // Create handlers
  const handleCreateSuccess = () => {
    toast.success("✅ Akun orang tua berhasil dibuat", {
      duration: 3000,
    });
  };

  // Edit handlers
  const handleEditClick = (parent) => {
    setEditModal({ isOpen: true, parent });
  };

  const handleEditSuccess = () => {
    toast.success("✅ Data orang tua berhasil diperbarui", {
      duration: 3000,
    });
  };

  const handleEditClose = () => {
    setEditModal({ isOpen: false, parent: null });
  };

  // Delete handlers
  const handleDeleteClick = (parent) => {
    setDeleteModal({ isOpen: true, parent });
  };

  const handleDeleteConfirm = async (userId) => {
    const loadingToast = toast.loading("Menghapus akun...");

    try {
      await deleteParent(userId).unwrap();

      toast.dismiss(loadingToast);
      toast.success("✅ Akun orang tua berhasil dihapus", {
        duration: 3000,
      });

      setDeleteModal({ isOpen: false, parent: null });
    } catch (error) {
      toast.dismiss(loadingToast);

      const errorMessage =
        error?.data?.message || "Gagal menghapus akun orang tua";

      toast.error(`❌ ${errorMessage}`, {
        duration: 4000,
      });

      console.error("Delete error:", error);
    }
  };

  const handleDeleteClose = () => {
    if (!isDeleting) {
      setDeleteModal({ isOpen: false, parent: null });
    }
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen p-6">
      <div className="mb-6">
        <h2 className="text-[22px] text-[#343C6A] font-medium mb-2">
          Manajemen Akun Orang Tua
        </h2>
        <p className="text-sm text-gray-500">
          Kelola akun orang tua siswa
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Daftar Orang Tua
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Total: {meta.totalResults || 0} akun
            </p>
          </div>
          <button
            onClick={() => setCreateModal(true)}
            className="inline-flex items-center justify-center text-white bg-blue-600 border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-sm font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none transition-colors gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Tambah Akun
          </button>
        </div>

        {/* Table */}
        <ParentsTable
          data={parents}
          isLoading={isLoading || isFetching}
          isError={isError}
          searchQuery={filters.search}
          onSearchChange={handleSearchChange}
          currentPage={meta.page || 1}
          totalPages={meta.totalPages || 1}
          totalResults={meta.totalResults || 0}
          onPageChange={handlePageChange}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>

      {/* Create Modal */}
      <CreateParentModal
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />

      {/* Edit Modal */}
      <EditParentModal
        isOpen={editModal.isOpen}
        onClose={handleEditClose}
        parent={editModal.parent}
        onSuccess={handleEditSuccess}
      />

      {/* Delete Modal */}
      <DeleteParentModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteClose}
        parent={deleteModal.parent}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />
    </div>
  );
}