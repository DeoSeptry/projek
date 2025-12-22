import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { normalizeRole, getHomePathByRole } from "./rolePaths";

// Redirect "/" -> home sesuai role, atau login
export function IndexRedirect() {
  const { role, isAuthenticated } = useSelector((s) => s.auth);

  if (!isAuthenticated || !role) {
    return <Navigate to="/login" replace />;
  }
  return <Navigate to={getHomePathByRole(role)} replace />;
}

// Jika sudah login, tidak boleh ke halaman login
export function RedirectIfAuthenticated({ children }) {
  const { role, isAuthenticated } = useSelector((s) => s.auth);

  if (isAuthenticated && role) {
    return <Navigate to={getHomePathByRole(role)} replace />;
  }
  return children;
}

// Guard auth + role
export function RequireAuthRole({ allowedRoles, children }) {
  const location = useLocation();
  const { role, isAuthenticated } = useSelector((s) => s.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!role) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading session...</p>
      </div>
    );
  }

  // allowedRoles kosong -> lolos
  if (!allowedRoles || allowedRoles.length === 0) {
    return children ?? <Outlet />;
  }

  const ok = allowedRoles.map(normalizeRole).includes(normalizeRole(role));
  if (!ok) {
    return <Navigate to={getHomePathByRole(role)} replace />;
  }

  return children ?? <Outlet />;
}
