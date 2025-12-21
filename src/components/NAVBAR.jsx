// src/components/Navbar.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Bell, Search, Settings, User, Menu, X } from 'lucide-react';

export default function Navbar({ onMenuToggle, isMenuOpen }) {
  const { user, role } = useSelector((state) => state.auth);

  const getRoleLabel = (role) => {
    switch (role) {
      case "Superadmin":
        return "Kepala Sekolah";
      case "Teacher":
        return "Wali Kelas";
      case "Parent":
        return "Wali Murid";
      default:
        return role;
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-4 flex-1">
        {/* Hamburger Menu - Mobile Only */}
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Search Bar - Desktop Only */}
        <div className="hidden md:flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2 max-w-md w-full">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Cari sesuatu..."
            className="bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400 w-full"
          />
        </div>

        {/* Mobile Search Icon */}
        <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Search size={20} />
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notification */}
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Settings - Desktop Only */}
        <button className="hidden md:block p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings size={20} />
        </button>

        {/* User Info - Desktop Only */}
        <div className="hidden md:flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {user?.username || "User"}
            </p>
            <p className="text-xs text-gray-500">
              {getRoleLabel(role)}
            </p>
          </div>
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-blue-600" />
          </div>
        </div>

        {/* User Avatar - Mobile Only */}
        <div className="md:hidden w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-blue-600" />
        </div>
      </div>
    </nav>
  );
}