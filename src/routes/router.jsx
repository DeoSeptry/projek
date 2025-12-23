import React from "react";
import { createBrowserRouter } from "react-router-dom";

import TransaksiKepsek from "../pages/KepSek/TransaksiKepsek";

import HomeWalkel from "../pages/waliKelas/HomeWalkel";
import TransaksiWalkel from "../pages/waliKelas/TransaksiWalkel";

import HomeWalmur from "../pages/WaliMurid/HOME-WALMUR";
import TransaksiWalmur from "../pages/WaliMurid/TRANSAKSI-WALMUR";

import DashboardLayout from "../components/layout/dashboardLayout";

import { IndexRedirect, RedirectIfAuthenticated, RequireAuthRole } from "./guards";
import LoginPage from "../pages/LoginPage";
import HomeKepalaSekolah from "../pages/KepSek/HomeKepsek";
import AkunKepsek from "../pages/KepSek/AkunKepsek";
import ProfilePage from "../pages/ProfilePage";
import AkunWalkel from "../pages/waliKelas/AkunWalkel";

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
    ],
  },

  {
    element: (
      <RequireAuthRole allowedRoles={["superadmin", "teacher", "parent"]}>
        <DashboardLayout />
      </RequireAuthRole>
    ),
    children: [
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
      { path: "/akunWalkel", element: <AkunWalkel /> },
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
