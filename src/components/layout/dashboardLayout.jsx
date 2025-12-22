import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LogOut, User, X, Menu } from "lucide-react";

import Modal from "../Modal";
import Logo from "../../assets/logo.png";



import { normalizeRole } from "../../routes/rolePaths"; // pastikan file ini ada
import { DASHBOARD_MENU } from "./dashboardMenu";
import { useLogoutMutation } from "../../services/api/auth.api";

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, role, isAuthenticated } = useSelector((state) => state.auth);
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  const roleNormalized = React.useMemo(() => normalizeRole(role), [role]);

  const filteredMenuItems = React.useMemo(() => {
    if (!roleNormalized) return [];
    return DASHBOARD_MENU.filter((item) => item.roles.includes(roleNormalized));
  }, [roleNormalized]);

  const activeItemId = React.useMemo(() => {
    const sorted = [...filteredMenuItems].sort(
      (a, b) => b.path.length - a.path.length
    );

    for (const item of sorted) {
      if (
        location.pathname === item.path ||
        location.pathname.startsWith(item.path + "/")
      ) {
        return item.id;
      }
    }
    return "";
  }, [location.pathname, filteredMenuItems]);

  const activeMenuLabel = React.useMemo(() => {
    const active = filteredMenuItems.find((item) => item.id === activeItemId);
    return active?.label || "Dashboard";
  }, [activeItemId, filteredMenuItems]);

  const closeMobileMenu = React.useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleMenuItemClick = React.useCallback(
    (item) => {
      setMobileMenuOpen(false);
      navigate(item.path);
    },
    [navigate]
  );

  const handleLogout = React.useCallback(async () => {
    try {
      await logout().unwrap();
    } finally {
      setShowLogoutModal(false);
      navigate("/login", { replace: true });
    }
  }, [logout, navigate]);

  // lock scroll saat mobile menu open
  React.useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // auto close menu saat pindah halaman
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const renderMenuItem = (item) => {
    const Icon = item.icon;
    const isActive = item.id === activeItemId;

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => handleMenuItemClick(item)}
        className={[
          "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium",
          isActive
            ? "bg-blue-50 text-[#1814F3]"
            : "text-slate-400 hover:bg-gray-50 hover:text-slate-600",
        ].join(" ")}
        aria-current={isActive ? "page" : undefined}
      >
        <Icon className={isActive ? "text-blue-600" : "text-slate-400"} size={20} />
        <span>{item.label}</span>
      </button>
    );
  };

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-gray-100">
        <img className="w-[125px] h-[34px]" src={Logo} alt="Logo" />
      </div>

      <nav className="mt-6 px-3 space-y-2 flex-1 overflow-y-auto">
        {filteredMenuItems.map(renderMenuItem)}

        {filteredMenuItems.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-gray-500">
            No menu available
          </div>
        )}
      </nav>

      <div className="p-3 border-t border-gray-100 bg-white flex-shrink-0">
        <div className="mb-3 flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-blue-600" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.username || "User"}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email || "-"}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowLogoutModal(true)}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
        </button>
      </div>
    </>
  );

  const Navbar = () => (
    <nav className="bg-white border-b border-gray-100 px-4 md:px-6 py-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <h1 className="text-xl md:text-2xl font-semibold text-[#343C6A]">
          {activeMenuLabel}
        </h1>
      </div>
    </nav>
  );

  // Layout ini harusnya sudah diprotek oleh RequireAuthRole,
  // tapi fallback aman kalau state belum kebaca saat bootstrap.
  if (!isAuthenticated || !roleNormalized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading session...</p>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex bg-gray-50 overflow-hidden">
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <aside
        className={[
          "fixed top-0 left-0 h-full bg-white border-r border-gray-100 z-50",
          "transition-transform duration-300 ease-in-out flex flex-col w-64",
          "md:translate-x-0 md:z-40",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <SidebarContent />
      </aside>

      <div className="hidden md:block w-64 flex-shrink-0" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>

      <Modal show={showLogoutModal} onClose={() => setShowLogoutModal(false)} size="md">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <LogOut className="h-6 w-6 text-red-600" />
          </div>

          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            Konfirmasi Logout
          </h3>

          <p className="mb-5 text-sm text-gray-500">
            Apakah Anda yakin ingin keluar? Anda akan diarahkan ke halaman login.
          </p>

          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingOut ? "Logging out..." : "Ya, Logout"}
            </button>

            <button
              type="button"
              onClick={() => setShowLogoutModal(false)}
              disabled={isLoggingOut}
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
