import React from "react";
import { createBrowserRouter } from "react-router-dom";

import TransaksiKepsek from "../pages/KepSek/TRANSAKSI-KEPSEK";

import HomeWalkel from "../pages/waliKelas/HOME-WALKEL";
import TransaksiWalkel from "../pages/waliKelas/TRANSAKSI-WALKEL";

import HomeWalmur from "../pages/WaliMurid/HOME-WALMUR";
import TransaksiWalmur from "../pages/WaliMurid/TRANSAKSI-WALMUR";

import DashboardLayout from "../components/layout/dashboardLayout";

import { IndexRedirect, RedirectIfAuthenticated, RequireAuthRole } from "./guards";
import LoginPage from "../pages/LoginPage";
import HomeKepalaSekolah from "../pages/KepSek/HOME-KEPSEK";
import AkunKepsek from "../pages/KepSek/AKUN-KEPSEK";
import ProfilePage from "../pages/KepSek/ProfilePage";

export const router = createBrowserRouter([
  { path: "/", element: <IndexRedirect /> },

  {
    path: "/login",
    element: (
      <RedirectIfAuthenticated>
        <LoginPage />
      </RedirectIfAuthenticated>
    ),
  },

  // SUPERADMIN
  {
    element: (
      <RequireAuthRole allowedRoles={["superadmin"]}>
        <DashboardLayout />
      </RequireAuthRole>
    ),
    children: [
      { path: "/homeKepsek", element: <HomeKepalaSekolah /> },
      { path: "/transaksiKepsek", element: <TransaksiKepsek /> },
      { path: "/akunKepsek", element: <AkunKepsek /> },
      { path: "/pengaturanKepsek", element: <ProfilePage /> },
    ],
  },

  // TEACHER
  {
    element: (
      <RequireAuthRole allowedRoles={["teacher"]}>
        <DashboardLayout />
      </RequireAuthRole>
    ),
    children: [
      { path: "/homeWalkel", element: <HomeWalkel /> },
      { path: "/transaksiWalkel", element: <TransaksiWalkel /> },
    ],
  },

  // PARENT
  {
    element: (
      <RequireAuthRole allowedRoles={["parent"]}>
        <DashboardLayout />
      </RequireAuthRole>
    ),
    children: [
      { path: "/homeWalmur", element: <HomeWalmur /> },
      { path: "/transaksiWalmur", element: <TransaksiWalmur /> },
      {path: "/settingWalmur" ,element :<ProfilePage />}
    ],
  },

  { path: "*", element: <IndexRedirect /> },
]);
