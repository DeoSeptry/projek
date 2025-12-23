// src/hooks/useClickOutside.js
import { useEffect, useRef } from 'react';

/**
 * Hook untuk mendeteksi klik di luar element
 * @param {Function} handler - Callback yang dipanggil saat klik di luar
 * @param {boolean} enabled - Apakah hook aktif atau tidak
 */
export function useClickOutside(handler, enabled = true) {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    // Bind event listener
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      // Cleanup event listener
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handler, enabled]);

  return ref;
}