// src/utils/toast.js
import toast from 'react-hot-toast';

export const showToast = {
  success: (message, options = {}) => {
    return toast.success(message, {
      duration: 3000,
      ...options,
    });
  },

  error: (message, options = {}) => {
    return toast.error(message, {
      duration: 4000,
      ...options,
    });
  },

  loading: (message, options = {}) => {
    return toast.loading(message, {
      ...options,
    });
  },

  promise: (promise, messages) => {
    return toast.promise(promise, {
      loading: messages.loading || 'Memproses...',
      success: messages.success || 'Berhasil!',
      error: messages.error || 'Terjadi kesalahan',
    });
  },

  custom: (message, options = {}) => {
    return toast(message, {
      duration: 3000,
      ...options,
    });
  },

  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },

  dismissAll: () => {
    toast.dismiss();
  },
};