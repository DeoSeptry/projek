// pages/ProfilePage.jsx
import React, { useState } from "react";
import { Camera, Trash2, User, Phone, Lock, Mail, Check } from "lucide-react";
import { useDeleteAvatarMutation } from "../services/api/profile.api";
import { useProfileForm } from "../hooks/profile/useProfileForm";
import { useAvatarForm } from "../hooks/profile/useAvatarForm";

export default function ProfilePage() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const {
    profile,
    loadingProfile,
    saving,
    register,
    formState: { errors, isValid, isDirty },
    onSubmit,
    rootErrorMessage,
  } = useProfileForm();

  const {
    setValue,
    onSubmit: onSubmitAvatar,
    isLoading: uploading,
    rootErrorMessage: avatarError,
    formState: { errors: avatarErrors },
  } = useAvatarForm();

  const [deleteAvatar, { isLoading: deleting }] = useDeleteAvatarMutation();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("avatar", file, { shouldValidate: true });
      // Auto submit setelah pilih file
      const result = await onSubmitAvatar({ avatar: file });
      if (result?.success) {
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      }
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      await deleteAvatar().unwrap();
      setShowDeleteConfirm(false);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error("Failed to delete avatar:", error);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const result = await onSubmit(e);
    if (result?.success) {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  if (loadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Memuat profil...</p>
        </div>
      </div>
    );
  }

  const avatarUrl = profile?.avatar?.url;
  const hasAvatar = !!avatarUrl;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 animate-fade-in">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="text-white" size={20} />
            </div>
            <div>
              <p className="font-medium text-green-800">Berhasil!</p>
              <p className="text-sm text-green-700">
                Profil Anda telah diperbarui
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Avatar & Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center">
                {/* Avatar Container */}
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-200 shadow-lg">
                    <img
                      src={profile?.avatar?.url}
                      alt={profile?.name || "Avatar"}
                      className="w-full h-full object-cover"
                    />
                  </div>



                  {/* Upload Input (Hidden) */}
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="hidden"
                  />

                  {/* Edit Button Badge */}
                  <label
                    htmlFor="avatar-upload"
                    className={`absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg cursor-pointer transition ${
                      uploading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    title="Ubah foto profil"
                  >
                    <Camera size={16} />
                  </label>
                </div>

                {/* Upload Status */}
                {uploading && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-blue-600">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span>Mengunggah...</span>
                  </div>
                )}

                {/* Avatar Errors */}
                {avatarError && (
                  <div className="mt-3 text-sm text-red-600 text-center bg-red-50 px-3 py-2 rounded-lg">
                    {avatarError}
                  </div>
                )}
                {avatarErrors.avatar?.message && (
                  <div className="mt-2 text-sm text-red-600 text-center bg-red-50 px-3 py-2 rounded-lg">
                    {avatarErrors.avatar.message}
                  </div>
                )}

                {/* Delete Avatar Button */}
                {hasAvatar && !uploading && (
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={deleting}
                    className="mt-4 flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                    <span>{deleting ? "Menghapus..." : "Hapus Foto"}</span>
                  </button>
                )}

                {/* Profile Info */}
                <div className="mt-6 w-full space-y-3 pt-6 border-t border-slate-200">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-slate-800">
                      {profile?.name || "Nama Pengguna"}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      @{profile?.username || "username"}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    {profile?.email && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail size={16} className="text-slate-400" />
                        <span>{profile.email}</span>
                      </div>
                    )}
                    {profile?.phoneNumber && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone size={16} className="text-slate-400" />
                        <span>{profile.phoneNumber}</span>
                      </div>
                    )}
                    {profile?.role && (
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                          {profile.role}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Update Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">
                    Informasi Profil
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Ubah hanya field yang ingin diperbarui
                  </p>
                </div>
                {isDirty && (
                  <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                    Ada perubahan
                  </span>
                )}
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-5">
                {/* Root Error */}
                {rootErrorMessage && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    <p className="text-sm">{rootErrorMessage}</p>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                      <User size={18} />
                    </span>
                    <input
                      id="name"
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      className={`w-full text-black pl-10 pr-4 py-3 border ${
                        errors.name
                          ? "border-red-400 focus:border-red-500"
                          : "border-slate-300 focus:border-blue-500"
                      } rounded-xl outline-none transition bg-slate-50 focus:bg-white`}
                      {...register("name")}
                    />
                  </div>
                  {errors.name?.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Username */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                      <User size={18} />
                    </span>
                    <input
                      id="username"
                      type="text"
                      placeholder="Masukkan username"
                      className={`w-full text-black  pl-10 pr-4 py-3 border ${
                        errors.username
                          ? "border-red-400 focus:border-red-500"
                          : "border-slate-300 focus:border-blue-500"
                      } rounded-xl outline-none transition bg-slate-50 focus:bg-white`}
                      {...register("username")}
                    />
                  </div>
                  {errors.username?.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Nomor Telepon
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                      <Phone size={18} />
                    </span>
                    <input
                      id="phoneNumber"
                      type="tel"
                      placeholder="Masukkan nomor telepon"
                      className={`w-full text-black  pl-10 pr-4 py-3 border ${
                        errors.phoneNumber
                          ? "border-red-400 focus:border-red-500"
                          : "border-slate-300 focus:border-blue-500"
                      } rounded-xl outline-none transition bg-slate-50 focus:bg-white`}
                      {...register("phoneNumber")}
                    />
                  </div>
                  {errors.phoneNumber?.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                {/* Divider */}
                <div className="pt-4 border-t border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-1">
                    Ubah Password (Opsional)
                  </h3>
                  <p className="text-sm text-slate-500">
                    Kosongkan jika tidak ingin mengubah password
                  </p>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Password Baru
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                      <Lock size={18} />
                    </span>
                    <input
                      id="password"
                      type="password"
                      placeholder="Minimal 6 karakter"
                      className={`w-full text-black  pl-10 pr-4 py-3 border ${
                        errors.password
                          ? "border-red-400 focus:border-red-500"
                          : "border-slate-300 focus:border-blue-500"
                      } rounded-xl outline-none transition bg-slate-50 focus:bg-white`}
                      {...register("password")}
                    />
                  </div>
                  {errors.password?.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Konfirmasi Password
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                      <Lock size={18} />
                    </span>
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="Ulangi password baru"
                      className={`w-full text-black  pl-10 pr-4 py-3 border ${
                        errors.confirmPassword
                          ? "border-red-400 focus:border-red-500"
                          : "border-slate-300 focus:border-blue-500"
                      } rounded-xl outline-none transition bg-slate-50 focus:bg-white`}
                      {...register("confirmPassword")}
                    />
                  </div>
                  {errors.confirmPassword?.message && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={!isDirty || saving}
                    className={`flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none ${
                      saving ? "cursor-wait" : ""
                    }`}
                  >
                    {saving ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Menyimpan...
                      </span>
                    ) : (
                      "Simpan Perubahan"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="text-red-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Hapus Foto Profil
                </h3>
                <p className="text-sm text-slate-600">
                  Tindakan ini tidak dapat dibatalkan
                </p>
              </div>
            </div>

            <p className="text-slate-600 mb-6">
              Apakah Anda yakin ingin menghapus foto profil? Foto default akan
              digunakan sebagai gantinya.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-xl transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDeleteAvatar}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition disabled:opacity-60"
              >
                {deleting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Menghapus...
                  </span>
                ) : (
                  "Ya, Hapus"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}