// src/routes/guards.jsx
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Helper function untuk normalize role
export function normalizeRole(role) {
  if (!role) return "";
  return role.toLowerCase().trim();
}

// Helper function untuk mendapatkan home path berdasarkan role
export function getHomePathByRole(role) {
  const normalized = normalizeRole(role);
  
  switch (normalized) {
    case "superadmin":
      return "/homeKepsek";
    case "teacher":
      return "/homeWalkel";
    case "parent":
      return "/homeWalmur";
    default:
      return "/login";
  }
}

// Redirect ke home sesuai role jika sudah login
export function IndexRedirect() {
  const { role, isAuthenticated } = useSelector((s) => s.auth);

  if (!isAuthenticated || !role) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={getHomePathByRole(role)} replace />;
}

// Redirect ke dashboard jika sudah login (untuk halaman login)
export function RedirectIfAuthenticated({ children }) {
  const { role, isAuthenticated } = useSelector((s) => s.auth);

  if (isAuthenticated && role) {
    return <Navigate to={getHomePathByRole(role)} replace />;
  }

  return children;
}

// Guard untuk halaman yang memerlukan authentication dan role tertentu
export function RequireAuthRole({ allowedRoles, children }) {
  const location = useLocation();
  const { role, isAuthenticated } = useSelector((s) => s.auth);

  // Belum login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role tidak ada / belum kebaca
  if (!role) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading session...</p>
      </div>
    );
  }

  // Jika allowedRoles kosong, lolos
  if (!allowedRoles || allowedRoles.length === 0) {
    return children ?? <Outlet />;
  }

  // Cek apakah role sesuai
  const ok = allowedRoles.map(normalizeRole).includes(normalizeRole(role));

  // Role tidak sesuai -> lempar ke home sesuai role
  if (!ok) {
    return <Navigate to={getHomePathByRole(role)} replace />;
  }

  // ✅ Kalau ada children (DashboardLayout), render itu
  return children ?? <Outlet />;
}