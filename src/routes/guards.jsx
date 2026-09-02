import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { normalizeRole, getHomePathByRole } from "./rolePaths";
import { clearSession } from "../store/authSlice";
import { clearAuthUser } from "../utils/authStorage";

export function IndexRedirect() {
  const { role, isAuthenticated } = useSelector((s) => s.auth);

  if (!isAuthenticated || !role) {
    return <Navigate to="/login" replace />;
  }
  return <Navigate to={getHomePathByRole(role)} replace />;
}

export function RedirectIfAuthenticated({ children }) {
  const { role, isAuthenticated } = useSelector((s) => s.auth);

  if (isAuthenticated && role) {
    return <Navigate to={getHomePathByRole(role)} replace />;
  }
  return children;
}

export function RequireAuthRole({ allowedRoles, children }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { role, isAuthenticated } = useSelector((s) => s.auth);

  // 1. Jika tidak ada access token (isAuthenticated = false)
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. PERBAIKAN: Jika ada token, tapi role-nya hilang/korup, 
  // bersihkan sesi dan paksa login ulang untuk keamanan.
  if (!role) {
    dispatch(clearSession());
    clearAuthUser();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Cek otorisasi berdasarkan role
  if (!allowedRoles || allowedRoles.length === 0) {
    return children ?? <Outlet />;
  }

  const ok = allowedRoles.map(normalizeRole).includes(normalizeRole(role));
  if (!ok) {
    return <Navigate to={getHomePathByRole(role)} replace />;
  }

  return children ?? <Outlet />;
}