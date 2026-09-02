import { LayoutDashboard, ArrowLeftRight, UserCircle, Settings } from "lucide-react";

export const DASHBOARD_MENU = [
  // SUPERADMIN (Kepsek)
  {
    id: "kepsek-home",
    path: "/homeKepsek",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["superadmin"],
  },
  {
    id: "kepsek-transaksi",
    path: "/transaksiKepsek",
    label: "Transaksi",
    icon: ArrowLeftRight,
    roles: ["superadmin"],
  },
  {
    id: "kepsek-akun",
    path: "/akunKepsek",
    label: "Akun",
    icon: UserCircle,
    roles: ["superadmin"],
  },
  
  // TEACHER (Wali Kelas)
  {
    id: "walkel-home",
    path: "/homeWalkel",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["teacher"],
  },
  {
    id: "walkel-transaksi",
    path: "/transaksiWalkel",
    label: "Transaksi",
    icon: ArrowLeftRight,
    roles: ["teacher"],
  },
  {
    id: "walkel-akun",
    path: "/akunWalkel",
    label: "Akun",
    icon: UserCircle,
    roles: ["teacher"],
  },

  // PARENT (Wali Murid)
  {
    id: "walmur-home",
    path: "/homeWalmur",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["parent"],
  },
  {
    id: "walmur-transaksi",
    path: "/transaksiWalmur",
    label: "Transaksi",
    icon: ArrowLeftRight,
    roles: ["parent"],
  },
  {
    id: "kepsek-pengaturan",
    path: "/pengaturanKepsek",
    label: "Pengaturan",
    icon: Settings,
    roles: ["superadmin", "teacher", "parent"],
  },
];
