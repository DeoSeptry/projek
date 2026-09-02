import React from "react";
import { useDispatch } from "react-redux";
import { loadAuthUser, clearAuthUser } from "../utils/authStorage"; 
import { setSession, clearSession } from "../store/authSlice"; 

export default function AuthBootstrap({ children }) {
  const dispatch = useDispatch();
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;

    try {
      // 1. Ambil data sesi dari localStorage
      const stored = loadAuthUser();
      
      // 2. Cek apakah sesi valid (punya user, role, dan token)
      const hasStoredSession = Boolean(stored?.user && stored?.role && stored?.accessToken);
      
      if (hasStoredSession) {
        // PERBAIKAN: Sertakan accessToken agar authSlice mengeset isAuthenticated = true
        dispatch(setSession({ 
          user: stored.user, 
          role: stored.role, 
          accessToken: stored.accessToken 
        }));
      } else {
        // Jika data tidak lengkap, pastikan state bersih
        dispatch(clearSession());
        clearAuthUser();
      }
    } catch (error) {
      // Catch digunakan jika terjadi error fatal saat parsing localStorage
      console.error("Gagal memuat sesi autentikasi", error);
      dispatch(clearSession());
      clearAuthUser();
    } finally {
      if (mounted) setReady(true);
    }

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  if (!ready) return <p style={{ padding: 16 }}>Loading session...</p>;
  return children;
}