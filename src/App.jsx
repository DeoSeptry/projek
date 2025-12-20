import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Login from "./pages/LOGIN";
import HomeKepsek from "./pages/KepSek/HOME-KEPSEK";
import TransaksiKepsek from "./pages/KepSek/TRANSAKSI-KEPSEK";
import HomeWalkel from "./pages/waliKelas/HOME-WALKEL";
import TransaksiWalkel from "./pages/waliKelas/TRANSAKSI-WALKEL"
import HomeWalmur from "./pages/WaliMurid/HOME-WALMUR";
import TransaksiWalmur from "./pages/WaliMurid/TRANSAKSI-WALMUR"




const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/homeKepsek",
    element: <HomeKepsek />,
  },
  {
    path: "/homeWalmur",
    element: <HomeWalmur />,
  },
  {
    path: "/transaksiKepsek",
    element: <TransaksiKepsek />,
  },
  {
    path: "/transaksiWalmur",
    element: <TransaksiWalmur />,
  },
{
    path: "/homeWalkel",
    element: <HomeWalkel />,
  },
  {
    path: "/transaksiWalkel",
    element: <TransaksiWalkel />,
  },
  
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}