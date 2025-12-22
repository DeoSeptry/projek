// src/routes/index.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/LOGIN";

import HomeKepsek from "../pages/KepSek/HOME-KEPSEK";
import TransaksiKepsek from "../pages/KepSek/TRANSAKSI-KEPSEK";

import HomeWalkel from "../pages/waliKelas/HOME-WALKEL";
import TransaksiWalkel from "../pages/waliKelas/TRANSAKSI-WALKEL";

import HomeWalmur from "../pages/WaliMurid/HOME-WALMUR";
import TransaksiWalmur from "../pages/WaliMurid/TRANSAKSI-WALMUR";


import { IndexRedirect, RedirectIfAuthenticated, RequireAuthRole } from "./guards";
import DashboardLayout from "../components/layout/dashboardLayout";
import ProfilePage from "../pages/WaliMurid/SETTING-WALMUR";



export const router = createBrowserRouter([
  { path: "/", element: <IndexRedirect /> },

  {
    path: "/login",
    element: (
      <RedirectIfAuthenticated>
        <Login />
      </RedirectIfAuthenticated>
    ),
  },

  // SUPERADMIN (Kepsek)
  {
    element: (
      <RequireAuthRole allowedRoles={["Superadmin"]}>
        <DashboardLayout />
      </RequireAuthRole>
    ),
    children: [
      { path: "/homeKepsek", element: <HomeKepsek /> },
      { path: "/transaksiKepsek", element: <TransaksiKepsek /> },
    ],
  },

  // TEACHER (Wali Kelas)
  {
    element: (
      <RequireAuthRole allowedRoles={["Teacher"]}>
        <DashboardLayout />
      </RequireAuthRole>
    ),
    children: [
      { path: "/homeWalkel", element: <HomeWalkel /> },
      { path: "/transaksiWalkel", element: <TransaksiWalkel /> },
    ],
  },

  // PARENT (Wali Murid)
  {
    element: (
      <RequireAuthRole allowedRoles={["Parent"]}>
        <DashboardLayout />
      </RequireAuthRole>
    ),
    children: [
      { path: "/homeWalmur", element: <HomeWalmur /> },
      { path: "/transaksiWalmur", element: <TransaksiWalmur /> },
      {path: "/settingWalmur" ,element :<ProfilePage />}
    ],
  },

  // fallback
  { path: "*", element: <IndexRedirect /> },
]);