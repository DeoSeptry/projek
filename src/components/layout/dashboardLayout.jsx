// src/components/layout/dashboardLayout.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  LogOut,
  User,
  X,
  Menu,
  LayoutDashboard,
  ArrowLeftRight,
  Bell,
  Search,
  Settings,
} from "lucide-react";
import Modal from "../Modal";

import Logo from "../../assets/logo.png";
import { useLogoutMutation } from "../../services/authApi";

// Menu items untuk setiap role
const MENU_ITEMS = [
  {
    id: "kepsek-home",
    path: "/homeKepsek",
    label: "Dashboard",
    icon: LayoutDashboard,
    userTypes: ["Superadmin"],
  },
  {
    id: "kepsek-transaksi",
    path: "/transaksiKepsek",
    label: "Transaksi",
    icon: ArrowLeftRight,
    userTypes: ["Superadmin"],
  },
  {
    id: "walkel-home",
    path: "/homeWalkel",
    label: "Dashboard",
    icon: LayoutDashboard,
    userTypes: ["Teacher"],
  },
  {
    id: "walkel-transaksi",
    path: "/transaksiWalkel",
    label: "Transaksi",
    icon: ArrowLeftRight,
    userTypes: ["Teacher"],
  },
  {
    id: "walmur-home",
    path: "/homeWalmur",
    label: "Dashboard",
    icon: LayoutDashboard,
    userTypes: ["Parent"],
  },
  {
    id: "walmur-transaksi",
    path: "/transaksiWalmur",
    label: "Transaksi",
    icon: ArrowLeftRight,
    userTypes: ["Parent"],
  },
];

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { user, role } = useSelector((state) => state.auth);
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const filteredMenuItems = useMemo(() => {
    if (!role) return [];
    return MENU_ITEMS.filter((item) => item.userTypes.includes(role));
  }, [role]);

  const activeItem = useMemo(() => {
    const sortedItems = [...filteredMenuItems].sort((a, b) => b.path.length - a.path.length);

    for (const item of sortedItems) {
      if (
        location.pathname === item.path ||
        location.pathname.startsWith(item.path + "/")
      ) {
        return item.id;
      }
    }
    return "";
  }, [location.pathname, filteredMenuItems]);

  // Get active menu label
  const activeMenuLabel = useMemo(() => {
    const active = filteredMenuItems.find(item => item.id === activeItem);
    return active?.label || "Dashboard";
  }, [activeItem, filteredMenuItems]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleMenuItemClick = useCallback(
    (item) => {
      setMobileMenuOpen(false);
      navigate(item.path);
    },
    [navigate]
  );

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      setShowLogoutModal(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setShowLogoutModal(false);
    }
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const renderMenuItem = (item) => {
    const Icon = item.icon;
    const isActive = item.id === activeItem;

    return (
      <button
        key={item.id}
        onClick={() => handleMenuItemClick(item)}
        className={`
          w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium
          ${
            isActive
              ? "bg-blue-50 text-[#1814F3]"
              : "text-slate-400 hover:bg-gray-50 hover:text-slate-600"
          }
        `}
      >
        <Icon
          className={isActive ? "text-blue-600" : "text-slate-400"}
          size={20}
        />
        <span>{item.label}</span>
      </button>
    );
  };

  const renderSidebarContent = () => (
    <>
      <div className="p-6 border-b border-gray-100">
        <img className="w-[125px] h-[34px]" src={Logo} alt="Logo" />
      </div>

      <nav className="mt-6 px-3 space-y-2 flex-1 overflow-y-auto">
        {filteredMenuItems.map((item) => renderMenuItem(item))}

        {filteredMenuItems.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-gray-500">
            No menu available
          </div>
        )}
      </nav>

      <div className="p-3 border-t border-gray-100 bg-white flex-shrink-0">
        {user && (
          <div className="mb-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-blue-600" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.username || "User"}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowLogoutModal(true)}
          disabled={isLoggingOut}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoggingOut ? (
            <>
              <svg
                className="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Logging out...</span>
            </>
          ) : (
            <>
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </>
          )}
        </button>
      </div>
    </>
  );

  const renderNavbar = () => (
    <nav className="bg-white border-b border-gray-100 px-4 md:px-6 py-6 flex items-center justify-between sticky top-0 z-30 ">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu - Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Page Title */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl md:text-2xl font-semibold text-[#343C6A]">
            {activeMenuLabel}
          </h1>
        </div>
      </div>


    </nav>
  );

  if (!user || !role) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex bg-gray-50 overflow-hidden">
      {/* Overlay untuk mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-100 z-50 transition-transform duration-300 ease-in-out flex flex-col
          w-64 md:translate-x-0 md:z-40
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {renderSidebarContent()}
      </aside>

      {/* Spacer untuk sidebar di desktop */}
      <div className="hidden md:block w-64 flex-shrink-0" />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        {renderNavbar()}

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>

      {/* Logout Modal */}
      <Modal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        size="md"
      >
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
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingOut ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging out...
                </>
              ) : (
                "Ya, Logout"
              )}
            </button>
            
            <button
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